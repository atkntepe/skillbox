# skillbox

Reusable agent skills for Codex.

Each skill lives in its own folder under `skills/`, with a required `SKILL.md` and a small `README.md`. Skills are meant to be copied, installed, or packaged independently.

## Skills

| Skill | Description |
| --- | --- |
| `frontend-design` | Frontend UI design and implementation guidance for polished, production-ready interfaces. |
| `figma-editable-layouts` | Guidance for creating editable, designer-friendly Figma layouts with auto layout and clean layer structure. |
| `humanize-documentation` | Guidance for rewriting technical documentation so it feels natural, precise, maintainer-written, and useful. |
| `svg-design` | Guidance and lightweight tooling for creating, converting, and debugging SVG mockups without overlap, clipping, or scaling issues. |
| `write-animation-prompts` | Guidance for writing precise animation prompts with motion vocabulary, timing, sequencing, and constraints. |
| `write-codex-goal` | Guidance for preparing durable Codex `/goal` instruction files and slash prompts. |

The same list is tracked in `registry.json` so scripts and humans can discover the available skills from one place.

## Structure

```txt
skills/
  frontend-design/
    SKILL.md
    README.md
    references/
    examples/
  figma-editable-layouts/
    SKILL.md
    README.md
    agents/
  humanize-documentation/
    SKILL.md
    README.md
  svg-design/
    SKILL.md
    README.md
    agents/
    references/
    scripts/
  write-animation-prompts/
    SKILL.md
    README.md
    agents/
    references/
  write-codex-goal/
    SKILL.md
    README.md
    references/
```

Optional folders such as `references/`, `examples/`, `assets/`, `scripts/`, and `agents/` belong inside the skill folder that uses them.

## Install

Clone the repository:

```sh
git clone https://github.com/atkntepe/skillbox.git
cd skillbox
```

Copy the skill you want into your user-level Codex skills directory:

```sh
mkdir -p ~/.codex/skills
cp -R skills/frontend-design ~/.codex/skills/frontend-design
```

Replace `frontend-design` with any skill folder name from the table above. Restart Codex after installing a new skill so it can load the updated skill list.

## Validate

```sh
npm run validate
```

Validation checks that every folder in `skills/` has `SKILL.md`, has `README.md`, has required frontmatter, uses a frontmatter `name` that matches the folder name, and is listed in `registry.json`.

## Package

```sh
npm run package
```

Packaging writes one zip file per skill to `dist/` and uses the system `zip` command.

To run both validation and packaging:

```sh
npm run build
```

## Add a Skill

1. Create `skills/<skill-name>/`.
2. Add `SKILL.md` with `name` and `description` frontmatter.
3. Add a short `README.md` with use cases and install instructions.
4. Add the skill to `registry.json`.
5. Run `npm run validate`.
