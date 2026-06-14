---
name: hc-screenshot
description: Capture and embed step-by-step screenshots for hungovercoders blog posts and training lessons — naming convention, asset-directory bootstrap, macOS screencapture recipes, and embed-snippet generation
allowed-tools: Read, Bash
---

Capture screenshots for a hungovercoders blog post or training lesson and produce the markdown embed snippets to drop into the post.

Run from anywhere — the skill writes to `~/dev/hungovercoders/site/public/assets/<slug>/<name>.png` regardless of the current working directory. Invoked from inside `hc-launch` (launch posts) and `hc-write-lessons` (tutorial lessons), but also usable directly via `/hc-screenshot <slug>`.

Arguments: `$ARGUMENTS`
- **SLUG** (required) — the post or lesson slug. For blog posts: `YYYY-MM-DD-<title-slug>` (e.g. `2026-06-14-deploy-slopstopper-on-pypi`). For training lessons: bare `<lesson-slug>` (e.g. `claude-code-skills-intro`). The slug determines the asset directory.
- **NAME** (optional, kebab-case) — the filename without extension (e.g. `step-01-preflight`). If absent the skill enters interactive walkthrough mode.
- **ALT** (optional, quoted) — alt-text for the embed snippet (e.g. `"the slopstopper-install skill's pre-flight summary, twelve checks passing"`). Defaults to a placeholder the writer should edit.

The skill never captures autonomously — every `screencapture` invocation prompts the user to focus or frame the right thing. macOS `screencapture` is the engine; the skill is the convention layer.

**Step 0 — Resolve slug and target directory**

Validate the slug. Blog post slugs must match `^[0-9]{4}-[0-9]{2}-[0-9]{2}-[a-z0-9-]+$`; lesson slugs match `^[a-z0-9][a-z0-9-]*$`. If the slug doesn't match either pattern, stop and ask the caller to correct it — wrong slugs land assets in the wrong asset directory and the post will reference broken images.

Resolve the target asset directory:

- Blog post (date-prefixed): `~/dev/hungovercoders/site/public/assets/<slug>/`
- Training lesson (no date prefix): `~/dev/hungovercoders/site/public/assets/training/<series>/<lesson>/` — but the caller (usually `hc-write-lessons`) passes the full relative subpath, so accept whatever the caller hands over as `<slug>`. Don't try to guess `series/lesson` shape.

Ensure the directory exists:

```bash
mkdir -p ~/dev/hungovercoders/site/public/assets/<slug>
```

Idempotent — `mkdir -p` is fine if the dir already holds `link.png` or other assets.

**Step 1 — Decide capture mode**

The skill ships three macOS `screencapture` modes. Pick by context, not by default — the wrong mode is the difference between a clean shot and one the writer has to re-take in GIMP:

| Mode | Command | When to use |
|---|---|---|
| **Window** | `screencapture -W -x -t png <path>` | A specific app window (Terminal, browser, IDE). User clicks the window after the command runs. No shutter sound (`-x`). Best default for a clean framed capture. |
| **Region** | `screencapture -i -x -t png <path>` | A bounded area inside a window — a single command + its output, a config block, a CI checks list. User drags to select. Use when the window has clutter (tabs, sidebars) you don't want in the shot. |
| **Full screen** | `screencapture -x -t png <path>` | Last resort. Crop in post if needed. Only worth using when the writer wants the whole-desktop framing for a "this is what I saw" beat. |

The `-x` flag silences the shutter sound — kinder to the writer's flow. The `-t png` flag forces PNG (default is also PNG, but explicit beats implicit when filenames downstream don't carry the extension by accident).

**Step 2 — Capture one moment**

If the caller passed `<NAME>` and (optionally) `<ALT>` on the command line, this is a one-shot capture — single moment, single file. Run once and skip to Step 4.

If only `<SLUG>` was passed, this is **interactive walkthrough mode**. For each moment:

1. Ask the user for the moment's name (kebab-case, e.g. `step-01-preflight` or `task-list`) and a one-line description of what they want visible.
2. Print the chosen capture command (so the user sees what's about to happen) and the target path.
3. Prompt: *"Ready when you are — switch to the window/region you want captured and press enter."* Wait for input.
4. Run the capture command. If the file ends up zero bytes or doesn't exist (`screencapture` exits 0 even on user cancellation), surface the failure to the user and offer to retry.
5. Confirm with `du -h <path>` and `file <path>` so the writer sees the file landed.
6. Emit the embed snippet (Step 3) for that one moment.
7. Ask whether there's another moment to capture, or exit the loop.

**Tip on framing.** Encourage the user to think about what's *informative* — the command that produced the output usually matters more than the output's full sprawl. A capture of just the `slopstopper --version` line + its stdout is more useful than the whole scroll-back terminal. The writer can always re-capture; it costs ten seconds.

**Step 3 — Emit the embed snippet**

For each capture, print the markdown the writer should paste into the post:

```markdown
![<alt text>](/assets/<slug>/<name>.png)
```

Notes on the path:
- **Site-absolute, not file-relative.** Matches the existing `image.path: /assets/...` convention used in blog post frontmatter (the Astro schema reads `image.path` and renders absolute `og:image` / `twitter:image` tags pointing at `https://hungovercoders.com/assets/...`).
- **Leading slash matters.** Without it, Markdown renders the link relative to the current page URL, which on a paginated blog index breaks the embed.

Notes on the alt text:
- One sentence describing what's *informative* about the screenshot — what the reader learns from seeing it. *Not* "screenshot of terminal" or "image of slopstopper output."
- Good: *"the slopstopper-install skill's pre-flight summary, twelve checks passing"*. *"`task ss:hygiene:test` exits 0 with eight subchecks complete"*. *"GitHub Actions PR checks page — 18 of 18 slopstopper workflows green on first push"*.
- Bad: *"screenshot 1"*. *"install output"*. *"the result"*.
- If the caller didn't pass `<ALT>`, emit the snippet with a placeholder like `TODO: alt text` and remind them to fix it before the post ships. The `hc-preflight` skill's image-asset check won't catch missing alt — but `hc-review-blog` will.

**Step 4 — Browser captures (the honest gap)**

The skill **cannot** drive a browser autonomously — no MCP browser screenshot server is wired in. For browser-side moments (GitHub PR checks page, Cloudflare preview URL, metatags.io preview), the skill provides the target path + filename + embed snippet, and the user takes the screenshot from their browser and drops it at that path.

Workflow for browser captures:

1. Ask the user what they want to capture and pick a kebab-case name.
2. Print the full target path: `~/dev/hungovercoders/site/public/assets/<slug>/<name>.png`.
3. Instruct: *"Take the screenshot in your browser (Cmd-Shift-4, or your screenshot tool), save it as `<name>.png` at the path above, and tell me when it's saved."*
4. Wait for the user's confirmation.
5. Verify the file exists and is non-zero (`test -s <path>`); if not, surface and re-prompt.
6. Emit the embed snippet (Step 3).

If we later add a Chrome DevTools MCP server or similar, this step becomes autonomous — but the skill's API doesn't change.

**Step 5 — Report**

After the walkthrough (interactive) or single capture (one-shot), report to the caller:

- The full list of captured filenames and their absolute paths
- The list of embed snippets (re-emitted as a single block for easy copy-paste into the post)
- A reminder that the writer should embed each snippet at the matching section heading in the post body, and update the alt text if any placeholders are still in place

Don't try to insert the embeds into the post body — that's the caller's job (`hc-launch` or `hc-write-lessons` know the post's structure; the screenshot skill doesn't).

---

## Conventions reference

**Filename pattern.** For step-by-step walkthroughs, use `step-NN-<short-description>.png` — zero-padded `NN` keeps directory listings ordered. Examples: `step-01-preflight.png`, `step-02-install-output.png`, `step-03-doctor.png`. For one-off illustrations within a post, free-form kebab-case is fine: `task-list.png`, `pr-checks.png`, `share-image-preview.png`.

**Naming what, not how.** `pr-checks.png` is better than `screenshot-of-github.png`. The name should hint at the *content* so a future reader skimming `public/assets/<slug>/` can guess what each file shows without opening it.

**Asset directory layout.** Every post owns its directory:

```
public/assets/<slug>/
├── link.png                  # the 1200×630 social card (created separately by scripts/generate-share-image.mjs)
├── step-01-preflight.png
├── step-02-install-output.png
├── step-03-doctor.png
└── pr-checks.png             # one-off, no step prefix
```

Mixing `step-NN-` files and free-form names is fine — the directory listing sorts the step files together at the top.

**Embed in the post.** Drop the snippet at the heading the screenshot supports:

```markdown
## Pre-flight checks

![the slopstopper-install skill's pre-flight summary, twelve checks passing](/assets/2026-06-14-deploy-slopstopper-on-pypi/step-01-preflight.png)

Twelve anticipatory checks — most ran clean…
```

Inline images render full-width in the site's blog layout. No `<figure>` tag needed; the alt text is the caption-equivalent for screen readers and search engines.

**What this skill does NOT do.**
- It does not generate the 1200×630 social card (`link.png`). That's `scripts/generate-share-image.mjs`, invoked separately by `hc-launch`.
- It does not edit, crop, or annotate captures. Use Preview.app or another tool for that; the captured PNG is what ships.
- It does not record video / GIF — that's the peer skill [`hc-recording`](../hc-recording/SKILL.md) (vhs / asciinema, with the asset path and embed-template conventions for behavioural moments).
- It does not insert embeds into post bodies — emits snippets only; the caller integrates them.

**When to skip the skill.** Pure opinion posts (verdicts, takes, retros) usually don't need step-by-step screenshots — prose carries the load. Use the skill when visual proof of state matters: install output, terminal sessions, CI check pages, before/after UI shots. If you're tempted to write *"the dashboard showed X"*, that's a candidate for a screenshot instead.
