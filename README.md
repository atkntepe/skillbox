# skillbox

A curated Codex plugin containing focused, reusable agent skills. Install the collection as one plugin or copy an individual skill into a user or repository skill directory.

## Skills

| Skill | Job |
| --- | --- |
| `frontend-design` | Design, implement, review, and polish production-ready frontend UI. |
| `figma-editable-layouts` | Create editable Figma layouts with auto layout, components, and clean layer structure. |
| `humanize-documentation` | Rewrite technical documentation in a precise, natural maintainer voice. |
| `remotion-prompts` | Draft agent-ready Remotion marketing-video prompts with storyboard and implementation direction. |
| `svg-design` | Create, convert, debug, and visually verify SVG assets and mockups. |
| `write-animation-prompts` | Turn rough motion ideas into precise animation prompts. |
| `write-codex-goal` | Prepare durable Codex goal contracts with measurable stop conditions. |

`registry.json` tracks the same collection for scripts and standalone packaging.

## Install the plugin

Add this repository as a Codex marketplace, then install the bundled plugin:

```sh
codex plugin marketplace add atkntepe/skillbox
codex plugin add skillbox@skillbox
```

Codex discovers the seven skills from the plugin manifest at `.codex-plugin/plugin.json`.

## Install one skill

Clone the repository and copy the required folder into the current user-level skill location:

```sh
git clone https://github.com/atkntepe/skillbox.git
cd skillbox
mkdir -p "$HOME/.agents/skills"
cp -R skills/frontend-design "$HOME/.agents/skills/frontend-design"
```

For repository-scoped use, copy the skill into `.agents/skills/` under the relevant repository root or parent directory. Codex detects skill changes automatically; restart it if a new or updated skill does not appear.

## Structure

```text
.codex-plugin/plugin.json          Plugin manifest
.agents/plugins/marketplace.json  Repository marketplace metadata
skills/<name>/SKILL.md             Trigger metadata and core workflow
skills/<name>/agents/openai.yaml   Codex UI metadata and starter prompt
skills/<name>/references/          On-demand supporting guidance
skills/<name>/scripts/             Deterministic helpers, when justified
templates/skill/                   Starting point for a new collection entry
registry.json                      Standalone skill catalog
```

Each skill also keeps a short `README.md` because standalone zip packages are intended to remain understandable outside the plugin.

## Validate

```sh
npm run validate
```

Validation checks skill metadata, naming, trigger descriptions, UI metadata, referenced resources, registry parity, template completeness, and plugin/marketplace structure.

## Package

```sh
npm run package
```

Packaging writes one zip per standalone skill plus `dist/skillbox-plugin.zip`.

Run both gates with:

```sh
npm run build
```

## Add or update a skill

1. Start from `templates/skill/` and replace every placeholder.
2. Keep `SKILL.md` focused on one reusable job and put trigger scope in its frontmatter description.
3. Add only the references, scripts, or assets the workflow needs.
4. Keep `agents/openai.yaml`, the standalone `README.md`, and `registry.json` synchronized.
5. Test scripts directly, run `npm run validate`, and forward-test complex workflow changes on a realistic task.
