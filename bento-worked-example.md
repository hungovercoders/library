# Worked Example: Bento → Blog Post + YouTube Script

> Taking the `learn.bento` repo and applying the voice guide + templates end-to-end. Two deliverables: a publishable blog post intro + first tutorial, and a matching YouTube script for the same content.

This is the "show, don't just tell" piece of the system. If the voice guide and templates work, this example should sound unmistakably like dataGriff — and you should be able to push it to the blog and YouTube channel with only light editing.

---

## Note before reading — two framing shifts that happened after this was drafted

This worked example was drafted as the *first* application of the system. Two things have evolved in the system since, and they matter when you actually write the real bento launch content. Don't rewrite this document — it's still a valid demonstration of voice and structure. But when writing the real thing, apply these two shifts:

**1. Training lessons and blog posts are now separate artefacts in separate repos.** The blog post drafted below shows everything in one document — opener, prerequisites, walkthrough, complete code, verdict. Under the architecture finalised in `08-technical-implementation.md`, those split into two:

- **The training lesson** (lives canonically in `learn.bento/content/01-hello-world.md`, rendered on the site at `hungovercoders.com/training/bento/01-hello-world`) is the walkthrough — what someone Googling "bento hello world" needs. Mostly mechanics, with a short closing opinion. Calibrated for canonical reference value and SEO/AI citation.
- **The blog post** (lives in `site/src/content/blog/...`) is the *take* — why I built this lesson, what surprised me about bento, the verdict on the tool as a whole. Mostly opinion, with the lesson summarised and linked. Calibrated for personality and the AI-proofing argument.

The draft below works as either if you imagine it published in 2025, but for the actual 2026 launch you'd separate the two. The lesson is shorter and more reference-shaped; the blog post is shorter and more opinionated. Each links to the other.

**2. The opinion layer matters more than the walkthrough, given AI-coding shifts.** When this was drafted, the AI-proofing argument was a section in the voice guide ("the opinion is the meal, the walkthrough is the bait"). Twelve weeks of conversation later, that argument is the *whole point* of the system, not a feature of it. For the real bento series:

- The *training lesson* still has a walkthrough as its main content — that's its job. But the closing opinion gets sharper, more specific, more "here's the take an AI couldn't generate".
- The *blog post* leans hard into opinion — verdict, comparison to alternatives (Kafka Streams, Flink, the original Benthos), worldview hook, what-I'd-do-differently. The walkthrough material exists mainly to prove the verdict is grounded.
- **Add the build-in-public-with-AI-in-shot pattern explicitly.** Something like *"I scaffolded the first config with Claude; here's where it got the Bloblang syntax wrong and why you need to know enough about bento to spot it"*. That sentence is high-value content that didn't exist as a pattern when this was drafted.

The draft below is otherwise still on-voice. Themed section names, themed title, fellow-hungovercoder closer, Tiny Rebel brewery reference, the verdict section, the what-I'd-do-differently line. All right. Use it as the demonstration it is; calibrate the real launch to the two shifts above.

---

# Part A — The Blog Post

> Filed under: what `examples/01-hello-world` could look like as a real dataGriff blog post. Demonstrates: themed titles, want-led opener, themed section names, complete code, fellow-hungovercoder closer.
>
> The block below is the actual blog post markdown. To use it, copy everything between the two `══════` delimiter lines into a new `.md` file in your blog content directory.

═══════════════════════════ COPY FROM HERE ═══════════════════════════

---
layout: post
title: "Quick Beer with Bento — A YAML Stream Processor That Just Works"
date: 2026-05-16
author: dataGriff
tags: [bento, streaming, data-engineering, hungovercoders]
---

I wanted a stream processor I could run on my laptop without spinning up a JVM
cluster, a Kafka, and three pots of coffee just to see one message move from
A to B. I'd seen Bento (the fork of Benthos, now maintained by the WarpStream
lot) mentioned in a few data engineering chats and the pitch genuinely
intoxicated me — a single static binary, YAML-only config, no Go required.
A stream processor for the lazy hungovercoder. Sold.

What follows is the start of a tutorial series I'm building in the
[learn.bento](https://github.com/hungovercoders/learn.bento) repo. We'll start
with the smallest pipeline that can possibly exist — generate a message,
print it to the terminal — and over the next few posts work our way up to
a proper end-to-end pipeline with WarpStream, enrichment, windowing, and
the rest of the cracking buffet that Bento offers. dataGriff SMASH!

## Pre-Requisites

- Bento v1.4.0 or newer — `brew install warpstreamlabs/tap/bento` on a Mac
- A terminal you're not afraid of
- A YAML-friendly editor (VS Code as always for me)
- Patience for about two indentation errors before everything clicks

> No programming language runtime is required. Bento is YAML all the way down.
> Which is either a feature or a war crime depending on your priors.

## Cracking Open the First Pipeline

The smallest possible Bento pipeline has three things: an input that produces
messages, optional processors that transform them, and an output that does
something with them. For our first one we'll cheat a bit — we won't even
have processors. Just a generator pretending to be a brewery, shouting a
hello into the terminal once a second.

Create a new folder and a file called `config.yaml`:

```yaml
input:
  generate:
    interval: 1s
    count: 5
    mapping: |
      root = {
        "brewery": "Tiny Rebel",
        "message": "Hello fellow hungovercoder",
        "ts": now()
      }

output:
  stdout: {}
```

That's the whole pipeline. Five things to notice and then we'll run it:

- The `input` is `generate` — Bento's built-in fake-message producer. Perfect
  for tutorials, also genuinely useful for load testing.
- `interval: 1s` and `count: 5` mean we get five messages, one per second,
  then it stops. No process to kill, no Ctrl-C tantrum.
- The `mapping` field is **Bloblang**, Bento's mapping language. We'll be
  living and breathing this in later posts. For now just clock that `root = …`
  is how you build a message from scratch.
- `now()` is a Bloblang function — gives us the current timestamp on each
  generation. Very handy.
- The `output` is `stdout` with no config. Simplest possible sink.

## Giving the Beer a Pour — Running the Pipeline

In the same folder, run:

```bash
bento -c config.yaml
```

If everything's working, you should see five JSON objects appear one second
apart, like a polite, queueing British robot:

```json
{"brewery":"Tiny Rebel","message":"Hello fellow hungovercoder","ts":"2026-05-16T14:32:01Z"}
{"brewery":"Tiny Rebel","message":"Hello fellow hungovercoder","ts":"2026-05-16T14:32:02Z"}
{"brewery":"Tiny Rebel","message":"Hello fellow hungovercoder","ts":"2026-05-16T14:32:03Z"}
{"brewery":"Tiny Rebel","message":"Hello fellow hungovercoder","ts":"2026-05-16T14:32:04Z"}
{"brewery":"Tiny Rebel","message":"Hello fellow hungovercoder","ts":"2026-05-16T14:32:05Z"}
```

That's a working stream processor. I'll be honest, the first time I ran this
I thought it had failed because it was over so quickly. Nope — that's the point.
A single static binary, one YAML file, five messages. No Docker. No Zookeeper.
No reason to fancy a can yet.

## Complete Code

### `config.yaml`

```yaml
input:
  generate:
    interval: 1s
    count: 5
    mapping: |
      root = {
        "brewery": "Tiny Rebel",
        "message": "Hello fellow hungovercoder",
        "ts": now()
      }

output:
  stdout: {}
```

## The Verdict — Would I Actually Use Bento?

Right, honest take after a week of poking at this thing — would I put Bento
in production tomorrow?

**For a tactical glue pipeline, absolutely.** The single binary thing isn't
just a marketing line — it genuinely means you can ship a stream processor
to a server, a Docker container, or a developer's laptop and it just works.
No JVM tuning, no cluster, no Helm chart inheritance hell. For "I need to
move data from A to B with a bit of transformation in the middle", I'd
reach for Bento before I'd reach for almost anything else.

**For a stateful, high-volume 24/7 thing, I'd still pick Flink.** Bento has
windowing and aggregation but it's not pretending to be a full streaming
database — and if your problem has the words "exactly-once" and "complex event
processing" in it, you want the heavy machinery.

**Where it falls down:** the YAML can get genuinely big on a real pipeline,
and Bloblang has its own quirks you have to learn. The error messages when
you get an indentation wrong are also… let's say "characterful". This is a
docs-reading tool, not a guess-as-you-go tool.

**But here's the worldview hook** — Bento is *small, cheap, source-controlled,
and deployable by one slightly hungover person on a Tuesday*, which is
exactly the kind of tool I keep finding myself reaching for. The hungovercoders
worldview says: most teams don't need the Ferrari. They need the reliable
estate car that fits the dog in the boot. Bento is that car.

## Where Next

In the next post we'll move from `generate` to a real-world input — reading a
CSV of breweries from disk, transforming each row with Bloblang, and writing
out structured JSON. The Bloblang section in particular is where Bento goes
from "tidy" to "genuinely fun to use", so I'm looking forward to that one.

If you can't wait, the full series lives in the
[learn.bento repo](https://github.com/hungovercoders/learn.bento) — or in case I
renamed it drunkenly, check out [datagriff github](https://github.com/dataGriff).

If I were doing this first example again, I'd probably ditch the `count: 5`
and let it stream forever — the auto-stop is neat but it confused me on the
first run, and "press Ctrl-C when you're bored" is honestly a better default
for a tutorial. Well done on your first Bento pipeline fellow hungovercoder.
Cheers.

═══════════════════════════ COPY TO HERE ═══════════════════════════

---

# Part B — The Matching YouTube Script

> Same content, video-shaped. Demonstrates: 15-second cold open, hook & promise, themed step name, payoff, watch-next bridge, on-voice outro.
>
> The block below is the actual script markdown. To use it, copy everything between the two `══════` delimiter lines into a new script file.

═══════════════════════════ COPY FROM HERE ═══════════════════════════

---
title: "Quick Beer with Bento #01 — Hello World in 60 Seconds of YAML"
target_length: "6 minutes"
companion_blog: "https://hungovercoders.com/blog/2026/05/16/quick-beer-with-bento-hello-world"
companion_repo: "https://github.com/hungovercoders/learn.bento"
---

# Quick Beer with Bento #01 — Hello World in 60 Seconds of YAML

---

## 1. COLD OPEN (0:00 – 0:15)

**On screen:** Terminal already running. Five JSON messages tick down the
screen one per second, each one containing "Hello fellow hungovercoder".
Zoom in on the messages as they appear.

**Spoken:**

> That right there is a working stream processor. No JVM. No Kafka cluster.
> No Docker. One YAML file, one binary, and about four lines of code I'm
> about to show you. Let's go.

---

## 2. HOOK & PROMISE (0:15 – 0:45)

**On screen:** Quick montage — VS Code with `config.yaml` open, the terminal
running `bento -c`, the JSON output flowing. Cut every 3–4 seconds.

**Spoken:**

> Right, hi — I'm dataGriff, fellow hungovercoder. This is the first video
> in a new series on Bento — a YAML-first stream processor from the
> WarpStream lot, fork of Benthos, and genuinely one of the most lazy-developer-
> friendly bits of data engineering kit I've come across in ages.
>
> In this video we're going to build the smallest possible Bento pipeline
> — generate a message, print it, done — and along the way we'll meet two
> of the three things every Bento config has: inputs, outputs, and the
> Bloblang mapping language sitting in the middle.
>
> Full blog post version's in the description if you'd rather read it with
> a beer. Code's on GitHub, link below.

---

## 3. PRE-FLIGHT (0:45 – 1:15)

**On screen:** Bullet list on screen: "Bento ≥ v1.4.0", "A terminal",
"A YAML editor". Underneath, the brew install command in a monospaced font.

**Spoken:**

> Quick pre-flight check. You need three things:
>
> - Bento, version 1.4 or newer — on a Mac that's `brew install warpstreamlabs/tap/bento`,
>   on anything else there's a binary download on the docs site, linked below.
> - A terminal.
> - A YAML-friendly editor — I'll be in VS Code as always.
>
> No Python, no Go, no Java. That's the entire point of Bento.

---

## 4. THE BUILD

### Step 1: Cracking Open the First Pipeline

**On screen:** Empty folder in VS Code, then a new file `config.yaml` being
created. The YAML is typed in (or pasted from clipboard with quick reveal)
section by section as it's explained.

**Spoken:**

> Right. New folder, new file called `config.yaml`. Every Bento pipeline has
> at least two sections — an input and an output. Let's start with the input.
>
> [types `input:` and `generate:` block]
>
> The `generate` input is Bento's built-in fake-message producer. We're telling
> it: every one second, for five messages total, build me an object with a
> brewery, a hello message, and a timestamp.
>
> That `mapping` bit — `root = { … }` — that's **Bloblang**. It's Bento's
> mapping language and we're going to be living and breathing it across this
> series. For now, just clock that `root` is the thing you're building, and
> `now()` is a built-in function that gives you the current timestamp. Lovely.
>
> [types the `output:` block]
>
> And the output is just `stdout` — print it to the terminal. No config needed.
> That's the entire pipeline.

**B-roll / cutaway:** Quick cut to the Bloblang docs page on the WarpStream
site for half a second when "Bloblang" is mentioned — viewers can pause and
click later.

**On-screen text overlay:** "INPUT → (processors) → OUTPUT" appears at the
moment the structure is explained.

---

### Step 2: Giving the Beer a Pour — Running the Pipeline

**On screen:** Terminal in the same folder. Type the command, hit enter,
let the five JSON messages flow.

**Spoken:**

> Now in the same folder, run:
>
> `bento -c config.yaml`
>
> [messages start appearing]
>
> And there we go — five messages, one per second, exactly as ordered.
> A polite British robot. JSON out, brewery in each one, a timestamp on each
> one, "Hello fellow hungovercoder" because of course.
>
> I'll be honest — first time I ran this I thought it had failed because it
> was over so quickly. Five seconds and we're done. That's the point. No
> process to kill, no Ctrl-C tantrum. Bento knew it was finished and went home.

**On-screen text overlay:** "1 YAML file. 1 binary. 0 JVMs." — appears as
the messages finish.

---

## 5. THE PAYOFF (1:30 mark, ~ 4:30)

**On screen:** Zoom in on the JSON output. Hold for a beat. Then a slow zoom
out to show the whole setup — VS Code with the tiny YAML file on the left,
terminal with the output on the right.

**Spoken:**

> That's a working stream processor. Right there. About fifteen lines of
> YAML, one terminal command. In a follow-up video we'll wire this up to
> actual data on disk, but for a hello-world this is genuinely mental — most
> stream processors take half a day to set up before you see the first message.

---

## 5a. THE HONEST TAKE (~ 4:30 – 5:30)

**On screen:** Cut to me on camera. Coffee on the desk. No screen share.
A small title card in the corner reads "WOULD I USE THIS?".

**Spoken:**

> Right, honest take time — would I actually use Bento in production?
>
> For a tactical glue pipeline, like "move data from A to B with a bit of
> transformation in the middle"? Yes, immediately. The single-binary thing
> is genuinely the killer feature — you can drop this on a server, a
> container, or a laptop and it just works. No JVM tuning, no cluster, no
> Helm chart inheritance hell.
>
> For a stateful, 24/7, exactly-once thing? I'd still pick Flink. Bento has
> windowing and aggregation but it's not pretending to be a full streaming
> database, and that's fine.
>
> The bit the docs don't tell you: the YAML gets big on a real pipeline,
> and Bloblang's error messages when you get an indentation wrong are…
> let's call them "characterful". It's a docs-reading tool, not a
> guess-as-you-go tool.
>
> But here's why I keep coming back to it — Bento is small, cheap,
> source-controlled, and deployable by one slightly hungover person on a
> Tuesday. That's the hungovercoders worldview in a binary. Most teams don't
> need the Ferrari, they need the estate car that fits the dog in the boot.
> Bento is that car.

**Notes:** This is the section that makes the video worth watching instead
of asking an AI "how do I run a hello-world bento pipeline". Don't cut this
for time. Cut a build step instead if you have to.

---

## 6. WATCH-NEXT BRIDGE (~ 5:30)

**On screen:** Preview shot of the next video — VS Code with a CSV of breweries
on one side, JSON output on the other. Brief.

**Spoken:**

> In the next video we're going from `generate` to a real file input — reading
> a CSV of breweries off disk, transforming each row with Bloblang, and
> writing structured JSON out the other end. That's where Bloblang gets
> properly fun, and it's also where Bento starts to feel like a genuine
> alternative to writing a whole pipeline in Python.
>
> Subscribe if you want that one in your feed when it lands.

---

## 7. OUTRO (final 15 seconds)

**On screen:** End card with three things:
- GitHub repo URL: `github.com/dataGriff/learn.bento`
- Blog URL: `blog.hungovercoders.com/datagriff`
- "@datagriff"

Hold for 6 seconds.

**Spoken:**

> Honestly, if I were doing this first example again I'd ditch the
> auto-stop and let it stream forever — "press Ctrl-C when you're bored" is
> a better default for a tutorial than five-and-done.
>
> Code's in the description, blog version's in the description. Well done
> fellow hungovercoder. I'm off for a pint.

═══════════════════════════ COPY TO HERE ═══════════════════════════

---

# Notes on what the system did to the source material

So you can see *why* the transformation works (and apply the same moves to the other 13 examples in the repo):

**The README's intro became your opener.** The original was: *"A hands-on, walk-through tutorial for Bento — the declarative, YAML-first stream processor maintained by WarpStream Labs."* That's a docs site sentence. The blog version is: *"I wanted a stream processor I could run on my laptop without spinning up a JVM cluster…"* — same information, but it's now a **want** in the first person with a self-deprecating beat.

**The "Why Bento?" comparison table got binned.** It's a great table for docs. It is voiceless. The blog version weaves the same points into prose — "a single static binary, YAML-only config, no Go required" — and lets the voice carry them.

**Section headings got themed.** "Hello world" became "Cracking Open the First Pipeline". "Running the example" became "Giving the Beer a Pour — Running the Pipeline". Same content, on-voice headings.

**The honest debug beat made it into both formats.** *"First time I ran this I thought it had failed because it was over so quickly."* That sentence is the voice doing its job — it's real, it's a beginner moment from a senior developer, and it makes the reader/viewer feel safe. This is **opinion beat #1: the honest moment.**

**The Verdict section is brand new — and it's where the post earns its 2026 keep.** The README has a "Why Bento?" table that an AI could generate from the docs in five seconds. The Verdict section can't be AI-generated, because it requires you to have actually used Bento for a week and formed a view: *for tactical glue, yes; for stateful 24/7, no; the YAML gets big, the error messages are characterful, but it fits the worldview*. This is **opinion beat #2: the verdict.** It's the bit that makes the post worth reading instead of asking ChatGPT.

**The closer gained a "what I'd do differently" line.** *"If I were doing this first example again, I'd probably ditch the `count: 5`…"* — one sentence, but it proves you didn't just execute the tutorial, you reflected on it. This is **opinion beat #3: the what-I'd-do-differently line.**

**The YouTube cold open shows the payoff first.** The README starts by explaining what Bento is. The video opens with the working output already on screen — *"That right there is a working stream processor"* — and only then backs up to explain how. That inversion is the whole reason YouTube hooks work.

**The YouTube version dedicates a whole section to the Honest Take.** A full minute of you on camera, no screen share, giving your real verdict. That section is the entire reason someone subscribes to your channel instead of just watching the auto-generated tutorial videos that will exist for every tool by 2027.

---

## Why this matters: the AI-proofing summary

A walkthrough is no longer scarce. Any AI can generate one. What *is* scarce is:

1. **You actually built the thing** — proven by the honest moment.
2. **You formed a view** — proven by the verdict.
3. **You reflected, not just executed** — proven by the what-I'd-do-differently line.

The same five voice moves (themed headings, want-led opener, fellow-hungovercoder closer, etc.) plus the three opinion beats applied to examples 02 through 14 give you a whole tutorial series that doesn't lose to AI-generated content. Each blog post is 1,200–1,800 words; each video is 7–10 minutes. That's a quarter's worth of content from one repo — and content that still earns a click in 2030.
