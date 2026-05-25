---
name: figma-editable-layouts
description: Use when creating, updating, converting, or reviewing Figma design-mode screens, UI mockups, components, design systems, app pages, website pages, dialogs, panels, dashboards, or layouts, especially when output should be editable, designer-friendly, responsive, componentized, maintainable, auto-layout based, cleanly layered, or easy to adjust later.
---

# Figma Editable Layouts

## Overview

Build Figma files as editable design artifacts, not static screenshots. Prefer meaningful layer hierarchy, auto-layout relationships, design-system tokens, component instances, and predictable resizing behavior so a human can safely adjust copy, spacing, and sections after Codex is done.

This skill complements the bundled Figma skills. Before any `use_figma` call, also load `figma-use`. For composed screens or views, also load `figma-generate-design`. For reusable components or variants, also load `figma-generate-library`.

## Core Rules

1. Use auto layout for every container whose children have a structural relationship: stacked sections, rows, cards, nav bars, forms, lists, button groups, toolbars, and content columns.
2. Use absolute positioning only for top-level canvas placement or intentionally overlapping layers such as badges, floating controls, image overlays, and decorative marks. Name intentional absolute layers clearly, such as `Overlay / notification badge`.
3. Do not build screens as loose top-level rectangles and text nodes. Create one root frame, then semantic section frames, then rows, columns, cards, and component instances inside those sections.
4. Prefer `figma.createAutoLayout()` over `figma.createFrame()` for layout containers. If `createFrame()` is necessary, set `layoutMode`, padding, gap, alignment, and sizing deliberately before relying on child layout.
5. Append children to their auto-layout parent before setting child `layoutSizingHorizontal = "FILL"` or `layoutSizingVertical = "FILL"`.
6. Call `resize()` before setting final hug/fill sizing modes. `resize()` can reset sizing modes to fixed.
7. Bind color, spacing, radius, and gap to variables when the file or library has matching tokens. Use text styles and effect styles where available. Hardcoded values are acceptable for outer viewport widths, fixed icon sizes, image aspect boxes, and one-off geometry.
8. Use component instances from the design system for standard UI controls. When creating new components, expose useful properties for text, booleans, swaps, and slots instead of baking every state into detached layers.
9. Keep text editable as text. Do not outline, flatten, rasterize, or use image text unless the user explicitly asks for a visual-only artifact.
10. Name layers semantically. A designer should see `Pricing card`, `Feature list`, `Primary action`, and `Footer links`, not a page full of `Frame 123`, `Rectangle 91`, and `Text 42`.

## Construction Workflow

1. Inspect the target file before writing. Discover existing pages, frames, components, variables, text styles, effect styles, naming conventions, and layout conventions.
2. Define the intended layer tree before creating nodes. For a screen, start with:
   - root frame: fixed width, vertical auto layout, named after the view
   - major sections: vertical or horizontal auto-layout frames
   - inner containers: rows, columns, cards, lists, and content blocks
   - leaves: component instances, text, icons, media, and simple shapes
3. Create the root frame first and place it on the canvas with `x` and `y`. Its children should be positioned by auto layout, not manual coordinates.
4. Build one major section at a time inside the root frame. Return created and mutated node IDs after every write so later calls can validate or adjust the exact nodes.
5. For each section, decide sizing explicitly:
   - Root screen: fixed horizontal size, vertical hug or auto height.
   - Full-width section inside root: horizontal fill after append, vertical hug unless fixed height is required.
   - Row inside fixed or fill parent: horizontal fill, vertical hug.
   - Card/list item: fill if part of a responsive row or list, hug if content-sized.
   - Text label: hug width for short labels, fixed or fill width plus height auto-resize for paragraphs.
6. Use padding and item spacing on containers instead of spacer rectangles. Use dividers only when they are visible design elements.
7. Use layout grids for page-level column structure when helpful, but still use auto layout for the actual layer hierarchy.
8. Validate each section visually before moving on. Look for clipped text, overlap, unintended fixed heights, collapsed fill children, and placeholder labels.

## API Pattern

Prefer this shape when writing Figma Plugin API code:

```js
const root = figma.createAutoLayout("VERTICAL", {
  name: "Dashboard",
  itemSpacing: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
});
root.resize(1440, 100);
root.layoutSizingHorizontal = "FIXED";
root.primaryAxisSizingMode = "AUTO";
root.counterAxisSizingMode = "FIXED";
root.x = nextClearX;
root.y = 0;

const section = figma.createAutoLayout("VERTICAL", {
  name: "Overview section",
  itemSpacing: 24,
  paddingTop: 48,
  paddingRight: 64,
  paddingBottom: 48,
  paddingLeft: 64,
});
root.appendChild(section);
section.layoutSizingHorizontal = "FILL";
section.primaryAxisSizingMode = "AUTO";
```

Avoid this default shape for editable UI:

```js
const title = figma.createText();
title.x = 128;
title.y = 96;
const button = figma.createFrame();
button.x = 1180;
button.y = 88;
figma.currentPage.appendChild(title);
figma.currentPage.appendChild(button);
```

Manual coordinates like this are acceptable only for positioning the root frame on the canvas or for intentional overlays inside a named overlay frame.

## Component Guidance

- Build reusable UI controls as components with auto layout and variable bindings.
- Combine variants only after component properties are set on the individual variants.
- Lay out variants after `combineAsVariants`; they otherwise stack at `(0, 0)`.
- Use `TEXT` properties for labels and content that users will edit often.
- Use `BOOLEAN` properties for optional icons, descriptions, badges, and metadata rows.
- Use `INSTANCE_SWAP` for icons and nested reusable pieces instead of creating a variant for every icon.
- Use slots for flexible card or panel regions where designers should place arbitrary content.

## Editability Audit

Before calling the task complete, inspect and fix the file against this checklist:

- No composed screen is made of many unrelated top-level nodes.
- Containers with multiple related children use auto layout unless there is a named exception.
- `GROUP` nodes are avoided for UI structure; use frames or components instead.
- Children inside layout containers do not rely on manual `x` and `y` for normal flow.
- Fill children have a parent with fixed or fill space to expand into; they are not collapsed by a hugging parent.
- Text is editable, uses loaded fonts, has sensible wrapping or auto-resize behavior, and is not clipped.
- Repeated UI uses component instances or reusable components, not duplicated detached primitives.
- Colors, spacing, radii, typography, and shadows use variables or styles when available.
- Layer names are semantic and stable.
- Screenshots or metadata checks confirm there is no overlap, cropped text, invisible content, or placeholder copy.

If the audit finds many layout containers with `layoutMode = "NONE"` and multiple visible children, pause and refactor those areas into auto-layout frames before finishing.
