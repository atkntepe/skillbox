---
name: humanize-documentation
description: Use when the user wants to rewrite, review, or improve technical documentation that feels AI-written, stiff, verbose, imprecise, ambiguous, hard to scan, or disconnected from source behavior. Apply to component and API docs, README usage sections, guides, reference tables, migration notes, examples, and troubleshooting content, including requests for Simplified Technical English (STE)-inspired clarity; do not use for pure marketing copy or unsupported rewrites that would require inventing product behavior.
---

# Humanize Documentation

Make technical documentation feel like it was written by a careful human maintainer: direct, grounded, specific, and easy to use. Preserve the technical contract above all else.

## Workflow

1. Read the source before rewriting.
   - Inspect the relevant component, API, tests, examples, changelog, or existing docs.
   - Identify exact names, props, events, slots, classes, commands, versions, paths, defaults, and constraints.
   - Treat unknown behavior as unknown. Do not invent capabilities, guarantees, performance claims, or compatibility details.
   - Identify generated files and their source templates. Edit the source of truth instead of hand-editing generated output unless the repository explicitly requires both.

2. Identify the reader and job.
   - Who is reading: first-time user, component consumer, maintainer, migrator, or troubleshooter?
   - What are they trying to do next?
   - What is the minimum context they need before the example or instruction makes sense?

3. Reshape before polishing sentences.
   - Put the practical path first: what it is, when to use it, how to use it.
   - Move caveats near the step or option they affect.
   - Prefer short sections with descriptive headings over long, blended explanation.
   - Convert dense prose into steps, bullets, tables, or examples only when that form improves scanning.

4. Rewrite with a natural technical voice.
   - Use active voice and concrete verbs.
   - Use "you" for instructions, not for hype.
   - Keep sentences varied but plain.
   - Prefer specific nouns over vague labels like "functionality", "solution", "utilize", or "seamlessly".
   - Remove filler, apologies, exaggerated confidence, and marketing language.
   - Keep the tone helpful, calm, and precise. Humanized does not mean casual, cute, or wordy.

5. Protect technical material.
   - Never rename APIs, props, methods, files, commands, package names, CSS classes, options, error messages, or code identifiers unless the user explicitly asks.
   - Keep code blocks executable and aligned with the surrounding prose.
   - Keep required steps, warnings, edge cases, and accessibility notes intact.
   - If examples are incomplete, either complete them from source context or label them as partial.

6. Verify the rewrite.
   - Cross-check every factual claim against code or source docs.
   - Run available docs, lint, typecheck, or test commands when the edit touches executable examples or generated docs.
   - Check headings, links, anchors, code fences, tables, and version references after structural edits.
   - Re-read as the target reader: can they decide, implement, and debug without guessing?

## STE-Inspired Clarity Pass

Use selected principles from ASD-STE100 Simplified Technical English as a clarity check, especially for procedures, safety-critical instructions, international readers, or text that will be translated. Use them after you establish the correct structure and technical meaning.

- Use one term for each concept. Do not rotate synonyms for variety.
- Prefer short, concrete words, but preserve established domain terms and exact product language.
- Use active voice when the actor matters or the sentence gives an instruction. Use passive voice when the actor is unknown, irrelevant, or less important than the result.
- Give one instruction per numbered step. Start instructions with an imperative verb.
- Put a condition before the action it controls: "If the request fails, retry it once."
- Keep each sentence focused on one topic. Split it when a second idea, condition, or action makes it harder to parse.
- Introduce information gradually and keep each paragraph focused on one topic.
- Use a vertical list when it makes complex choices, requirements, or sequences easier to scan.

Treat these as strong defaults, not mechanical compliance rules. Do not force every sentence under a fixed word count, ban contractions globally, or replace familiar software terms with awkward alternatives. Sentence-length targets can expose overloaded prose, but meaning and natural flow come first.

Do not claim ASD-STE100 compliance unless the user explicitly requests it and the text has been checked against the complete current standard, including its writing rules and controlled dictionary. Otherwise describe the result as "STE-inspired" or "informed by Simplified Technical English."

## Component Documentation Pattern

For component docs, cover the useful surface in this order unless the existing docs use a stronger local convention:

1. Purpose: what the component does and when to use it.
2. Minimal example: the shortest realistic usage.
3. Core API: props, events, slots, methods, or exports with defaults and required fields.
4. Variants and states: sizes, disabled/loading/error/empty states, controlled vs. uncontrolled modes.
5. Composition: related components, provider requirements, theming hooks, layout assumptions.
6. Accessibility: keyboard behavior, ARIA relationships, focus management, labels, and screen reader notes when relevant.
7. Edge cases: async data, validation, SSR, performance, browser/platform limits, migration notes.

## Humanization Checks

Before returning documentation, remove or revise:

- generic openings such as "This documentation provides an overview"
- AI-sounding transitions such as "Additionally", "Furthermore", and "It is important to note" when they add no meaning
- inflated claims such as "robust", "seamless", "powerful", or "easy" unless the docs prove them
- passive constructions that hide the actor
- repeated sentence shapes
- unexplained jargon
- examples that show toy values when realistic values would teach better
- warnings detached from the option or step they apply to

## Output Expectations

When editing files, make focused changes and preserve the surrounding documentation style. In the final response, summarize what changed, mention any verification performed, and call out unresolved factual assumptions.

When only asked to rewrite text, return the improved version directly unless the user asks for before/after commentary.
