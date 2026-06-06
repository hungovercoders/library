---
name: hc-review-series
description: Thorough voice/consistency/usefulness review of a learn.* tutorial series
allowed-tools: Read, Glob, Grep, Bash(ls:*), Bash(git log:*), Bash(mkdir:*), Write, Agent
argument-hint: <optional path to series — defaults to current working directory>
---

Review a hungovercoders tutorial series for voice, consistency, and usefulness. Default to the current working directory if no argument is given; otherwise treat `$ARGUMENTS` as an absolute path to a `learn.*` repo. The agent's review is based on the dataGriff voice guide loaded at run time — there is no separate checklist to maintain.

**Step 1 — Load context**

Read in full before reviewing anything:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — voice rules, opinion beats, the eight-point self-check, the metaphor library. **Section 1a (Truth in first-person) is load-bearing.**
- `~/.claude/hungovercoders/voice/datagriff-facts.md` — the source of truth for first-person claims across the series. Every lesson's first-person specifics must cite a fact here or be impersonal.
- `~/.claude/hungovercoders/voice/blog-tutorial-template.md` — structure reference
- `AGENTS.md` in the target repo — repo-specific conventions, lesson layout, frontmatter requirements

**Mandatory pass — series-wide fabrication audit.** Across every lesson, sweep for first-person claims with a specific detail (number, duration, physical reaction, named moment, named person/place). For each, confirm it's cited in `datagriff-facts.md`. Aggregate unsourced ones into a single P0 finding at the top of the review with line references — these break the brand promise and are higher-priority than voice or structural drift.

**Step 2 — Discover the series**

Resolve the target directory (cwd or `$ARGUMENTS`). Confirm it looks like a `learn.*` repo: it must contain `AGENTS.md` and a `docs/` directory with at least one numbered lesson subdirectory. If those aren't present, stop and report what was missing.

List every `docs/NN-slug/README.md` file in the target repo. For each lesson, capture the order, slug, and absolute path. Report the count and lesson titles before starting the review.

**Step 3 — Per-lesson review**

For each lesson, evaluate against the criteria below. **If the series has more than 6 lessons, use the Agent tool to spawn parallel subagents in batches of 3–4 lessons per agent** — each subagent reads the voice guide once and reviews its batch. This protects the main session's context. For smaller series, review inline.

Score each lesson on:

| Criterion | What good looks like |
|---|---|
| **Frontmatter** | All fields present (`title`, `series`, `order`, `description`, `canonical_url`); description is filled in (not empty string) and has no trailing period; canonical_url matches the `https://hungovercoders.com/training/<series>/NN-slug` pattern |
| **Want-led opener** | First sentence begins with "I wanted…" or equivalent first-person desire — not a definition, not a faceless intro |
| **Themed headings** | At least three section headings are themed (beer/dogs/food/films/geek/music) rather than generic. Plain headings are fine for pre-reqs lists; the narrative sections should be themed where natural |
| **Honest moment** | One mid-lesson sentence proving a real person built this — "I'll be honest", "first time I ran this", "this is the bit the docs don't mention", "I'll be honest by the end of this rabbit hole I really fancied a can", etc. |
| **Verdict** | Near-end section with the author's honest take: would I use this, what's it good at, where does it fall down, how does it fit the worldview |
| **What I'd do differently** | One line of reflection in the closer (third mandatory opinion beat) |
| **"Have a Go" section** | 3–4 practical exercises for the reader |
| **Fellow hungovercoder closer** | "Well done… fellow hungovercoder" or "On to lesson N, fellow hungovercoder" or another peer-to-peer beat. Never ends with the word "Conclusion" as a heading |
| **Themed example data** | All synthetic data — customer names, SKUs, project names — uses the priority order: alcohol (Tiny Rebel preferred), dogs, food, films, geek stuff, music. Never alice/bob/sku-A/foo/bar |
| **Corporate filler check** | No "leverage" (as a verb, except ironically), "robust", "best-in-class", "solution" (as a noun for software), "seamless", "empower", "stakeholder", "journey" (unless literal). British spellings used (`flavour`, `colour`, `behaviour`) |
| **Length appropriateness** | Concept-only lessons ≈ 500–900 words; hands-on lessons ≈ 1,000–1,500 words. Anything past 2,000 should justify itself |
| **Hands-on accuracy** | If the lesson references runnable code/config files, those files exist alongside the README in the lesson directory, and they look like they'd run as-is with no editing |
| **Top framing line** | A sentence or two placed immediately after the want-led opener, explicitly framing hungovercoders as the *guided path* and naming the canonical source the lesson draws from (vendor docs, official course, etc.) |
| **Sources and further reading** | A `## Sources and further reading` section sits before the closer, with the canonical vendor doc(s) plus 1–2 community alternatives and a pointer to the References lesson. Each link has a short qualifier explaining why the reader would click it. Closer remains the last thing the reader sees |
| **References lesson** | The series's final lesson is `docs/<NN>-references-and-further-reading/README.md` — a customer-facing reference page presented as a lesson so it shows in the tutorial sidebar. Per-lesson sources are consistent with it (no contradictions, no random extra canonical sources not noted at the series level) |

For each lesson, produce a structured report:
- Pass/fail per criterion (with specific quotes for any failures — file path, the offending text, and *why* it fails)
- A one-line overall verdict per lesson (e.g. "passes — solid honest moment and verdict" or "fails — no themed data, generic opener, missing verdict section")

**Step 4 — Cross-lesson consistency**

After per-lesson reviews complete, do a series-level pass in the main session:

- **Order integrity** — lessons are numbered consecutively without gaps or duplicates; frontmatter `order` matches the directory number
- **Series name** — `series:` frontmatter value is identical across every lesson
- **Cross-references** — any "see lesson N" or "we covered this in lesson X" pointer resolves to an existing lesson with matching content
- **Voice consistency** — the same metaphor families and self-deprecation patterns recur naturally across the series; no jarring tonal switches between lessons
- **Difficulty ramp** — broad complexity increases from lesson 1 to the final; nothing advanced before its prerequisite
- **Themed-data threading** — example data themes don't contradict between lessons (no random switch from Welsh craft beer to wine country examples)
- **Concept follow-through** — concepts introduced in early lessons get referenced or built on later where relevant; no abandoned setups
- **Capstone integrity** — the final lesson genuinely synthesises earlier material, not just repeats it

**Step 5 — Write the report**

Create `~/.claude/reviews/` if missing. Write the full report to `~/.claude/reviews/<series>-YYYY-MM-DD.md` (today's date). The report structure:

```markdown
# Series Review — <series> — <date>

## Summary

- N lessons reviewed
- M lessons passing every criterion
- K issues found (P high-priority, Q medium, R low)
- Overall verdict in one sentence

## Per-lesson findings

For each lesson, a section with:
- Title and path
- Criterion-by-criterion pass/fail with specific quotes for failures
- One-line lesson verdict

## Series-level findings

Cross-cutting issues with specific lesson references.

## Recommendations (in priority order)

1. Highest-impact fix first, with file path + line and exact change
2. ...
```

**Step 6 — Report to the user**

Print a concise summary to the chat:
- Headline pass/fail (and how many lessons cleared every criterion)
- Top three priority issues with file paths
- Path to the full report
- A one-line suggestion for what to fix first

Don't restate the full report in chat — it's in the file, and the user can open it.

**Notes on running this**

- This skill assumes the voice content is installed at `~/.claude/hungovercoders/voice/` via `install-skills.sh`. If those files don't exist, stop and tell the user to run the installer.
- The report file is *personal* — written to the user's `~/.claude/reviews/` directory. It is **not** committed to the series repo. The author reviews, fixes, and the diff itself is the record.
- For series under active development, expect to re-run this after each batch of lesson changes. The report is cheap to regenerate.
