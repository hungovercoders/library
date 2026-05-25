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
```

Capture: branch name, untracked files, modifications. If `--strict` and there are unstaged changes, flag this as P2 — publish should ideally happen from a clean tree.

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
| `tags` is an array containing `hungovercoders` | P1 |
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

- **P0 — must fix before publish.** Build failures, missing required frontmatter, missing OG images that would fall back to placeholder, duplicate training orders.
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

Verdict: <ready to publish | fix P0 first | …>
```

Exit non-zero if `--strict` and any P0 or P1 issue exists.

**Notes on running this**

- Run this immediately before `git push` to main. It's the publish gate.
- Build is the first gate — everything else assumes the build passed.
- This skill does **not** check voice or content quality. For that, run `hc-review-blog` or `hc-review-series` separately.
- If `training-repos/` is empty (deliberate exclusion of all series), the training half of the audit is skipped — that's fine, not a failure.
