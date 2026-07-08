# Remotion Prompt Patterns

Use this file when drafting examples, critiquing a Remotion prompt, or deciding how detailed a prompt should be.

## Strong Patterns From Remotion Prompt Gallery

### Product Demo

Pattern:
- Ask the agent to recreate important product UI with React components.
- Use the product homepage or index page to decide which features matter.
- Frame the video as the founder's customer demo, not a feature dump.
- Ask clarifying questions when the target demo flow is underspecified.

Best for:
- SaaS, developer tools, dashboards, B2B products, productivity apps.

Prompt ingredients:
- Product URL or local app.
- Main audience and problem.
- 3-5 workflow moments worth showing.
- Screenshots or UI states if available.
- Clear CTA.

### Launch Video

Pattern:
- Exact resolution, fps, duration, theme, music, and volume.
- Numbered scenes with durations in frames and seconds.
- Concrete UI components, copy, colors, fonts, and transition behavior.
- Repeated visual container, such as an app window, terminal, phone frame, or browser shell.

Best for:
- Launch posts, Product Hunt, X/LinkedIn announcement videos, open-source demos.

Prompt ingredients:
- 6-8 scenes for a 30-40 second launch video.
- A visible product moment by scene 2 or 3.
- Brand palette and font direction.
- Final CTA with URL/repository.

### CTA Overlay Or Lower Third

Pattern:
- Single reusable overlay with transparent output.
- Fetch or provide avatar/logo/counts if needed.
- Animate entrance, button state change, and exit.
- Specify output codec when transparency matters.

Best for:
- YouTube lower thirds, subscribe overlays, podcast/video inserts, social proof badges.

Prompt ingredients:
- Overlay dimensions and safe area.
- Exact text and visual hierarchy.
- Entrance/exit timing.
- Button or badge states.
- Transparent render requirement if needed.

### Music Or Retail Promo

Pattern:
- Start with a short hook on a plain background.
- Reveal logo/product.
- Add proof or momentum with counters, product cards, or collections.
- End with short CTA and URL.
- Iterate on transitions and audio-reactive behavior after the first pass.

Best for:
- Consumer products, music, ecommerce, creator products, short social promos.

Prompt ingredients:
- Hook line.
- Product/logo asset.
- Proof number or collection.
- Music direction.
- CTA.

## Detail Level Guidance

Use a light prompt when:
- The user is exploring a visual direction.
- The product has a strong website with assets.
- The video is short and low risk.

Use a high-detail prompt when:
- The output is a launch or paid ad.
- The product UI must look credible.
- The video needs music, captions, platform formatting, or reusable props.
- Another coding agent will implement without follow-up.

## Useful Follow-Up Prompts

```text
Make the transition between scenes 2 and 3 smoother by preserving the product window position and animating only scale, opacity, and background color.
```

```text
Create three meaningfully different hook variants: pain-led, outcome-led, and contrarian. Keep the same product proof and CTA.
```

```text
Convert this 16:9 launch video prompt into a 9:16 paid social version. Keep copy readable in mobile safe zones and reduce each scene to one visual job.
```

```text
Rewrite this prompt so the implementing agent uses real product UI states instead of abstract cards or generic screenshots.
```
