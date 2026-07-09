#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const registryPath = path.join(root, "registry.json");
const pluginManifestPath = path.join(root, ".codex-plugin", "plugin.json");
const marketplacePath = path.join(root, ".agents", "plugins", "marketplace.json");
const skillNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const semverPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

let failed = false;

function fail(message) {
  failed = true;
  console.error(`[error] ${message}`);
}

function pass(message) {
  console.log(`[ok] ${message}`);
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label}: ${error.message}`);
    return null;
  }
}

function parseFrontMatter(content, label) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    fail(`${label}: SKILL.md must start with closed YAML frontmatter.`);
    return null;
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (/^\s/.test(line)) {
      fail(`${label}: frontmatter must use only top-level name and description fields.`);
      continue;
    }

    const index = line.indexOf(":");
    if (index === -1) {
      fail(`${label}: invalid frontmatter line "${line}".`);
      continue;
    }

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (Object.hasOwn(data, key)) fail(`${label}: duplicate frontmatter field "${key}".`);
    data[key] = value;
  }

  const unknown = Object.keys(data).filter((key) => !["name", "description"].includes(key));
  if (unknown.length) fail(`${label}: unsupported frontmatter fields: ${unknown.join(", ")}.`);

  return { data, body: content.slice(match[0].length) };
}

function getQuotedYamlValue(content, key) {
  const match = content.match(new RegExp(`^\\s{2}${key}:\\s+"([^"]+)"\\s*$`, "m"));
  return match?.[1] ?? null;
}

function validateResourceReferences(skillName, skillDir, content) {
  const references = new Set(
    [...content.matchAll(/\b(?:references|scripts|assets)\/[A-Za-z0-9._/-]+/g)].map((match) =>
      match[0].replace(/[.,;:]+$/, "")
    )
  );

  for (const reference of references) {
    const resolved = path.resolve(skillDir, reference);
    if (!resolved.startsWith(`${skillDir}${path.sep}`)) {
      fail(`${skillName}: resource reference escapes the skill directory: ${reference}.`);
    } else if (!fs.existsSync(resolved)) {
      fail(`${skillName}: referenced resource does not exist: ${reference}.`);
    }
  }
}

function validateAgentMetadata(skillName, agentPath) {
  if (!fs.existsSync(agentPath)) {
    fail(`${skillName}: missing agents/openai.yaml.`);
    return;
  }

  const content = fs.readFileSync(agentPath, "utf8");
  if (!/^interface:\s*$/m.test(content)) fail(`${skillName}: agents/openai.yaml is missing interface metadata.`);
  if (/\[TODO:|TODO\b/.test(content)) fail(`${skillName}: agents/openai.yaml contains a TODO placeholder.`);

  const displayName = getQuotedYamlValue(content, "display_name");
  const shortDescription = getQuotedYamlValue(content, "short_description");
  const defaultPrompt = getQuotedYamlValue(content, "default_prompt");

  if (!displayName) fail(`${skillName}: interface.display_name must be a quoted non-empty string.`);
  if (!shortDescription) {
    fail(`${skillName}: interface.short_description must be a quoted non-empty string.`);
  } else if (shortDescription.length < 25 || shortDescription.length > 64) {
    fail(`${skillName}: interface.short_description must be 25-64 characters (found ${shortDescription.length}).`);
  }
  if (!defaultPrompt) {
    fail(`${skillName}: interface.default_prompt must be a quoted non-empty string.`);
  } else if (!defaultPrompt.includes(`$${skillName}`)) {
    fail(`${skillName}: interface.default_prompt must explicitly mention $${skillName}.`);
  }
}

function validateReadme(skillName, readmePath) {
  if (!fs.existsSync(readmePath)) {
    fail(`${skillName}: missing standalone README.md.`);
    return;
  }

  const content = fs.readFileSync(readmePath, "utf8");
  if (!content.includes("$HOME/.agents/skills")) {
    fail(`${skillName}: README.md must use the current user-level $HOME/.agents/skills path.`);
  }
  if (!/(?:^|\s)\.agents\/skills/m.test(content)) {
    fail(`${skillName}: README.md must document repository-level .agents/skills installation.`);
  }
  if (content.includes(".codex/skills")) {
    fail(`${skillName}: README.md still contains the legacy .codex/skills path.`);
  }
}

if (!fs.existsSync(skillsDir)) fail("Missing skills/ directory.");
if (!fs.existsSync(registryPath)) fail("Missing registry.json.");

const skillNames = fs.existsSync(skillsDir)
  ? fs
      .readdirSync(skillsDir)
      .filter((entry) => fs.statSync(path.join(skillsDir, entry)).isDirectory())
      .sort()
  : [];

for (const skillName of skillNames) {
  const skillDir = path.join(skillsDir, skillName);
  const skillPath = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillPath)) {
    fail(`${skillName}: missing SKILL.md.`);
    continue;
  }

  const content = fs.readFileSync(skillPath, "utf8");
  const parsed = parseFrontMatter(content, skillName);
  if (!parsed) continue;

  const { name, description } = parsed.data;
  if (!name) fail(`${skillName}: missing frontmatter name.`);
  if (!description) fail(`${skillName}: missing frontmatter description.`);
  if (name !== skillName) fail(`${skillName}: frontmatter name must match the folder name.`);
  if (name && (name.length > 64 || !skillNamePattern.test(name))) {
    fail(`${skillName}: name must be at most 64 characters using lowercase letters, digits, and single hyphens.`);
  }
  if (description && (description.length > 1024 || !/\buse\b[\s\S]*\bwhen\b/i.test(description))) {
    fail(`${skillName}: description must be at most 1024 characters and explicitly state when to use the skill.`);
  }
  if (!parsed.body.trim()) fail(`${skillName}: SKILL.md body is empty.`);
  if (content.split(/\r?\n/).length > 500) fail(`${skillName}: SKILL.md exceeds the 500-line progressive-disclosure limit.`);
  if (/\[TODO:|TODO\b/.test(content)) fail(`${skillName}: SKILL.md contains a TODO placeholder.`);

  validateResourceReferences(skillName, skillDir, content);
  validateAgentMetadata(skillName, path.join(skillDir, "agents", "openai.yaml"));
  validateReadme(skillName, path.join(skillDir, "README.md"));
  pass(`${skillName}: skill, UI metadata, resources, and install docs validated.`);
}

const registry = fs.existsSync(registryPath) ? readJson(registryPath, "registry.json") : null;
if (registry) {
  const entries = Array.isArray(registry.skills) ? registry.skills : [];
  if (!Array.isArray(registry.skills)) fail("registry.json: skills must be an array.");

  const registryNames = entries.map((entry) => entry.name);
  const duplicateNames = [...new Set(registryNames.filter((name, index) => registryNames.indexOf(name) !== index))];
  if (duplicateNames.length) fail(`registry.json: duplicate skill entries: ${duplicateNames.join(", ")}.`);

  for (const entry of entries) {
    if (!skillNames.includes(entry.name)) fail(`registry.json: unknown skill "${entry.name}".`);
    if (entry.path !== `skills/${entry.name}`) fail(`registry.json: ${entry.name} must use path "skills/${entry.name}".`);
    if (!semverPattern.test(entry.version ?? "")) fail(`registry.json: ${entry.name} must use a semantic version.`);
    if (typeof entry.description !== "string" || !entry.description.trim()) {
      fail(`registry.json: ${entry.name} needs a description.`);
    }
    if (!Array.isArray(entry.tags) || entry.tags.length === 0 || entry.tags.some((tag) => typeof tag !== "string" || !tag)) {
      fail(`registry.json: ${entry.name} needs non-empty string tags.`);
    }
  }

  const missing = skillNames.filter((name) => !registryNames.includes(name));
  if (missing.length) fail(`registry.json: missing skills: ${missing.join(", ")}.`);
  if (!missing.length && entries.length === skillNames.length) pass("registry.json: exact skill parity and metadata validated.");
}

const pluginManifest = fs.existsSync(pluginManifestPath)
  ? readJson(pluginManifestPath, ".codex-plugin/plugin.json")
  : (fail("Missing .codex-plugin/plugin.json."), null);
if (pluginManifest) {
  if (pluginManifest.name !== "skillbox") fail("plugin.json: name must be skillbox.");
  if (!semverPattern.test(pluginManifest.version ?? "")) fail("plugin.json: version must use semantic versioning.");
  if (pluginManifest.skills !== "./skills/") fail("plugin.json: skills must point to ./skills/.");
  if (!pluginManifest.author?.name) fail("plugin.json: author.name is required.");

  const ui = pluginManifest.interface;
  for (const field of ["displayName", "shortDescription", "longDescription", "developerName", "category"]) {
    if (typeof ui?.[field] !== "string" || !ui[field].trim()) fail(`plugin.json: interface.${field} is required.`);
  }
  if (!Array.isArray(ui?.capabilities) || ui.capabilities.length === 0) {
    fail("plugin.json: interface.capabilities must be a non-empty array.");
  }
  if (!Array.isArray(ui?.defaultPrompt) || ui.defaultPrompt.length === 0 || ui.defaultPrompt.length > 3) {
    fail("plugin.json: interface.defaultPrompt must contain 1-3 prompts.");
  } else if (ui.defaultPrompt.some((prompt) => typeof prompt !== "string" || !prompt.trim() || prompt.length > 128)) {
    fail("plugin.json: every default prompt must be a non-empty string of at most 128 characters.");
  }
  pass("plugin.json: plugin identity, skill path, and interface metadata validated.");
}

const marketplace = fs.existsSync(marketplacePath)
  ? readJson(marketplacePath, ".agents/plugins/marketplace.json")
  : (fail("Missing .agents/plugins/marketplace.json."), null);
if (marketplace) {
  const entry = marketplace.plugins?.find((plugin) => plugin.name === "skillbox");
  if (marketplace.name !== "skillbox") fail("marketplace.json: name must be skillbox.");
  if (!marketplace.interface?.displayName) fail("marketplace.json: interface.displayName is required.");
  if (!entry) {
    fail("marketplace.json: missing skillbox plugin entry.");
  } else {
    if (entry.source?.source !== "local" || entry.source?.path !== "./") {
      fail("marketplace.json: skillbox must use the repository root as its local source.");
    }
    if (!['AVAILABLE', 'INSTALLED_BY_DEFAULT', 'NOT_AVAILABLE'].includes(entry.policy?.installation)) {
      fail("marketplace.json: invalid policy.installation value.");
    }
    if (!['ON_INSTALL', 'ON_USE'].includes(entry.policy?.authentication)) {
      fail("marketplace.json: invalid policy.authentication value.");
    }
    if (!entry.category) fail("marketplace.json: skillbox entry needs a category.");
  }
  pass("marketplace.json: repository plugin entry and policies validated.");
}

const templateFiles = [
  "templates/skill/SKILL.md",
  "templates/skill/README.md",
  "templates/skill/agents/openai.yaml",
  "templates/skill/references/checklist.md",
  "templates/skill/examples/prompt.md"
];
for (const relativePath of templateFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) fail(`Missing ${relativePath}.`);
}
const templateAgentPath = path.join(root, "templates", "skill", "agents", "openai.yaml");
if (fs.existsSync(templateAgentPath)) {
  const templateAgent = fs.readFileSync(templateAgentPath, "utf8");
  if (!templateAgent.includes("$skill-name")) fail("Skill template default prompt must mention $skill-name.");
}
pass("Skill template: required authoring and UI metadata files found.");

if (failed) process.exit(1);
console.log(`\nAll ${skillNames.length} skills and the Skillbox plugin passed validation.`);
