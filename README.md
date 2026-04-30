# skillbox

A small collection of reusable agent skills.

The current focus is Codex, but the repo is structured around portable skill folders so individual skills can be copied, installed, or packaged independently.

## Skills

| Skill | Description |
| --- | --- |
| `frontend-design` | Frontend UI design and implementation guidance for polished, production-ready interfaces. |

## Structure

```txt
skills/
  frontend-design/
    SKILL.md
    README.md
    references/
    examples/
```

Each folder inside `skills/` is intended to be standalone.

## Install a skill manually

Clone the repo:

```sh
git clone https://github.com/<your-username>/skillbox.git
cd skillbox
```

Copy a skill into your user-level Codex skills folder:

```sh
mkdir -p ~/.agents/skills
cp -R skills/frontend-design ~/.agents/skills/frontend-design
```

Or copy it into a project:

```sh
mkdir -p .agents/skills
cp -R skills/frontend-design .agents/skills/frontend-design
```

## Package skills

```sh
node scripts/package-skills.mjs
```

This creates zip files in `dist/`.

## Validate skills

```sh
node scripts/validate-skills.mjs
```
