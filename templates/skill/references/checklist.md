# Skill Checklist

- Front matter includes `name` and `description`
- Folder name matches the front matter `name`
- `name` uses lowercase letters, digits, and single hyphens and is at most 64 characters
- `description` states what the skill does, when it triggers, and its nearest boundary
- Instructions are imperative, concise, and focused on non-obvious expertise
- Optional resources are only included when they support the workflow
- Referenced resources exist and are loaded only when relevant
- `agents/openai.yaml` matches the skill and its default prompt mentions `$skill-name`
- Validation steps name what each check proves
