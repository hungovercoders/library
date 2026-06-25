---
name: hc-launch
description: Write a launch blog post for a hungovercoders tutorial series and verify the site build
allowed-tools: Read, Write, Bash
---

Write a launch blog post for a tutorial series. Run this from `~/dev/hungovercoders/site/`.

Arguments: $ARGUMENTS (expected format: `<series-slug> [day context]`)
- SLUG: first word (e.g. `claude-code`)
- DAY CONTEXT: everything after (e.g. `Sunday morning, second coffee, dog asleep on the sofa`) — used for the opener. If absent, write a generic want-led opener.

**Step 0 — Ensure we're on a publish branch, not `main`**

The launch post must not land on `main` directly — `main` is the live site. Cloudflare deploys every non-`main` branch as a preview URL, so the workflow is: write on a branch, push, review the preview, then merge to `main` to publish.

In `~/dev/hungovercoders/site/`:

```bash
git status --short
git branch --show-current
```

Decide based on the current state:

- **Already on `series/<SLUG>`** (set up earlier by `hc-new-series`): use this branch. Don't switch.
- **On `main`** with a clean tree: check whether `series/<SLUG>` exists locally or on the remote (`git rev-parse --verify series/<SLUG>` / `git ls-remote --heads origin series/<SLUG>`). If it exists, `git checkout series/<SLUG>` (and pull). If it doesn't (standalone launch with no associated training series), create `blog/<slug-of-title>` once you've picked the title in Step 2 — `git checkout -b blog/<slug>`.
- **On `main`** with uncommitted changes: **stop and surface them**. They may be the author's in-progress work, and you shouldn't branch over them.
- **On a different branch** entirely: surface what branch and ask before continuing. Don't silently switch.

Record the resolved branch name — Step 4 will reference it.

**Step 1 — Load context**

Read in full:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — **Section 1a (Truth in first-person) is load-bearing.**
- `~/.claude/hungovercoders/voice/facts/README.md` — per-topic facts convention.
- `~/.claude/hungovercoders/voice/facts/<topic-slug>.md` — the source of truth for first-person claims about this topic. Slug derived from the launching series' repo name (strip the `learn.` prefix: `learn.<topic>` → `<topic>.md`). Load **only this file**.
- `~/.claude/hungovercoders/voice/blog-tutorial-template.md`

**Truth check before writing.** If the matching `voice/facts/<topic-slug>.md` doesn't exist or has no entries, stop and tell the user. Offer two paths: (1) call `/hc-datagriff-interview <topic>` to capture real anecdotes first, or (2) write the launch post with impersonal framing for the `I wanted…` and `honest moment` beats. Do not proceed by inventing personal specifics — a launch post is a high-visibility surface where invented details corrode the brand promise fastest.

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

**AI tells sweep — do this before Step 3.** After the draft is complete, grep the file for `—` (em dash) and aim for zero. Replace each with a comma, colon, semicolon, or a rewritten sentence (see Section 8a of the voice guide for the decision table). Also scan for: "It's worth noting…", adjective stacking ("simple, clean, and idiomatic"), and bullet lists where a paragraph would read better. The em-dash sweep takes 30 seconds; skipping it is how AI fingerprints make it onto the live site.

**Step 2c — Optional screenshots**

If the post is walkthrough-shaped (an install, a setup session, a "here's what I did" demo where visual proof helps the reader) invoke `/hc-screenshot <slug>` after the draft is written. Walk through the post's beats with the writer; capture at the natural moments — the command they ran and its output, the CI check page they're describing, the dashboard state at the verdict moment. Drop the returned embed snippets into the post body at the matching headings.

The skill owns the convention: `public/assets/<slug>/<name>.png` (use `step-NN-<what>.png` for ordered walkthroughs, free-form kebab-case for one-offs), site-absolute paths in the markdown embed, alt text that says what's *informative* about the shot. Browser captures (PR pages, Cloudflare preview, metatags.io) are user-driven from their browser; the skill emits the path + filename for them to save to.

Skip this step entirely for opinion / verdict / retro posts where text carries the load. `link.png` (the social card from Step 2.1) is separate — it always ships; inline screenshots are an addition.

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

**Step 4 — Commit, push, and ensure the draft PR exists**

First commit on a branch should always land on a remote draft PR — that's how the work gets backed up off-machine and how Cloudflare's preview URL appears.

From `~/dev/hungovercoders/site/` on the resolved branch:

```bash
git add src/content/blog/YYYY-MM-DD-<slug>.md public/assets/YYYY-MM-DD-<slug>/link.png
git commit -m "feat: launch blog post for <Topic Title>"
git push -u origin <branch>
```

Then check whether a PR already exists for this branch (it usually does if `hc-new-series` ran earlier in the series):

```bash
gh pr list --head <branch> --json number,url,isDraft --jq '.[0]'
```

- **If a PR exists**: leave it alone. The push above already updated it; the Cloudflare preview will redeploy with the new post. Capture its `number` and `url` for the report.
- **If no PR exists** (standalone launch, no series wiring): open a draft PR now.

  ```bash
  gh pr create \
    --draft \
    --base main \
    --head <branch> \
    --title "Blog: <Title>" \
    --body "$(cat <<'EOF'
  New blog post: **<Title>**.

  - Path: /blog/YYYY-MM-DD-<slug>/
  - Share image: public/assets/YYYY-MM-DD-<slug>/link.png
  - Cloudflare preview: see the deployment check on this PR

  Stays in **draft** until `/hc-review-blog` and `/hc-preflight` pass. Mark ready for review + merge to publish.
  EOF
  )"
  ```

If `gh` is unavailable or unauthenticated, fall back to: push the branch (already done), tell the user to open the draft PR via the GitHub web UI using the body above.

**Step 5 — Report**

Tell the user:
- URL path: `/blog/YYYY-MM-DD-<slug>/` (derived from the chosen title)
- Title pattern chosen and opener formula chosen
- Build status (pass/fail)
- **Branch**: the resolved branch from Step 0
- **Share image**: the path of the generated `public/assets/YYYY-MM-DD-<slug>/link.png` and the tagline you used — they can swap in a custom image at the same path if they want something fancier than the auto-branded card
- **Draft PR**: number + URL (either the existing one updated by this push, or the new one just opened)
- **Cloudflare preview**: appears as a deployment check on the PR within a minute or two — preview URL is on the PR page
- **Next steps before publishing**:
  1. Open the preview URL — confirm the post renders, share image shows, training links resolve
  2. Run `/hc-review-blog` for an independent voice/structural pass
  3. Run `/hc-preflight` for the site-wide gate (build, OG, sitemap)
  4. When all clean, **mark the PR ready for review and merge to `main`** — the merge is what publishes; `git push` on the branch only updates the preview
- **Metatags.io reminder**: paste the preview URL into `https://metatags.io/` to confirm Twitter / LinkedIn / Slack previews render correctly. This is the SEO sanity check the old Jekyll setup did via `jekyll-seo-tag` and the new site does via the `BaseHead` component.

A note on what's *required* vs what varies. Required across every launch post: the want-or-equivalent personal opener, themed example data, the three opinion beats (honest moment, verdict, what I'd do differently), the "fellow hungovercoder" closer, British spellings, no corporate filler. Those are the brand. **Title pattern, opener formula, themed section headings, and the specific demo composition should vary post-to-post** — that's how the corpus stays interesting across thirty entries instead of reading like one templated voice.
