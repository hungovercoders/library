---
name: hc-preflight
description: Site-wide pre-publish health check — frontmatter, share images, metatags, sitemap, build, and draft leakage
allowed-tools: Read, Glob, Grep, Bash, Write
argument-hint: <optional — pass --strict to fail on any warning, or a path to limit scope to one post>
---

Pre-flight check for the hungovercoders site before publish. Run from `~/dev/hungovercoders/site/`. Walks the site's content, build output, and config to surface anything that would degrade a published post or break a metatags preview. Produces a punch list, not pass/fail per file.

If `$ARGUMENTS` contains a path or slug, scope checks to that file plus the site-wide checks (build, sitemap). Otherwise run the full audit. `--strict` flag exits non-zero if any P0/P1 issue is found.

**Step 1 — Establish the working state**

```bash
cd ~/dev/hungovercoders/site
git status --short
git branch --show-current
```

Capture: branch name, untracked files, modifications.

Branch expectations:
- **Preflight is intended to run on a feature branch** (`series/<slug>` or `blog/<slug>`) before merging to `main`. The Cloudflare preview for that branch is what you're validating; merge-to-`main` is what publishes.
- **If on `main`**: flag as P1 with the note *"preflight is normally run on the publish branch before merge — if you've already merged, the work below is post-mortem rather than gating; if you haven't branched yet, you're about to publish straight to live"*.
- **If on a feature branch with uncommitted changes**: that's expected mid-flow. Note it informationally. If `--strict`, flag as P2 — the merge-to-main step needs a committed tree.
- **If on a feature branch with a clean tree**: ideal state. Note the branch in the report so the user knows what they're about to merge.

**Step 2 — Build the site**

```bash
npm run build 2>&1 | tee /tmp/hc-preflight-build.log
```

Capture exit code. If non-zero, build failed — **stop the audit here** and report the build error as the only finding. Everything else is moot until it compiles.

If the build succeeds, note any warnings in the log (Astro deprecation warnings, missing image dimensions, etc.) as P2 findings.

**Step 3 — Blog post frontmatter sweep**

For every `.md` file in `src/content/blog/` (excluding `_drafts/`), check:

| Check | Severity |
|---|---|
| `title` present and non-empty | P0 |
| `date` present and parses as a date | P0 |
| `author` present (typically `dataGriff`) | P1 |
| `description` present, non-empty, and **no trailing period** | P1 |
| `tags` is a non-empty array (the site hides a `hungovercoders` tag, so it is not required) | P1 |
| `image.path` present and starts with `/assets/<slug>/` | P0 |
| `image.path` file exists at `public/<image.path>` (i.e. `public/assets/<slug>/link.png`) | P0 |
| Filename matches `YYYY-MM-DD-<slug>.md` | P1 |
| Slug in filename matches the slug component of `image.path` | P1 |

Report each violation with the exact file path and the offending line.

**Step 4 — Training lesson frontmatter sweep**

If `training-repos/` contains any linked repos, walk every `training-repos/*/docs/*/README.md` and check:

| Check | Severity |
|---|---|
| `title`, `series`, `order`, `description`, `canonical_url` all present | P0 |
| `description` non-empty and **no trailing period** | P1 |
| `order` value matches the directory's leading number (e.g. `02-foo/` → `order: 2`) | P1 |
| `canonical_url` starts with `https://hungovercoders.com/training/<series>/` | P1 |
| Directory has no duplicate `order` value across the series | P0 |

If `training-repos/` is empty (because of an exclude list), report this as informational, not a failure.

**Step 5 — Built output spot checks**

For each blog post that built into `dist/client/blog/<slug>/index.html`, grep the HTML for:

```bash
grep -oE '(og:image|og:type|og:url|twitter:image|<link rel="canonical")[^>]*' dist/client/blog/<slug>/index.html
```

Verify:
- `og:type = article`
- `og:url` is absolute (`https://hungovercoders.com/blog/<slug>/`)
- `og:image` is absolute and points at `/assets/<slug>/link.png` — **not** at the generic placeholder `_astro/blog-placeholder-...jpg`
- `canonical` is absolute and matches `og:url`

Don't sample — check every post. This is the cheap version of running every URL through metatags.io.

**Step 5b — Inline asset references resolve**

For each blog post and training lesson, grep the markdown for site-absolute asset references (`/assets/<slug>/<name>.<ext>`) — typically inline screenshots embedded via `hc-screenshot` — and confirm each referenced file exists under `public/<that-path>`. Flag broken references as **P2** (warning, not block): the build won't fail on a missing image, but the post renders with a broken `<img>` and the reader sees nothing.

```bash
# from inside src/content/blog/<slug>.md, find every /assets/<slug>/<file>.<ext>
grep -oE '/assets/[^)"'\'' ]+\.(png|jpg|jpeg|webp|svg|gif)' src/content/blog/<slug>.md \
  | sort -u \
  | while read ref; do
      [ -f "public${ref}" ] || echo "MISSING: $ref (referenced in $post)"
    done
```

Same logic for training lessons under `training-repos/<series>/docs/<NN>-<lesson>/README.md`, checking against `public/assets/training/<series>/<lesson>/`.

The existing `image.path` frontmatter check (Step 3) covers the social card (`link.png`) as P0 — that's the unmissable one. This step catches the broader case where a writer added `![diagram](/assets/<slug>/step-04.png)` to the body but forgot to drop the file in. `hc-screenshot`'s own emit step is meant to prevent it, but the check is the belt-and-braces.

**Step 5c — Personal and account details**

The rule is section 1b of `~/.claude/hungovercoders/voice/datagriff-voice-guide.md`. Any real hit is **P0**.

Text first. Search every published post and every linked training lesson, then read each hit; stand-ins such as `me@example.com` and `123456789012`, and the public `info@hungovercoders.com`, are fine:

```bash
grep -rnE '\b[0-9]{12}\b|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}|AKIA[0-9A-Z]{16}' \
  src/content/blog --exclude-dir=_drafts training-repos/*/docs 2>/dev/null
```

Then images, which a text search cannot see. List the images this branch adds or changes and open each one with the Read tool:

```bash
git diff --name-only --diff-filter=AM origin/main...HEAD -- public/assets \
  | grep -E '\.(png|jpg|jpeg|webp|gif|svg)$'
```

Look at shell prompts, browser address bars, cloud console corners, email headers and anything typed into a form. For a video, open its poster frame and the GIF. Report each finding with the file path and what is showing; the fix is to crop, mask or retake, never to blur.

**Step 5d — Linked repositories are public and presentable**

A post that sends readers to a repo they cannot open is broken. For every `github.com/<owner>/<repo>` link in a post this branch adds or changes, without credentials:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://github.com/<owner>/<repo>
curl -s -o /dev/null -w '%{http_code}\n' https://raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md
curl -s -o /dev/null -w '%{http_code}\n' https://raw.githubusercontent.com/<owner>/<repo>/HEAD/LICENSE
```

- The repo answers 404: it is private or missing. **P0** if the post's steps depend on files in it, **P1** if it is only a "the code is here" link.
- No README at the root: **P1**. No licence: **P2**.
- If the post names files in the repo (`scripts/…`, `infra/…`), confirm they are on its default branch, not only on a working branch: **P1** when they are not.

If a request is refused by a proxy rather than answered by GitHub, report "not checked" and do not guess. A repo about to be made public also has its history published; section 1b of the voice guide says what to check first.

**Step 5e — Secrets scan and reading time**

Two things the pipeline or the reader will catch if this step does not.

- **Run the repo's secrets scan before pushing** (`task ss:security:secrets` in the site repo). A post that quotes scripts or config can trip it on something harmless, such as a public key fingerprint. A real secret is **P0**. A false positive is **P1**: allow that one value in `.gitleaks.toml` with a comment saying what it is and why it is public, never the whole file.
- **Read the reading time on each new post's built page** (`grep -o '[0-9]* min read' dist/client/blog/<slug>/index.html`) and compare it with the two posts before it. A figure well above what the prose justifies, or over about 20 minutes, is **P1**: it puts readers off, and it usually means collapsed code is being counted as reading.

**Step 6 — Sitemap and feeds**

- `dist/client/sitemap-index.xml` exists
- Sitemap references every published blog post URL
- `dist/client/rss.xml` exists and the most recent published post appears in it
- Spot-check the page count in the sitemap against the count of built `dist/client/blog/*/index.html` files

**Step 7 — Draft leakage and exclude integrity**

- Confirm no `src/content/blog/_drafts/*.md` content appears in the build output (`grep -r "_drafts" dist/client/` returns nothing for content paths — `_drafts` may legitimately appear in pagefind indexes; ignore those)
- Read `scripts/fetch-training-repos.sh` and `scripts/link-local-repos.sh`. If either has an `EXCLUDE` list, list the excluded items as informational so the user remembers what's deliberately hidden

**Step 8 — Nav and empty-state sanity**

- `dist/client/training/index.html` either lists series cards or shows the "coming soon" empty state — confirm one of those is rendered, not a broken middle ground
- Every nav link in the header (`/`, `/blog`, `/training`, `/about`) resolves to a built `index.html`

**Step 9 — Produce the punch list**

Group findings by severity:

- **P0 — must fix before publish.** A personal or account detail in text or an image, build failures, missing required frontmatter, missing OG images that would fall back to placeholder, duplicate training orders.
- **P1 — should fix before publish.** Trailing periods on descriptions, mismatched order vs directory, missing tags, missing British spellings if egregious.
- **P2 — worth fixing soon.** Build warnings, uncommitted changes, schema drift.

For each finding include:
- Severity
- Exact file path (and line number where relevant)
- One-line description
- One-line suggested fix (e.g. "drop trailing period from `description:`")

**Step 10 — Report to the user**

Print to chat:

```
hc-preflight — <date> <time>

Branch: <current branch>  (publish target: main)
Build: PASS / FAIL
P0 issues: N
P1 issues: M
P2 issues: K

P0:
  - <file>: <issue> → <fix>
  ...

P1:
  - <file>: <issue> → <fix>
  ...

Verdict: <ready to merge to main | fix P0 first | …>
```

If the verdict is "ready to merge to main", remind the user the actual publish step is the merge — `git push` on the branch only updates the preview URL.

Exit non-zero if `--strict` and any P0 or P1 issue exists.

**Notes on running this**

- Run this on the publish branch immediately before merging to `main`. It's the publish gate — the merge is what goes live, `git push` on the branch only updates the Cloudflare preview.
- Build is the first gate — everything else assumes the build passed.
- This skill does **not** check voice or content quality. For that, run `hc-review-blog` or `hc-review-series` separately.
- If `training-repos/` is empty (deliberate exclusion of all series), the training half of the audit is skipped — that's fine, not a failure.
