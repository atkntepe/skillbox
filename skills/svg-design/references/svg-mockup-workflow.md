# SVG Mockup Workflow

Use this reference when converting CSS, HTML, screenshots, or frontend mockups into SVG.

## Translation Model

| CSS or UI concept | SVG equivalent |
| --- | --- |
| viewport or artboard | root `viewBox` |
| page section | named `<g>` or container rectangle plus children |
| flex row | children with explicit x positions and shared y |
| flex column | children with explicit y positions and shared x |
| grid | repeated coordinate cells with fixed row and column tracks |
| padding | group offset plus inner coordinate budget |
| gap | measured difference between neighboring boxes |
| z-index | document order, with later elements on top |
| border radius | `rx` and `ry` on `<rect>` |
| box shadow | `<filter>` with expanded bounds |
| gradient background | `<linearGradient>` or `<radialGradient>` in `<defs>` |
| clipping container | `<clipPath>` only when clipping is intentional |
| CSS text wrap | manual `<tspan>` lines |

## Conversion Steps

1. Capture the source dimensions and target export dimensions.
   - If the source is responsive, pick primary desktop and mobile artboards instead of forcing one SVG to mimic all CSS breakpoints.
   - Define the viewBox in whole numbers. Example: `viewBox="0 0 1440 960"`.

2. Draw layout rectangles before drawing detail.
   - Mark page margins, columns, and section heights.
   - Place each major area as a named group.
   - Keep background layers first.

3. Convert repeated components as measured instances.
   - Cards, table rows, chips, nav items, and controls should share dimensions and spacing.
   - Use comments or group IDs to mark repeated component families.
   - Do not paste visually similar objects with different unexplained dimensions.

4. Convert stacking deliberately.
   - Move lower z-index CSS layers earlier in the SVG.
   - Move sticky bars, modals, tooltips, badges, and hover overlays later.
   - If an element should be above another only inside a card, keep both inside that card group.

5. Convert typography manually.
   - SVG text does not have CSS block layout.
   - Use one `<text>` for a label or heading.
   - Use `<tspan x="..." dy="...">` for multiline paragraphs.
   - Set `font-size`, `font-weight`, `font-family`, and line-height by explicit `dy` values.

6. Convert visual effects with extra space.
   - Shadows and glows need filter bounds larger than the source shape.
   - Masks and clip paths should use IDs that explain the clipping region.
   - If the mockup uses blur behind a panel, use a simple translucent fill unless the SVG target supports the exact filter reliably.

7. Render at 1x and scaled sizes.
   - Inspect the SVG in a browser, not only in a code editor preview.
   - Check transparent, light, and dark backgrounds.
   - Verify text at the longest realistic copy length.

## Practical Rules

- Prefer editable primitives over flattened paths for UI mockups.
- Keep icons as symbols or small grouped paths; keep product UI as rectangles and text.
- Keep all coordinates in a consistent unit system.
- Use comments sparingly to explain intentional overlap, not every element.
- If a CSS mockup depends heavily on `backdrop-filter`, blend modes, or complex browser layout, state the approximation in the final response.
