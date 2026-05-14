# Goal Contract Template

Use this template for a durable instruction file referenced by a short `/goal` prompt. Delete unused placeholder text before delivering the file.

```markdown
# <Goal Title>

## Objective

<One durable objective. Keep it bigger than a single prompt and smaller than an open-ended backlog.>

## Baseline

- Starting point: <commit SHA, failing command, current score, current behavior, known gap list, or artifact>
- Baseline date/context: <optional>
- Initial materials to inspect:
  - <file, directory, issue, log, screenshot, plan, or doc>

## Scope

In scope:

- <specific area Codex may edit or evaluate>

Out of scope:

- <specific area Codex must not change>

## Stop Condition

Stop only when all of the following are true:

1. <measurable end state>
2. <validation command or artifact confirms the end state>
3. <regression or rollback condition remains satisfied, if relevant>

If the stop condition cannot be reached after <N> focused attempts or because a required decision/credential/system is missing, pause and report the blocker with evidence.

## Validation Loop

Use this loop until the stop condition is satisfied or a pause condition is hit:

1. Re-read the relevant source material before each checkpoint.
2. Identify the smallest next gap to close.
3. Make scoped changes only for that checkpoint.
4. Run or inspect the validation commands/artifacts below.
5. Record a short progress entry.
6. Choose the next checkpoint from the remaining verified gaps.

Validation commands/artifacts:

- `<command or artifact>` proves <what it proves>.
- `<command or artifact>` proves <what it proves>.

## Checkpoints

- Checkpoint 1: <first concrete audit or implementation step>
- Checkpoint 2: <next likely step>
- Continue with similarly scoped checkpoints until the stop condition is met.

## Progress Log

After each checkpoint, append a concise entry with:

- Checkpoint name
- Changes made
- Validation run and result
- Remaining gaps
- Blocked status, if any

## Pause Conditions

Pause and ask for guidance if:

- The next step would require destructive changes or broad rewrites outside scope.
- Required credentials, services, or dependencies are unavailable.
- Validation fails repeatedly for the same reason after scoped attempts.
- The stop condition appears wrong, stale, or contradictory.
- A product/design decision is needed before progress can continue.

## Working Rules

- Preserve unrelated user changes.
- Prefer local patterns over new abstractions.
- Keep changes scoped to the objective and current checkpoint.
- Verify before claiming completion.
- Keep progress reports short and evidence-based.
```
