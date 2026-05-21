# The Hungovercoders OKRs

> Quarterly objectives and key results to drive focus across the relaunch year. Designed to sit alongside the roadmap — the roadmap tells you *what to build*; the OKRs tell you *what success looks like at the end of each quarter*. If a roadmap task doesn't move a KR, ask whether the task is actually worth doing.

---

## How to use this document

OKRs are deliberately *outcomes*, not activities. The roadmap is full of activities (publish post, ship video, deploy site). This document is the *measure* of whether those activities worked.

The discipline:

1. **Re-read the current quarter's OKRs every Monday morning.** Two minutes. Calibrate the week.
2. **Score every KR at the end of each quarter** on the 0.0–1.0 scale used in proper OKRs. A score of 0.7 is considered a success — these are stretch targets, not commitments. Hitting 1.0 on everything means the targets were too soft.
3. **At the end of the quarter, write a one-paragraph reflection per OKR.** What worked? What didn't? Carry the lessons into the next quarter. This is itself content if you want it to be — *"hungovercoders Q1 retro"* posts age beautifully and signal seriousness about the craft.
4. **Don't change OKRs mid-quarter** unless something genuinely fundamental shifted. The whole point of fixed quarterly targets is the discipline of working against them when motivation flags.

### Calibrating the targets

Some of the numerical targets below are placeholders with reasoning shown — they assume you don't yet have current baselines for blog traffic, subscriber counts, or YouTube metrics. **Before locking these in, spend an hour pulling your actual baselines** (Google Search Console, current blog analytics if any, any social follower counts) and adjust upward or downward from there. The shape of the OKRs survives baseline calibration; the numbers need it.

A general rule on stretch: aim for KRs you have a roughly 50% chance of hitting at full target. If a KR feels guaranteed, it's too soft. If it feels impossible, it's too hard. The right zone is "this will require focused work and a bit of luck".

---

## The annual umbrella (Year 1)

The one-line North Star, and the three or four big things the whole year is in service of. Quarterly OKRs ladder up to these.

### Annual Objective

**Establish hungovercoders as a coherent, opinionated technical brand across blog, YouTube, and training material — built on the dataGriff voice and worldview — and prove the publishing system is sustainable past the 6-month creator-burnout cliff.**

### Annual Key Results

- **AKR1 — Brand consolidation done.** `hungovercoders.com` is the single canonical home for blog, training, and channel. Old subdomain serves only 301 redirects. AI search engines and Google both reliably surface `hungovercoders.com` (not `blog.hungovercoders.com`) when the brand name is queried.
- **AKR2 — Content system in active use.** All blog posts published this year pass the eight-point voice guide self-check including all three opinion beats. All YouTube videos published this year include the Honest Take segment. Voice guide reaches a v2 by end of year, refined from real publishing experience.
- **AKR3 — Cadence held.** At least 22 blog posts published in the year (against a target of 26). At least 14 videos published (against a target of 18). At least 2 training-series drops live (against a target of 3 in the build year). Hitting 22/14/2 is a 0.7 score; hitting 26/18/3 is 1.0.
- **AKR4 — Audience exists and is meaningfully engaged.** Organic monthly visitors to `hungovercoders.com` reach 5,000 by year-end (calibrate). Newsletter list reaches 500 subscribers. YouTube channel reaches Partner Program eligibility (1,000 subs + 4,000 watch hours).
- **AKR5 — Monetisation foundation laid.** Consulting page live and has generated at least one paid inbound enquiry. Affiliate links integrated into at least 10 posts. Newsletter sponsor inbox open and has had at least one serious conversation, whether or not closed.

These five together describe what "good" looks like in 12 months. They are deliberately ambitious — calibrate downward if your real baseline numbers make them implausible, but don't make them so easy that hitting them tells you nothing.

---

## Q1 — Foundations (months 1–3, covers roadmap phases 0–3)

The quarter where nothing visible launches publicly but everything load-bearing gets built. Most likely to feel slow and unrewarding. Most important quarter for the whole year.

### Q1 Objective

**Move hungovercoders from a scattered subdomain blog to a consolidated, on-brand, technically modern home — without losing search ranking or breaking the existing audience's bookmarks.**

### Q1 Key Results

- **Q1-KR1 — Domain consolidation complete.** 100% of old `blog.hungovercoders.com/datagriff/*` URLs return a working 301 to the corresponding `hungovercoders.com/blog/*` URL. Verified on a sample of 10 random old URLs.
- **Q1-KR2 — Astro rebuild complete and live.** All historic posts ported and rendering correctly on the new site. Lighthouse score on a representative post page is 95+ on performance and 100 on accessibility. New site deploys via push-to-main with no manual steps.
- **Q1-KR3 — Brand layer in place.** Landing page, about page, "what hungovercoders is" page (the brand-promise page, formerly called worldview page), and work-with-me page all live on `hungovercoders.com`. All four pass the voice guide eight-point self-check. A blind reader landing on the homepage can correctly identify the brand's point of view within 10 seconds (test by showing it to two people who don't already know your blog).
- **Q1-KR4 — Search ranking holds within tolerance.** Organic search traffic in month 3 is at least 70% of the month-prior baseline (the migration dip is real and expected — full recovery is a Q2 target). Google Search Console shows the new property indexed and the change-of-address request accepted.
- **Q1-KR5 — Content system battle-tested with one shipped piece.** At least one blog post published on the new site, written using the blog template, passing the eight-point self-check including all three opinion beats. This isn't about volume; it's proving the rails work.

### Q1 explicit non-goals

State these so you don't drift:

- **No YouTube channel launched yet.** Wrong quarter.
- **No training section started yet.** Wrong quarter.
- **No newsletter sends yet.** Capture form fine; actual emails wrong quarter.

### Q1 scoring guide

| Score | What it means |
|---|---|
| 0.3 | Domain migrated but site is broken in ways the audience notices |
| 0.5 | Migration done, brand pages live, search ranking dropped harder than expected |
| 0.7 | All KRs roughly met. The on-paper "successful Q1". |
| 1.0 | Everything done, search ranking held above 90% of baseline, brand pages are tight enough to be quoted by AI engines |

---

## Q2 — Launch readiness and first signal (months 4–6, covers roadmap phases 4–5 first half)

The quarter where the brand exists, the site works, and you start publicly publishing in earnest. YouTube launches. First training series begins. Cadence discipline starts being tested in real life.

### Q2 Objective

**Launch YouTube credibly, ship the first training series in coordinated multi-format style, and prove the fortnightly blog drumbeat is sustainable for a full quarter.**

### Q2 Key Results

- **Q2-KR1 — YouTube channel exists, looks professional, has shipped real content.** Channel live, branded, with at least 5 videos published in the quarter. At least one of those videos is the bento series launch piece. Channel description, banner, avatar all on-brand and pass voice-guide check.
- **Q2-KR2 — Bento training section drops with at least 6 lessons.** Live at `hungovercoders.com/training/bento/`. Each lesson follows the blog template structure adapted for lesson format. Sidebar nav and search both work. A reader can complete the first 6 lessons end to end without leaving the section.
- **Q2-KR3 — Blog cadence held.** At least 6 blog posts published this quarter (fortnightly = ~6 in 13 weeks). Each one passes the eight-point voice-guide check. No more than one publish date missed by more than 3 days.
- **Q2-KR4 — Cross-format discipline maintained.** At end of quarter, audit shows no blog post is a re-rendering of a training lesson, no video is a blog-read-aloud. Each format does a distinct job. This is a *quality* KR — score yourself honestly with examples.
- **Q2-KR5 — First measurable audience signal.** Newsletter list reaches 100 subscribers. YouTube channel reaches 200 subscribers. `hungovercoders.com` organic monthly visitors recover to and exceed the pre-migration baseline. Numbers are placeholders; calibrate to your real baseline once you have it.

### Q2 explicit non-goals

- **No paid course built.** Far too early.
- **No active sponsor chasing.** Affiliate links going in as natural; cold-pitching sponsors a year-2 problem.
- **No redesign of the site built in Q1.** Resist the urge.

### Q2 scoring guide

| Score | What it means |
|---|---|
| 0.3 | YouTube launched but only 2 videos shipped; training section delayed |
| 0.5 | Training section live but with fewer lessons than planned; blog cadence slipped twice |
| 0.7 | All KRs roughly met. Sustainable publishing rhythm clearly visible. |
| 1.0 | Bento section ships with 8 lessons not 6; blog cadence held perfectly; YouTube shows clear retention growth across the 5 videos |

---

## Q3 — Sustained presence and refinement (months 7–9, covers roadmap phases 5 second half + 6)

The quarter where the system either survives contact with reality or it doesn't. The bento launch wraps. First series-2 preparation begins. The publishing rhythm has to feel routine, not heroic.

### Q3 Objective

**Demonstrate that the publishing system is sustainable beyond a launch window — and that the audience is starting to compound rather than drift.**

### Q3 Key Results

- **Q3-KR1 — Bento launch wraps with capstone.** The 6-week post-launch window completes per the publishing strategy. Capstone blog post and capstone video published. Training section grows to at least 8 lessons.
- **Q3-KR2 — Blog cadence held a second quarter.** At least 6 more blog posts published (12 cumulative for the year). Demonstrates the fortnightly rhythm survives past the novelty of launch.
- **Q3-KR3 — Series 2 designed and pre-launch begun.** Topic for series 2 chosen based on what worked in series 1 (data-driven, not guess-driven). At least 2 pre-launch standalone blog posts published as audience-builders for the new topic.
- **Q3-KR4 — Voice guide, templates, and publishing strategy reach v2.** All four content-system documents revised based on lessons from 6 months of real use. Changes documented (a short "what I changed and why" note inside each doc).
- **Q3-KR5 — Audience compounding.** Newsletter list reaches 250 subscribers. YouTube channel reaches 500 subscribers (eligible for fan-funding tier of Partner Program at this point). Returning visitor rate on the blog is at least 25% (people coming back, not just one-and-done from search).

### Q3 scoring guide

| Score | What it means |
|---|---|
| 0.3 | Bento series limped to capstone; cadence visibly slipping; no series 2 plan |
| 0.5 | Series finished but capstone delayed; series 2 chosen but pre-launch posts not written |
| 0.7 | All KRs met. Publishing feels routine. |
| 1.0 | System refinement produced visible quality jumps in late-Q3 content; audience growth ahead of plan |

---

## Q4 — Compounding and first monetisation signal (months 10–12, covers roadmap phase 7)

The quarter where the question shifts from "can I sustain this?" to "is this becoming a thing?". First real monetisation signal expected — not income at scale, but evidence the foundations support future income.

### Q4 Objective

**Cross the meaningful audience thresholds, validate the first real revenue stream, and end the year with momentum that survives a holiday break.**

### Q4 Key Results

- **Q4-KR1 — Annual cadence achieved.** Year-end count of at least 22 blog posts (target 26), 14 videos (target 18), 2 training series live with 6+ lessons each (target 3). Track against the annual KR.
- **Q4-KR2 — YouTube reaches Partner Program eligibility.** 1,000 subscribers and 4,000 watch hours both achieved. Ads enabled with mid-roll off, non-skippable off (per the monetisation discipline).
- **Q4-KR3 — Newsletter reaches 500 subscribers.** And sends at least 2 emails during the quarter to test send infrastructure and audience response. Don't commit to weekly yet; just prove it works.
- **Q4-KR4 — First real monetisation signal.** At least one of: (a) a paid consulting enquiry from someone who found you through hungovercoders, (b) an inbound newsletter sponsor conversation that reaches "what would you charge?" stage, (c) £100+ in cumulative affiliate revenue for the year. Any one of these counts.
- **Q4-KR5 — Year-end reflection content shipped.** A capstone blog post and capstone video reviewing the year's launch, the lessons, the unexpected hits, the things that didn't work. This is the meta-content that proves the brand takes itself seriously without taking itself too seriously. It's also a recruitment piece for next year's audience.

### Q4 scoring guide

| Score | What it means |
|---|---|
| 0.3 | Cadence well below annual target; no monetisation signal; channel not Partner Program eligible |
| 0.5 | Cadence close to target; channel eligible but no monetisation signal yet |
| 0.7 | All KRs roughly met. Year ends with clear momentum into year 2. |
| 1.0 | First real revenue arrived; audience growth shows compounding (each month bigger than the last); year-end retro post becomes one of the most-shared pieces of the year |

---

## Cross-cutting principles (apply every quarter)

A few principles that aren't OKRs themselves but should govern how you score and respond to OKR misses:

### Score with brutal honesty

If a KR was "6 blog posts" and you shipped 5, that's 0.83, not 1.0. The whole point of OKRs is the gap between target and actual is informative. Inflating scores destroys that signal.

### Misses are data, not failures

If a KR consistently misses, the lesson is usually about *target-setting* or *strategy*, not effort. A KR that misses 0.3 two quarters running is broken in some way — the target is wrong, or the activity doesn't map to the outcome. Change the KR, don't grind harder against a broken target.

### Quality KRs sit alongside quantity KRs deliberately

The cadence KRs are quantitative (publish N posts). The discipline KRs (passes voice-guide check; cross-format separation maintained) are qualitative. If you're only hitting the quantity ones, you're publishing filler at volume. If you're only hitting the quality ones, you're polishing nothing into a perfect emptiness. Both have to score for the quarter to be real.

### The big risk: protecting the wrong rhythm

The single most common failure mode for content OKRs is **protecting the publish-count number while quality drifts**. If you find yourself shipping a post that doesn't have real opinion beats just to keep the fortnightly streak alive, you're winning the wrong game. Better to score 0.7 on cadence with strong posts than 1.0 on cadence with three filler weeks.

---

## What I'd do differently next year (drafted in advance)

A few predictions about which of these targets will turn out to have been miscalibrated:

- **The newsletter targets may be too aggressive.** 500 subscribers in 12 months from a standing start is achievable but requires the newsletter to actually exist and be promoted. If it stays a passive footer signup, expect 100–200 by year-end and recalibrate the target down.
- **The YouTube subscriber numbers may be too conservative for technical content.** Data-engineering YouTube is a niche where a single well-timed video on a popular tool can generate 500 subscribers in a week. If a video hits, your numbers may be 2–3x the targets here.
- **The monetisation signal in Q4 may arrive in Q2 or Q3 instead.** Consulting enquiries especially are unpredictable — the right blog post in front of the right reader at the right moment generates an enquiry the same week. Don't be surprised if Q4-KR4 lands early; it doesn't mean Q4 has nothing left to do.
- **The "no redesign" non-goal in Q2 will be the hardest to obey.** By Q2 you'll have ideas for the site that weren't obvious in Q1. Resist them. Catalogue them in a "v2 ideas" doc and revisit at the end of Q4.

---

## A note on the philosophy

These OKRs are intentionally weighted toward *system durability* and *audience compounding* rather than direct revenue. That choice is deliberate and follows the monetisation strategy in the roadmap: the foundations are the asset, the audience is the asset, the revenue is downstream of both. Year 1 OKRs that chased revenue directly would be optimising the wrong thing — they'd produce a small amount of money now and corrode the foundations that produce a lot more money later.

If you find yourself in mid-year and tempted to add a revenue-focused KR ("£X in affiliate revenue by month 8"), pause. Ask: does adding this KR make the foundation stronger, or does it pull effort away from the foundation? Almost always the answer is the latter. Revenue is a Year 2 OKR conversation.

Cheers, fellow hungovercoder. Time to start measuring.
