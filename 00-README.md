# The hungovercoders system — README

> The complete content and operating system for hungovercoders, compiled from a series of working sessions in May 2026. The voice guide, templates, roadmap, OKRs, and technical foundations are all public — because building in the open *is* the brand. One file (the personal manifesto) stays private.

---

## What this is

A connected set of documents that defines:

- **Who hungovercoders is** (the voice and the brand)
- **How to write for it** (templates for blog and YouTube)
- **What to build** (roadmap and OKRs)
- **How to build it** (technical implementation and Claude integration)
- **Why it exists** (the personal manifesto underneath everything)

The documents reference each other. Read in the order below the first time. After that, use whichever doc you need for whichever task.

---

## The public/private split — read this first

The bundle is **public by default, with one exception**.

### `library` (public, MIT — `github.com/hungovercoders/library`)

The handbook. Voice guide, templates, worked example, roadmap, OKRs, technical implementation, Claude integration playbook. Public because the hungovercoders worldview is *small, cheap, yours, source-controlled* — and being demonstrably open about how the system works is more on-brand than hiding it. A determined reader could reverse-engineer most of this from the blog posts anyway; making the system explicit is a clearer brand statement than gating it.

- `00-README.md` — this file
- `01-datagriff-voice-guide.md`
- `02-blog-tutorial-template.md`
- `03-youtube-script-template.md`
- `04-bento-worked-example.md`
- `05-hungovercoders-relaunch-roadmap.md`
- `06-hungovercoders-okrs.md`
- `07-claude-integration-playbook.md`
- `08-technical-implementation.md`

### `ops` (private — `github.com/hungovercoders/ops`)

Operations plus the one document that *should* stay private — the personal manifesto. The manifesto is private not because it's IP but because it's *personal reflection* explicitly written for the author, not for readers. Everything else operational (redirects, runbooks, analytics snapshots) joins it here over time as the build progresses.

- `09-personal-manifesto.md` — lives in `ops/operating-manual/`
- Plus the operational content described in section 4.6 of the technical implementation doc (added during phases 1–2 of the roadmap, not now)

### Why this split

**The brand is generosity-coded all the way down.** Public craft levers are a stronger statement than private ones. The one private file is the one that's *qualitatively different* — a personal manifesto written for the author, not the audience. The split lives on the genuine line between "operating system for the brand" (public) and "honest personal reflection" (private), not on a guess about what readers might or might not value seeing.

For the full rationale, see section 3 of `08-technical-implementation.md`.

---

## The documents in order

### 1. Voice & strategy

These define who hungovercoders is and how it sounds.

- **`01-datagriff-voice-guide.md`** [PUBLIC] — The codified voice. Persona, worldview, voice rules, metaphor library (as wrapper, not core), sentence rhythm, openers, closers, the opinion-layer beats, the eight-point self-check. Paste this into Claude.ai or any AI tool when you want output that sounds like you. **Lives in `library/`.**
- **`02-blog-tutorial-template.md`** [PUBLIC] — The skeleton for any new blog post. Includes the mandatory Verdict section and the three opinion beats.
- **`03-youtube-script-template.md`** [PUBLIC] — The skeleton for any new video script. Seven-section shape with the Honest Take segment as the centrepiece.
- **`04-bento-worked-example.md`** [PUBLIC] — A worked example showing the bento README turned into a real blog post and matching YouTube script. The reference for "what does this look like applied?"

### 2. Plan & measure

These define what to build, in what order, and how to know it's working.

- **`05-hungovercoders-relaunch-roadmap.md`** [PUBLIC] — Phased plan from "today" to "12 months from now". Includes the publishing strategy (how blog + training + video work as a triangle, not a stack) and the monetisation strategy (what to turn on when, what to never touch). **Lives in `library/`.**
- **`06-hungovercoders-okrs.md`** [PUBLIC] — One annual umbrella + four quarterly OKR sets. Scoring guides, explicit non-goals, cross-cutting principles. **Lives in `library/`.**

### 3. Build & integrate

These define how to actually ship it.

- **`07-claude-integration-playbook.md`** [PUBLIC] — How to integrate Claude across the workflow (Claude.ai Projects, Claude Code CLI, GitHub Actions). Three surfaces, three jobs, three sets of discipline rules.
- **`08-technical-implementation.md`** [PUBLIC] — Engineering spec. GitHub org structure (using existing `hungovercoders` org), repo hierarchy with diagrams, settings, secrets, workflow files, hosting on Cloudflare Pages, DNS, security. Five Mermaid diagrams that render natively on GitHub.

### 4. The source underneath

- **`09-personal-manifesto.md`** [PRIVATE] — The honest, private reflection that the public docs are calibrated to. **Do not publish.** Lives in `ops/operating-manual/`. The load-bearing lines extracted at the bottom are the source material for the public-facing "what hungovercoders is" page.

---

## How the documents work together

```
                          09 personal manifesto (PRIVATE)
                                       │
                                       │ calibrates
                                       ▼
                          01 voice guide (public)
                                       │
                       drives writing in │
                                       ▼
                   02 blog template     03 yt template
                       (public)             (public)
                                       │
                              applied in │
                                       ▼
                          04 worked example (public)
                                       │
                          publishing happens per...
                                       ▼
                          05 roadmap (public)
                                       │
                                       │ measured by
                                       ▼
                          06 OKRs (public)
                                       │
                              shipped using...
                                       ▼
                          08 tech implementation (public)
                          07 claude integration (public)
                                       │
                                       ▼
                              hungovercoders.com (live)
```

In words:

- The **manifesto** (09) is the private source of truth that calibrates everything else. The only private document in the bundle.
- The **voice guide** (01) is the public expression of the manifesto's brand position. Public because building in the open is the brand.
- The **templates** (02, 03) operationalise the voice guide into reusable writing structures. Public.
- The **worked example** (04) shows it all applied to a real piece of content. Public.
- The **roadmap** (05) sequences what to build, and embeds the publishing and monetisation strategies. Public — the strategy is part of how the brand shows its work.
- The **OKRs** (06) measure whether the build is working. Public — the targets and the misses are themselves content.
- The **technical implementation** (08) is the engineering spec for the build. Public — itself a useful artefact.
- The **Claude integration playbook** (07) wires AI assistance into the workflow at every stage. Public.

---

## What's load-bearing (read this if you read nothing else)

If you only have ten minutes:

1. Read **section 1 of the voice guide** (the persona and worldview). This is the brand in 600 words.
2. Read **section 10 of the voice guide** (the one-line test). This is the brand in one sentence.
3. Read **the brand promise line in the roadmap destination** — "*folk tales of now from a tech blog in the South Wales valleys, honest about working through it all, useful even after the tech moves on*". This is the public-facing version of the manifesto.
4. Read **the load-bearing lines at the bottom of the personal manifesto**. This is what's true underneath all of the above.

These four things, in that order, are the system.

---

## What to do next (in priority order)

This bundle is the output of the planning phase. Now comes the build. Concretely:

### Today / this week

1. **Commit the bundle into the two repos you've created.**
   - To `hungovercoders/library` (public, MIT): commit files `00`, `01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`. Add a brief top-level `README.md` (or use `00-README.md` as it). Add an MIT `LICENSE` file. Add a `CHANGELOG.md` (start it with a single entry: "Initial commit of the hungovercoders system").
   - To `hungovercoders/ops` (private): create `operating-manual/` and commit file `09` there. The rest of `ops/` will fill in during phase 1 of the roadmap (`migration/`, `runbooks/`, etc.).
   - The bundle is now version-controlled.
2. **Create the Claude.ai Project.** Upload **all ten files** to the Project as knowledge. The Project is yours and doesn't share, so even though only nine of the files are public on GitHub, the manifesto can sit safely in the Project alongside the rest. Test by asking Claude to draft something in voice — verify the output sounds like dataGriff. If it doesn't, the voice guide needs sharpening; come back here.
3. **Read each doc once cover-to-cover.** You haven't, in their final state. The recent edits changed several documents in small but real ways. A linear read will catch any inconsistencies that survived the edit pass.

### Next 2–3 weeks (Phase 1 of the roadmap)

1. **Verify the `hungovercoders` org settings** match section 2 of the technical implementation doc.
2. **Create the `.github` repo** with the org profile README (drafted in section 2 of tech impl).
3. **Build the redirect map CSV** in the `ops` repo's `migration/` directory — every old blog post URL mapped to its future new URL. This is grunt work but it's the unblocker for everything downstream.
4. **Don't publish anything new** on the old `blog.hungovercoders.com/datagriff` subdomain. Phase 0 discipline.

### Next 1–2 months (Phase 2 of the roadmap)

The Astro rebuild. Doc 08 (technical implementation, section 5) is your build sheet. Don't skip the smoke-test step — port one post first, verify rendering, only then bulk-port the rest.

When you set up the Claude editorial-review GitHub Action (section 5.6 of doc 08), it now checks out the public `library` repo without auth — the voice guide lives there. The workflow no longer needs the `OPS_REPO_READ_TOKEN` for that purpose. (The token may still appear in older parts of the spec; ignore it for the editorial workflow.)

### Ongoing

Each phase of the roadmap maps onto a quarter of the OKRs. Check progress weekly (a 5-minute Monday review against current quarter KRs is enough). At the end of each quarter, score the OKRs honestly and write a one-paragraph reflection. The reflections compound into a year-end retrospective post that's content in itself.

---

## When to come back to this README

- **At the start of every quarter**, to re-orient to the current phase.
- **Whenever a doc starts to feel stale**, to remember how the docs relate to each other.
- **Whenever the brand starts to feel hollow**, to return to the manifesto's load-bearing lines.
- **Whenever a new contributor or collaborator needs to understand what hungovercoders is**, as the index they read first. They get to read everything — only the manifesto stays private.

---

## The system in one paragraph

Hungovercoders is the honest tech blog of dataGriff — a forty-something working developer from the South Wales valleys whose posts are folk tales of working in tech in this place at this time. The voice is opinionated, self-deprecating, and rooted in real lived experience. Every post carries three opinion beats (an honest moment, a verdict, a what-I'd-do-differently) that AI tutorials can't fake. Three formats — blog, YouTube, training — each do a job the others can't. The build runs on Cloudflare Pages with Claude integrated at three points to keep the voice consistent. The whole operating handbook is public — voice guide, templates, roadmap, OKRs, tech spec, the lot — because building in the open *is* the brand. Only the personal manifesto stays private, because that one's personal reflection, not craft. The brand survives because the worldview is the load-bearing wall and the metaphors are the paint.

Cheers, fellow hungovercoder. Time to start building.
