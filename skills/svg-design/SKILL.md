---
name: svg-design
description: Use when creating, redesigning, converting, debugging, or reviewing SVG files, inline SVG UI mockups, vector illustrations, logos, diagrams, CSS-to-SVG conversions, or any SVG output with overlap, clipping, viewBox, layering, text wrapping, responsive scaling, or browser rendering problems.
---

# SVG Design

Create SVGs as deliberate vector interfaces: stable coordinate system first, semantic layer tree second, paths and styling last. Always verify the rendered artifact because SVG source can look logical while the browser clips, stacks, scales, or overlaps it differently.

## Workflow

1. Define the delivery target.
   - Ask only if it is genuinely unclear whether the output should be a standalone `.svg`, inline JSX/HTML SVG, icon, logo, diagram, printable asset, or mockup.
   - Confirm the intended viewport size, transparent/solid background, responsive behavior, and whether text must remain editable.
   - For CSS-to-SVG conversion, inspect the CSS layout, screenshot, or DOM before drawing.

2. Build the coordinate system.
   - Start with one root `<svg>` with a clean `viewBox`, explicit `width` and `height` when the deliverable is fixed-size, and `preserveAspectRatio` when responsive scaling matters.
   - Use a 4px or 8px spacing grid for UI mockups unless the source requires another rhythm.
   - Reserve safe margins before placing content. Do not let text, strokes, shadows, or filters depend on the exact edge of the viewBox.

3. Convert layout before decoration.
   - Break the design into named bands and groups: background, header, main content, side rail, cards, controls, overlays, annotations.
   - Place large containers first, then repeated components, then text, then intentional overlays.
   - Avoid one giant path for UI mockups. Keep rectangles, text, icons, masks, and decorations separately editable.

4. Control stacking and overlap.
   - SVG paints in document order: later elements appear above earlier elements.
   - Use `<g id="...">` groups in back-to-front order, not random absolute coordinates.
   - Treat overlap as a named decision. Put badges, popovers, tooltips, glows, and masks in groups named like `overlay-*`, `badge-*`, or `mask-*`.
   - Prefer clipping only when the source design truly clips. Leave debugging notes in comments for non-obvious masks and filters.

5. Handle text conservatively.
   - SVG text does not wrap like CSS. Use manual `<tspan>` lines, measured line heights, and fixed text boxes by convention.
   - For UI mockups, keep labels editable with `<text>` unless the user asks for outlined typography.
   - Use realistic copy lengths when testing. Short placeholder text hides overlap bugs.

6. Render and inspect before finishing.
   - Run `node skills/svg-design/scripts/svg-preview.mjs <file.svg>` from the repo root, or read the script and adapt its preview wrapper if the skill is installed elsewhere.
   - Open the generated preview HTML in a browser when visual correctness matters.
   - Check normal, fit-width, light, dark, and outline views. Look for clipped shadows, cropped strokes, hidden text, invalid IDs, and accidental element overlap.

## CSS-to-SVG Conversion

Read `references/svg-mockup-workflow.md` when converting CSS, HTML, screenshots, or frontend mockups into SVG. The short version:

- Convert CSS layout primitives to explicit SVG geometry: flex/grid rows become grouped coordinate bands, padding becomes group offsets, gaps become fixed coordinate differences.
- Convert CSS z-index to SVG document order.
- Convert border radius, shadows, gradients, and backgrounds to SVG primitives, not raster screenshots, unless the user explicitly asks for a bitmap.
- Recompute text line breaks manually. Browser CSS line wrapping does not transfer to SVG.

## Overlap Debugging

Read `references/overlap-debugging.md` when an SVG has collisions, clipped content, missing shadows, bad scaling, or text that lands on top of other content.

Use this triage order:

1. Verify the root `viewBox` and rendered aspect ratio.
2. Inspect document order against intended z-index.
3. Check masks, clips, filters, and nested transforms.
4. Measure text lines and icon boxes with real content.
5. Fix the source, regenerate the preview, and inspect again.

## Authoring Rules

- Use semantic IDs for major groups. Avoid generated names like `Group 42`.
- Keep repeated UI components structurally similar so edits can be made across instances.
- Use `<defs>` for reusable gradients, filters, masks, symbols, and clip paths.
- Prefix IDs when embedding multiple SVGs on the same page to avoid collisions.
- Avoid `foreignObject` unless the target browser/runtime is known and the user accepts portability limits.
- Avoid CSS-only layout inside SVG. SVG is geometry, not flexbox.
- Avoid negative coordinates unless the viewBox intentionally includes that area.
- Avoid filters that touch the edge of the viewBox; expand filter bounds or leave safe margins.
- Use `aria-label`, `<title>`, or `role="img"` for meaningful standalone graphics.
- Preserve user-provided artwork and brand geometry. Fix structure and rendering issues without restyling unless asked.

## Validation Checklist

Before reporting completion:

- The SVG opens without console or parser errors.
- The root `viewBox` matches the intended coordinate system.
- Text is readable, not clipped, and uses deliberate line breaks.
- Strokes, shadows, glows, and filters are not cut off.
- Intentional overlap is named and appears in the correct order.
- No important content depends on CSS behavior that SVG cannot reproduce.
- Responsive scaling keeps the same composition at small and large sizes.
- Accessibility metadata exists for meaningful graphics.
- The final rendered preview has been inspected, or the response clearly says why visual verification was not possible.
