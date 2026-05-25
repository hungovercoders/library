---
name: hc-launch
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

**Step 1b — Uniqueness pass against recent posts**

List the most recent 2–3 files in `src/content/blog/` (sort by date in filename, descending). Read each and capture:

- **Title pattern** used — one of: *Quick Beer with X*, *X with Y* (verb tells the story), *Deploy X on Y*, *X for/with Z* (multi-component), *Adding X to Y* (incremental)
- **Opener formula** used — one of: *The Want* ("I wanted…"), *The Rabbit Hole* ("I recently went down a rabbit hole of…"), *The Confession* ("I've been meaning to…"), *The Cheat* ("This blog is a bit of a cheat…")
- Two or three of the **themed section headings** used in the walkthrough

The new post **must use a different title pattern and a different opener formula from the most recent post**, and should reach for different themed section headings. Repetition of opinion beats and the "fellow hungovercoder" closer is brand consistency; repetition of title patterns, openers, and themed headings is monotony. The voice guide documents five title patterns and four opener formulas precisely so the corpus varies across them.

**Step 2 — Write the blog post**

**Pick the title pattern first.** Choose from the five documented patterns based on the post's actual shape:

| Pattern | Use when the post is… |
|---|---|
| *Quick Beer with X* | A short single-tool tutorial. Don't default to this; it's overused. |
| *X with Y* | The verb tells the story (e.g. *Protecting Code Quality with Trunk.io*) |
| *Deploy X on Y* | Deployment-focused |
| *X for/with Z* | Multi-component infrastructure |
| *Adding X to Y* | An incremental addition to an existing thing |

Pick the pattern that fits the topic *and* differs from the most recent post's pattern (from Step 1b).

**Then derive the filename** as `src/content/blog/YYYY-MM-DD-<slug>.md` where `<slug>` is the kebab-case of the chosen title — `2026-05-24-quick-beer-with-claude-code.md`, `2026-06-01-deploy-bento-on-fly.md`, `2026-06-15-adding-mcp-to-an-existing-cli.md`. **Do not hardcode `quick-<SLUG>`** — the filename follows the title.

The post should read as **a succinct summary of the topic plus one working demo that proves the features compose**. A reader who reads this post and nothing else should leave knowing (a) what the topic is for, (b) the main concepts it ships, and (c) how those concepts fit together — with one runnable thing they built along the way.

The post must:

1. **Frontmatter** — `title`, `date` (today), `author: dataGriff`, `description` (one sentence, no period), `tags` (array including the topic and `hungovercoders`), and an `image` block pointing at the post's share image:

   ```yaml
   image:
     path: /assets/YYYY-MM-DD-<slug>/link.png
   ```

   The Astro schema reads this and renders absolute `og:image` / `twitter:image` tags pointing at `https://hungovercoders.com/assets/...`. Posts without it fall back to a generic placeholder, which kills social sharing — every post must have its own `link.png` (1200×630).

   **Generate the share image** after writing the post by running `scripts/generate-share-image.mjs`:

   ```bash
   node scripts/generate-share-image.mjs <slug> "<title>" "<tagline>"
   ```

   - `<slug>` is the post filename without `.md` (e.g. `2026-05-25-building-a-film-picker-with-claude-code`)
   - `<title>` is the post title (wraps to multiple lines automatically)
   - `<tagline>` is a short one-liner shown under the title — usually a compressed version of the post's `description`, or the post's "in one sentence" hook. Keep it under ~50 chars.

   The script writes `public/assets/<slug>/link.png` at 1200×630 with the hungovercoders branding. The user can replace it later with something fancier; this gets the social card live on day one.

2. **Pre-Requisites section** — brief: what needs to be installed, 3–4 bullet points max.

3. **Opener** — pick one of the four formulas from the voice guide, **different from the most recent post's opener** (from Step 1b). Use the one that's actually true for *this* post — don't pick by default:
   - *The Want*: "I wanted [thing] so that [reason]…"
   - *The Rabbit Hole*: "I recently went down a rabbit hole of [topic] and…"
   - *The Confession*: "I've been meaning to [thing] for a while now…"
   - *The Cheat*: "This blog is a bit of a cheat — it's pretty much the same as my previous post but this time…"

   Weave the day context (warm afternoon, dogs walked, BBQ, whatever it is) into whichever opener fits — that's the texture that proves a real person wrote it. 1–2 paragraphs maximum, ending on a transition into action.

4. **A whistle-stop tour of the topic** — one short section that names the topic's main features or concepts with one sentence each. Five to eight bullets, derived from the lesson titles and descriptions surveyed in Step 1. The reader leaves knowing the shape of the topic, not just the slice the demo touched. This is the "summary" half of the post.

5. **Build ONE complete working example that composes multiple features from the series** — not a walkthrough of every lesson, and **not a demo of a single feature in isolation**. The example must use **at least three of the series' headline features working together** — usually mirroring the shape of the capstone lesson. Show the code/config in full. Call out which feature is doing what as you go ("this bit is the skill, this bit is the hook, this bit is the subagent"). Where the series recommends one form over another (skills over plain slash commands, hooks over `settings.json` deny rules, project-scope MCP over user-scope, etc.) the demo **must use the recommended form** — a launch post that quietly models the deprecated or older shape undermines the lesson's own guidance. This is the "proof of work" section, and the structural argument that the topic's pieces are designed to compose.

   **Scope matching.** When a demo component can live at user level (`~/.claude/…`) or project level (`.claude/…` inside the working directory), pick the scope that matches its specificity. Kit-specific tools — ones that only work when other kit files are present — go at *project* level so they travel with the project and can be committed to its repo. Cross-cutting tools that apply to any codebase (a JSON validator, a global linter hook) go at *user* level. **Call the scope choice out for every component, not just the most novel one**, and explain *why* that scope fits — the reader is learning the distinction by watching you apply it consistently. A demo that puts a skill at project level without explaining and a hook at user level without explaining teaches nothing about the choice.

   **Match example data to the post's topic family.** The voice guide's priority order is alcohol → dogs → food → films → geek → music. When the post leans heavily on one of those families (a film-themed demo, a music-themed demo, a food-themed demo) prefer that family for *all* synthetic data — character names, email addresses, project names, domain names — even if it sits lower in the priority. A film-themed post shouldn't carry a beer-brand email address; a music post shouldn't carry pub-themed project names. Theme consistency within a post matters more than the cross-post priority order.

6. **The complete config/code block** — a single copy-paste-ready block (or short set of blocks if the demo spans multiple files) at the end of the walkthrough.

7. **Three opinion beats** (non-negotiable — the AI-proofing layer):
   - **Honest moment** mid-walkthrough: one sentence proving you ran this yourself
   - **Verdict section** near the end: an honest take grounded in your lived experience with the tool. Pick the framing that matches your stance:
     - *"Would I Actually Use X?"* — when you're experienced enough to call it. Yes for tactical use cases, caveats for others, the worldview fit.
     - *"How I Actually Use X"* — when you're a few months in and still finding the patterns. Same substance (chat-window vs codebase vs custom workflows, worldview fit) but framed as current practice rather than verdict. Use this when claiming a full verdict would overstate your experience.
     The form varies; the substance — your honest take that an AI couldn't fake — doesn't.
   - **What I'd do differently** — one line in the closer

8. **Links** — to the full series (`https://hungovercoders.com/training/<SLUG>`) and the GitHub repo (`https://github.com/hungovercoders/learn.<SLUG>`)

9. **Closer** — "Well done…fellow hungovercoder" beat. One or two sentences. End with energy, not a trail-off.

**Length target:** 1,500–2,500 words. Long enough to summarise the topic and demo a real composition; short enough to read in one sitting before the next round.

**Step 3 — Verify**

Run `npm run build` from the site directory. Confirm the post renders without errors.

Then confirm the social-sharing metadata is set correctly. Grep the built HTML for the post's OG tags:

```bash
grep -oE '(og:image|og:type|og:url|twitter:image|canonical[^>]+)' dist/blog/YYYY-MM-DD-<slug>/index.html | head -10
```

Expect to see:
- `og:type = article`
- `og:url` and `canonical` absolute (`https://hungovercoders.com/blog/...`)
- `og:image` pointing at `https://hungovercoders.com/assets/<slug>/link.png` (the file itself can be missing for now — the URL just needs to be right)

If any are wrong (e.g. `og:image` falling back to `_astro/blog-placeholder-...jpg`) the post's `image:` frontmatter wasn't picked up — fix and rebuild.

**Step 4 — Report**

Tell the user:
- URL path: `/blog/YYYY-MM-DD-<slug>/` (derived from the chosen title)
- Title pattern chosen and opener formula chosen
- Build status (pass/fail)
- **Share image**: the path of the generated `public/assets/YYYY-MM-DD-<slug>/link.png` and the tagline you used — they can swap in a custom image at the same path if they want something fancier than the auto-branded card
- **Metatags.io reminder**: once pushed and deployed, paste the post URL into `https://metatags.io/` to preview how it'll look on Twitter, LinkedIn, Slack, etc. — this is the SEO sanity check the old Jekyll setup did via `jekyll-seo-tag` and the new site does via the `BaseHead` component
- Reminder to commit and push

A note on what's *required* vs what varies. Required across every launch post: the want-or-equivalent personal opener, themed example data, the three opinion beats (honest moment, verdict, what I'd do differently), the "fellow hungovercoder" closer, British spellings, no corporate filler. Those are the brand. **Title pattern, opener formula, themed section headings, and the specific demo composition should vary post-to-post** — that's how the corpus stays interesting across thirty entries instead of reading like one templated voice.
