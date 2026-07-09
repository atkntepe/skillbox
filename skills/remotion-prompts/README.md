# remotion-prompts

Guidance for turning rough product, launch, or social-ad ideas into agent-ready Remotion marketing-video prompts.

## What it includes

- A workflow for choosing the video job, marketing structure, storyboard, Remotion implementation direction, and review gates
- A reusable prompt skeleton with scene timing, frame counts, product/UI direction, motion constraints, and verification steps
- `references/remotion-prompt-patterns.md` for product demo, launch video, CTA overlay, and promo prompt patterns
- `references/marketing-video-best-practices.md` for platform-aware creative rules and Remotion-specific prompt constraints

## Use this skill when

- Drafting a Remotion prompt for a marketing video, launch video, product demo, or social ad
- Critiquing a vague Remotion video prompt before handing it to a coding agent
- Converting a rough product idea into a scene-by-scene storyboard
- Creating prompts for reusable, parameterized Remotion templates
- Adding ad-oriented hooks, proof scenes, captions, variants, or CTA structure

## Avoid using this skill when

- The user only needs Remotion implementation code and already has a clear storyboard
- The task is a generic text-to-video prompt with no Remotion implementation target
- The request is static visual design with no video, motion, or storyboard component

## Example prompt

```text
Use $remotion-prompts to draft a 30-second Remotion launch-video prompt for this SaaS product: [paste product, audience, assets, and CTA].
```

## Install

```sh
mkdir -p "$HOME/.agents/skills"
cp -R skills/remotion-prompts "$HOME/.agents/skills/remotion-prompts"
```

For project-local usage:

```sh
mkdir -p .agents/skills
cp -R skills/remotion-prompts .agents/skills/remotion-prompts
```
