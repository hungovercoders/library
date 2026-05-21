# The dataGriff YouTube Script Template

> A reusable skeleton for tutorial videos on the dataGriff / hungovercoders YouTube channel. Built so you can take a blog post (written with the Blog Tutorial Template) and adapt it to camera without losing your voice or wasting the first 15 seconds.

---

## Why video is different from blog (read this once)

A blog reader scans, skims, jumps to the code, and returns to read prose if they care. A viewer sits and watches — or they don't. The two formats need different shapes:

| Aspect | Blog | YouTube |
|---|---|---|
| **First job** | State the want, set up the post | Earn the next 15 seconds, then the next 30 |
| **Pacing** | Reader controls | You control |
| **Voice density** | Personality woven through | Personality has to land *fast*, then can breathe |
| **Length sweet spot** | 1,200–2,000 words | 7–14 minutes (~1,200–2,300 spoken words) |
| **Closer** | "Cheers!" | Subscribe + next video + repo link |

The voice stays the same. The structure changes.

### The three mandatory opinion beats (the AI-proofing bit)

Same as the blog template, every video carries three opinion beats — but placed differently:

| Beat | Where it lives in the video |
|---|---|
| **Honest moment** | Inside one of the build steps, said to camera as it happens |
| **Verdict** ("Would I use this in production?") | A dedicated section between the payoff and the watch-next bridge |
| **What I'd do differently** | One line in the outro, before the closer |

These three beats are the part an AI tutorial video can't generate. **Cut a walkthrough step before you cut any of them.** See Voice Guide §3a for the full rationale.

---

## The 7-part script shape

Every video follows this shape. Filename convention: `YYYY-MM-DD-{{ slug }}-script.md`.

```markdown
---
title: "{{ Video title — see naming rules below }}"
target_length: "{{ e.g. 10 minutes }}"
companion_blog: "{{ link to the blog post version, if one exists }}"
companion_repo: "{{ link to the github repo }}"
---

# {{ Video title }}

---

## 1. COLD OPEN (0:00 – 0:15)

**On screen:** {{ visual cue — usually the FINISHED thing already working,
the dashboard already populated, the API already returning a beer object.
Show, don't tell — the cold open is proof the video pays off. }}

**Spoken:**

> {{ One sentence. The punchiest version of the want.
>   Example pattern: "I wanted X without Y, and in the next ten minutes
>   I'm going to show you exactly how I did it." }}
>
> {{ Optional second sentence — a self-deprecating beat or "and yes, I
>   wrote this on a hangover" honesty hit. Keep it tight. }}

**Notes:** No intro music yet. No "hello everyone and welcome to my channel".
The cold open is the trailer for the video — if it doesn't make me want to
watch the next 30 seconds, rewrite it.

---

## 2. HOOK & PROMISE (0:15 – 0:45)

**On screen:** {{ Quick visual montage of what's coming — 3–4 second cuts of
the moments the viewer will reach by the end: code running, terminal output,
the diagram, the final dashboard. }}

**Spoken:**

> Right, hi — I'm dataGriff, fellow hungovercoder.
> In this video we're going to {{ verb phrase the whole build in one breath }}.
>
> By the end you'll have {{ concrete deliverable — a running pipeline, a
> deployed site, a working API }}, and you'll understand {{ the one
> conceptual thing you want them to walk away with }}.
>
> {{ Optional: "There's a full blog post version of this in the description
> if you'd rather read it with a beer. Code's on GitHub, link below." }}

**Notes:** This is the only "welcome to my channel" moment. After this, no
more housekeeping until the outro. Get into the work.

---

## 3. PRE-FLIGHT (0:45 – ~1:30)

**On screen:** {{ Pre-reqs as a list on screen, or your terminal/IDE with
the relevant tools visible. }}

**Spoken:**

> Quick pre-flight check. You'll need:
> - {{ Pre-req 1 }} — {{ optional one-liner: "if you haven't got it I'll
>   link the installer in the description" }}
> - {{ Pre-req 2 }}
> - {{ Pre-req 3 }}
>
> {{ Optional: "If you're using gitpod like I usually do, none of this matters,
> just spin up the workspace and you're good." — use this every time gitpod
> applies, it's a recurring beat. }}

**Notes:** Keep this section ruthless. Viewers tolerate pre-reqs for about
45 seconds before they bounce. List, move on.

---

## 4. THE BUILD (the bulk of the video)

> Repeat this block per step. Aim for **3–6 steps per video.** More than 6
> means the video is probably two videos.

### Step N: {{ THEMED STEP NAME — exactly like a blog section heading.
                "Craft a Beer Model" not "Create the data class". }}

**On screen:** {{ Code editor with the file open, terminal where commands
will run, browser where the result will show. Cut between them as needed —
don't just stare at the IDE for two minutes. }}

**Spoken:**

> {{ One sentence on WHY this step exists.
>   Example: "We need somewhere for our beer data to live, so we're going
>   to create a Beer class with a name, a brewer, and a strength." }}
>
> {{ Walk through the code as you type or paste it. Read the interesting
>   lines aloud; don't read the boring ones. Pause on the line that's
>   doing the clever thing and explain it. }}
>
> {{ Then run it. Show the output. React honestly — if it works first time,
>   "lovely". If it doesn't, leave the error in and walk through fixing it.
>   The honest debug moment is gold for YouTube and authentic for the voice. }}

**B-roll / cutaway opportunities:** {{ List any moments where the viewer
benefits from a visual aid that isn't your screen — a diagram, a beer
photo (genuinely, why not), a thumbnail of the docs page you're referencing.
List them here so editing-future-you doesn't forget. }}

**On-screen text overlay:** {{ The 3–5 words a viewer should be able to
read at a glance if they have the sound off. Examples: "BENTO = YAML-FIRST
STREAM PROCESSOR", "bento -c config.yaml", "fellow hungovercoder ✓". }}

**⚠ Honest moment opportunity:** {{ At least one of your build steps must
contain the **honest moment** beat — said to camera, as it happens.
"First time I ran this I thought it had failed", "this is the bit the docs
don't mention", "I tried it the documented way first and it didn't work".
If a step naturally has one, flag it here so it doesn't get edited out for
pacing. The honest beat is non-negotiable — it's the bit AI tutorials never
have. }}

---

### {{ Repeat the Step block for each step in the build. }}

---

## 5. THE PAYOFF (~ 80–90% mark)

**On screen:** {{ The full working thing — the same shot as the cold open,
but now earned. End-to-end run. The viewer should feel "we did it". }}

**Spoken:**

> And there it is — {{ describe what's now working in one sentence }}.
>
> {{ One sentence of genuine reaction. Not "as you can see, the application
>   is now functional". More like: "That's mental, that took us about eight
>   minutes and we've got a real streaming pipeline." Be a person. }}

**Notes:** This is the emotional peak. Don't rush through it to get to the
outro. Let the working thing breathe on screen for a second.

---

## 5a. THE HONEST TAKE (the verdict — ~ 60–90 seconds)

**On screen:** {{ You on camera, ideally. No screen-share for this bit — it's
the part that's *about* you. Coffee or beer in shot is a bonus. If you must
have a screen, a simple title card with "WOULD I USE THIS?" works. }}

**Spoken:**

> Right, honest take time — would I actually use this in production?
>
> {{ Your real answer with the qualifier. "For a small team running tactical
>   pipelines, absolutely. For a 24/7 high-volume thing, I'd still reach
>   for X." Don't sit on the fence. }}
>
> {{ One sentence on what it's genuinely good at, in your own words.
>   Not a feature list. }}
>
> {{ One sentence on where it falls down — the bit the docs don't mention,
>   the friction, the gotcha. This is the gold. }}
>
> {{ Tie it back to the worldview: small/cheap/yours, source-controlled,
>   deployable on a Tuesday — whichever stance fits. One sentence. }}

**Notes:** This is the section an AI tutorial can't generate. **It's why
the video exists.** Don't skip it because you're running long — cut a
walkthrough step before you cut this section. If you can't fill 60 seconds
of honest take, you haven't used the tool enough to make the video yet.

---

## 6. WATCH-NEXT BRIDGE (the 30 seconds before the outro)

**On screen:** {{ Tease of the next video or the next thing in the series.
A glimpse of the more-advanced thing — "here's what enrichment looks like,
that's the next video". }}

**Spoken:**

> Now obviously this is the simple version. In the next video we're going
> to {{ tease the next step — the enrichment, the deployment, the production
> hardening, whatever's next in your series }}.
>
> {{ Optional: "If you want to see that, hit subscribe so it lands in your
> feed when it's out." — only one CTA, and only here. }}

**Notes:** The watch-next bridge is a YouTube algorithm thing — it tells
viewers there's a reason to come back. Don't skip it even if it feels
self-promotional. One sentence is enough.

---

## 7. OUTRO (final 15 seconds)

**On screen:** {{ A simple end card — repo link, blog link, channel handle.
Keep it readable for 5–7 seconds. }}

**Spoken:**

> {{ One line — your "what I'd do differently next time" beat. The third
>   mandatory opinion beat. Examples:
>     - "If I were doing this again I'd start with the GitHub Action and
>       the code second."
>     - "Next time I'd pick a smaller starter example — example 12 is too
>       much, too soon."
>     - "Honestly, I'd probably skip the Makefile next time and just use
>       a shell script." }}
>
> {{ Then pick a closer — same shape as the blog closers, adapted for voice:
>   - "Well done fellow hungovercoder. Cheers."
>   - "Code's in the description. I'm off for a pint."
>   - "Watch this space for more experimentation in between meals." }}

**Notes:** No "thanks for watching, please like and subscribe and ring the
bell". You did the subscribe ask in the bridge. End on the voice line, not
the housekeeping.

---
```

---

## Pacing notes (for editing)

- **Cut all silence longer than 0.5s** unless it's a deliberate pause on a payoff moment.
- **Cut every "um", "so", "right, so".** Your voice is naturally rhythmic; the umms break the spell.
- **B-roll over any moment where you're typing more than 8 seconds of code.** Nobody watches typing.
- **Zoom in on the terminal output** when the result lands. It's the moment the viewer cares about.
- **Captions are not optional** — a large chunk of YouTube watches with sound off. Burn them in or generate them properly.

---

## Title naming rules for YouTube

YouTube titles work differently from blog titles. They need to do two jobs at once: hook the click *and* describe the content. The blog title patterns still work but often need a small twist:

| Blog pattern | YouTube twist | Example |
|---|---|---|
| *Quick Beer with FastAPI* | Add an outcome | *Quick Beer with FastAPI — Build a Working API in 10 Minutes* |
| *Deploy Docusaurus on Azure* | Add a time or stake | *I Deployed Docusaurus to Azure in Under 15 Minutes* |
| *Protecting Code Quality with Trunk.io* | Add a "before I knew this" hook | *I Wish I'd Known About Trunk.io Sooner — Here's Why* |

**Avoid YouTube clickbait patterns** that aren't on-voice: no all-caps, no "YOU WON'T BELIEVE", no "DESTROYED" or "INSANE". You're hungovercoders, not MrBeast. The hook should sound like something dataGriff would actually say.

---

## Thumbnail conventions

Three rules:

1. **Your face or your dog, ideally both.** Personality channels live or die on the thumbnail face.
2. **One tool logo, large.** Bento, FastAPI, Terraform, Azure — whatever the video is about.
3. **A three-word text overlay max.** "QUICK BEER FASTAPI" works. "How to build a production-grade API using FastAPI and Python" does not.

---

## Series mode

A lot of your blog content is naturally a *series* on YouTube. The bento repo has 14 examples — that's potentially 14 videos. When running a series:

- **Number them in the title.** "Bento #01 — Hello World", "Bento #02 — File to File".
- **Use a series playlist.** Link it in the description of every video in the series.
- **Reuse the cold open style across the series** — viewers should recognise within 5 seconds that they're back in dataGriff's bento series.
- **Each video ends with a one-line tease of the next.** This is non-negotiable for series content.

---

## A worked example

See **04-bento-worked-example.md** for the README of `learn.bento` turned into a complete dataGriff blog post and matching YouTube script for example 01 (Hello World) — the cleanest way to see this template in action.
