# Contributing

Each skill should live in its own folder under `skills/`.

A skill must include:

- `SKILL.md`
- `README.md`
- `agents/openai.yaml`

Recommended optional folders:

- `references/`
- `examples/`
- `assets/`
- `scripts/`

Keep skills focused, composable, and easy to copy independently.

- Put the job, trigger contexts, and nearest boundary in the frontmatter `description`.
- Keep the body imperative and reserve it for non-obvious procedures, defaults, gotchas, and validation.
- Route detailed or conditional guidance through one-level-deep `references/` files.
- Add scripts only for repeated deterministic work, and test every new or changed script directly.
- Make `agents/openai.yaml` match the skill; its default prompt must explicitly mention `$skill-name`.
- Use `$HOME/.agents/skills` for user installation and `.agents/skills` for repository installation.
- Run `npm run validate` before submitting changes.
