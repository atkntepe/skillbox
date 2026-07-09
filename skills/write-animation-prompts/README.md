# write-animation-prompts

Guidance for turning rough animation ideas into precise prompts for AI video tools, motion direction, UI microinteractions, product demos, animated storyboards, and kinetic typography.

## What it includes

- A workflow for identifying the output target, motion job, timing, easing, camera or viewport behavior, and constraints
- Prompt anatomy for rewriting vague motion requests into usable animation direction
- Example rewrites for product UI reveals, dashboard metric updates, and shared element transitions
- `references/motion-vocabulary.md` for entrances, exits, sequencing, transforms, state transitions, interaction feedback, easing, physics, ambient loops, visual effects, camera language, performance, and reduced motion

## Use this skill when

- Drafting or improving an animation prompt
- Translating vague motion feedback into concrete direction
- Choosing vocabulary for easing, sequencing, transitions, camera movement, or interaction feedback
- Adding constraints for readability, reduced motion, loops, or implementation
- Critiquing an existing animation prompt before sending it to a model or designer

## Avoid using this skill when

- The user is asking to implement animation code rather than write the prompt
- The task is static visual design with no motion direction
- The prompt only needs general copyediting and not motion-specific vocabulary

## Example prompt

```text
Use $write-animation-prompts to turn this rough idea into a precise animation prompt: make the pricing cards reveal in a premium way.
```

## Install

```sh
mkdir -p "$HOME/.agents/skills"
cp -R skills/write-animation-prompts "$HOME/.agents/skills/write-animation-prompts"
```

For project-local usage:

```sh
mkdir -p .agents/skills
cp -R skills/write-animation-prompts .agents/skills/write-animation-prompts
```
