---
name: write-codex-goal
description: Use when the user wants to draft or revise a Codex `/goal` prompt, goal instruction Markdown file, durable long-running objective, stopping condition, validation loop, checkpoint plan, progress contract, or background-task brief. Apply when work should persist across many turns with measurable completion; do not use for one-off prompts, loose backlogs, or tasks whose next step depends on frequent unresolved product decisions.
---

# Write Codex Goal

## Overview

Create a two-part goal package for long-running Codex work: a durable instruction Markdown file plus a short `/goal` prompt that points at it.

Use the Markdown file as the contract. Keep the slash command small enough to paste and stable enough to survive context compaction.

## Fit Check

Use `/goal` only when the work has:

- One durable objective, not a loose backlog.
- A verifiable stop condition.
- A validation loop Codex can run or inspect.
- Enough scope for independent checkpointed progress.

Do not create a goal for unrelated task lists, vague improvement requests, or work that needs frequent product decisions before the next step is knowable.

## Workflow

1. Capture the objective, baseline, source files/docs/issues, constraints, non-goals, validation commands, stop condition, checkpoint rhythm, and pause conditions.
2. If the objective or stop condition is unknowable, ask before writing. Otherwise infer conservative defaults and mark them explicitly.
3. Write the goal file near the work it governs. Prefer an existing package or feature docs folder; otherwise use `docs/<slug>-goal.md`. Do not overwrite an existing goal file without reading it first.
4. Use `references/goal-contract-template.md` for the goal file structure when a new file is needed.
5. Return a concise `/goal` prompt that references the file instead of repeating the whole contract.
6. Do not start or set the goal unless the user asked for that. Usually the deliverable is the file path plus the command to paste.
7. Add a token budget only when the user explicitly requests one. Do not invent a budget as a proxy for a real stop condition.

## Goal File Rules

- Name exactly one objective and one primary stopping condition.
- Include the baseline: commit SHA, failing tests, current score, known gap list, or starting artifact.
- Point Codex at the files, docs, issue, logs, screenshots, or plan it must read first.
- Define validation commands or artifacts, including what each proves.
- Require checkpoints with short progress log entries: current checkpoint, changes made, verification run, remaining gaps, and blocked status.
- State non-goals and edit boundaries so the run does not sprawl.
- State when to pause or ask for help, especially for destructive changes, missing credentials, ambiguous product decisions, or repeated validation failures.
- Keep status language concrete. Replace "improve as much as possible" with measurable thresholds or an explicit exhaustion rule.

## Slash Prompt Shape

Prefer:

```text
/goal Follow the instructions in <relative-goal-file>. Starting from baseline <baseline>, <work loop> until the instruction file's stop condition is satisfied.
```

Use the user's style when present. For example:

```text
/goal Follow the instructions in packages/components/scheduler/docs/react-scheduler-quality-parity-goal.md. Starting from baseline 372564578, continuously audit and improve React Scheduler parity with Vue Scheduler until the instruction file's stop condition is satisfied.
```

## Goal Lifecycle

Current Codex builds expose goals as a stable long-running task surface. Keep the durable objective in the goal file and use lifecycle controls for state, not as substitutes for acceptance criteria.

Useful controls:

- `/goal <objective>` creates or replaces the goal when allowed.
- `/goal` views the current goal.
- `/goal edit` revises the objective.
- `/goal pause` and `/goal resume` suspend or continue work without changing the objective.
- `/goal clear` abandons and removes the current goal.

Only mark a goal complete when every required stop condition is satisfied. Use blocked status only for a genuine impasse that cannot be resolved through further in-scope work; do not use it merely because the work is difficult, slow, or incomplete.

## Output Format

When asked to prepare a goal, provide:

- The created or updated goal file path.
- The exact `/goal` command.
- Any assumptions that affect the stop condition or validation loop.
