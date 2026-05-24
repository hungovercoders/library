# The hungovercoders system — README

> The complete content and operating system for hungovercoders, compiled from a series of working sessions in May 2026. The voice guide, templates, roadmap, OKRs, and technical foundations are all public — because building in the open *is* the brand. One file (the personal manifesto) stays private, in a separate `ops` repo.

---

## What this is

A connected set of documents and tools that defines:

- **Who hungovercoders is** (the voice and the brand) — `voice/`
- **How to write for it** (templates for blog and YouTube) — `voice/`
- **What to build, and how to know it's working** (roadmap, OKRs) — `reference/`
- **How to build it** (technical implementation) — `reference/`
- **How to use Claude to apply all of the above** (slash commands) — `.claude/commands/`
- **Why it exists** (the personal manifesto underneath everything) — *private, lives in the `ops` repo*

---

## Repo layout

```
voice/              AI-loaded shared context. Installed into ~/.claude/hungovercoders/voice/.
  datagriff-voice-guide.md
  blog-tutorial-template.md
  youtube-script-template.md
  bento-worked-example.md

reference/          Human reference docs. Not auto-installed anywhere.
  relaunch-roadmap.md
  okrs.md
  technical-implementation.md
  archive/
    claude-integration-playbook.md   (superseded by the hc- slash commands)

.claude/commands/   Slash commands installed into ~/.claude/commands/ by install-skills.sh.
  hc-new-series.md      Scaffold a new learn.<topic> series with researched lesson plan
  hc-write-lessons.md   Fill in all lesson content in voice for the current series
  hc-launch.md          Write a launch blog post for a series and verify the site build
  hc-review-series.md   Thorough voice/consistency/usefulness review of a series

AGENTS.md           Agent orientation when landing in this repo.
install-skills.sh   One-shot installer — symlinks skills and voice content to user-level paths.
```

---

## Install

```bash
git clone https://github.com/hungovercoders/library.git
cd library
./install-skills.sh
```

The installer symlinks:

- `.claude/commands/*.md` into `~/.claude/commands/` — slash commands available everywhere
- `voice/*.md` into `~/.claude/hungovercoders/voice/` — voice content reachable at a stable path

The library can live anywhere on the machine. If you move it, re-run `./install-skills.sh` from the new location.

After install, the workflow is portable: `learn.*` tutorial repos don't depend on being checked out next to the library, and the `hc-*` skills work from any directory.

---

## The public/private split

The bundle is **public by default, with one exception**.

### `library` (public, MIT — `github.com/hungovercoders/library`)

The handbook. Voice guide, templates, worked example, roadmap, OKRs, technical implementation, and the Claude Code slash commands that operationalise everything. Public because the hungovercoders worldview is *small, cheap, yours, source-controlled* — and being demonstrably open about how the system works is more on-brand than hiding it.

### `ops` (private — `github.com/hungovercoders/ops`)

Operations plus the one document that *should* stay private — the personal manifesto. The manifesto is private not because it's IP but because it's *personal reflection* explicitly written for the author. Everything else operational (redirects, runbooks, analytics snapshots) joins it here over time as the build progresses.

---

## How the documents work together

```
                          personal manifesto (PRIVATE, in ops/)
                                       │
                                       │ calibrates
                                       ▼
                          voice/datagriff-voice-guide.md
                                       │
                       drives writing in │
                                       ▼
              voice/blog-tutorial-template.md   voice/youtube-script-template.md
                                       │
                              applied in │
                                       ▼
                          voice/bento-worked-example.md
                                       │
                          publishing happens per...
                                       ▼
                          reference/relaunch-roadmap.md
                                       │
                                       │ measured by
                                       ▼
                          reference/okrs.md
                                       │
                              shipped using...
                                       ▼
                          reference/technical-implementation.md
                          .claude/commands/hc-*.md
                                       │
                                       ▼
                              hungovercoders.com (live)
```

In words:

- The **manifesto** (private, in `ops/`) is the source of truth that calibrates everything else.
- The **voice guide** is the public expression of the manifesto's brand position.
- The **templates** (blog, YouTube) operationalise the voice guide into reusable writing structures.
- The **worked example** shows it all applied to a real piece of content.
- The **roadmap** sequences what to build and embeds the publishing and monetisation strategies.
- The **OKRs** measure whether the build is working.
- The **technical implementation** is the engineering spec for the build.
- The **`hc-` slash commands** are the day-to-day tool for applying the voice and templates to a new tutorial series, lesson content, or launch blog post. They supersede the older `claude-integration-playbook.md` (kept under `reference/archive/` as historical reference).

---

## What's load-bearing (read this if you read nothing else)

If you only have ten minutes:

1. Read **section 1 of the voice guide** (the persona and worldview). This is the brand in 600 words.
2. Read **section 10 of the voice guide** (the one-line test). This is the brand in one sentence.
3. Read **the brand promise line in the roadmap destination** — "*folk tales of now from a tech blog in the South Wales valleys, honest about working through it all, useful even after the tech moves on*". This is the public-facing version of the manifesto.

---

## When to come back to this README

- **At the start of every quarter**, to re-orient to the current phase.
- **Whenever a doc starts to feel stale**, to remember how the docs relate to each other.
- **Whenever a new contributor or collaborator needs to understand what hungovercoders is**, as the index they read first.

---

## The system in one paragraph

Hungovercoders is the honest tech blog of dataGriff — a forty-something working developer from the South Wales valleys whose posts are folk tales of working in tech in this place at this time. The voice is opinionated, self-deprecating, and rooted in real lived experience. Every post carries three opinion beats (an honest moment, a verdict, a what-I'd-do-differently) that AI tutorials can't fake. Three formats — blog, YouTube, training — each do a job the others can't. The build runs on Cloudflare Pages with Claude integrated at three points to keep the voice consistent. The whole operating handbook is public — voice guide, templates, roadmap, OKRs, tech spec, slash commands, the lot — because building in the open *is* the brand. Only the personal manifesto stays private, because that one's personal reflection, not craft. The brand survives because the worldview is the load-bearing wall and the metaphors are the paint.

Cheers, fellow hungovercoder. Time to start building.
