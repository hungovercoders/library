---
name: hc-review-blog
description: Voice and structural review of a single hungovercoders blog post against the dataGriff voice guide and blog template
allowed-tools: Read, Glob, Grep, Bash(ls:*), Bash(wc:*), Bash(mkdir:*), Write
argument-hint: <optional path or slug — defaults to the most recent post in src/content/blog>
---

Review a hungovercoders blog post for voice, structure, opinion beats, and metadata. Run this from `~/dev/hungovercoders/site/`. Default to the newest post in `src/content/blog/` (excluding `_drafts/`); otherwise treat `$ARGUMENTS` as either a slug (`2026-05-25-quick-beer-with-bento`) or an absolute path to a `.md` file.

**Step 1 — Load context**

Read in full before reviewing anything:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — voice rules, opinion beats, title and opener formulas, metaphor library, eight-point self-check. **Section 1a (Truth in first-person) is load-bearing.**
- `~/.claude/hungovercoders/voice/datagriff-facts.md` — the source of truth for first-person claims. Every "I + verb" / "I'd" / "I've" / "the first time I" sentence in the post under review must cite a fact here or be impersonal.
- `~/.claude/hungovercoders/voice/blog-tutorial-template.md` — mandatory structure including the verdict section
- `src/content.config.ts` (if present) — blog frontmatter schema, so you know what's required

**Mandatory pass — fabrication audit.** Before the eight-point self-check, sweep every first-person claim with a specific detail (number, duration, physical reaction, named moment, named person/place). For each, confirm it's cited in `datagriff-facts.md` (topic + fact short title). Flag any that isn't. Unsourced first-person specifics are a P0 review finding — they break the brand promise of honest content.

**Step 2 — Resolve the target**

If `$ARGUMENTS` is empty, list `src/content/blog/*.md` (excluding the `_drafts/` directory), sort by filename descending, pick the first. Otherwise treat the argument as a slug (look up `src/content/blog/<slug>.md`) or a path. If the file doesn't exist, stop and report. Print the resolved path to the user before reviewing.

Capture the slug — the filename without `.md`. You'll need it to check for the matching share image.

**Step 3 — Score the post**

Read the post in full. Use `wc -w` for word count. Then score against the criteria below — **PASS** or **FAIL** for each, with a short quote and the *why* on every fail.

| Criterion | What good looks like |
|---|---|
| Frontmatter completeness | `title`, `date`, `author: dataGriff`, `description`, `tags` (array including `hungovercoders`), `image.path` all present |
| Description hygiene | `description` is one sentence with no trailing period |
| Title pattern | Matches one of: *Quick Beer with X*, *X with Y*, *Deploy X on Y*, *X for/with Z*, *Adding X to Y*. Flag if it defaults to *Quick Beer with X* when the post isn't actually a short single-tool tutorial |
| Want-led opener | First sentence uses one of the four formulas (The Want / The Rabbit Hole / The Confession / The Cheat). Never a definition or faceless intro |
| Day-context texture | Opener weaves in a real-world moment (warm afternoon, dogs walked, BBQ, etc.) — at least one concrete personal detail |
| Pre-Requisites section | Brief plain bullet list, 3–4 items max |
| Whistle-stop tour | A short section naming the topic's main features, 5–8 bullets, each one sentence. Reader leaves knowing the shape of the topic |
| Composing demo | One working example that combines at least three of the series' headline features — not a single-feature walkthrough |
| Honest moment | Mid-post sentence proving a real person built this ("I'll be honest", "first time I ran this", "this cost me an hour", etc.) |
| Verdict section | Near-end section answering "would I actually use this?" or "how I actually use this" — with worldview hook |
| What I'd do differently | One reflective line in the closer |
| Fellow hungovercoder closer | "Well done… fellow hungovercoder" or another peer-to-peer beat. Never ends with the word "Conclusion" |
| Themed example data | Synthetic data follows priority: alcohol → dogs → food → films → geek → music. **Within a single post, theme stays consistent** (a film post shouldn't carry beer-brand emails) |
| Corporate filler | No "leverage" (verb, unless ironic), "robust", "best-in-class", "solution" (noun for software), "seamless", "empower", "stakeholder", "journey" (unless literal), "production-grade" |
| British spellings | `flavour`, `colour`, `behaviour`, `organisation`, `prioritisation` etc. — not American spellings |
| Links | Both the series link (`https://hungovercoders.com/training/<slug>`) and the GitHub repo link present and well-formed |
| Length | 1,500–2,500 words. Note actual word count vs target |
| Share image presence | `image.path` points at `/assets/<slug>/link.png`; verify the file exists at `public/assets/<slug>/link.png` |

**Step 4 — Uniqueness check against the previous 2–3 posts**

List `src/content/blog/*.md` (excluding `_drafts/`), sort by date descending, take the 2–3 most recent posts *before* the one under review. Capture each one's title pattern, opener formula, and three of its themed section headings. Flag any of:

- This post reuses the most recent post's title pattern (e.g. two consecutive *Quick Beer with X*)
- This post reuses the most recent post's opener formula
- This post reuses ≥ 2 themed headings from the most recent post

The voice guide is explicit: opinion-beat and closer repetition is brand consistency, but title pattern and opener repetition is monotony.

**Step 5 — Write the report**

Create `~/.claude/reviews/` if missing. Write the report to `~/.claude/reviews/blog-<slug>-YYYY-MM-DD.md` (today's date). Structure:

```markdown
# Blog Post Review — <slug> — <date>

## Summary

- File: <absolute path>
- Word count: <N> (target 1,500–2,500)
- M of 18 criteria passing
- Headline verdict in one sentence

## Criterion-by-criterion findings

For each criterion: PASS / FAIL with a quote-and-why on every FAIL.

## Uniqueness check

- This post's title pattern: <pattern>
- This post's opener formula: <formula>
- Previous post(s): <list with their patterns and formulas>
- Verdict: distinct / repeats previous

## Recommendations (priority order)

1. Highest-impact fix first — file location + exact change suggested
2. ...
```

**Step 6 — Report to the user**

Print to chat:
- Headline verdict (passing / needs work)
- Pass count out of 18 criteria
- The top 3 priority issues with file location and exact text to change
- Path to the full report
- One-line suggestion for what to fix first

Don't restate the full report in chat.

**Notes on running this**

- This skill is intentionally separate from `hc-launch` so a post can be reviewed *after* writing — `hc-launch` runs the voice checks at write time, this gives an independent second pass.
- For a series-wide review of training content (lessons in `learn.*` repos), use `hc-review-series` instead.
- If the report file already exists for today, overwrite it — only the latest run matters.
