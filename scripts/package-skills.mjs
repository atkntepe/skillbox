#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const distDir = path.join(root, "dist");

if (!fs.existsSync(skillsDir)) {
  console.error("Missing skills/ directory.");
  process.exit(1);
}

fs.mkdirSync(distDir, { recursive: true });

const skills = fs
  .readdirSync(skillsDir)
  .filter((entry) => fs.statSync(path.join(skillsDir, entry)).isDirectory())
  .sort();

for (const skill of skills) {
  const output = path.join(distDir, `${skill}.zip`);

  if (fs.existsSync(output)) {
    fs.rmSync(output);
  }

  const result = spawnSync("zip", ["-r", output, skill, "-x", "*.DS_Store"], {
    cwd: skillsDir,
    stdio: "inherit"
  });

  if (result.status !== 0) {
    console.error(`Failed to package ${skill}.`);
    process.exit(result.status ?? 1);
  }

  console.log(`Packaged ${path.relative(root, output)}`);
}

const pluginOutput = path.join(distDir, "skillbox-plugin.zip");
if (fs.existsSync(pluginOutput)) fs.rmSync(pluginOutput);

const pluginResult = spawnSync(
  "zip",
  [
    "-r",
    pluginOutput,
    ".codex-plugin",
    ".agents",
    "skills",
    "templates",
    "scripts",
    "package.json",
    "registry.json",
    "LICENSE",
    "README.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "-x",
    "*.DS_Store",
    "*/node_modules/*",
    "*/dist/*"
  ],
  {
    cwd: root,
    stdio: "inherit"
  }
);

if (pluginResult.status !== 0) {
  console.error("Failed to package the Skillbox plugin.");
  process.exit(pluginResult.status ?? 1);
}

console.log(`Packaged ${path.relative(root, pluginOutput)}`);
