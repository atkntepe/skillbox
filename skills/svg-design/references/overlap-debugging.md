# SVG Overlap Debugging

Use this reference when an SVG renders with elements on top of each other, clipped content, missing shadows, cropped text, or different layout than expected.

## First Checks

1. Confirm the root `<svg>` has the intended `viewBox`.
2. Confirm the rendered aspect ratio matches the viewBox.
3. Open the SVG in a browser and at least one preview wrapper.
4. Check whether the issue is present at 1x, scaled up, and scaled down.

## Common Causes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Text sits on top of the next section | SVG text did not wrap like CSS | Split into `<tspan>` lines and reserve fixed height |
| Badge appears under a card | Document order does not match intended z-index | Move overlay group later in the SVG |
| Shadow or glow is cropped | Filter bounds or viewBox margins are too tight | Expand filter `x`, `y`, `width`, `height`, or add safe margin |
| Content disappears inside a card | Clip path reused or sized incorrectly | Prefix clip IDs and resize clip geometry |
| Icon scales differently from text | Nested transform or missing viewBox in symbol | Normalize symbol viewBox and explicit icon box |
| Layout looks correct only at one size | Mixed width/height/viewBox or preserveAspectRatio issue | Align root dimensions and set `preserveAspectRatio` intentionally |
| Element shifts unexpectedly | Nested transforms compound offsets | Flatten the transform into explicit coordinates for that group |

## Debugging Sequence

1. Outline the structure.
   - Temporarily add low-opacity fills or strokes to major container rectangles.
   - Group related elements and give them semantic IDs.

2. Remove uncertainty.
   - Replace transforms with direct coordinates where possible.
   - Replace percentage dimensions with numbers while debugging.
   - Disable clips and masks briefly to see whether content exists outside the visible region.

3. Rebuild stacking.
   - Sort groups from background to foreground.
   - Put overlays, popovers, badges, focus rings, cursors, and annotations near the end.
   - Keep local overlays inside their nearest semantic group unless they must escape it.

4. Re-measure text.
   - Count actual lines and reserve vertical space.
   - Do not let paragraph text and controls share the same y range.
   - Use realistic copy, not a one-word placeholder.

5. Re-run visual verification.
   - Generate or open a preview.
   - Inspect against light and dark backgrounds.
   - Confirm the fix did not create clipping elsewhere.

## Fix Preferences

- Prefer changing group coordinates over adding many local transforms.
- Prefer increasing layout height over shrinking text until it becomes unreadable.
- Prefer expanding viewBox or filter bounds over hiding overflow artifacts.
- Prefer semantic layer reordering over `opacity="0.999"` or other hacks.
- Prefer a simple, faithful SVG approximation over fragile CSS-in-SVG tricks.
