#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function usage() {
  console.log("Usage: node svg-preview.mjs <file.svg> [--out preview.html] [--strict] [--allow-unsafe]");
  console.log("  --strict        Exit with code 2 when structural audit errors are found.");
  console.log("  --allow-unsafe  Embed active-content markup. Preview CSP still blocks scripts and network.");
}

function parseArgs(argv) {
  const parsed = { input: null, out: null, help: false, strict: false, allowUnsafe: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--out") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error("--out requires a file path.");
      parsed.out = value;
      index += 1;
    } else if (arg === "--strict") {
      parsed.strict = true;
    } else if (arg === "--allow-unsafe") {
      parsed.allowUnsafe = true;
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (!arg.startsWith("--") && !parsed.input) {
      parsed.input = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  return parsed;
}

let parsedArgs;
try {
  parsedArgs = parseArgs(args);
} catch (error) {
  console.error(`[error] ${error.message}`);
  usage();
  process.exit(1);
}

if (!parsedArgs.input || parsedArgs.help) {
  usage();
  process.exit(parsedArgs.input ? 0 : 1);
}

const inputPath = path.resolve(parsedArgs.input);
const outputPath = parsedArgs.out
  ? path.resolve(parsedArgs.out)
  : path.join(path.dirname(inputPath), `${path.basename(inputPath, path.extname(inputPath))}.preview.html`);

if (!fs.existsSync(inputPath)) {
  console.error(`[error] File not found: ${inputPath}`);
  process.exit(1);
}

const svg = fs.readFileSync(inputPath, "utf8");
const unsafeFeatures = findUnsafeSvgFeatures(svg);
if (unsafeFeatures.length && !parsedArgs.allowUnsafe) {
  console.error("[error] Refusing to embed active SVG content in an HTML preview:");
  for (const feature of unsafeFeatures) console.error(`- ${feature}`);
  console.error("Use --allow-unsafe only when the SVG is trusted and active content is intentional.");
  process.exit(2);
}

const audit = auditSvg(svg);
if (unsafeFeatures.length) audit.errors.push(...unsafeFeatures.map((item) => `Unsafe content allowed: ${item}`));
const html = buildPreview(svg, inputPath, audit);

fs.writeFileSync(outputPath, html, "utf8");

console.log(`[ok] Wrote ${outputPath}`);
if (audit.errors.length) {
  console.log("\nErrors:");
  for (const error of audit.errors) console.log(`- ${error}`);
}
if (audit.warnings.length) {
  console.log("\nWarnings:");
  for (const warning of audit.warnings) console.log(`- ${warning}`);
} else {
  console.log("No lightweight audit warnings.");
}
if (parsedArgs.strict && audit.errors.length) process.exitCode = 2;

function findUnsafeSvgFeatures(source) {
  const findings = [];
  if (/<script\b/i.test(source)) findings.push("script tag present");
  if (/\bon[a-z]+\s*=/i.test(source)) findings.push("inline event-handler attribute present");
  if (/\b(?:href|xlink:href)\s*=\s*["']\s*javascript:/i.test(source)) {
    findings.push("javascript: URL present");
  }
  if (/<(?:iframe|object|embed|foreignObject)\b/i.test(source)) {
    findings.push("embedded HTML or external-object element present");
  }
  return findings;
}

function auditSvg(source) {
  const errors = [];
  const warnings = [];
  const rootMatch = source.match(/<svg\b([^>]*)>/i);
  const rootAttrs = rootMatch ? parseAttrs(rootMatch[1]) : {};

  if (!rootMatch) errors.push("No root <svg> element found.");
  if (!rootAttrs.viewBox) warnings.push("Missing root viewBox. Responsive scaling and clipping are harder to reason about.");
  if (!rootAttrs.width) warnings.push("Missing root width. Fixed-size exports may render unpredictably in some wrappers.");
  if (!rootAttrs.height) warnings.push("Missing root height. Fixed-size exports may render unpredictably in some wrappers.");
  if (!/<title\b/i.test(source) && !/aria-label=/i.test(source) && !/role=["']img["']/i.test(source)) {
    warnings.push("No <title>, aria-label, or role=\"img\" found for meaningful standalone accessibility.");
  }
  const ids = collectAll(source, /\bid=["']([^"']+)["']/gi);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  for (const id of duplicates) errors.push(`Duplicate id "${id}" can break gradients, clips, masks, or embedded SVG instances.`);

  const idSet = new Set(ids);
  const refs = [
    ...collectAll(source, /url\(#([^)]+)\)/gi),
    ...collectAll(source, /\b(?:href|xlink:href)=["']#([^"']+)["']/gi)
  ];
  for (const ref of refs) {
    if (!idSet.has(ref)) errors.push(`Reference "#${ref}" has no matching id.`);
  }

  if (/<foreignObject\b/i.test(source)) warnings.push("foreignObject limits portability. Use only when the target renderer supports it.");
  if (/<clipPath\b/i.test(source)) warnings.push("clipPath present. Verify it is intentional and sized to the visible content.");
  if (/<mask\b/i.test(source)) warnings.push("mask present. Verify mask bounds and ID uniqueness.");

  const filterTags = source.match(/<filter\b[^>]*>/gi) ?? [];
  for (const tag of filterTags) {
    const attrs = parseAttrs(tag);
    if (!attrs.x || !attrs.y || !attrs.width || !attrs.height) {
      warnings.push("A filter is missing explicit x/y/width/height. Shadows or glows may be clipped.");
      break;
    }
  }

  const viewBox = parseViewBox(rootAttrs.viewBox);
  if (rootAttrs.viewBox && !viewBox) errors.push("Root viewBox must contain four finite numbers with positive width and height.");
  if (viewBox) {
    const outOfBounds = findLikelyOutOfBounds(source, viewBox);
    for (const item of outOfBounds.slice(0, 6)) warnings.push(item);
    if (outOfBounds.length > 6) warnings.push(`${outOfBounds.length - 6} more possible out-of-viewBox coordinates omitted.`);
  }

  return { rootAttrs, errors, warnings };
}

function parseAttrs(raw) {
  const attrs = {};
  const pairs = raw.matchAll(/([\w:-]+)=["']([^"']*)["']/g);
  for (const pair of pairs) attrs[pair[1]] = pair[2];
  return attrs;
}

function collectAll(source, regex) {
  return [...source.matchAll(regex)].map((match) => match[1]);
}

function parseViewBox(value) {
  if (!value) return null;
  const parts = value.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return null;
  const [minX, minY, width, height] = parts;
  if (width <= 0 || height <= 0) return null;
  return { minX, minY, maxX: minX + width, maxY: minY + height };
}

function findLikelyOutOfBounds(source, viewBox) {
  const warnings = [];
  const coordAttrs = source.matchAll(/\b(x|x1|x2|cx|y|y1|y2|cy)=["'](-?\d+(?:\.\d+)?)["']/gi);
  for (const match of coordAttrs) {
    const attr = match[1];
    const value = Number(match[2]);
    const isX = attr.startsWith("x") || attr === "cx";
    const min = isX ? viewBox.minX : viewBox.minY;
    const max = isX ? viewBox.maxX : viewBox.maxY;
    if (value < min || value > max) warnings.push(`${attr}="${value}" is outside the root viewBox range ${min}..${max}.`);
  }
  return warnings;
}

function buildPreview(source, inputPathForLabel, audit) {
  const escapedPath = escapeHtml(inputPathForLabel);
  const escapedErrors = audit.errors.length
    ? audit.errors.map((error) => `<li>${escapeHtml(error)}</li>`).join("\n")
    : "<li>No structural audit errors.</li>";
  const escapedWarnings = audit.warnings.length
    ? audit.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("\n")
    : "<li>No lightweight audit warnings.</li>";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' data: blob: file:; style-src 'unsafe-inline'; font-src 'self' data: file:">
  <title>SVG Preview: ${escapeHtml(path.basename(inputPathForLabel))}</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f4f4f0;
      color: #191919;
    }
    body {
      margin: 0;
      padding: 24px;
    }
    header {
      max-width: 1180px;
      margin: 0 auto 18px;
    }
    h1 {
      margin: 0 0 6px;
      font-size: 20px;
      line-height: 1.2;
    }
    p {
      margin: 0;
      color: #5f625d;
      font-size: 13px;
    }
    main {
      max-width: 1180px;
      margin: 0 auto;
      display: grid;
      gap: 16px;
    }
    .panel {
      border: 1px solid #c9cbc4;
      background: #ffffff;
      border-radius: 8px;
      overflow: auto;
    }
    .panel h2 {
      margin: 0;
      padding: 10px 12px;
      border-bottom: 1px solid #d8dad2;
      font-size: 13px;
      line-height: 1.2;
      background: #eeeee8;
    }
    .surface {
      padding: 16px;
      min-height: 160px;
    }
    .checker {
      background-color: #fff;
      background-image:
        linear-gradient(45deg, #dfe1da 25%, transparent 25%),
        linear-gradient(-45deg, #dfe1da 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #dfe1da 75%),
        linear-gradient(-45deg, transparent 75%, #dfe1da 75%);
      background-position: 0 0, 0 8px, 8px -8px, -8px 0;
      background-size: 16px 16px;
    }
    .dark {
      background: #181b1f;
    }
    .fit svg {
      width: 100%;
      height: auto;
    }
    .outline svg * {
      outline: 1px solid rgba(255, 0, 0, 0.32);
    }
    ul {
      margin: 0;
      padding: 12px 28px 16px;
      font-size: 13px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <header>
    <h1>SVG Preview</h1>
    <p>${escapedPath}</p>
  </header>
  <main>
    <section class="panel">
      <h2>Light checkerboard, intrinsic size</h2>
      <div class="surface checker">${source}</div>
    </section>
    <section class="panel">
      <h2>Fit width</h2>
      <div class="surface checker fit">${source}</div>
    </section>
    <section class="panel">
      <h2>Dark background</h2>
      <div class="surface dark fit">${source}</div>
    </section>
    <section class="panel">
      <h2>Element outline pass</h2>
      <div class="surface checker fit outline">${source}</div>
    </section>
    <section class="panel">
      <h2>Lightweight audit</h2>
      <ul>${escapedErrors}</ul>
      <ul>${escapedWarnings}</ul>
    </section>
  </main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
