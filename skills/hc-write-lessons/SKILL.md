---
name: hc-write-lessons
description: Write all lesson content for the current learn.* series using the dataGriff voice guide
allowed-tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---

Write tutorial lessons for the current series. Run this from within a `learn.*` repo after stub lesson directories exist.

Optional context in $ARGUMENTS — e.g. "focus on practical demos, hooks are the highlight" — shapes emphasis but does not override the voice guide.

**Step 1 — Load context**

Read the following files in full before writing anything:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — voice, tone, opinion beats, themed headings, all of it
- `~/.claude/hungovercoders/voice/blog-tutorial-template.md` — structure reference
- `AGENTS.md` in the current repo — series conventions, topic, frontmatter rules

**Step 2 — Survey the lesson stubs**

List all directories under `docs/`. For each one, check whether `README.md` is a stub (frontmatter only, empty description) or already has content. Report the list to the user before writing.

**Step 3 — Write each stub lesson in order**

Before writing each lesson, use WebSearch to find:
- The official documentation section most relevant to this lesson's topic
- One or two real-world examples, common patterns, or community-discovered gotchas for this feature

Use this research to ensure the lesson content is accurate and reflects how people actually use the feature in practice — not just what the spec says. The honest-moment beat needs to come from a real quirk or tripping point you found, not a manufactured one.

For each stub lesson, write a complete `README.md` following these rules:

*Frontmatter* — fill in the `description` field (one sentence, no trailing period) and confirm all other fields are correct.

*Structure* — every lesson must have:
1. **Want-led opener** — first sentence is "I wanted…" or equivalent personal desire. Sets up why this lesson matters.
2. **Themed section headings** — not generic ("Run it") but beer/dogs/music/films/geek flavoured ("Getting the Round In", "Cracking Open the Config", "Pouring the Logic").
3. **The substance** — explain the concept, show the code/config, explain each part.
4. **Honest moment** — one sentence mid-lesson proving a real person built this: "I'll be honest…", "First time I ran this…", "This is the bit the docs don't mention…"
5. **Have a go** — 3–4 practical exercises for the reader.
6. **Fellow hungovercoder closer** — "Well done on your X, fellow hungovercoder" or a handoff: "On to lesson N, fellow hungovercoder."

*Example data* — all synthetic data, customer names, SKUs, and config examples must be themed in this priority order: 1. alcohol (Tiny Rebel craft beer preferred), 2. dogs, 3. food, 4. films, 5. geek stuff, 6. music. Never use generic placeholders (alice/bob, sku-A/B/C).

*Hands-on lessons* — if the lesson needs a runnable config or code file, create it alongside the README. It must run as-is with no editing required.

**Step 4 — Commit in batches**

After every 3 lessons, commit: `feat: add lessons NN–NN <series> content`

**Step 5 — Report**

When all stubs are written, tell the user how many lessons were written, which (if any) were skipped because they already had content, and what to do next (push and optionally run `/hc-launch` from the site).
