# write-codex-goal

Guidance for preparing durable Codex `/goal` instruction files and the short slash command that points at them.

## Use this skill when

- Drafting a Codex `/goal` prompt
- Writing a goal instruction Markdown file
- Defining a long-running objective with checkpoints
- Setting stop conditions, validation loops, pause conditions, or progress logging rules
- Preparing background-task instructions for Codex CLI goals

## Avoid using this skill when

- The work is a loose backlog rather than one durable objective
- The stop condition cannot be verified
- The task needs frequent product decisions before the next step is knowable
- The user only wants a one-off prompt or ordinary task plan

## Install

```sh
mkdir -p ~/.agents/skills
cp -R skills/write-codex-goal ~/.agents/skills/write-codex-goal
```

For project-local usage:

```sh
mkdir -p .agents/skills
cp -R skills/write-codex-goal .agents/skills/write-codex-goal
```
