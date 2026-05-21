# The dataGriff Blog Tutorial Template

> A reusable skeleton for a blog post on `blog.hungovercoders.com/datagriff`. Use it with the **Voice & Style Guide**. Replace every `{{ … }}` placeholder; delete every guidance comment in italics before publishing.

---

## How to use this template

1. Pick the topic. Have actually built the thing first — your posts always read like real diaries because they are.
2. Fill in the placeholders top to bottom.
3. Run the **eight-point** self-check from the Voice Guide (five voice checks plus three opinion-layer checks).
4. Push it to the Jekyll repo.

The structure below is reverse-engineered from your existing posts (FastAPI, Terraform Azure, Trunk.io, Docusaurus, Data Layer, etc.) — it's the shape you already use, just made explicit so you (or an AI) can replicate it without thinking. There's one **new** section in this version that wasn't in your existing posts — **The Verdict** — added to keep content relevant in an age of AI-generated tutorials. See section 3a of the Voice Guide for the full rationale.

### The three mandatory opinion beats

Every post must contain all three. If you find yourself skipping them because the post is "just a tutorial", that's the moment to stop and remember: a tutorial without an opinion is exactly what AI produces by default. Yours has to do more.

1. **Honest moment** — woven into the walkthrough as prose ("first time I ran this I thought it had failed…").
2. **Verdict** — its own section near the end, marked in the template below.
3. **What I'd do differently** — one line in the wrap-up.

---

## The template

```markdown
---
layout: post
title: "{{ Themed punchy title — see naming rules below }}"
date: {{ YYYY-MM-DD }}
author: dataGriff
tags: [{{ tag1 }}, {{ tag2 }}, hungovercoders]
---

{{ OPENER PARAGRAPH — 2–4 sentences. Pick one opener formula from the Voice
   Guide: The Want / The Rabbit Hole / The Confession / The Cheat. Must contain
   a first-person want, and ideally one beer/dog/self-deprecating reference.
   End on a transition like "Read on fellow hungovercoder…" or "dataGriff SMASH!" }}

{{ Optional second paragraph — only if there's an honest backstory worth telling
   (a rabbit hole, a failed attempt, a co-worker who pushed you). Keep it short.
   This is the "where the personality lives" paragraph. }}

## Pre-Requisites

{{ A clean bulleted list. Plain, no jokes here — readers scan this. }}

- {{ Tool 1 }}
- {{ Tool 2 }}
- {{ Account / subscription / login they'll need }}
- {{ Recommended IDE — usually VS Code }}
- {{ Optional but recommended things, with one-line reason }}

## {{ Optional: Diagram }}

{{ If the topology matters — infra posts, data pipelines, anything multi-component —
   include a diagram here. Mermaid is fine. Skip the section heading entirely if
   you don't need one; don't include an empty placeholder. }}

## {{ THEMED SECTION 1 — the first build step }}

{{ THIS is where headings stop being generic and start being themed. Examples
   from your existing posts:
     - "Craft a Beer Model"
     - "Quick Beer with FastAPI"
     - "Setting up the Codebase"  (plain is also fine when nothing thematic fits)
     - "Setup your Python Environment"
   The rule: themed when you can, plain when forcing it would feel awkward. }}

{{ 1–2 sentences explaining WHAT you're about to do and WHY — in voice. Not "In
   this section we will…" but "Now we're going to give the beer some flavour by…". }}

{{ The actual instructions: a mix of numbered steps and prose. Don't be afraid
   of prose — your posts are conversational, not bullet-point bingo. }}

```{{ language }}
{{ Code block — complete enough to copy/paste and run.
   Short comments where useful. No exposition comments. }}
```

{{ A line of commentary after the code if needed — explaining one specific thing
   you'd want a reader to notice. E.g. "Notice that we've added validation
   stating the beer strength must be greater than 0 and less than 100." }}

## {{ THEMED SECTION 2 }}

{{ Same shape. Each section is: brief intent → instructions → code → optional
   commentary line. }}

{{ … repeat sections as needed. Aim for 4–8 sections in a typical post.
   If you've got more than 8, consider splitting into a two-parter — your
   readers are hungovercoders, they have a limited attention budget.

   ⚠ Don't forget the **honest moment** — one of the three mandatory opinion
   beats. Somewhere in the walkthrough (not in pre-reqs, not in the wrap-up),
   slip in a sentence that proves you actually built this. The bit the docs
   don't mention, the thing that cost you an hour, the moment you thought
   it had failed. One sentence is enough — but it has to be there. }}

## Complete Code

{{ For any post where the code was built up in pieces, include the final
   working file(s) here in full. Readers should never have to assemble. }}

### {{ Filename, e.g. main.py }}

```{{ language }}
{{ The full file. }}
```

## {{ Optional: Test / Try It Out }}

{{ If there's a "now open localhost:8000 and see the welcome message" moment,
   it goes here. End with a fellow-hungovercoder cheer. }}

## {{ Optional: Custom Domain / Deployment / Going Further }}

{{ Your posts often have a "and here's how I took it one step further" section —
   custom domain (dogusaurus.com), GitHub Action, deploying to Azure. Use this
   when it fits; skip when it doesn't. }}

## The Verdict — Would I Actually Use This?

{{ MANDATORY section. This is the AI-proofing bit — the take an AI couldn't
   generate because it didn't live the build. 2–4 short paragraphs covering:

   - **Would I use it in production?** Your honest answer, with the
     qualification ("for a small team, yes; for a 500-engineer org, probably
     not"). Don't sit on the fence.
   - **What it's genuinely good at.** One or two specific things, not a
     feature list.
   - **Where it falls down.** The bit the docs don't tell you. The friction.
     The thing you'd warn a colleague about.
   - **The worldview hook.** Tie it back to the hungovercoders worldview —
     small/cheap/yours, simple-enough-to-deploy-on-a-Tuesday, etc. This is
     where readers learn how you think.

   If you can't fill this section, you haven't built the thing for long enough
   to write the post. Go use it for another week, then come back. }}

## Wrap Up

{{ One short paragraph. Pick a closer from the Voice Guide:
     1. Well-done beat: "Well done on your X fellow hungovercoder!"
     2. Watch this space: "Watch this space for more experimentation in between meals."
     3. Honest repo link: "To see the most up to date version of this code see
        my repository at {{ repo link }}, or in case I renamed it drunkenly
        check out [datagriff github](https://github.com/dataGriff)."
     4. A single "Cheers!"

   Add one "what I'd do differently next time" line just before the sign-off.
   This is the third mandatory opinion beat. Examples:
     - "Next time I'd skip the Makefile — the abstraction wasn't earning its keep."
     - "If I were doing this again I'd set up the GitHub Action first." }}

{{ Repo link as the last line if not already in the closer:
   See the code at [github.com/dataGriff/{{ repo }}]({{ url }}). }}
```

---

## Title naming rules

Titles are part of the brand. Your existing titles fall into patterns:

| Pattern | Example | When to use |
|---|---|---|
| **"Quick Beer with X"** | *Quick Beer with FastAPI* | Short, single-tool tutorials |
| **"X with Y"** | *Protecting Code Quality with Trunk.io* | When the verb tells the story |
| **"Deploy X on Y"** | *Deploy Docusaurus on Azure Static Web Apps* | Anything deployment-focused |
| **"X for/with Z"** | *Terraform Azure Data Learning Platform* | Multi-component infrastructure |
| **"Adding X to Y"** | *Adding Comments to Jekyll Minima Blog* | Incremental additions to existing things |

Default to the **Quick Beer with X** pattern when you can — it's the most-on-voice title format you have.

---

## Length targets

Based on your existing posts:

- **Short post** — ~600–900 words, 3–5 sections. (Trunk.io, Giscus comments.) Good for "I tried this thing, here's how, done."
- **Standard post** — ~1,200–2,000 words, 5–8 sections. (FastAPI, Docusaurus.) The default shape.
- **Long post** — 2,500+ words. (Terraform Azure Data Platform.) Reserve for genuinely multi-stage builds. Consider splitting into a series instead.

If a draft is heading past 3,000 words, ask: "is this actually a two-parter?" Two posts each ending on a cliffhanger generate more engagement than one mega-post that loses readers at section 9.

---

## Tagging conventions

From your existing posts, tags fall into rough buckets — pick 2–4:

- **Tech**: `azure`, `python`, `terraform`, `docker`, `kafka`, `bento`, `spark`
- **Discipline**: `data-engineering`, `devops`, `analytics`, `streaming`, `iac`
- **Always**: `hungovercoders`

Don't over-tag. 3 good tags beat 8 vague ones.

---

## A worked example: applying this template

See **04-bento-worked-example.md** in this same folder — the README of `learn.bento` turned into a real dataGriff blog post by filling in every placeholder above. It's the cleanest way to see the template in action.
