---
name: frontend-design
description: Use when designing, reviewing, or implementing frontend UI with attention to layout, visual hierarchy, spacing, component states, accessibility, responsive behavior, and production-ready polish. Do not use for backend-only tasks.
---

# Frontend Design

Create distinctive, production-grade interfaces with a clear visual point of view. Ship real working code in the project's stack, not mockups.

## Workflow

1. Read the product and codebase context first.
   - Identify the audience, tone, user goal, and real constraints.
   - Inspect the stack, styling system, tokens, layout primitives, and component patterns.
   - Reuse the existing framework and architecture unless the user explicitly asks for a standalone implementation.
   - Prefer minimal dependencies. Do not add libraries just to chase aesthetics.

2. Choose one strong design direction before coding.
   - Commit to a single aesthetic direction that fits the product.
   - Decide what makes the result memorable from a single screenshot.
   - Infer the style confidently when the brief is underspecified.

3. State the direction briefly unless the user asked for code only.
   - Summarize the visual concept in 2-4 lines.
   - Name the mood and the main differentiator.

4. Implement real code.
   - Keep the result semantic, responsive, maintainable, and integrated with the existing app.
   - Use reusable tokens or variables for color, spacing, radii, shadows, and motion.
   - Ensure the layout works across mobile, tablet, and desktop.

## Design Directives

### Typography

- Treat typography as a primary design tool.
- Prefer expressive type choices over default tech-product sameness.
- Avoid defaulting to Inter, Roboto, Arial, Helvetica, system UI, or Space Grotesk unless the repo already uses them or the brief demands restraint.
- Build hierarchy through scale, spacing, weight, case, rhythm, and contrast.

### Color

- Use a tight palette with a clear dominant tone and deliberate accents.
- Favor conviction over safe neutral SaaS palettes.
- Avoid cliched purple-on-white gradients, generic glassmorphism, and decorative effects without a concept.
- Represent the palette with CSS variables or the existing token system.

### Composition

- Make the layout feel authored, not assembled from stock sections.
- Use asymmetry, overlap, framing, rhythm, density, or negative space intentionally.
- Break predictable grids only when clarity improves.

### Motion

- Add a small number of high-value interactions.
- Prefer meaningful entrance choreography, hover states, focus states, and transitions over constant animation.
- Prefer lightweight CSS-first motion and respect `prefers-reduced-motion`.

### Surfaces

- Use gradients, texture, borders, shadows, translucency, or patterns only when they reinforce the concept.
- Make every button, input, card, table, tab, empty state, and divider feel considered.
- Do not leave default browser or framework styling in place for a design-led task.

## Guardrails

- Preserve accessibility: semantic structure, visible focus states, readable contrast, keyboard navigation, and touch targets.
- Preserve performance: avoid heavy runtime effects when simpler techniques achieve the same result.
- Respect the existing design system when one exists; evolve it instead of replacing it blindly.
- Make deliberate fallbacks when external fonts or assets are unavailable.
- When a requested aesthetic conflicts with accessibility or maintainability, keep the spirit and ship the safer version.

## Anti-Patterns

Never ship:

- generic AI-looking output
- cookie-cutter hero sections
- interchangeable dashboard cards with no visual identity
- random blobs or gradients without a concept
- style choices that conflict with the product context
- overdesigned visuals that hurt scanability
- inconsistent spacing, radii, shadows, or type scales
- visually impressive but brittle code

## Default Behavior

When the brief is vague, infer the audience and product category from the available context, choose an opinionated direction, and optimize for clarity, memorability, and implementation quality rather than bland safety.

## Validation

Before finishing:

- Run relevant checks such as lint, typecheck, tests, or build when available.
- Inspect for overflow, broken alignment, weak hierarchy, inconsistent spacing, and dead states.
- Verify responsive behavior.
- Verify hover, focus, disabled, error, loading, and empty states where relevant.
- Remove ornamental elements that do not improve the result.

## Response

When presenting the result:

1. Deliver the implementation.
2. Summarize the chosen design direction.
3. Call out the main design moves that make it distinctive.
4. Mention any dependencies, assets, or fonts that were added.
5. Note important tradeoffs or constraints.
6. Suggest a small number of high-value refinements only when they would materially improve the result.
