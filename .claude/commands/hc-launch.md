---
description: Write a launch blog post for a hungovercoders tutorial series and verify the site build
allowed-tools: Read, Write, Bash
---

Write a launch blog post for a tutorial series. Run this from `~/dev/hungovercoders/site/`.

Arguments: $ARGUMENTS (expected format: `<series-slug> [day context]`)
- SLUG: first word (e.g. `claude-code`)
- DAY CONTEXT: everything after (e.g. `Sunday morning, second coffee, dog asleep on the sofa`) — used for the opener. If absent, write a generic want-led opener.

**Step 1 — Load context**

Read in full:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md`
- `~/.claude/hungovercoders/voice/blog-tutorial-template.md`

Then survey the **whole** series — the blog has to summarise the topic, not just the bit the demo touches:

- Read every `training-repos/learn.<SLUG>/docs/*/README.md` for **at least its frontmatter** (`title` + `description`) so you know the topic's full scope. Use parallel Read calls.
- Read the **first lesson** in full — gives you opener context, voice grounding, and the "what is this" framing.
- Read the **final lesson** in full — almost always the capstone where the topic's features compose. This is the structural model the blog should mirror.
- For series with fewer than 6 lessons, read every lesson in full.

**Step 2 — Write the blog post**

Create `src/content/blog/YYYY-MM-DD-quick-<SLUG>.md` (today's date).

The post should read as **a succinct summary of the topic plus one working demo that proves the features compose**. A reader who reads this post and nothing else should leave knowing (a) what the topic is for, (b) the main concepts it ships, and (c) how those concepts fit together — with one runnable thing they built along the way.

The post must:

1. **Frontmatter** — `title`, `date` (today), `author: dataGriff`, `description` (one sentence, no period), `tags` (array including the topic and `hungovercoders`)

2. **Pre-Requisites section** — brief: what needs to be installed, 3–4 bullet points max.

3. **Want-led opener** — first sentence opens with "I wanted…" or similar personal desire. Weave in the day context naturally if provided (warm afternoon, dogs walked, barbecue, whatever it is — this is the texture that proves a real person wrote it). 1–2 paragraphs maximum.

4. **A whistle-stop tour of the topic** — one short section that names the topic's main features or concepts with one sentence each. Five to eight bullets, derived from the lesson titles and descriptions surveyed in Step 1. The reader leaves knowing the shape of the topic, not just the slice the demo touched. This is the "summary" half of the post.

5. **Build ONE complete working example that composes multiple features from the series** — not a walkthrough of every lesson, and **not a demo of a single feature in isolation**. The example must use **at least three of the series' headline features working together** — usually mirroring the shape of the capstone lesson. Show the code/config in full. Call out which feature is doing what as you go ("this bit is the skill, this bit is the hook, this bit is the subagent"). Where the series recommends one form over another (skills over plain slash commands, hooks over `settings.json` deny rules, project-scope MCP over user-scope, etc.) the demo **must use the recommended form** — a launch post that quietly models the deprecated or older shape undermines the lesson's own guidance. This is the "proof of work" section, and the structural argument that the topic's pieces are designed to compose.

6. **The complete config/code block** — a single copy-paste-ready block (or short set of blocks if the demo spans multiple files) at the end of the walkthrough.

7. **Three opinion beats** (non-negotiable — the AI-proofing layer):
   - **Honest moment** mid-walkthrough: one sentence proving you ran this yourself
   - **Verdict section** near the end: "Would I Actually Use X?" — honest take: yes for tactical use cases, caveats for others, the worldview fit
   - **What I'd do differently** — one line in the closer

8. **Links** — to the full series (`https://hungovercoders.com/training/<SLUG>`) and the GitHub repo (`https://github.com/hungovercoders/learn.<SLUG>`)

9. **Closer** — "Well done…fellow hungovercoder" beat. One or two sentences. End with energy, not a trail-off.

**Length target:** 1,500–2,500 words. Long enough to summarise the topic and demo a real composition; short enough to read in one sitting before the next round.

**Step 3 — Verify**

Run `npm run build` from the site directory. Confirm the post renders without errors.

**Step 4 — Report**

Tell the user the URL path (`/blog/YYYY-MM-DD-quick-<SLUG>/`) and confirm the build passed. Remind them to commit and push.
