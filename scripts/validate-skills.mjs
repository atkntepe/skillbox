#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const registryPath = path.join(root, "registry.json");

let failed = false;

function fail(message) {
  failed = true;
  console.error(`[error] ${message}`);
}

function pass(message) {
  console.log(`[ok] ${message}`);
}

function parseFrontMatter(content) {
  if (!content.startsWith("---")) return null;

  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;

  const raw = content.slice(3, end).trim();
  const data = {};

  for (const line of raw.split("\n")) {
    const index = line.indexOf(":");
    if (index === -1) continue;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
  }

  return data;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Could not parse ${path.relative(root, filePath)}: ${error.message}`);
    return { skills: [] };
  }
}

if (!fs.existsSync(skillsDir)) {
  fail("Missing skills/ directory.");
} else {
  pass("Found skills/ directory.");
}

if (!fs.existsSync(registryPath)) {
  fail("Missing registry.json.");
}

const registry = fs.existsSync(registryPath) ? readJson(registryPath) : { skills: [] };
const registrySkillNames = new Set((registry.skills ?? []).map((skill) => skill.name));

const skillNames = fs.existsSync(skillsDir)
  ? fs
      .readdirSync(skillsDir)
      .filter((entry) => fs.statSync(path.join(skillsDir, entry)).isDirectory())
      .sort()
  : [];

for (const skillName of skillNames) {
  const skillDir = path.join(skillsDir, skillName);
  const skillPath = path.join(skillDir, "SKILL.md");
  const readmePath = path.join(skillDir, "README.md");

  if (!fs.existsSync(skillPath)) {
    fail(`${skillName}: missing SKILL.md.`);
    continue;
  }

  pass(`${skillName}: found SKILL.md.`);

  if (!fs.existsSync(readmePath)) {
    fail(`${skillName}: missing README.md.`);
  } else {
    pass(`${skillName}: found README.md.`);
  }

  const content = fs.readFileSync(skillPath, "utf8");
  const frontMatter = parseFrontMatter(content);

  if (!frontMatter) {
    fail(`${skillName}: missing front matter.`);
    continue;
  }

  if (!frontMatter.name) {
    fail(`${skillName}: missing front matter name.`);
  }

  if (!frontMatter.description) {
    fail(`${skillName}: missing front matter description.`);
  }

  if (frontMatter.name && frontMatter.name !== skillName) {
    fail(`${skillName}: folder name does not match front matter name "${frontMatter.name}".`);
  }

  if (!registrySkillNames.has(skillName)) {
    fail(`${skillName}: missing from registry.json.`);
  } else {
    pass(`${skillName}: listed in registry.json.`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("\nAll skills passed validation.");
