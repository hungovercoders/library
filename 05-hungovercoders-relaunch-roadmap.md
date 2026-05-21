# The Hungovercoders Relaunch Roadmap

> The end-to-end plan to take what currently lives at `blog.hungovercoders.com/datagriff` and turn it into a proper hub for the dataGriff brand — blog, YouTube, training material, and an opinionated point of view that an AI can't out-compete. Sequenced so each phase de-risks the next.

---

## The destination (what "done" looks like)

Before the steps, the target. In ~12 months, the setup is:

- **`hungovercoders.com`** is the apex hub. Landing page, brand, table of contents for everything else.
- **`hungovercoders.com/blog`** is where new dataGriff blog posts live. Built on Astro, hosted on Cloudflare Pages. All historic posts migrated and 301-redirected from the old subdomain. Publishes roughly fortnightly — the regular drumbeat of opinion and takes.
- **`hungovercoders.com/training/...`** is a structured training section — series of lessons, sidebar nav, full-text search via Pagefind. Built in plain Astro with the Content Loader API pulling lesson markdown from sibling `learn.<series>` tutorial repos at build time. Drops in batches of 6–10 lessons per series, roughly quarterly. First series is the bento one; more follow. This is the canonical, durable reference content.
- **YouTube channel** publishes selectively — one video per fortnight during a training-series launch window, one a month between series. Each video does a job the other formats can't (personality, demo, on-camera verdict), not a re-recording of the blog or training.
- **The three formats work as a triangle, not a stack.** Training is the deep reference, blog is the opinionated take, video is the discovery and personality. Each links to the other two; none tries to be the other two.
- **The content system** (voice guide, blog template, YouTube template, opinion-layer beats, publishing strategy) is in active use and refined from contact with reality.
- **The brand has a stated point of view** — small/cheap/yours, deployable-on-a-Tuesday, source-control everything — and every piece of output is evidence for it.
- **The brand promise is clear and visible:** *folk tales of now from a tech blog in the South Wales valleys, honest about working through it all, useful even after the tech moves on*. The about page and the "what hungovercoders is" page both express this in voice.
- **The monetisation layer is quietly running underneath** — consulting page live, affiliate links where natural, newsletter sponsorships starting to come in, YouTube ads on (with restraint), and a paid course either launched or seriously in planning. No revenue stream ever contradicts the honesty brand.

That's the target. Below is the road there, in phases small enough to actually ship.

---

## Phase 0 — Stop digging (this week)

Before doing anything new, stop reinforcing the old setup.

- [ ] **Don't publish anything new on `blog.hungovercoders.com/datagriff`** until the domain decision is made and the migration is staged. Every new post on the old subdomain is a future redirect to maintain.
- [ ] **Don't promote the old URL anywhere new.** No new external links, no new business cards, no new email signature with the old domain.
- [ ] **Read all four content-system files end to end** (voice guide, blog template, YouTube template, bento worked example). If anything sounds wrong, fix it now — these are the rails everything else runs on.

**Output of phase 0:** a frozen status quo. Nothing's broken, nothing's growing, you've created room to do the next bit properly.

**Honest moment:** the temptation here is to ignore phase 0 and just keep publishing while planning. Don't. Posts published this month under the old structure become migration debt next month.

---

## The publishing strategy (read this before phase 1)

This section sits between phase 0 and the build phases on purpose. It's not a phase — it's a *policy* that every subsequent phase implements. Get this wrong and the rest of the roadmap builds the wrong house.

### The core principle: each format does what the others can't

The single biggest mistake personal-brand content makers make is treating blog, video, and training as three different *containers for the same content*. They aren't. Each format should have a distinct job that the other formats can't do — otherwise why have three? Doing it that way is what people mean by "spam": not too much content, but too much content saying the same thing in slightly different shapes.

| Format | Its job | What it isn't |
|---|---|---|
| **Training material** | The canonical, durable reference. Someone Googling "how do I do X" in 2028 should land here and find a complete answer. Structured, versioned, has a sidebar and search. Long-tail SEO and AI citations come here. | Not opinionated, not narrative, not time-stamped. The training is the *truth*, not the *take*. |
| **Blog post** | The opinion, the story, the hook. Why I built this, what surprised me, what I'd do differently, why you should care. Points *into* the training for the actual how-to. Voice-forward. | Not a tutorial. The moment a blog post becomes "step 1, step 2, step 3" it should have been training material instead. |
| **YouTube video** | The personality and the trailer. You, talking, showing the working thing, giving the verdict to camera. Discovery engine — top of funnel. Points at both blog and training. | Not a re-recording of either. If the video is just the blog read aloud, kill it. |

### How the three formats relate

Picture a triangle. Training at one vertex (deep, structured). Blog at another (short, opinionated). Video at the third (fast, personal, visual). Each links to the other two. None tries to be the other two.

A reader who's never heard of you might land via:

- **YouTube** (broadest top of funnel) → hooked by personality → "full write-up in the description" → blog or training
- **Google or AI search** → lands in the training material → bottom of page links the related blog take and video
- **A blog post shared on social** → makes them want to actually build → links to training for the how-to and the video for the walkthrough

That's the architecture. Each surface earns its keep by doing a job the others can't.

### Cadence by format

Different jobs need different cadences. Don't pick one cadence and force all three into it.

**Training material drops in *series*, not instalments.** Release a training section when you have 6–10 lessons ready — not one lesson every fortnight. Training is judged on completeness. A reader who lands on "bento training" and finds 2 lessons bounces. A reader who finds 8 lessons forming a coherent path stays. So training drops as a *batch*, roughly **one new series every 3 months**. Between drops the section grows by polishing existing lessons as the tool evolves, not by adding new beginner ones.

**The blog post is the regular drumbeat.** This is reliable presence. **One post a fortnight**, year-round. Some posts accompany a training series ("here's why I built the bento section"). Some are standalone takes that don't map to training at all ("five things I'd do differently if I started learning streaming in 2026"). Around 1,200–1,800 words each, with the three mandatory opinion beats. Don't water down to hit a calendar.

**The video is the most expensive format, so be most strategic with it.** **One video a fortnight when you're inside a training-series launch window; one a month between series.** Each video is paired with *either* a blog post *or* a training lesson — sometimes both, never automatically. The video picks the moments where personality and visual demo add the most value. A blog post about a domain migration doesn't need a video. A blog post about your first bento pipeline absolutely does.

### Does the video map to one training lesson or many?

The specific question worth answering before phase 5. Short answer: **mostly one-to-one with training lessons, but never one-to-one with blog posts, and not every training lesson needs a video.**

A training lesson is structurally similar to a video — both walk through "do this, then this, here's the result". So a video maps cleanly to a single training lesson most of the time. But cherry-pick: some lessons are too small for a video (a five-minute concept), some too dense (a 30-minute Bloblang deep-dive nobody wants to watch end-to-end), some too dependent on prior lessons to make sense standalone. Reasonable target: **roughly half the lessons in a series get a video**. The bento series of 14 lessons → maybe 6–8 videos, picked for where the visual/personality lift is highest.

Blog posts work differently. A blog post is a *take* on a topic, not a walkthrough, so the relationship is "blog points at training" — they aren't the same content. Some blog posts launch a series ("I just published a bento training series — here's why"). Some are standalone opinion pieces that don't map to any training. Some sit mid-series ("halfway through this, here's what surprised me"). Plan blogs around the calendar; plan training as a batch; plan videos as a selective accompaniment to both.

### A worked release pattern: how the bento series actually launches

To make this concrete, here's what a single training-series launch looks like end to end. This pattern repeats for series 2, 3, 4, etc.

**Pre-launch (the 2 months before drop):**
- Two standalone blog posts on adjacent topics, building anticipation. Examples: *"Why I'm Looking at Bento Instead of Kafka Streams"*, *"The Streaming Tool I Wish Existed When I Started"*.
- One standalone video — a "tools I'm exploring this quarter" piece that name-checks bento. Not a tutorial; a teaser.

**Launch week:**
- Drop the training section with 6–8 lessons ready (Hello World through Filter & Route).
- One blog post — the launch announcement and the take: *"I Built a Bento Training Series — Here's Why and What's In It"*.
- One video — same energy, on camera: *"Bento in 90 Seconds — Why I Built a Whole Training Series Around This Tool"*. Points at the training section.

**The 6 weeks after launch:**
- One video per fortnight (3 videos total), each going deeper on a specific lesson. Each video accompanies a blog post that gives the *take* on that topic — not a re-tread of the lesson. Example: a video walking through error handling pairs with a blog called *"Error Handling in Streaming is the Bit That Humbles You"*.
- Training section quietly gains lessons 7 and 8 in the background — these don't get videos.

**Wrap-up:**
- Capstone blog post: *"What I Learned Building the Bento Training Series"*. The verdict at series level, not lesson level.
- Capstone video: same energy, condensed for camera.

**Total across ~10 weeks:** 1 training drop with 6–8 lessons + 2 follow-on lessons, around 5 blog posts, around 4 videos. None redundant — each does a distinct job.

### Annual output, sustainable on a day-job schedule

Pulling the cadence together, a realistic year looks like:

- **~26 blog posts** (one a fortnight, year-round)
- **~18 videos** (varies between every-fortnight in launch windows and monthly between)
- **~4 training-series drops** (one a quarter, each containing 6–10 lessons)

That's plenty of presence without overcommitting. It's also batched in a way that protects you — you film the launch-window videos in batches, write blog posts on a regular rhythm, and only do the heavy lift of training-series creation four times a year.

### The not-spamming rule

"Spam" almost never means "too much" — it means "too much filler". A daily blog post that always has something genuine to say is not spam. A weekly post that's clearly stretched thin is. The reader's tolerance is set by usefulness, not frequency.

The discipline that protects you is the **opinion-layer requirement from the voice guide**. If every blog post has a real honest moment, a real verdict, and a real what-I'd-do-differently, none are spam. The moment you publish a post without those beats, you've published filler — and filler is what trains an audience to ignore you. So the cadence rule is: *whatever you can sustain while keeping the opinion beats real*. If that's fortnightly, ship fortnightly. If it's weekly, ship weekly. Pick the rhythm at the level of quality you can defend, not the level you wish you could hit.

### The YouTube-specific cadence rule

YouTube punishes inconsistency more than it punishes low volume. A channel that publishes one video every two weeks for two years builds an audience. A channel that publishes three videos a week for two months and then nothing for six months gets buried by the algorithm and never recovers. So the rule is: **protect the rhythm, not the calendar date**. Better to publish a slightly less polished video on time than a beautiful one three weeks late.

### How this changes the rest of the roadmap

Two flow-on effects, both reflected in the updated phases below:

1. **Phase 5 is no longer "the bento series" as 14 paired blog+video+lesson units.** It's a coordinated multi-format launch — see the worked release pattern above. Reshaped in the phase below.
2. **A new ongoing rhythm starts at phase 5 and continues forever:** the fortnightly blog post becomes a permanent commitment that outlasts any individual training-series launch. The blog is the drumbeat that keeps the brand present between training drops.

---

## Phase 1 — The domain consolidation (weeks 1–3)

The smallest, highest-impact move. Get the URL right before anything else.

### Why this is first

Every link, citation, AI mention, backlink, and Google index entry you generate from this point onwards should point at the *final* destination. Doing this after launching YouTube means every video description links to a soon-to-be-redirected URL — pointless and confusing.

### What to actually do

- [ ] **Decide the final blog URL.** Recommended: `hungovercoders.com/blog`. Alternative: `hungovercoders.com/datagriff` if you want to keep the personal stamp inside a multi-author future.
- [ ] **Audit what's currently at the apex.** Note exactly what `hungovercoders.com` does today, what's hosted where, what depends on what. Take screenshots; they're useful for a "before/after" post later.
- [ ] **Plan the GitHub Pages → new-host migration.** The current Jekyll blog is GitHub Pages. The new site will be Astro on Azure Static Web Apps (you already have the recipe from your Docusaurus post). Pick the cutover weekend.
- [ ] **Map every existing post URL to its new URL.** Spreadsheet. Old URL in column A, new URL in column B. About 50 rows for you. This becomes your redirect map.
- [ ] **Configure 301 redirects** from the old subdomain to the new subdirectory paths. On GitHub Pages this means a redirect config; on Azure Static Web Apps it means `staticwebapp.config.json` rules. Test every single one before going live.
- [ ] **Update Google Search Console.** Add the new property, submit the new sitemap, file a change-of-address request, leave the old property alone so it can serve redirects.
- [ ] **Update social profiles, email signatures, GitHub bio, anywhere you've published the old URL.** This is the boring bit that gets forgotten and matters most.

### Done when

- Visiting any `blog.hungovercoders.com/datagriff/...` URL 301s correctly to the matching `hungovercoders.com/blog/...` URL.
- Google Search Console shows the new property indexed and the change-of-address accepted.
- A test list of 10 random old post URLs all resolve to their new homes with status 200 after redirect.

### Honest expectation

You'll see a 2–6 week ranking wobble during the resettling period. When Salesforce moved their blog from a subdomain to a subdirectory, organic traffic doubled overnight. — that's the optimistic case. The realistic case is a dip, then recovery, then exceed. Plan for the dip.

### Content opportunity

This phase produces a blog post: *"I Finally Moved My Blog Off a Subdomain — Here's What It Cost Me and What I'd Do Differently"*. Write it. It's a perfect dataGriff piece — real migration, honest beats, a verdict.

---

## Phase 2 — Astro foundations (weeks 4–7)

Get the new site up, ported, looking right, and ready to grow.

### Why this is next

You need a stable, modern, on-brand site *before* you start filming videos that link to it. Otherwise every video pushes traffic to a half-finished page.

### What to actually do

- [ ] **Bootstrap an Astro project.** `npm create astro@latest`. Pick a blog starter template — there are several good ones. Repo lives in your `hungovercoders` GitHub org alongside the existing assets.
- [ ] **Decide on the styling approach.** Recommended: Tailwind. Universally supported, AI assistants are excellent at it, and it gets you out of CSS faff fast. Not the only option, but the default-good one.
- [ ] **Port the visual identity.** The hungovercoders mark, the colour palette, fonts. Don't redesign — port. The redesign is a phase 4 problem.
- [ ] **Set up content collections.** Astro's content collections are how it manages blog posts. Each post is a markdown/MDX file with frontmatter. Structurally close to what Jekyll already does — the mental model survives.
- [ ] **Port one post first as a smoke test.** Pick a recent one. Get it rendering on local dev. Confirm syntax highlighting works, images work, frontmatter maps correctly.
- [ ] **Then port the rest.** Bulk script-able with a small migration script if you're feeling motivated, or done by hand if there are only 50 posts and you can do five a day for a fortnight.
- [ ] **Set up deployment to Azure Static Web Apps.** You already have this recipe. Custom domain `hungovercoders.com` pointed at the new site. Old `blog.` subdomain still pointed at the old GitHub Pages host serving redirects.
- [ ] **Set up analytics and search console** on the new property. Don't skip this — without baseline analytics from day one you'll never know if anything you do later works.
- [ ] **Wire up an RSS feed.** A lot of dev-blog readers still use one. Astro has a built-in integration; takes ten minutes.
- [ ] **Add comments back.** Your existing Giscus setup works on Astro — port it.

### Done when

- `hungovercoders.com` serves the new Astro site.
- All 50ish historic posts are reachable at their new URLs.
- Old subdomain URLs still 301 correctly.
- Lighthouse score is 95+ on a representative post page.
- You can publish a new post by adding a markdown file and pushing to main.

### Honest moment to expect

The post that renders fine in Jekyll but breaks in Astro because of a Liquid tag, a custom plugin, or a quirky frontmatter field. There will be some. Budget half a day to fix them. It's not the migration tooling that bites you — it's the long tail of "one weird post".

### Content opportunity

Another blog post: *"From Jekyll to Astro — Why I Switched After Four Years and How the Migration Went"*. With the opinion beats: honest moment ("the Liquid-to-MDX translation cost me an evening I wasn't expecting"), verdict ("would I do it again? yes, but I'd port the trickiest post first as a canary"), what-I'd-do-differently. Writes itself.

---

## Phase 3 — Hub and brand layer (weeks 8–10)

`hungovercoders.com` becomes more than just "where the blog lives".

### Why this matters

Right now, the apex domain is essentially empty. For the AI-citation, brand-consolidation, and "where do I send a YouTube viewer" reasons we discussed, the apex needs to *be something* — a place a stranger lands and gets a clear sense of "what is this and who's behind it".

### What to actually do

- [ ] **Design the landing page.** Three sections is enough for now: (1) what hungovercoders is — one sentence, in voice; (2) latest blog posts — three to six cards; (3) latest video — embed, when YouTube launches. Don't over-engineer.
- [ ] **Write the about page.** Short. First person. In voice. **The personal manifesto (`09-personal-manifesto-prompts.md`) is the source material** — polish the right paragraphs from there. Quotable lines to draw from: "*a forty odd year old man from the valleys who has a successful tech career based on grit, determination, humour, enthusiasm*"; "*folk tales of now*"; "*I share loads of learnings on tech stuff but try to make it fun for you with stories and context from me*". This is the page an AI will read when asked "who is dataGriff" — make it answer the question honestly.
- [ ] **Add the "what hungovercoders is" page (the brand-promise page).** Standalone page that names the brand promise: *folk tales of now from a tech blog in the South Wales valleys, honest about working through it all, useful even after the tech moves on*. Underneath, the technical worldview as a bulleted list: small/cheap/yours, deployable-on-a-Tuesday, source-control everything, etc. (drawn from voice guide section 1). Every blog post implicitly references this page; this page makes it citable. AI engines love a "this is what I believe" page they can quote. **Don't over-claim about Welsh heritage** — keep the Welsh thread as background colour, not foreground claim. The honesty about working-class valleys life is the rooting; the cultural specifics surface naturally when relevant.
- [ ] **Set up newsletter capture.** Even if you don't email anyone yet. The list compounds. Buttondown or Substack work fine and don't require committing to a publishing schedule. Plug into the landing page footer.
- [ ] **Add a low-key "work with me" page.** First entry in the monetisation strategy. Doesn't have to be flashy — what you do, what kinds of engagements you take, how to get in touch. Linked from the footer, not the main nav. This is the quietest, most audience-friendly revenue stream and the page costs nothing to maintain.
- [ ] **Tag system that actually works.** Astro makes this trivial — tag landing pages, RSS per tag. Use the tag taxonomy from the blog template (`azure`, `data-engineering`, `streaming`, etc.).

### Done when

- Apex domain has a real landing page, about page, "what hungovercoders is" page, and work-with-me page.
- All four are on-brand, in voice, and pass the voice guide self-check.
- A stranger landing on the homepage can tell within 10 seconds: what this site is, who's behind it, what they care about.
- Newsletter form works (even if no emails are sent yet).

### Content opportunity

Not a blog post this time — a manifesto. The "what hungovercoders is" page *is* the manifesto. It's the most quotable, AI-citation-friendly artefact on the entire site, and it's the thing that turns "a developer who writes tutorials" into "the hungovercoders guy with a point of view". The personal manifesto from the 2026-05-17 session is the source material — distil it into 300–500 words, in voice, citable.

---

## Phase 4 — YouTube preflight (weeks 11–13)

Get the channel ready before publishing a single video.

### Why this is in its own phase

Filming and editing without a publishing system in place is how channels die after three videos. Set up the rails first.

### What to actually do

- [ ] **Create the channel.** Channel name decision: `@datagriff` or `@hungovercoders`? Recommended: `@hungovercoders` — broader, brand-level, fits the long-term ambition. Personal handle becomes the on-channel host name.
- [ ] **Channel art, avatar, banner.** Use the same brand assets as the site. Consistency across surfaces.
- [ ] **Channel description.** Same voice as the about page, slightly compressed. Link to `hungovercoders.com` first thing.
- [ ] **Set up a recording environment.** Doesn't have to be a studio. A reasonable mic, a clean screen-record setup (OBS is fine), a place where the cat doesn't barge in. The single highest-leverage equipment purchase is the mic — bad audio kills a video faster than bad video.
- [ ] **Editing workflow.** Pick one tool and stick with it: DaVinci Resolve (free, capable, learning curve), or pay for something gentler like Descript if your time is worth more than the subscription. Don't tool-shop in public; commit and learn.
- [ ] **Decide on the thumbnail template.** Per the YouTube script template: your face or your dog (or both), one tool logo, three-word text overlay max. Pick a layout, save it as a reusable template in whatever design tool you use, never re-design from scratch.
- [ ] **Write the first three video scripts.** Use the YouTube script template. Don't film yet — write three first so you can spot pattern issues across the series before they're baked into video.
- [ ] **Set up the description template.** Every video description will share a structure: one-line summary, repo link, blog link, timestamps, related videos. Template it now so you're not rewriting it every time.

### Done when

- Channel exists, looks on-brand, has a description, a banner, and an avatar.
- Recording and editing workflows are tested with a 60-second throwaway clip (which you don't publish — it's a test).
- Three scripts are written and reviewed against the voice guide.
- Thumbnail template exists.
- Description template exists.

### Content opportunity

A blog post: *"How I'm Setting Up a YouTube Channel — Gear, Workflow, and the Bits I'm Still Getting Wrong"*. The "still getting wrong" framing is the voice — and it's the kind of post that ages better than a "definitive guide" because honesty doesn't expire.

---

## Phase 5 — The bento series launch (weeks 14–24)

The first real test of the entire system. Around 10–12 weeks. Real content, real cadence across three formats, real audience-building. Follows the worked release pattern from the publishing strategy section above.

### Why bento specifically

You already have the repo. You already have an example blog post and YouTube script in the worked example. The 14 examples in the repo make a natural training series. It's the most de-risked first launch you could possibly pick.

### The shape of this phase

This isn't 14 paired blog+video episodes. It's a **coordinated multi-format launch** where each format does a distinct job. Re-read the publishing strategy section if anything below feels arbitrary.

### Pre-launch — building anticipation (weeks 14–17, ~4 weeks)

- [ ] **Publish 2 standalone blog posts on adjacent topics.** Build the audience that will care about the launch. Examples: *"Why I'm Looking at Bento Instead of Kafka Streams"*, *"The Streaming Tool I Wish Existed When I Started"*. Both opinion pieces, both with full opinion-layer beats, neither a tutorial.
- [ ] **Publish 1 standalone video.** A "tools I'm exploring this quarter" piece that name-checks bento and others. Not a tutorial — a teaser. Sets the channel rhythm and gets you over the cold-start hump before the launch itself.
- [ ] **Build the training section scaffolding.** `hungovercoders.com/training/bento/` — Astro routes that consume lesson markdown from the `learn.bento` repo via the Content Loader API. Sidebar nav, search (Pagefind), "next lesson" buttons. Empty until the tutorial repo has content.
- [ ] **Draft 6–8 training lessons.** Lessons 01 through 06 (or 08) of the bento examples, fully written, code-tested, in voice. Don't ship them yet — they drop together as a batch.

### Launch week (week 18)

The training section goes live with 6–8 lessons in one drop. Three pieces of content go out the same week.

- [ ] **Drop the training section.** `hungovercoders.com/training/bento/` is live with 6–8 lessons.
- [ ] **Publish the launch blog post.** The announcement and the take: *"I Built a Bento Training Series — Here's Why and What's In It"*. The blog explains why this exists and links into the training; it's not a re-tread of any lesson.
- [ ] **Publish the launch video.** On-camera energy: *"Bento in 90 Seconds — Why I Built a Whole Training Series Around This Tool"*. Points at the training section in the description.

### Post-launch (weeks 19–24, ~6 weeks)

Sustained presence across all three formats while the training section quietly grows.

- [ ] **One blog post per fortnight, year-round commitment starts here.** Three blog posts in this 6-week window. Some are deep-dives on bento concepts (with the take, not the tutorial); some are standalone opinion pieces. None re-tread the training material.
- [ ] **One video per fortnight during this launch window.** Three videos. Each picks a single training lesson to walk through with personality. Don't try to video every lesson — cherry-pick the ones where visual demo and on-camera verdict add genuine value. Likely candidates: Bloblang transform (visually striking), error handling (where your honest moment lands hard), end-to-end pipeline (the satisfying payoff).
- [ ] **Add 2 more training lessons mid-window.** Lessons 07 and 08 (or 09–10 if you started with 6). These don't get videos — they're text-only training additions.

### Wrap-up (end of week 24)

- [ ] **Capstone blog post: *"What I Learned Building the Bento Training Series"*.** The verdict at series level — not just on bento, but on the format itself. What worked? What didn't? Would you do it again? This is the most-shareable post of the whole launch.
- [ ] **Capstone video** with the same energy, condensed for camera. Three minutes max. The 90-second elevator pitch + the verdict + what's next.

### Done when

- Training section has 8–10 lessons live and growing.
- ~5 blog posts published across the launch window (2 pre-launch + 3 post-launch).
- ~4 videos published (1 pre-launch teaser + 1 launch + 3 post-launch).
- 1 capstone blog post and 1 capstone video close the launch.
- The fortnightly blog rhythm and the launch-window video rhythm both demonstrably work — you've proved you can hit a calendar without quality slippage.

### Honest expectation

The first 3 videos will be rougher than you want. That's normal and unavoidable. By video 4 you'll be visibly better. By the capstone you'll cringe at the launch video — which means you grew. **Don't re-shoot the early ones.** The visible improvement is itself content; it makes the audience feel they're growing with you.

### The biggest risk to flag

Drift in publishing cadence. The fortnightly blog rhythm is the load-bearing commitment — the one that has to outlast the launch and run forever. If anything has to slip during this phase, slip the videos before the blog. The blog is the drumbeat; the videos are the spotlights.

### Content opportunity

The whole launch is content. The capstone blog post writes itself if you've been collecting honest moments as you went. Build a "launch lessons" scratchpad doc on day one and dump observations into it as you go — it becomes the capstone draft.

---

## Phase 6 — System refinement (weeks 25–28)

After the bento launch closes, take a breath and tune the system before scaling it to series #2.

### What to actually do

- [ ] **Review the voice guide against ~10 weeks of real output.** What's working? What feels forced? Is any rule causing more friction than value? Edit ruthlessly.
- [ ] **Review the templates.** Same exercise. Anything you keep skipping is either wrong (delete it) or right but badly placed (move it).
- [ ] **Review the publishing strategy.** Did the format-separation discipline hold? Were there blog posts that should have been training, or videos that were just blog-read-aloud? The drift to watch for is *re-rendering the same content in multiple formats*. If you spot it, harden the rule before series 2.
- [ ] **Analyse what the audience responded to.** Which posts drew traffic? Which videos got watched all the way through? Which beats got quoted? Let the data steer series 2.
- [ ] **Plan series #2.** Topic decision based on (a) what you're actually using in real work, (b) where audience interest landed. Apply the same pre-launch → launch → post-launch → capstone pattern from the publishing strategy.
- [ ] **Decide whether to bring in AI assistance more explicitly.** By month 6, your voice guide is mature enough to plug into Claude or similar as a system prompt. Generate first drafts with AI, hand-edit for the opinion beats, ship. Be transparent about it — that's the build-in-public-with-AI-in-shot pattern from the voice guide.

### Done when

- Voice guide v2, templates v2, publishing strategy v2 all exist with lessons baked in.
- Series #2 is planned, with pre-launch blog posts and teaser video already scheduled.
- You have a clear, evidence-based view of what works for the hungovercoders audience.

---

## Phase 7 — Compounding (months 7+)

The first six months were setup. Now the system compounds.

### The steady-state annual rhythm

By this point, the cadence laid out in the publishing strategy is the rhythm of your year:

- **~26 blog posts** (one a fortnight, year-round — the drumbeat that never stops)
- **~18 videos** (fortnightly during series-launch windows, monthly between)
- **~4 training-series drops** (one a quarter, each containing 6–10 lessons + a capstone)

Each new training-series launch follows the same pattern as the bento one: 4 weeks of pre-launch teaser posts, a launch week with a coordinated triple-drop, 6 weeks of post-launch follow-on content, a capstone. The pattern is the product.

### What to actually do

- **Keep publishing on the rhythm.** Series after series. Resist the urge to "catch up" with a heroic burst when life gets in the way — protect the rhythm over the calendar date.
- **Open adjacent surfaces.** A newsletter that *actually* sends (one email per series capstone is plenty to start). Occasional talks or podcasts where the worldview gets aired. Maybe a paid training course once two or three free series have validated demand.
- **Bring AI deeper into the workflow.** Voice-guide-driven drafting, automated transcript-to-blog generation for the video → blog pipeline, automated chapter markers. The principle stays the same: AI drafts the walkthrough, you write the opinion beats.
- **Resist the temptation to redesign.** The site you built in phase 2 will look slightly dated by month 12. That's fine. Content compounds; redesigns reset compound interest. Only redesign when a real, named friction is forcing it.

### The "evergreen drafts" folder

A practical antidote to the months-7-through-12 cliff that kills most channels: keep a folder of half-drafted blog posts that you can finish in two hours when life gets in the way. The folder gets fed during easy weeks; it gets drained during hard ones. The fortnightly cadence survives because the folder absorbs the variance. Without this, the rhythm dies the first time you have a hard fortnight.

### Honest moment for this phase

Most channels and blogs die in months 7–12, not in months 1–6. The death isn't dramatic — it's just gradually publishing less, then not at all. The way to avoid it is to make publishing *easier than not publishing*: have scripts queued, have the next series planned, have the evergreen drafts folder warm. The system is the antidote to motivation-based publishing.

---

## The monetisation strategy (orthogonal to the phases)

This section sits at the end on purpose — not because monetisation is an afterthought, but because every revenue stream below depends on the trust the content phases build first. Monetising before the foundations are in place is the single fastest way to destroy the brand. So treat this as a *timing overlay* across phases 1–7, not as a separate phase.

### The principle: separate audience from customer

The single most important monetisation rule for a technical creator is this — **the audience and the customer don't have to be the same person**. Most "monetisation ruined the channel" disasters happen because creators try to extract money from their audience directly: paywalled tutorials, intrusive ads, sponsorships for products the audience neither wants nor trusts.

The better model is: free, generous, high-quality content builds an *audience*. The audience generates a *reputation*. The reputation generates *customers* — who are usually a different, smaller group buying something different from what the audience reads. Done this way, monetisation isn't a tax on the audience; it's an entirely separate transaction with someone who wasn't the audience anyway.

The hungovercoders brand is fundamentally an *honesty brand* — *"I built this, here's my real take, would I use it in production?"*. Any monetisation that contradicts that signal kills the goose. The opinion layer in the voice guide and the monetisation strategy here are two sides of the same coin: both are about protecting trust as the load-bearing asset.

### The three tiers of revenue

In order of how invisible the monetisation is to the audience:

#### Tier 1 — Zero impact on users, mostly invisible

The cleanest revenue stream for a technical creator with a worldview is **consulting and contract work that the content qualifies you for**. Your blog and YouTube channel become a permanent, searchable portfolio that says "this person knows data engineering, has a point of view, can explain things, and ships". Hiring managers and clients find you through the content. You convert maybe one in a thousand readers into a conversation, and maybe one in ten of those into a paid engagement. The reader doesn't experience monetisation at all — they got a free tutorial. But you got paid, because someone two layers downstream needed exactly what your content proved you can do.

This is what most successful technical creators are actually doing, even when it doesn't show up on their channel. The "financial system" for a technical person is often: **content → reputation → consulting day-rate → income**. The content layer being free is the *point*, because that's what gets you discovered.

**Concrete action:** add a clear "available for consulting" or "work with me" page on `hungovercoders.com`, with what you do, what you charge, and how to get in touch. Don't bury it. It's a service, not a confession.

#### Tier 2 — Low impact, audience-friendly if done with taste

**Affiliate links for tools you'd recommend anyway.** If you write a tutorial on Bento or Astro and the post mentions a hosting provider, an IDE, a course, a book — and there's an affiliate programme — using the affiliate link costs the reader nothing and earns you a small kickback. The discipline that protects this from feeling sleazy is: *only ever link to things you'd recommend without the affiliate cut*. If the answer to "would I tell a mate to use this?" is no, the link doesn't go in. Same principle as the opinion layer — your trust is the asset, never trade it for the per-click commission.

**Newsletter sponsorships.** Once you have a newsletter with even a few hundred engaged subscribers, technical tools will pay you to mention them. The standard format is a single labelled sponsor block per email — clearly marked "today's email is sponsored by X", a paragraph about the tool, done. Readers tolerate this because it's transparent and contained. The discipline: only accept sponsors that are *genuinely relevant to a hungovercoder*. A streaming database, a developer-first observability tool, a learning platform — yes. A crypto exchange or an "AI productivity tool" with no real product — no.

**YouTube ad revenue, but with restraint.** Once you cross the YouTube Partner Program threshold (1,000 subscribers and 4,000 watch hours), you can turn on ads. The honest call: do it, but **turn off mid-roll ads on videos under 15 minutes** and **disable non-skippable ads entirely**. Pre-roll and post-roll are tolerated; mid-rolls in a 7-minute tutorial are where channels start feeling spammy. Non-skippable ads make more money per view and destroy goodwill at the same rate. You'll make slightly less per video and keep a lot more audience trust — the right trade for a brand built on it.

#### Tier 3 — Higher impact, requires more care, can be excellent if done right

**Paid training courses, separate from the free training.** This is where it gets interesting and is the most natural fit for what you're building. The model: your free training section on `hungovercoders.com/training/...` teaches the concepts and walks through individual tools (bento, Astro, etc.). A *paid* course goes deeper — a multi-week guided programme on something larger, like *"Building a Real-World Streaming Pipeline End-to-End"* or *"Deploying Production Data Platforms on Azure for Small Teams"*. The free training is the *trailer*. The paid course is the *full experience*, with structure, exercises, maybe office hours or a community.

This works *only* if the free training is genuinely substantive — not a deliberately-crippled teaser. Readers can sense the difference. If a free post ends with "...and in my paid course I'll show you how", you've broken the contract. If a free post ends with "...here's everything you need to do this — and if you want a guided 6-week version with feedback and a community, I run a paid course", you've kept it.

The model in one line: **free content gives someone everything they need to do the thing alone. The paid course gives them everything they need to do it quickly, with support, and as part of a cohort.** Different value proposition, same trust.

**Sponsored deep-dives, clearly labelled.** A vendor pays you to write a deep, honest, opinion-included blog post or video about their tool. This works in technical content *only* if you maintain editorial control — meaning you'll publish the verdict you'd actually give, including the negative bits, and the sponsor knows that going in. The good vendors are fine with this; the bad ones aren't, and you turn them down. Label these clearly: *"This post was sponsored by X — they paid me to write about their tool, they did not get to review the verdict"*. The honesty is the differentiator and it's actively rare in sponsored content, which makes yours valuable.

### What to avoid (and why)

- **Paywalled tutorials behind a generic Patreon.** Splits the audience, looks needy, and makes everyone who isn't paying wonder if they're missing the good stuff. The vibe is wrong for hungovercoders specifically — the brand is generosity-coded.
- **Display ads on the blog itself.** A Google AdSense bar across the top of a technical blog is a goodwill-destroyer for negligible income. The reader experience is materially worse and you make pennies. Just don't.
- **Branded merch as a primary revenue play.** Fine as a love-letter to the most engaged audience members ("here's a hungovercoders t-shirt because some of you asked") but it's not real income and the operational tax of managing inventory will eat your evenings. Bottom of the priority list.
- **Cookie-cutter sponsorships from companies your audience would never use.** A VPN ad on a data-engineering channel is the canonical "you stopped caring" signal. Better to leave money on the table than take it from sponsors whose products you'd never recommend.

### When each revenue stream turns on (mapped to the phases)

| Phase | Months | What to turn on | What to leave alone |
|---|---|---|---|
| **0–2** | 0–2 | Nothing. Foundations only. | Everything below. Don't even register affiliate accounts. |
| **3** | 2–3 | A quiet "available for consulting" page on the apex domain | Affiliates, ads, sponsorships, courses |
| **4–5** | 3–6 | Affiliate links to tools you genuinely use, added naturally inside posts as the bento series ships | YouTube ads (not eligible yet), sponsorships, courses |
| **6** | 6–7 | Newsletter sponsor inbox opens. Make a "sponsor the newsletter" page; let inbound find you. Don't chase. | YouTube ads still likely not eligible; courses still speculative |
| **7** | 7+ | Turn on YouTube ads if eligibility hit (mid-rolls off, non-skippable off). Start *thinking* about a paid course — only if readers have been asking | Paid course launch (premature if no demand signal) |
| **Year 2+** | 12+ | Paid course launch (once free training has validated demand). Consulting day-rate increases as the brand strengthens. Selective sponsored deep-dives. | Anything that contradicts the honesty brand |

### The honest take on timing

Don't monetise too early. The biggest enemy of long-term monetisation is short-term monetisation that signals you're trying to extract value before you've built it. Every premature ad placement, every affiliate link in a thin post, every sponsorship taken from a vendor you don't believe in — these compound *negatively*. They train your audience to distrust you, and trust is the actual asset behind all of the revenue streams above.

If you spend the first 12 months purely on content quality and brand-building, with consulting and a soft affiliate layer in the background, you'll be in a far stronger position for *real* monetisation in year 2 than if you spent year 1 chasing every revenue stream.

### Realistic expectations on income

Some honesty on numbers, because content-creator marketing makes this sound easier than it is:

- **Year 1 income from content directly will be small.** Realistic range: affiliate earnings in the hundreds-of-pounds-per-year category, newsletter sponsorships starting at maybe £100–£300 a slot if you can land any, YouTube ad revenue measured in tens of pounds until the channel actually grows. Don't quit the day job.
- **Year 1 income *enabled* by content can be substantial.** A single consulting engagement, a job offer from someone who found you through the blog, a speaking gig — any one of these can dwarf direct content income. This is the real Year 1 revenue lever.
- **Year 2+ is where direct income compounds.** A paid course with 50 students at £200 is £10k. A newsletter at 2,000 subscribers selling slots at £400 is £10k/year. YouTube at 20k subscribers with a healthy CPM might be £3–5k/year. Stack three or four of these and it becomes a real second income — but only if Year 1 was spent on quality, not chasing.

### Discipline rules that protect the brand

A short list to re-read before saying yes to any new revenue stream:

1. **Would I recommend this without the money?** If no, decline.
2. **Will I tell the audience this is paid?** If no, decline.
3. **Does the sponsor get to edit my verdict?** If yes, decline.
4. **Would a fellow hungovercoder feel respected after seeing this?** If no, decline.
5. **Is this revenue stream costing me trust faster than it pays me money?** If yes, kill it.

The five-question check is the monetisation equivalent of the opinion-layer self-check in the voice guide. Run any potential revenue stream through it. The brand survives by saying no more than it says yes.

---

## What I'd do differently next time (drafted in advance, so future-you can read it)

A few things I'd bet money on getting wrong on the first pass — flagging them now so future-you can spot them faster:

- **The bento training section will probably ship with 6 lessons not 8.** Some examples will fold into others when you're writing them up. That's fine — promise yourself you'll cut, not pad. A tight 6-lesson series beats a flabby 8-lesson one.
- **The first three videos will be too long.** Aim for 10 minutes, you'll land at 14. By video 4 you'll be hitting target. Don't fight it; just notice it.
- **The opinion-beats discipline will slip on busy weeks.** The verdict section is the one most likely to be skimped. Pre-write a "verdict scratchpad" doc where you jot a verdict the moment you've used a tool for a week — so you're not trying to summon an opinion at midnight before a publish deadline.
- **The format-separation rule will slip first.** You'll be tempted to write a blog post that's really a re-rendering of a training lesson, or to film a video that's really the blog read aloud. The first time you do it, your output goes down in value even though publish-count goes up. Catch this in phase 6 review.
- **The newsletter will be neglected.** That's actually fine for the first six months — list-building from a personal site is slow but the slow growth is real. Don't pressure yourself into "weekly newsletter" early.
- **The fortnightly blog drumbeat is harder than it sounds in week 20.** Start the evergreen drafts folder in phase 3, not phase 7. Future-you will thank you.

---

## A note on what this roadmap is *not*

This isn't a project plan with hard deadlines. It's a *sequence with rough timing*. The phases are the load-bearing thing; the weeks are illustrative. If phase 2 takes you 12 weeks instead of 4 because life happens, that's fine — what's not fine is doing phase 5 before phase 1.

The whole point of the sequence is: **every phase de-risks the next**. Domain consolidation de-risks the rebuild. The rebuild de-risks YouTube launch. YouTube launch de-risks the training series. The training series de-risks any future paid-content move. Skip a phase and the next one collapses under the weight of the skipped foundations.

Cheers, fellow hungovercoder. Time to crack open the can.
