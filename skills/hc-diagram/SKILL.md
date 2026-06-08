---
name: hc-diagram
description: Author on-brand SVG diagrams for hungovercoders tutorials, blog posts, and library content. Uses the codified visual design system (palette, typography, layout shapes) to stay consistent with the existing series visuals.
allowed-tools: Read, Write, Edit, Bash
argument-hint: <concept to illustrate>
---

Author a fresh on-brand SVG diagram. Optional `$ARGUMENTS` is a short description of what the diagram should illustrate (e.g. *"the hook lifecycle from PreToolUse through PostToolUse"*).

**Step 1 — Load the design system**

Read in full before drafting:

- `~/.claude/hungovercoders/voice/svg-design-system.md` — colour tokens, typography stack, layout shapes, accessibility requirements, and the *what not to do* list

This is non-optional. Every token you pick, every font you declare, every layout decision must be traceable to this document. If a request can't be expressed within these tokens, push back and ask why before reaching for off-palette colours.

**Step 2 — Pick a layout shape**

The design system documents five canonical shapes:

| Shape | Use it when |
| --- | --- |
| Stacked layers | A list of layered defences, depth-in-something, accumulation pattern |
| Tree + annotation cards | A directory/component tree with category annotations |
| Entity boxes + arrows | Dispatch / return flows, message-passing, parallel execution |
| Stacked + comparison | Two related concepts — layers + resolution rules, before/after |
| Terminal mockup | What command output looks like |

If the concept doesn't cleanly fit one of these, **stop and propose two or three shape options to the user before drafting** — don't invent a new shape unless the existing five genuinely don't cover it.

**Step 3 — Read the matching example**

Read `~/.claude/hungovercoders/voice/svg-examples/<matching>.svg` in full. The five examples are:

- `cage-stack.svg` (stacked layers)
- `kit-composition.svg` (tree + annotation cards)
- `subagent-isolation.svg` (entity boxes + arrows)
- `settings-hierarchy.svg` (stacked + comparison)
- `context-output-mockup.svg` (terminal mockup)

Reproduce the *patterns* (defs structure, semantic class names, arrow markers, title bars) — don't copy verbatim with new labels. The point is the brand visual rhythm, not the literal byte stream.

**Step 4 — Clarify before drafting**

If `$ARGUMENTS` doesn't already answer these, ask the user:

- What's being illustrated? (concept, claim, behaviour)
- Where will it land? (lesson page, blog hero, social card, library reference)
- What's the headline takeaway a reader should get from a 5-second glance?
- Where does the file go? (default suggestions in step 6)

**Step 5 — Draft the SVG**

Output requirements (every single one is mandatory):

- `viewBox` attribute on `<svg>`; **no** `width` or `height` attrs
- `role="img"` on the root
- `<title>` + `<desc>` referenced via `aria-labelledby="<titleId> <descId>"`
- The `<desc>` is **thorough alt-text** — close-your-eyes test: a non-sighted reader should be able to reconstruct the diagram from the text. Match the alt-text quality of the existing 5 SVGs
- Inline `<style>` block with semantic class names; do not inline styles on individual elements
- Every colour value drawn from the `svg-design-system.md` palette tokens — no off-palette hexes
- Every `font-family` declared with the full fallback chain (Lora → Georgia → Cambria → serif; Atkinson → system-ui → sans-serif; JetBrains Mono → Menlo → Consolas → monospace)
- File size under 20KB
- No external assets, no `<use>` cross-file refs, no animations, no scripts, no embedded raster, no logo

**Step 6 — Write to the agreed path**

Default suggestions by context:

- **Training-series diagrams** → `~/dev/hungovercoders/site/public/assets/training/<series>/<name>.svg`
- **Blog post illustrations** → `~/dev/hungovercoders/site/public/assets/<blog-slug>/<name>.svg`
- **Library reference material** → `~/dev/hungovercoders/library/voice/svg-examples/<name>.svg` (only if a new layout shape — then also update `svg-design-system.md` to document it)

If the user named a different path explicitly, use theirs. Always confirm before writing.

**Step 7 — Hand over the markdown embed**

Output the markdown snippet for the user to paste into the lesson/blog markdown. Use thorough alt-text that matches the SVG's `<desc>` content (typically the same text):

```markdown
![<thorough alt-text — what each element shows, in plain language, in roughly the order a reader's eye would track them>](/assets/<context>/<name>.svg)
```

The alt-text isn't an afterthought — it's the accessibility layer and the SEO surface for the diagram. Spend time on it.

**Iterating**

If the user has feedback, prefer `Edit` over rewriting. Common tweaks:

- "Highlight layer 7" → change that band's fill to `accent` (#2337ff)
- "Add a row for X" → insert a band; renumber/reposition the rows after it
- "The label reads wrong" → edit the `<text>` content directly
- "Resize for square" → adjust viewBox dimensions; consider whether content needs reflow

**What you do not do here**

- No PNG/JPG generation (the site has `scripts/generate-share-image.mjs` for share cards — separate concern)
- No animated SVG / Lottie / Rive
- No mermaid / graphviz / d3 — author SVG directly, no renderer involved
- No client-side script tags inside the SVG
- No logo embedding inside a content diagram
