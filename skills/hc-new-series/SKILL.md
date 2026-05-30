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

The AGENTS.md **must include a Sources convention section** stating the hungovercoders brand promise (per the voice guide: hungovercoders is a guided path, not the source of truth) and naming the two per-lesson requirements:

> **Sources convention.** Every lesson must include (a) a **top framing line** placed immediately after the want-led opener, naming the canonical source for the lesson's topic and framing this series as the guided path alongside it, and (b) a `## Sources and further reading` section placed before the closer, listing the canonical vendor doc(s) plus 1–2 community alternatives and a pointer to the References lesson. The series-wide canonical reference list lives as the **References and Further Reading lesson** — the last numbered lesson in `docs/` — so it's discoverable in the tutorial navigation like any other lesson page; per-lesson sources draw from there plus lesson-specific WebSearches.

`CLAUDE.md` — single line: `@AGENTS.md`

`README.md` — one paragraph overview of the series: what it teaches, who it's for, and a link to `https://hungovercoders.com/training/<SLUG>`.

`docs/` — empty directory (lessons go here).

**The final lesson of every series must be a `<NN>-references-and-further-reading/README.md`** — the series-level reference page presented as a lesson so it's discoverable in the sidebar like any other page. Template (write the actual content after Step 2 once the canonical references are identified):

```markdown
---
title: "References and Further Reading"
series: <SLUG>
order: <NN>
description: "Every authoritative reference, recommended alternative path, practice tool, and community resource this series leans on — the bookmark page for after you finish"
canonical_url: https://hungovercoders.com/training/<SLUG>/<NN>-references-and-further-reading
---

I wanted one page I could bookmark for the day after I finish the series — the consolidated list of every authoritative reference this series points at, every alternative learning path worth recommending, every practice tool that moves the needle, and the communities worth following.

This lesson is the series-wide reference page. The canonical sources for <TOPIC> are below — open them when you need authoritative detail and treat this series as the guided path through them, not the source itself.

## The Canonical References

| Reference | What it gives you |
|---|---|
| [<Official docs / spec / vendor reference>](<URL>) | <one-line job> |

## Recommended Alternative Paths

| Resource | When to reach for it |
|---|---|
| [<Course / book / blog>](<URL>) | <one-line job> |

## Practice and Reinforcement

| Resource | What it gives you |
|---|---|
| [<Practice tool / community>](<URL>) | <one-line job> |

## How to Use This Lesson

Don't read it like a lesson. Bookmark it. Open it when you need an authoritative reference, when you're picking a follow-up path, or when someone asks for the source.

## Sources and further reading

This lesson IS the sources and further reading. Everything above is the reference set.

---

Closing line in the dataGriff voice.
```

Populate the References lesson based on the research in Step 2 — at minimum the canonical vendor doc + one community alternative + (if cert-prep) one practice exam vendor + the community forum or subreddit.

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

**Step 3 — Wire into the site (on a branch)**

The site is the only thing Cloudflare deploys, so the series wiring lives on a feature branch in the site repo until you're ready to publish. Cloudflare auto-deploys a preview URL for every non-`main` branch — that's how you review the new series end-to-end before customers see it.

In `~/dev/hungovercoders/site/`:

```bash
git fetch origin
git checkout main && git pull --ff-only origin main
git checkout -b series/<SLUG>
```

If `series/<SLUG>` already exists locally (because the author started the work and came back to it), `git checkout series/<SLUG>` instead. If the working tree has uncommitted changes when you arrive, **stop and surface them** rather than branching over them — they may be the author's in-progress work.

On the new branch:

- Append `"learn.<SLUG>"` to the `REPOS` array in `scripts/fetch-training-repos.sh`.
- Run `./scripts/link-local-repos.sh` to symlink the new repo for local dev.

The learn.* repo itself stays on `main` — it isn't deployed anywhere customer-facing; it's only source content the site fetches at build time. Everything customer-visible lives on the site branch.

**Step 4 — Initialise git**

Run `git init` in `~/dev/hungovercoders/learn.<SLUG>/`.
Add all files and make an initial commit: `chore: initial scaffold for learn.<SLUG>`

**Step 5 — Push learn.<SLUG> to GitHub (user step, confirm before continuing)**

Before the site branch can be pushed, the `learn.<SLUG>` repo must exist on GitHub — otherwise `fetch-training-repos.sh` will fail at the Cloudflare build and the preview will be red.

Tell the user to:

1. Create the public repo at `https://github.com/hungovercoders/learn.<SLUG>` (or run `gh repo create hungovercoders/learn.<SLUG> --public --description "<one-line series description>" --source ~/dev/hungovercoders/learn.<SLUG> --remote origin --push` if they prefer the CLI).
2. Confirm back when done so the skill can proceed to Step 6.

**Stop here and wait** for the user to confirm. Do not run Step 6 until they say the learn.* repo is on GitHub — pushing the site branch before then guarantees a broken preview build.

**Step 6 — Commit, push, and open the draft PR on the site repo**

With learn.<SLUG> live on GitHub, the site branch is safe to push. The first commit on the branch triggers the Cloudflare preview *and* opens the draft PR — that way the work is remote (safe), the preview URL exists for review, and there's a single PR thread for the whole series + launch.

In `~/dev/hungovercoders/site/`:

```bash
git add scripts/fetch-training-repos.sh
git commit -m "chore: wire learn.<SLUG> into training repos"
git push -u origin series/<SLUG>

gh pr create \
  --draft \
  --base main \
  --head series/<SLUG> \
  --title "Series: <Topic Title>" \
  --body "$(cat <<'EOF'
New tutorial series: **<Topic Title>** — `learn.<SLUG>`.

This PR stays in **draft** until the series + launch post are ready for review.

- Repo: https://github.com/hungovercoders/learn.<SLUG>
- Live URL (after merge): https://hungovercoders.com/training/<SLUG>
- Cloudflare preview: see the deployment check on this PR

Workflow:
1. `/hc-write-lessons` inside the learn.<SLUG> repo (lessons land on main of that repo as they're written; the site picks them up on next preview build)
2. `/hc-launch` from this site repo on this branch (writes the launch blog post + share image)
3. `/hc-review-series`, `/hc-review-blog`, `/hc-preflight` for independent passes
4. Mark this PR ready for review, then merge to publish
EOF
)"
```

If `gh` is not installed or not authenticated, fall back to: push the branch, then tell the user to open the draft PR in the GitHub web UI with the body above.

**Step 7 — Report**

Tell the user:
- What was created in the learn.<SLUG> repo (file list)
- The site repo branch (`series/<SLUG>`) is pushed; draft PR number + URL (from `gh pr create` output)
- The Cloudflare preview will appear as a deployment check on the PR within a minute or two
- That they can now run `/hc-write-lessons` from inside the learn.<SLUG> repo, then `/hc-launch` from the site (still on this branch) — `/hc-launch` will commit the blog post onto this same PR
- The PR stays in **draft** until the series + launch post pass `/hc-review-*` and `/hc-preflight`; marking ready for review + merging is what publishes
