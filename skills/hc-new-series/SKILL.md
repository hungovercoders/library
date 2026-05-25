---
name: hc-new-series
description: Scaffold a new learn.<slug> tutorial series repo and wire it into the hungovercoders site
allowed-tools: Bash, Read, Write, Edit, WebSearch, WebFetch
---

Scaffold a new hungovercoders tutorial series. Arguments: $ARGUMENTS (expected format: `<topic-slug> "<Topic Title>"` e.g. `claude-code "Claude Code"`)

Parse $ARGUMENTS to extract:
- SLUG: the first word (e.g. `claude-code`)
- TITLE: everything in quotes (e.g. `Claude Code`)

Then do the following in order:

**Step 1 — Create the repo directory and core files**

Create `~/dev/hungovercoders/learn.<SLUG>/` with:

`AGENTS.md` — adapt the structure from `~/dev/hungovercoders/learn.bento/AGENTS.md` for this new topic. The file describes the **repo's own conventions only** — what the series covers, lesson directory layout, frontmatter requirements (title, series, order, description, canonical_url pattern `https://hungovercoders.com/training/<SLUG>/NN-slug`), YAML/code style for the topic. Do **not** add `@` includes pointing at the library — the hungovercoders voice guide and blog template are loaded by the hc- skills at run time from `~/.claude/hungovercoders/voice/`, so the new repo stays self-contained and portable.

`CLAUDE.md` — single line: `@AGENTS.md`

`README.md` — one paragraph overview of the series: what it teaches, who it's for, and a link to `https://hungovercoders.com/training/<SLUG>`.

`docs/` — empty directory (lessons go here).

**Step 2 — Research the topic and propose a lesson plan**

Use WebSearch and your own knowledge to research:
- The official documentation / getting-started guide for TITLE
- Common learning paths people follow (tutorials, course outlines, community guides)
- What the "hello world" through "production-ready" progression looks like for this tool/topic
- Real gotchas, sharp edges, and things people wish they'd known earlier

Based on the research, design a lesson plan of 8–12 lessons that:
- Starts with "What is X?" and "Installation" (every series does)
- Follows a logical complexity ramp: concept → first hands-on → core features → advanced → production patterns
- Ends with testing, troubleshooting, or a full end-to-end example
- Mixes concept-only lessons with hands-on lessons that have runnable examples (matching the learn.bento shape)

Present the proposed lesson plan to the user as a numbered list with a one-line description for each lesson. Ask: "Does this look right? Add, remove, or reorder anything before I create the stubs."

Once the user approves (or provides changes), create stub `docs/NN-slug/README.md` files (NN = zero-padded number, slug = kebab-case lesson title) with this frontmatter and nothing else:

```markdown
---
title: "<Lesson Title>"
series: <SLUG>
order: <N>
description: ""
canonical_url: https://hungovercoders.com/training/<SLUG>/NN-slug
---
```

**Step 3 — Wire into the site**

Append `"learn.<SLUG>"` to the `REPOS` array in `~/dev/hungovercoders/site/scripts/fetch-training-repos.sh`.

Run `./scripts/link-local-repos.sh` from `~/dev/hungovercoders/site/` to symlink the new repo for local dev.

**Step 4 — Initialise git**

Run `git init` in `~/dev/hungovercoders/learn.<SLUG>/`.
Add all files and make an initial commit: `chore: initial scaffold for learn.<SLUG>`

**Step 5 — Report**

Tell the user:
- What was created
- That they need to create `github.com/hungovercoders/learn.<SLUG>` and push: `git remote add origin https://github.com/hungovercoders/learn.<SLUG>.git && git push -u origin main`
- That they can now run `/hc-write-lessons` from inside the new repo to write all the lesson content
