# Marketing Video Best Practices

Use this file when the user asks for strategy, wants ads instead of simple videos, or wants prompts based on external best practices.

## Research Rules

- Prefer official Remotion docs, Remotion prompt gallery examples, and platform ad docs over generic blog posts.
- Use Reddit or community threads for audience language, objections, and examples of what people dislike. Do not treat Reddit anecdotes as authoritative best practices.
- If the user asks for current trends, prices, template availability, or platform specs, browse and verify before answering.
- Do not invent product claims, metrics, customer logos, awards, or performance promises.

## Platform-Aware Creative Rules

For social ads:
- Put the hook in the first 3-6 seconds.
- State the content proposition early.
- Use captions or text overlays so the video works without sound.
- Keep overlay text short enough to read comfortably.
- End with a direct CTA.
- Create several materially different variants for testing; avoid only changing button copy or background color.

For launch videos:
- Show the actual product or a credible product reconstruction early.
- Give the viewer one clear reason to care before listing features.
- Keep the product name and CTA visible near the end.
- Use proof scenes only when evidence is supplied.

For product demos:
- Prefer workflow beats over feature lists.
- Show cause and effect: user action -> product response -> outcome.
- Animate UI hierarchy, not random decoration.
- Use realistic data where possible, but avoid exposing private information.

## Remotion-Specific Prompt Rules

- Specify fps, duration, resolution, aspect ratio, and scene frame counts.
- Ask for frame-driven animation with `useCurrentFrame()` and `useVideoConfig()`.
- Ask for `Sequence`, `Series`, or `TransitionSeries` instead of ad hoc timing.
- Prefer transform, opacity, masks, clip paths, color interpolation, and audio volume curves.
- Use `spring()` sparingly for press feedback, card emphasis, logo arrivals, or physical settling.
- Ask for `staticFile()` for local assets in `public/`.
- Ask for a Zod schema when the video should be reusable or editable.
- Ask for still-frame render checks at high-risk moments.

## Common Failure Modes To Guard Against

- Vague prompt asks for "premium", "dynamic", or "viral" without story beats.
- Product UI appears too late or not at all.
- Each scene has too many effects.
- Text is too small for mobile or visible for too little time.
- Agent invents product features or claims.
- The video only works with sound.
- Transitions are decorative but do not preserve viewer orientation.
- The prompt asks for CSS animations, which are not suitable for Remotion rendering.

## Source Anchors

- Remotion Studio docs: https://www.remotion.dev/docs/studio/
- Remotion Player docs: https://www.remotion.dev/docs/player/
- Remotion parameterized videos: https://www.remotion.dev/docs/parameterized-rendering
- Remotion AI skills: https://www.remotion.dev/docs/ai/skills
- Remotion prompt gallery: https://www.remotion.dev/prompts
- TikTok creative best practices: https://ads.tiktok.com/help/article/creative-best-practices
