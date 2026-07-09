---
name: remotion-prompts
description: Draft, critique, or improve agent-ready prompts for Remotion marketing videos, launch videos, product demos, social ads, motion-graphics promos, lower-thirds, captions, and reusable parameterized video templates. Use when the user wants better Remotion prompts, scene/storyboard structure, marketing-video best practices, or a prompt that another coding agent can turn into Remotion code.
---

# Remotion Prompts

## Core Workflow

Turn rough video ideas into production briefs that can be implemented in Remotion. Prefer concrete scene direction over vague style words.

1. Identify the video job.
   - Product demo, launch video, paid social ad, founder-style walkthrough, lower-third overlay, feature highlight, testimonial/proof video, or reusable template.
   - Capture platform, aspect ratio, duration, fps, audience, goal, CTA, brand assets, music/voiceover, and proof claims.
   - Verify supplied assets, UI states, product claims, and platform constraints. Browse current official sources when the request depends on changing platform specifications or trends.
   - When the delivery platform is unspecified, label safe-area and format choices as conservative assumptions instead of presenting exact values as current platform requirements.

2. Pick a marketing structure.
   - Default SaaS/product structure: hook -> problem -> product reveal -> feature proof -> outcome -> CTA.
   - Default social ad structure: first-frame pattern interrupt -> proposition in first 3 seconds -> proof/demo -> CTA.
   - Default founder demo structure: customer problem -> live product workflow -> before/after result -> CTA.

3. Write a scene-by-scene storyboard.
   - Specify timestamps and frame counts at the chosen fps; default to 30fps only when the user or target format does not require another cadence.
   - Name exact UI states, product moments, copy, visible assets, and transitions.
   - Keep each scene's main job singular. Do not overload a scene with multiple unrelated effects.

4. Add Remotion implementation direction.
   - Require `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, clamped ranges, `Sequence`/`Series`, and `TransitionSeries` where appropriate.
   - Mention `spring()` only when physical settling, press feedback, or card/logo emphasis is needed.
   - For reusable videos, ask for Zod schema/default props for text, colors, assets, CTA, and scene timings.
   - Ask for `staticFile()` for repository assets and `calculateMetadata()` when props determine duration, dimensions, fps, or asynchronously resolved content.
   - Avoid CSS animations, nondeterministic randomness, tiny unreadable UI, generic stock visuals, and product claims not supported by supplied evidence.

5. Add review gates.
   - Ask the implementing agent to preview in Remotion Studio and render stills around the hook, middle proof scene, and CTA.
   - Ask for a full render or representative frame range before delivery when the task includes implementation, and check captions, audio timing, safe zones, and final-frame hold.
   - For ads, ask for 3-5 meaningfully different creative variants, not tiny copy-only changes.

## Output Shape

Return:

1. A ready-to-paste Remotion prompt.
2. Short assumptions or missing inputs.
3. Optional variant prompts when useful.

Do not give generic advice before the prompt unless the user asked for strategy first.

## Prompt Skeleton

```text
Create a Remotion marketing video for [product].

Goal:
[Audience] should understand [problem], [main product benefit], and [CTA].

Format:
- Aspect ratio/resolution: [platform-specific]
- FPS: [30 unless the target requires another cadence]
- Duration: [seconds]
- Style: [specific production style]
- Audio: [music/voiceover/sfx]
- Assets: [logos/screenshots/product URL/colors/fonts]

Story:
Scene 1 - Hook ([seconds] / [frames]):
[On-screen visual, copy, and motion.]

Scene 2 - Problem ([seconds] / [frames]):
[On-screen visual, copy, and motion.]

Scene 3 - Product reveal ([seconds] / [frames]):
[Actual UI/product moment, copy, and motion.]

Scene 4 - Proof/features ([seconds] / [frames]):
[2-3 concrete feature beats with real-looking states.]

Scene 5 - Outcome ([seconds] / [frames]):
[Before/after, proof metric, testimonial, or workflow result.]

Scene 6 - CTA ([seconds] / [frames]):
[CTA, URL, final brand mark.]

Motion and implementation:
Use Remotion best practices. Drive all animation from frames using `useCurrentFrame()` and `useVideoConfig()`. Use `interpolate()` with clamped ranges and intentional easing. Use `Sequence`/`Series`/`TransitionSeries` for timeline structure. Keep text readable, preserve product UI credibility, and avoid CSS animations.

Verification:
Preview in Remotion Studio and render stills at the hook, middle proof scene, and CTA.
```

## Reference Routing

- For real prompt patterns from Remotion examples, read `references/remotion-prompt-patterns.md`.
- For marketing/ad best practices and research rules, read `references/marketing-video-best-practices.md`.
- When implementation code is requested, also use the Remotion best-practices skill or the current official `remotion-dev/skills` guidance and load only the relevant rule files.
