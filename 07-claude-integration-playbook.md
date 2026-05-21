# Integrating Claude into the Hungovercoders Workflow

> How to make all the context we've built (voice guide, templates, roadmap, OKRs) actually drive day-to-day work — without re-uploading the same files every time, and without losing the voice when Claude does the drafting.

This is the operational layer underneath all the strategy docs. Get this right and the content system *compounds* — every time you ship a post, Claude can use your previous posts, your voice guide, and your roadmap as live context. Get it wrong and the voice guide is a doc that sits in a folder while you fight Claude to sound like you on every new chat.

---

## The fundamental shift to grasp

Claude doesn't remember anything between sessions by default. This is the single most important thing to internalise. Every chat starts blank.

So the integration question isn't *"how do I make Claude smarter?"* — it's *"how do I make sure the right context loads automatically at the right moment, with the lowest friction possible?"*. The docs we've built are the *context*. The integration is the *plumbing* that gets the right docs into Claude at the right time.

There are three surfaces where Claude integrates into your workflow, in increasing order of automation:

1. **Claude.ai (the chat product)** — interactive drafting and brainstorming
2. **Claude Code (the terminal/IDE tool)** — repo-aware writing and editing
3. **GitHub Actions via the official Claude Code GitHub integration** — automated PR review, draft assistance, and editorial feedback on every push

We'll use all three for different jobs. Below is how to set each up and what each is genuinely best for.

---

## Surface 1 — Claude.ai for drafting and brainstorming

The chat product is where you start. It's right for *thinking out loud, brainstorming, drafting from a blank page, and getting feedback on existing drafts*. It's wrong for *fiddling with already-good content that lives in a repo* — that's what Claude Code is for.

### Setup: build the context system into Claude.ai itself

Claude.ai has two features that turn it from a generic chatbot into a hungovercoders-aware assistant:

**Projects.** A Project in Claude.ai is a workspace where you can attach reference documents that load into every chat in that Project. This is exactly the right home for the voice guide, blog template, YouTube script template, roadmap, and OKRs. Create one Project called *"hungovercoders content"* and attach all six markdown files to it. Every chat you start inside that Project has those docs loaded automatically.

Setup steps:

1. In Claude.ai, click "Projects" in the sidebar and create a new project called *"hungovercoders"*.
2. Add a project description — paste a 2–3 paragraph summary of who dataGriff is, what the brand stands for, and what kind of help you'll typically want. This becomes the project's system prompt.
3. Upload all the markdown files (voice guide, both templates, worked example, roadmap, OKRs) as project knowledge.
4. Every new chat in the project now has all of this loaded. You don't need to paste the voice guide every time.

**Custom styles.** Claude.ai supports custom writing styles. You can train one called *"dataGriff voice"* by feeding it 5–10 of your existing posts and letting Claude infer the patterns. Once configured, you toggle it on and Claude defaults to writing in voice without you having to explicitly invoke the voice guide. Useful for quick drafting work where you don't want to load the whole project context. Setup is in Claude.ai settings → custom styles. Worth the 20 minutes once.

### What Claude.ai is genuinely best for

- **Drafting new blog posts from scratch.** You paste in a few notes from your real build experience — "I built X this weekend, here's what broke, here's the verdict" — and Claude turns it into a draft on the blog template, in voice, with the opinion beats present. You then edit for taste.
- **Brainstorming the next series.** "Given what's in the roadmap and the bento series went well, what should series 2 be? Give me three options with reasoning." Claude has the roadmap loaded; you get usable answers.
- **Writing YouTube scripts from blog posts.** "Take this blog post and adapt it to the YouTube script template. Maintain the opinion beats but restructure for video pacing." This works well because both templates are loaded.
- **Quarterly OKR scoring.** "Score Q1 against the OKRs in the project knowledge based on what I just told you about the quarter."
- **Editorial feedback on drafts.** "Here's my draft. Run it against the eight-point self-check in the voice guide. Tell me which beats are missing or weak."

### Discipline rules for Claude.ai use

- **Never paste output straight to the blog without editing for the opinion beats.** Claude will produce the honest moment, the verdict, and the what-I'd-do-differently line — but they'll be plausible-sounding rather than *real*. You have to substitute your actual lived experience. This is the load-bearing part of the system and the part Claude literally cannot do for you.
- **Treat first drafts as scaffolding, not finished work.** The voice guide explicitly endorses this: *"AI drafts the walkthrough, you write the opinion beats"*. A draft that comes back 70% there is a draft that needs your 30% — not 70% of your work done.
- **Be explicit when you're showing the AI in shot.** If you want to do build-in-public-with-AI posts ("I asked Claude to scaffold this and here's what it got wrong"), keep the original AI output and your corrections — they're the content. Don't delete the rough draft after editing.

---

## Surface 2 — Claude Code for repo-aware writing and editing

Claude Code is the command-line tool that runs inside a repository, reads your codebase and content as context, and can edit files directly. It's the right tool for *content that already exists in a repo* — your blog itself, your training material, the GitHub repos you build for tutorials.

### Setup: install and configure

Claude Code is an npm package. Install it once, configure per repository:

```bash
npm install -g @anthropic-ai/claude-code
```

Once installed, navigate to any repo and run `claude` in the terminal. The official docs map is at `https://docs.claude.com/en/docs/claude-code/overview`. Worth a read before you start configuring.

### Setup: the CLAUDE.md pattern

The single highest-ROI thing in Claude Code is the **CLAUDE.md file at the root of each repo**. Claude reads this automatically on every invocation in that repo. It's where you put the project-specific context Claude needs to be useful.

For your **blog repo** (the Astro/Jekyll codebase), the CLAUDE.md should include:

1. A pointer to the voice guide: *"All writing in this repo follows the hungovercoders voice guide at `docs/voice-guide.md`. Read it before editing any post."*
2. A pointer to the blog template: *"New posts use the structure at `docs/blog-template.md`. Verify the three opinion beats are present before saving."*
3. Repo conventions: where posts live, frontmatter requirements, filename format, tag conventions.
4. The five-question check from the voice guide, restated. Claude scans this on every edit.

For your **library repo** (the public operating handbook — voice guide, templates, worked example, roadmap, OKRs, technical spec, integration playbook), the CLAUDE.md says "these are reference documents for the hungovercoders brand; do not modify without explicit instruction; the voice guide is the most-read file and gets fed into AI tools as a system prompt".

For **tutorial code repos** (like `learn.bento`), the CLAUDE.md is technical — the project's purpose, the README structure, code style, what to test. This is the standard developer use of CLAUDE.md.

### The recommended repo structure

To make this concrete, here's the structure I'd suggest:

```
github.com/hungovercoders/
├── .github/                         # org public profile page
│   └── profile/README.md
│
├── library/                         # PUBLIC — the operating handbook
│   ├── CLAUDE.md
│   ├── voice-guide.md               # the codified voice
│   ├── blog-tutorial-template.md
│   ├── youtube-script-template.md
│   ├── bento-worked-example.md
│   ├── relaunch-roadmap.md
│   ├── okrs.md
│   ├── claude-integration-playbook.md
│   └── tech-implementation.md
│
├── ops/                             # PRIVATE — manifesto + operational data
│   ├── CLAUDE.md
│   ├── operating-manual/
│   │   └── personal-manifesto.md    # the one document that stays personal
│   └── migration/, runbooks/, analytics/, etc.
│
├── site/                            # PUBLIC — Astro site (post-migration)
│   ├── CLAUDE.md                    # references voice guide from public library
│   ├── src/
│   │   ├── content.config.ts        # blog collection + training collection
│   │   │                            #   (training reads from sibling learn.* repos)
│   │   ├── content/
│   │   │   ├── blog/                # canonical: blog posts live here
│   │   │   └── pages/               # about, worldview, work-with-me
│   │   └── ...
│   └── ...
│
├── brand/                           # PUBLIC — logos, palette, fonts
│
├── learn.bento/                     # PUBLIC — tutorial code + lesson content
│   ├── CLAUDE.md
│   ├── content/                     # long-form lesson markdown (rendered by site)
│   └── examples/                    # runnable code (cloned/forked by users)
│
└── (future tutorial repos with the same content/examples split)
```

The key move is the **almost-everything-public stance**. The library (public) holds the entire operating handbook — voice guide, templates, plans, technical spec, and worked example. Building in the open is the brand statement. The ops repo (private) holds only the personal manifesto (private reflection, not craft) and the operational data (redirect maps, runbooks, analytics — sensitive for operational reasons rather than IP reasons). Every other repo's CLAUDE.md references the library directly, no auth needed. Claude.ai's Project can load both the library and the manifesto since the Project itself is private.

**The tutorial repos play a dual role** worth knowing about when working with Claude Code on them: they're both the forkable runnable tutorial *and* the content source for the training section of the site. The `content/` directory holds long-form lesson markdown (with frontmatter for the site's Content Loader); the `examples/` directory holds runnable code. When Claude is asked to add a new lesson to a tutorial repo, it needs to update both — the lesson content (in voice) and the runnable example (tested). See section 4.5 and 5.8 of the tech implementation doc for the mechanics.

### What Claude Code is genuinely best for

- **Editing existing blog posts.** "Run the voice-guide self-check on `src/content/blog/2026-05-20-bento-hello-world.md`. Flag any failures." Claude reads the post and the voice guide, returns a structured critique.
- **Bulk operations on existing content.** "Add a 'Verdict' section to every blog post in `src/content/blog/2024/*` that's missing one. Draft a verdict in voice based on the post's content; I'll review each."
- **Creating new posts from notes.** "Here's a notes file at `drafts/bento-csv-input-notes.md`. Turn it into a full blog post following the blog template. Save to `src/content/blog/`."
- **Generating YouTube scripts from blog posts.** "Read the published post at `src/content/blog/2026-05-20-bento-hello-world.md`. Generate a YouTube script following the script template. Save to `drafts/youtube/`."
- **Code-and-content tasks.** "I'm adding example 02 to the learn.bento repo. Help me write the README, the YAML config, and the blog post that goes with it." Claude can do all three because it sees the whole repo.

### Discipline rules for Claude Code use

- **Don't let Claude commit directly to main.** Configure it to make changes on a branch and open a PR you review. This is the same rule as for human contributors — review before merge.
- **Pre-approve commands.** Claude Code asks before running shell commands by default. Keep that on. Whitelist `npm`, `git`, etc. as you build a comfort level; never blanket-approve.
- **Treat repo edits as drafts until reviewed.** Same opinion-beats rule as Claude.ai: the AI did the structural work; you do the lived-experience work in the edit pass.

---

## Surface 3 — GitHub Actions for automated review

The most "set and forget" surface. Once configured, every PR you open in your content repos gets automatic review from Claude — checking the post against the voice guide, flagging missing opinion beats, suggesting improvements. You read the comments, accept what's useful, dismiss what isn't.

### What it does

Claude Code has an official GitHub integration via the `anthropics/claude-code-action` workflow. With it, you can:

- **Tag `@claude` in a PR or issue comment** and Claude responds — reviewing code, drafting an implementation, answering a question with full repo context.
- **Configure automatic review on every PR** — Claude posts a review comment within minutes of the PR opening, with feedback on the proposed changes.
- **Define repo standards in CLAUDE.md** that Claude follows consistently across all reviews.

### Setup for the hungovercoders site repo

In the new Astro site repo, add a workflow file at `.github/workflows/claude-review.yml`:

```yaml
name: Claude Editorial Review

on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - 'src/content/blog/**'
      - 'src/content/training/**'

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          prompt: |
            Review the changed blog or training content in this PR against the
            voice guide and blog template at the root of the repo. Check
            specifically for:

            1. Want-led opener in first sentence
            2. Themed section headings (not generic)
            3. Honest moment beat present in the walkthrough
            4. Verdict section present near the end
            5. What-I'd-do-differently line in the closer
            6. No "Conclusion" heading
            7. Voice is on-brand (read voice-guide.md sections 2, 5, 6)

            Be constructive, not exhaustive. Flag the 2-3 most important
            issues — not every minor thing. End with a one-line verdict:
            ship as-is, needs minor edits, or needs structural rework.
```

The `${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}` is set up via the Claude Code GitHub app installation — full setup steps at `https://docs.claude.com/en/docs/claude-code/github-actions`. Worth following the docs rather than my summary because the exact OAuth flow changes faster than this document will.

### The publishing workflow once this is live

1. You draft a new post on a branch — either in your editor, or via Claude.ai, or via Claude Code locally.
2. You commit to a branch and open a PR.
3. Within a minute, Claude posts an editorial review comment against the voice guide.
4. You read the comment. Some of it you accept; some you reject. You make edits accordingly.
5. You merge to main.
6. The site deploys automatically (Azure Static Web Apps from the existing setup).

That's it. Three minutes of editorial review on every post, every time, with zero ongoing effort from you. The voice guide doesn't drift because it's enforced on every PR. The opinion beats don't get skipped because they're checked on every PR.

### Discipline rules for the GitHub Actions surface

- **The Action is an editor, not a maintainer.** It can suggest, not decide. You always have the final call.
- **Limit it to content paths.** The workflow above only runs on `src/content/blog/**` and `src/content/training/**` — don't let it run on code changes or it'll burn through API tokens reviewing irrelevant diffs.
- **Tune the prompt over time.** After a month, you'll spot patterns in what Claude flags that you don't care about, or things it misses that matter. Edit the prompt accordingly. The prompt is itself versioned content.

---

## A worked workflow: from idea to published post

To make the full picture concrete, here's what publishing a blog post looks like once all three surfaces are wired up. This is the steady-state, post-phase-3 workflow.

**Step 1 — Capture the idea, in real time.**
You build something on a weekend (say, bento example 03). As you go, you keep a scratchpad in a notes app or a `drafts/` folder. You write a one-sentence verdict the moment you have one, while it's fresh. This is the "verdict scratchpad" the roadmap mentions — the thing that protects you from having to summon an opinion at midnight before a publish deadline.

**Step 2 — Generate the first draft.**
Open the hungovercoders Claude.ai Project. New chat. Paste your scratchpad notes:

> *"Built bento example 03 this weekend — file-to-file with a Bloblang transform. Here are my notes [paste]. Verdict: Bloblang is the bit that makes Bento worth using; without it Bento is just a YAML config tool. The error messages are still rough. Would I use this for a CSV-to-JSON conversion in production? Yes. Draft me a blog post using the blog template, in voice, with the three opinion beats woven through. I'll supply the real verdict text and edit."*

Claude returns a draft. You read it.

**Step 3 — Edit for the opinion beats.**
The honest moment, the verdict section, and the what-I'd-do-differently line in the draft will all be plausible-sounding placeholders. Replace each with your actual lived experience. This is the load-bearing 20% of the work.

**Step 4 — Move to the repo.**
Save the edited draft as a markdown file in the Astro site repo on a branch. Commit. Open a PR.

**Step 5 — Automated editorial review.**
Claude Code Action posts a review within a minute. It flags two issues: section 3's heading is generic ("Adding the Transform"), should be themed; and the verdict section's third paragraph drifts away from the worldview. You fix both.

**Step 6 — Merge and publish.**
PR merges, Azure Static Web Apps builds and deploys, post goes live at `hungovercoders.com/blog/...`.

**Step 7 — Generate the YouTube script.**
Back in Claude Code locally: *"Read the post I just published at `src/content/blog/2026-05-25-bento-file-to-file.md`. Generate a YouTube script using the script template. Save to `drafts/youtube/2026-05-25-bento-file-to-file-script.md`."* You review, edit the on-camera honest take in your own words, film when you're ready.

Total active time: maybe 2 hours of real work, spread across the week. Compared to writing a post from scratch (4–6 hours) and writing a script from scratch (another 2 hours), this is the difference between the system being sustainable on a day-job schedule and not.

---

## What integration *won't* do for you

A few things to be clear-eyed about:

- **Claude won't generate the opinion beats.** It'll generate sentences that *sound like* opinion beats, but they're plausible placeholders, not your actual lived take. The whole AI-proofing argument from the voice guide depends on you supplying these. If you let Claude generate them and you publish without substitution, you've shipped a tutorial an AI could have written — exactly the failure mode the voice guide exists to prevent.
- **Claude won't decide what to write about.** Topic choice is yours. Claude can help brainstorm, but the choice of which build to do, which tool to actually use this week, which view to form — that's the bit only you can do because it's grounded in your real work.
- **Claude won't know your blog has just been migrated** (or any other current event) unless you tell it. The context window is finite. When something changes that affects the workflow — domain migration, framework switch, new tool added — update the CLAUDE.md and the Project knowledge to match. Stale context produces stale output.
- **Claude won't enforce discipline you don't want enforced.** If you keep dismissing the GitHub Action's "missing verdict section" comment, the Action keeps flagging it, you keep dismissing it, and eventually you'll publish posts without verdicts. The system is only as strong as your willingness to listen to it.

---

## Recommended setup order

A phased rollout that maps onto the roadmap:

**Phase 1 (now) — Claude.ai Project.** Lowest friction, highest immediate benefit. Create the Project, upload the six docs, start drafting using it. This is doable in 30 minutes today.

**Phase 2 (roadmap phase 2, during the Astro rebuild) — Claude Code + CLAUDE.md.** When you're already in the repo doing the Astro migration, add a CLAUDE.md to the new site repo. Get the muscle memory for running Claude Code locally during the build.

**Phase 3 (roadmap phase 3 or 4) — Create the dedicated content repo.** Split the voice guide, templates, roadmap, and OKRs out into their own repo so they're version-controlled and can be referenced from elsewhere. The migration is easy because they're already markdown.

**Phase 4 (roadmap phase 4 or 5, just before the bento launch) — GitHub Actions.** Wire up the automated editorial review on the site repo. Tune the prompt over the first 2–3 posts. By the time the bento series launches, the Action is reliable.

**Phase 5 (ongoing) — Refine and expand.** As you spot patterns in your workflow, add custom slash commands in Claude Code, custom prompts in the GitHub Action, or new sections in the CLAUDE.md files. The system gets sharper over time, the same way the voice guide will.

---

## The honest moment for this doc

I've described the *best-case* integration. Reality will be messier:

- The Claude.ai Project will sit unused for a fortnight while you're busy. That's fine. Come back to it.
- The CLAUDE.md will lag behind reality — you'll change a convention and forget to update the file. Audit it quarterly.
- The GitHub Action will occasionally flag things that aren't real issues, or miss things that are. The prompt needs iteration.
- The "2 hours per post" estimate assumes the system is bedded in. The first 5 posts using this workflow will take longer than writing them by hand. The compounding kicks in around post 6.

The point isn't perfection on day one. The point is: a system where each new post is *slightly easier* than the last, where the voice doesn't drift because it's enforced at multiple checkpoints, and where Claude does the structural work so you can focus on the lived-experience work that AI can't do.

That's what integrates Claude into the workflow without replacing the dataGriff in it.

Cheers, fellow hungovercoder. Time to wire it all up.
