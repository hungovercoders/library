---
name: hc-write-lessons
description: Write all lesson content for the current learn.* series using the dataGriff voice guide
allowed-tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---

Write tutorial lessons for the current series. Run this from within a `learn.*` repo after stub lesson directories exist.

Optional context in $ARGUMENTS — e.g. "focus on practical demos, hooks are the highlight" — shapes emphasis but does not override the voice guide.

**Step 1 — Load context**

Read the following files in full before writing anything:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — voice, tone, opinion beats, themed headings, all of it. **Section 1a (Truth in first-person) is load-bearing** — re-read it.
- `~/.claude/hungovercoders/voice/facts/README.md` — per-topic facts convention (one file per topic; slug derived from repo name).
- `~/.claude/hungovercoders/voice/facts/<topic-slug>.md` — the source of truth for every first-person claim about this topic. The slug is the current repo name with the `learn.` prefix stripped (e.g. `learn.claude-code` → `voice/facts/claude-code.md`). Load **only this file**, not the whole `voice/facts/` directory.
- `~/.claude/hungovercoders/voice/blog-tutorial-template.md` — structure reference
- `AGENTS.md` in the current repo — series conventions, topic, frontmatter rules
- The repo's **References lesson** at `docs/<NN>-references-and-further-reading/README.md` (if present — by convention the last lesson in the series). It is the canonical reference set for the series and the source list every lesson's "Sources and further reading" section draws from. If the repo doesn't yet have one, propose creating it as the final lesson before writing the rest (see hc-new-series for the template).

**Truth check before writing.** If the matching `voice/facts/<topic-slug>.md` doesn't exist or has no entries, stop and tell the user. Offer two paths: (1) call `/hc-datagriff-interview <topic>` to capture real anecdotes first, or (2) write the lessons with impersonal framing for the `I wanted…` and `honest moment` beats. Do not proceed by inventing personal specifics.

**Step 2 — Survey the lesson stubs**

List all directories under `docs/`. For each one, check whether `README.md` is a stub (frontmatter only, empty description) or already has content. Report the list to the user before writing.

**Step 3 — Write each stub lesson in order**

Before writing each lesson, use WebSearch to find — the search now has **two outputs**:
1. **Content accuracy** — the official documentation section most relevant to this lesson's topic, and one or two real-world examples, common patterns, or community-discovered gotchas.
2. **Sources list** — the URLs you'll cite in the lesson's `## Sources and further reading` section. The canonical vendor doc, plus 1–2 community alternatives (a respected course, a high-quality blog post, an authoritative community page) where they exist. These complement the series-wide `SOURCES.md` with lesson-specific pointers.

Use this research to ensure the lesson content is accurate and reflects how people actually use the feature in practice — not just what the spec says. The honest-moment beat needs to come from a real quirk or tripping point you found, not a manufactured one.

For each stub lesson, write a complete `README.md` following these rules:

*Frontmatter* — fill in the `description` field (one sentence, no trailing period) and confirm all other fields are correct.

*Structure* — every lesson must have:
1. **Want-led opener** — first sentence is "I wanted…" or equivalent personal desire. Sets up why this lesson matters.
2. **Top framing line** — one or two sentences placed immediately after the opener (and before pre-reqs) explicitly framing hungovercoders as the *guided path* and naming the canonical source. Example: *"This lesson is dataGriff's path through X — opinionated, hands-on, slightly hungover. The canonical source is `<vendor docs URL>`; use this series alongside, not instead of, that."* Pull the canonical source from the References lesson (`docs/<NN>-references-and-further-reading/README.md`).
3. **Themed section headings** — not generic ("Run it") but beer/dogs/music/films/geek flavoured ("Getting the Round In", "Cracking Open the Config", "Pouring the Logic").
4. **The substance** — explain the concept, show the code/config, explain each part.
5. **Honest moment** — one sentence mid-lesson proving a real person built this: "I'll be honest…", "First time I ran this…", "This is the bit the docs don't mention…"
6. **Have a go** — 3–4 practical exercises for the reader.
7. **Sample exam questions** (if the series's AGENTS.md requires them) — the existing convention for cert-prep series.
8. **`## Sources and further reading`** — placed before the closer. A structured list of:
   - The canonical vendor doc page(s) for this lesson's topic
   - 1–2 community alternatives (course, blog post, well-known guide) where they exist
   - A pointer to **the References lesson** at `docs/<NN>-references-and-further-reading/` for the consolidated series-wide reference page

   Frame each link with one short qualifier so the reader knows why they'd click it (e.g. *"Canonical reference for the six pillars"* or *"Stéphane Maarek's CLF-C02 course — the most popular alternative path"*).
9. **Fellow hungovercoder closer** — "Well done on your X, fellow hungovercoder" or a handoff: "On to lesson N, fellow hungovercoder."

*Example data* — all synthetic data, customer names, SKUs, and config examples must be themed in this priority order: 1. alcohol (Tiny Rebel craft beer preferred), 2. dogs, 3. food, 4. films, 5. geek stuff, 6. music. Never use generic placeholders (alice/bob, sku-A/B/C).

*Hands-on lessons* — if the lesson needs a runnable config or code file, create it alongside the README. It must run as-is with no editing required.

*Diagrams and visuals* — if a lesson moment would land harder with a diagram (the cage you're building, a settings hierarchy, a flow of dispatched subagents, a terminal-output mockup), invoke `/hc-diagram` rather than describing the visual idea in prose only. The brand visual system — palette, typography, layout shapes — lives in that skill and stays consistent across the series. For behavioural recordings (hooks firing, agents acting, etc.), reference `CAPTURE-GUIDE.md` if the current repo ships one.

**Step 4 — Commit, push, and nudge the site preview**

After every 3 lessons (or at the end of a partial final batch):

1. **Commit on the learn.\* repo:** `feat: add lessons NN–NN <series> content`
2. **Push to origin/main:** `git push origin main`
3. **Nudge the site PR preview.** Cloudflare watches the **site** repo, not learn.\* repos — so a push to learn.\*/main does NOT rebuild the site PR preview on its own. After pushing learn.\*, run from inside the site repo (still on `series/<SLUG>` from `/hc-new-series`):

   ```sh
   cd ~/dev/hungovercoders/site
   git commit --allow-empty -m "chore: trigger preview rebuild for <SLUG> lessons NN–NN"
   git push
   ```

   Cloudflare then rebuilds the PR preview, `fetch-training-repos.sh` re-clones learn.\*/main, and the fresh lessons render at the preview URL. Without this nudge, the PR preview keeps serving the previous build and the lessons you just pushed are invisible until the next site-branch push.

This gap is structural — it applies to any learn.\* repo, not just this one — so the nudge step is part of every batch. (Production has no gap: when the series PR merges to site/main, the production build runs `fetch-training-repos.sh` and picks up everything in learn.\*/main.)

**Step 5 — Report**

When all stubs are written, tell the user how many lessons were written, which (if any) were skipped because they already had content, and what to do next (run `/hc-launch` from the site to write the launch blog post, then `/hc-review-series` and `/hc-preflight` before marking the PR ready for review).
