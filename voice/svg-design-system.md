# hungovercoders SVG design system

The visual system that the existing hungovercoders training diagrams follow. Use these tokens, fonts, and layout shapes for every new diagram so the brand stays consistent across tutorials, blog posts, and library content. Five canonical examples ship alongside this document in `voice/svg-examples/` — read the one matching your layout shape before drafting.

## Why this exists

Five SVG diagrams already live in the Claude Code training series (cage-stack, kit-composition, subagent-isolation, settings-hierarchy, context-output-mockup). They use the same palette, font stack, layout conventions, and accessibility patterns. This document codifies the system that produced them so future diagrams stay coherent.

The brand voice for prose is in `datagriff-voice-guide.md`; this is the visual counterpart.

## Colour tokens

Every colour used in a hungovercoders diagram should be drawn from this palette. Avoid introducing off-palette colours without a strong reason — coherence across the series is more valuable than per-diagram cleverness.

### Primary
| Token | Hex | Semantic role |
| --- | --- | --- |
| accent | `#2337ff` | The agent acts, primary action, "this is the focal point" |
| accent-dark | `#000d8a` | Top of a stack/gradient, deepest layer in a defence-in-depth diagram |
| accent-light | `#dbe4ff` | Background of a card with the accent role |

### State
| Token | Hex | Semantic role |
| --- | --- | --- |
| success | `#1ea672` | Safe surface, hook-passed, allow rule, "the agent runs here" |
| success-light | `#d8f1e1` | Background of a success card |
| deny | `#b54343` | Deny rule, schema failure, refusal state |
| warn | `#f0b04a` | Heap-used, amber zone (50–80% usage), "needs attention" |

### Category accents (use sparingly, when categorising more than two groups)
| Token | Hex | Semantic role |
| --- | --- | --- |
| commands-purple | `#7350dc` | Commands and skills category |
| commands-light | `#e9deff` | Background of commands category card |
| mcp-orange | `#e16e3c` | MCP / external integration category |
| mcp-light | `#fee5d9` | Background of MCP category card |

### Surfaces and text
| Token | Hex | Semantic role |
| --- | --- | --- |
| bg-light | `#f8f9fb` | Default diagram background (light theme) |
| bg-dark | `#0f1219` | Terminal mockup background |
| bg-titlebar | `#1a1f2e` | Terminal title bar, dim sections within dark mockups |
| border | `rgb(229, 233, 240)` | Card borders, dividers within light surfaces |
| text-body | `rgb(34, 41, 57)` | Body text on light surfaces |
| text-muted | `rgb(96, 115, 159)` | Secondary text, annotations |
| text-dim | `rgb(140, 156, 188)` | Tertiary text on dark surfaces |
| text-label | `rgb(214, 220, 235)` | Primary text on dark surfaces |

## Typography stack

Always declare web-safe fallbacks. SVGs are sometimes rendered before site fonts load (or in contexts that don't load them at all — RSS readers, social preview cards), and a bare `font-family: 'Lora'` produces an ugly serif fallback. The full triple matters.

| Use | Stack |
| --- | --- |
| Headings | `'Lora', Georgia, Cambria, serif` |
| Body text | `'Atkinson', system-ui, sans-serif` |
| Code, terminal, labels | `'JetBrains Mono', Menlo, Consolas, monospace` |

Weights: `400` (regular) or `700` (bold). Don't use intermediate weights — the site's web fonts don't ship them and the fallbacks won't render them correctly.

## Layout conventions

| Decision | Default | Notes |
| --- | --- | --- |
| viewBox width | `720` | Matches site content max-width. Height varies by content. |
| width / height attrs on `<svg>` | **Omit** | Let viewBox + container width drive responsive sizing. |
| Outer gutter | `20px` | Distance from viewBox edges to first content |
| Border radius | `3px` for inline tags / bands, `4-6px` for cards, `8px` for outer panels | |
| Card spacing | `4–8px` between stacked bands; `12–20px` between distinct sections | |
| Title bar / header band | `20–28px` tall | |
| Body band | `30–38px` tall | One label + one body line fits comfortably at 11–13px font sizes |

## Accessibility (non-negotiable)

Every SVG must include:

- `role="img"` on the root `<svg>` element
- A `<title>` element with a short headline phrase ("The cage you build across thirteen lessons")
- A `<desc>` element with thorough alt-text — a sighted user should be able to close their eyes and reconstruct the diagram from the description alone
- `aria-labelledby="<titleId> <descId>"` on the root referencing both

Example structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" role="img" aria-labelledby="cageTitle cageDesc">
  <title id="cageTitle">The cage you build across thirteen lessons</title>
  <desc id="cageDesc">A vertical stack of eleven cage layers added across lessons 3 through 13 of the Claude Code tutorial series, each one a constraint that narrows what the agent can do unsupervised. Lesson 14 is the auto-mode surface that sits on top.</desc>
  ...
</svg>
```

## Five layout shapes

The existing five canonical SVGs cover five recurring shapes. Pick the closest match and read it before drafting.

### 1. Stacked layers — `cage-stack.svg`

When to reach for it: a list of layered defences, a depth-in-something concept where each item *adds* to the previous, or a hierarchy where the visual layering carries meaning.

Structure:
- Top-to-bottom stack of bands, each one row of the table
- Number badge on the left (column for lesson/step number)
- Title and body text on the right of each band
- Gradient or colour progression from light (base) to dark (top) suggesting accumulation
- Surface band on top in a contrasting colour (e.g. success-green) for "the safe runtime"

### 2. Tree + annotation cards — `kit-composition.svg`

When to reach for it: showing a directory or component tree alongside annotations explaining what each piece does. Best when there are 4–6 distinct categories worth labelling.

Structure:
- Left panel: directory tree in monospace
- Right panel: category cards, each with a coloured pill header (use the category-accent tokens) and 2–3 lines of body text
- Optional dark band at the bottom summarising the composition outcome

### 3. Entity boxes + arrows — `subagent-isolation.svg`

When to reach for it: showing relationships between processes, agents, or systems. Dispatch / return flows, parallel execution, message-passing.

Structure:
- Boxed entities, each with a coloured header bar and body content
- Marker definitions for arrowheads (`<marker>` with a triangle path)
- Arrow strokes go *outside* the boxes, labelled with text adjacent to the arrow
- Return arrows in a contrasting colour (success-green for "success result returned")

### 4. Stacked + side-by-side comparison — `settings-hierarchy.svg`

When to reach for it: comparing two related concepts where one is the *layers* and the other is the *rules that resolve across those layers*. Two-column structure.

Structure:
- Left column: stacked layers (like shape #1, but smaller)
- Side arrow indicating merge or resolution order
- Right column: the rules/precedence visualisation (sieve, decision tree, or table of outcomes)
- Worked example card at the bottom showing the resolution in action

### 5. Terminal mockup — `context-output-mockup.svg`

When to reach for it: showing what command output looks like — `/context`, `/audit` results, an MCP tool response.

Structure:
- Dark background (`bg-dark` = #0f1219)
- Title bar in `bg-titlebar` (#1a1f2e) with three traffic-light circles (deny / warn / success colours)
- Prompt marker (`>`) in `accent` blue for command input
- Body text in `text-label` light colour
- Highlight numbers/percentages in `warn` amber for "this is the bit that matters"
- Dividers as thin `bg-titlebar` lines

## Authoring workflow

1. Read this document for tokens + accessibility requirements
2. Pick the layout shape that fits the concept best; if unclear, sketch which one would best answer *"what would a reader take away in a glance?"*
3. Read the matching canonical example from `voice/svg-examples/<shape>.svg`
4. Draft fresh SVG using the tokens above — don't copy-paste the example verbatim; reproduce the patterns with content specific to the new diagram
5. Write the alt-text as you go, not after — it forces you to be honest about whether each visual element earns its place
6. Save under 20KB. If you're over, you're probably duplicating styles inline instead of using a `<style>` block, or you've inlined raster data (which you should never do)

## What not to do

- **No external assets** — no `<image href="...">`, no `<use href="other-file.svg#thing">`, no font-imports. SVGs must be fully self-contained
- **No web-font-only declarations** — always include the fallback chain (Lora → Georgia → Cambria → serif, etc.)
- **No off-palette colours** — every hex you use should appear in the tokens table above
- **No animations or scripts** — `<animate>`, `<script>`, CSS animations all banned. Static only
- **No logo embeds** — diagrams visualise concepts; the hungovercoders logo belongs on landing pages, social cards, and brand surfaces, not buried inside an educational diagram
- **No fixed `width`/`height` on `<svg>`** — use viewBox alone for responsive sizing; the container's CSS decides the rendered size
- **No `role="presentation"` or accessibility shortcuts** — every SVG carries information, so every SVG needs `role="img"` + `<title>` + `<desc>`

## Reference: the canonical five

All five live in this directory's `svg-examples/` subdirectory and on the hungovercoders.com site under `/assets/training/claude-code/`. Match the layout shape from your concept to one of these:

| File | Shape | Concept it illustrates |
| --- | --- | --- |
| `cage-stack.svg` | Stacked layers | The cage built across 13 Claude Code lessons |
| `kit-composition.svg` | Tree + annotation cards | The Cinema Companion's directory and how each piece composes |
| `subagent-isolation.svg` | Entity boxes + arrows | The Task tool dispatching three subagents, each isolated |
| `settings-hierarchy.svg` | Stacked + comparison | Four settings.json layers + the deny > ask > allow precedence sieve |
| `context-output-mockup.svg` | Terminal mockup | The canonical `/context` output for a mid-session session |
