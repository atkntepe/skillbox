---
name: write-animation-prompts
description: Use when drafting, rewriting, critiquing, or expanding AI prompts for animation, motion design, text-to-video, product demos, UI microinteractions, animated storyboards, kinetic typography, or any request where precise motion vocabulary, timing, easing, sequencing, camera movement, or transition language would improve the result.
---

# Write Animation Prompts

Write animation prompts as motion direction, not decorative adjectives. Name the subject, the intended change, the timing, the motion behavior, the camera or viewport relationship, and the constraints that keep the result usable.

## Workflow

1. Identify the output target.
   - Determine whether the prompt is for text-to-video, image-to-video, UI animation, motion storyboard, 3D scene, kinetic type, product demo, or implementation guidance.
   - Capture duration, aspect ratio, loop behavior, style, brand tone, and any tool-specific limits if the user provided them.
   - If the target is unclear, make a conservative prompt that avoids tool-specific syntax and labels assumptions separately.
   - Do not invent tool parameters, model features, camera controls, or negative-prompt syntax. Verify current tool behavior when the user names a fast-moving product or model.

2. Translate the rough idea into motion jobs.
   - Replace vague goals like "make it dynamic" with functional jobs: orient the viewer, reveal hierarchy, show cause and effect, confirm interaction, compare states, create anticipation, or add ambient life.
   - Choose one primary motion idea and, at most, two supporting motion ideas. Overpacked prompts produce incoherent animation.
   - Prefer continuity terms when the same object changes state: shared element transition, morph, layout animation, crossfade, accordion, directional transition.

3. Specify motion with the right vocabulary.
   - Use `references/motion-vocabulary.md` when you need terms for entrances, exits, transforms, sequencing, easing, spring behavior, interaction feedback, ambient loops, effects, performance, or reduced-motion constraints.
   - Do not dump vocabulary into the prompt. Select the few terms that directly describe the intended motion.
   - Pair each motion term with a concrete target: "headline reveals with a vertical mask", "cards stagger upward", "thumbnail expands through a shared element transition".

4. Define timing and feel.
   - Include duration ranges, stagger intervals, and easing language when they matter.
   - For UI and product motion, default to short, purpose-led timing: quick response, slower spatial transition, subtle ambient loop.
   - Use ease-out for user-triggered feedback, ease-in-out for objects moving between stable states, linear only for constant mechanical motion, and spring language when interruption, velocity, or physical weight matters.
   - Use seconds for generative-video prompts and frames only for frame-based tools or implementation prompts that expose fps.

5. Add camera, composition, and continuity.
   - For video or 3D prompts, describe framing, camera motion, depth, lens feel, foreground/background relationship, and where attention should land.
   - For UI prompts, describe viewport, component boundaries, anchor points, transform origin, stacking, and whether layout should animate instead of snapping.
   - Maintain spatial consistency so viewers can track what changed.

6. Add constraints and negative direction.
   - Include constraints for readability, brand fit, pacing, loop smoothness, accessibility, and reduced motion when relevant.
   - Add negative direction only for likely failure modes: no random spins, no jitter, no excessive bounce, no unreadable type, no camera shake, no unrelated particles.

## Prompt Anatomy

Use this structure when rewriting a user's rough prompt:

```text
[Subject/context]. Animate [primary motion job] using [specific motion vocabulary].
Sequence: [timing, stagger, key moments].
Feel: [easing or physics, weight, energy level].
Camera/viewport: [framing, camera move, transform origin, continuity].
Constraints: [duration, loop, readability, brand/style, reduced-motion or negative direction].
```

For implementation-facing prompts, add a short technical line:

```text
Implementation notes: prefer transform and opacity, avoid layout thrashing, make the animation interruptible, and provide a reduced-motion fallback.
```

## Vocabulary Selection

Use motion language by intent:

| Intent | Prefer terms like | Avoid relying on |
| --- | --- | --- |
| Introduce content | reveal, fade in, slide in, scale in, pop in, stagger | "make it appear nicely" |
| Preserve orientation | shared element transition, morph, layout animation, continuity transition | "switch screens with animation" |
| Confirm action | press feedback, ripple, hold to confirm, swipe to dismiss | "make the click feel good" |
| Show physics | spring, damping, stiffness, velocity, momentum, interruptible | "bouncy" with no limits |
| Add background life | idle animation, float, pulse, orbit, loop, alternate | constant noisy motion |
| Explain change | keyframes, orchestration, crossfade, number ticker, line drawing | unrelated visual effects |

## Prompt Quality Rules

- Make the animation serve a purpose before describing style.
- Name exact objects and their start/end states.
- Specify order: what moves first, what follows, what settles last.
- Keep frequent UI motion shorter and subtler than one-off hero motion.
- Use transform, opacity, mask, clip, and filter terms precisely; avoid asking for width, height, top, or left animation unless layout motion is the point.
- Treat bounce, shake, blur, glow, and particles as accents, not defaults.
- Use tabular numbers for counters, timers, tickers, and dashboards.
- Include a reduced-motion alternative when the result is user-facing UI.

## Example Rewrites

Rough:

```text
Animate this pricing section so it feels premium.
```

Better:

```text
Animate the pricing section as a calm product reveal. The section title fades in first, then the three pricing cards slide up 16px with a 70ms stagger and a soft ease-out. The recommended plan scales in from 0.98 to 1.0 after the other cards settle, with no bounce. Keep text readable throughout, avoid glow or particles, and provide a reduced-motion version that uses opacity only.
```

Rough:

```text
Make the dashboard numbers exciting when they update.
```

Better:

```text
Animate dashboard metric updates with a restrained number ticker. Digits roll vertically using tabular numbers over 450ms, then settle with a subtle ease-out. Only the changed digits move; labels and card layout stay fixed. Add a faint highlight pulse behind the updated value for one cycle, then fade it out. Avoid layout shift, jitter, and continuous looping.
```

Rough:

```text
The image should turn into the detail page.
```

Better:

```text
Create a shared element transition from the thumbnail into the detail page hero image. The thumbnail expands from its grid position into the full-width hero frame while preserving its corner radius until the final 120ms, then the title and metadata stagger in below it. Use ease-in-out for the spatial move, keep the image identity continuous, and avoid a hard crossfade or unrelated camera motion.
```

## Final Response Shape

When the user asks for a prompt, provide:

- The refined animation prompt.
- Optional notes only when useful: vocabulary chosen, assumptions, or variants for stronger/subtler motion.
- A reduced-motion or implementation constraint when the prompt targets UI that real users will interact with.
