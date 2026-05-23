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
- `~/dev/hungovercoders/library/datagriff-voice-guide.md`
- `~/dev/hungovercoders/library/blog-tutorial-template.md`

Then read the first 3 lesson `README.md` files from `training-repos/learn.<SLUG>/docs/` (sorted by `order` frontmatter). These give you the material for the post.

**Step 2 — Write the blog post**

Create `src/content/blog/YYYY-MM-DD-quick-<SLUG>.md` (today's date).

The post must:

1. **Frontmatter** — `title`, `date` (today), `author: dataGriff`, `description` (one sentence, no period), `tags` (array including the topic and `hungovercoders`)

2. **Pre-Requisites section** — brief: what needs to be installed, 3–4 bullet points max.

3. **Want-led opener** — first sentence opens with "I wanted…" or similar personal desire. Weave in the day context naturally if provided (warm afternoon, dogs walked, barbecue, whatever it is — this is the texture that proves a real person wrote it). 1–2 paragraphs maximum.

4. **Build ONE complete working example** — not a walkthrough of every lesson, but a single end-to-end example the reader can run right now from the post alone. Show the code/config in full. Explain the key parts. This is the "proof of work" section.

5. **The complete config/code block** — a single copy-paste-ready block at the end of the walkthrough.

6. **Three opinion beats** (non-negotiable — the AI-proofing layer):
   - **Honest moment** mid-walkthrough: one sentence proving you ran this yourself
   - **Verdict section** near the end: "Would I Actually Use X?" — honest take: yes for tactical use cases, caveats for others, the worldview fit
   - **What I'd do differently** — one line in the closer

7. **Links** — to the full series (`https://hungovercoders.com/training/<SLUG>`) and the GitHub repo (`https://github.com/hungovercoders/learn.<SLUG>`)

8. **Closer** — "Well done…fellow hungovercoder" beat. One or two sentences. End with energy, not a trail-off.

**Step 3 — Verify**

Run `npm run build` from the site directory. Confirm the post renders without errors.

**Step 4 — Report**

Tell the user the URL path (`/blog/YYYY-MM-DD-quick-<SLUG>/`) and confirm the build passed. Remind them to commit and push.
