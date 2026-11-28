---
name: hc-social
description: Draft LinkedIn, X (Twitter), and Mastodon copy for a hungovercoders blog post, in voice
allowed-tools: Read, Glob, Grep, Bash(ls:*), Bash(mkdir:*), Write
argument-hint: <slug or URL — defaults to the most recent post in src/content/blog>
---

Draft social-media copy for a published or about-to-be-published hungovercoders blog post. Run from `~/dev/hungovercoders/site/`. Outputs drafts for LinkedIn, X, and Mastodon — adapted per platform but rooted in the same voice and the same opinion beats from the post.

If `$ARGUMENTS` is empty, target the newest post in `src/content/blog/` (excluding `_drafts/`). Otherwise treat the argument as a slug (`2026-05-25-quick-beer-with-bento`), a path, or a full URL (`https://hungovercoders.com/blog/<slug>/`). For a URL, parse the slug and read the local file — never scrape your own site.

**Step 1 — Load context**

Read in full:
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — voice rules, what dataGriff is *not*, opinion beats, metaphor library. **Section 1a (Truth in first-person) is load-bearing** even for social copy — short, punchy first-person sentences are *especially* prone to fabrication.
- `~/.claude/hungovercoders/voice/facts/README.md` — per-topic facts convention.
- `~/.claude/hungovercoders/voice/facts/<topic-slug>.md` — the source of truth for first-person claims about the post's topic. Resolve the slug from the post's `tags` / `series` frontmatter, or fall back to the most prominent topic the post covers. Load **only this file**.

You do **not** need the blog template for this — the post itself is the source. You're adapting voice across platforms, not constructing one.

**Truth in social copy.** Social platforms compress hard — a 280-character X post or a LinkedIn opener has no room for hedging or qualifiers. That makes social copy the *most* exposed surface for fabricated first-person specifics. Any "I + verb" claim with a specific detail (number, duration, physical reaction, named moment) must either come from the post itself (which already passed the facts check) or be directly cited from `voice/facts/<topic-slug>.md`. If the post itself has unsourced specifics, flag them — drafting social copy *off* fabricated source material multiplies the problem. Do not invent new specifics that aren't in either source.

**Step 2 — Resolve the target and extract the post's spine**

Read the resolved blog post file in full. Extract:

- **Title** (from frontmatter)
- **Description** (from frontmatter — your one-line hook material)
- **Slug + canonical URL** — `https://hungovercoders.com/blog/<slug>/`
- **Series link** if the post references one (`https://hungovercoders.com/training/<slug>`)
- **Opener** — the first 1–2 paragraphs
- **Honest moment** — search for `"I'll be honest"`, `"first time I"`, `"this cost me"`, or similar in the body
- **Verdict** — the section with the "would I use this" or "how I actually use this" framing
- **The one composing demo** — what the post actually built
- **Three or four topic-specific concrete details** — Bloblang quirks, a specific config, a hook pattern, etc. These are what makes the post worth reading rather than the abstract one-liner
- **Themed thread** — beer / dogs / food / films / geek / music — whichever the post leans on. Match it in the socials

Confirm the share image exists at `public/assets/<slug>/link.png` — that's the card LinkedIn and X will preview. If it's missing, surface that and stop the user before posting.

**Step 2b — Find the hook, which is not the blog's**

The blog and the socials do different jobs. The blog is forever, so its first sentence is literal: it names the thing (see the excerpt rule in the voice guide). A social post has one line to stop a scroll, so it leads with the **idea people are talking about**, and the tool is the detail further down.

- Ask what the post is an example *of*: software factories, spec-driven development, determinism for agents, shifting left. That is the hook.
- The named tool or cloud service ("an AWS Lambda API", "the AWS Emulator") comes later, as the proof. "I wanted a template for AWS Lambda APIs" opens the blog; "Ask an agent for an API and you get a slightly different one every time. A software factory can't run on that." opens the social.
- Catchy is not invented. The hook is still a claim the post makes; it is the post's biggest idea said plainly, not a new one.
- Hashtags follow the idea too (`#softwarefactory`, `#specdrivendevelopment`), with one or two for the tool.

**A social post is read cold.** The reader has not seen the blog, so any term the post coined ("the skeleton", "the unit", "the gates") is either replaced by what it is or explained in the same sentence. "The skeleton is built and locked" means nothing on its own; "everything every API needs, the routing, validation, test harness, infrastructure and pipeline, is already built and locked" does.

**A social post does not carry every beat.** The shapes below list the honest moment and the verdict because the post has them, not because each social draft must. Ask of every paragraph whether it helps a stranger decide to click. A story that needs the post's context to land (which tool was misjudged, what a first version did) stays in the post. Keep it positive: no caveat or negative unless leaving it out would mislead. "Not a product yet" is not needed when the copy never called it a product. Honesty in social copy means not overclaiming; the caveats and the verdict live in the post, which is what the link is for. End on the strongest thing the post has, usually the numbers or the send-off.

**Every paragraph follows from the one before.** A social post has no headings to excuse a jump. A LinkedIn draft went from "the specs do the marking" straight to "I went looking for a test pyramid and found a testing trophy", and it read as coming out of nowhere. Open each paragraph on something the last one set up ("Running the specs as tests means most of the suite is integration tests…"), or cut it.

**Never label the beats.** "The honest bit.", "Would I build on it?", "Honest moment:" read as forced. The beats below are a shape for you, not words for the post: write the content and drop the signpost.

**Step 3 — Draft LinkedIn**

LinkedIn audience: technical professionals, hiring managers, the wider tech community. The voice guide's "what dataGriff is not — LinkedIn" rule applies: **no emoji rockets, no "Excited to share that…"** openers. But you can keep the self-deprecation and the worldview — that's what makes the post stand out from the LinkedIn slurry.

Shape:
- **Hook** (1–2 lines): the idea from Step 2b, said so it stops a scroll. Not the tool, and not the blog's first sentence.
- **The substance** (2–4 short paragraphs, ~250–400 words total): one paragraph on the idea and what was done about it, one on how it works, one with the real numbers or the working demo. An honest moment or the verdict goes in only if it stands on its own without the post and adds to the case for clicking. Use line breaks between paragraphs — LinkedIn rewards whitespace.
- **The takeaway**: a single positive line to end on, such as the post's send-off ("Bring your own business logic.") or its worldview hook (small/cheap/yours, one-hungovered-person-on-a-Tuesday).
- **The link**: `Full write-up: <canonical URL>` on its own line.
- **Tags**: 3–5 hashtags, all lower-case, technical (`#bento`, `#streaming`, `#dataengineering`, `#claudecode`). Skip `#hungovercoders` — it's not discoverable on LinkedIn.

Length cap: ~1,300 characters including the link. Stay under it — LinkedIn truncates around 1,500.

**Step 4 — Draft X (Twitter)**

X audience: same tech crowd but skimming. Voice can be more pub-energy here — Welsh inflections, beer references, self-deprecation all welcome.

Draft **a thread of 4–6 tweets**, each under 280 characters. Shape:

1. **Hook tweet** — the idea from Step 2b, not the tool. Strong opening hook with a single concrete promise. End with a hook for the thread ("🧵" is banned by the voice guide; use "Thread —" or "Walking through this:" or no marker at all).
2. **Tweet 2** — what the topic actually is, in one tight sentence.
3. **Tweet 3** — the demo / what got built. Mention the composition ("Three things working together: X, Y, Z").
4. **Tweet 4** — what is solved for the reader, in their terms, not the post's coined ones.
5. **Tweet 5** — the real numbers, or the strongest proof the post has.
6. **Tweet 6 (closer)** — link to the blog: `Full thing: <canonical URL>` and optionally the series link if it's a launch post.

Also draft a **single-tweet variant** for the user who prefers not to thread: 280 chars, hook + the proof + link.

**Step 5 — Draft Mastodon**

Mastodon audience: technical, federated, often Linux/open-source-curious. Voice the same as X but a touch more technical, less performative. The 500-character cap gives breathing room.

Single toot, ~400–500 chars. Shape:
- Opening sentence with the idea from Step 2b (Mastodon can name the tech sooner than LinkedIn, but still leads with the idea)
- One sentence on what was built
- One positive closing line (the send-off, or the strongest proof)
- Link to the blog
- 2–3 hashtags (`#bento`, `#dataengineering`, `#streaming` — Mastodon search runs on hashtags more than X does)

**Step 6 — Voice checks across all three drafts**

Before printing, scan every draft for:

- **Banned LinkedIn language** in the LinkedIn draft: no "Excited to share", no rockets, no "thrilled", no "passionate about"
- **No em-dashes as decoration** — aim for zero em dashes in each draft. Short social copy has no room for the parenthetical clauses that make em dashes tempting. Replace with commas, colons, or rewritten sentences (see Section 8a of the voice guide)
- **No "journey"** (unless literal), no "leverage" (verb, except ironic), no "robust", no "production-grade", no "seamless", no "stakeholder"
- **No throat-clearing phrases** — "It's worth noting…", "This is important because…". Start with the thing itself.
- **British spellings**: `flavour`, `colour`, `behaviour`, `organisation`
- **Voice texture** — each draft should sound like dataGriff, with a self-deprecating or honest line where one fits naturally. Not a manufactured one, and not the post's honest moment retold if it needs the post to make sense

**Then run the `orwell-prose` skill over every draft.** Short copy collects AI tells faster than a blog does. Look hardest for stock idioms ("heavy lifting", "under the bonnet", "all the way down"), fragments used as decoration ("Two files.", "Not the agent."), and a run of sentences all the same short length. Keep a fragment only when it is dataGriff's own phrase from the post.

Rewrite any draft that fails until it passes.

**Step 7 — Report**

Print all three drafts to chat in this order:

```markdown
## LinkedIn

<draft>

(NNN characters)

## X — thread (N tweets)

1. <tweet 1>
2. <tweet 2>
...

## X — single-tweet variant

<draft>

(NNN characters)

## Mastodon

<draft>

(NNN characters)

---
Share image (auto-rendered preview):
public/assets/<slug>/link.png
```

Optionally, if `$ARGUMENTS` contains `--save`, write the full set to `~/.claude/social/<slug>-YYYY-MM-DD.md` for record-keeping. Otherwise it stays in chat — these are one-shot drafts the user copies into the platforms manually.

**Notes on running this**

- **Draft before the post is merged, post after it is live.** The canonical URL is known from the slug, so the drafts can be written on the publish branch. Do that before merging: social copy is read cold, so it often says the idea more plainly than the blog does. Where it does, carry that wording back into the post (the opener, the `description` and the paragraph that makes the point) while the PR is still open. One post needed a separate PR after publishing to bring the LinkedIn wording into the blog.
- **Hand the copy over only once the post is live on `https://hungovercoders.com`**, i.e. after the merge to `main` and the Cloudflare deploy, or say plainly that the link is not live yet. Copy posted before then points at a 404.
- The share image needs to exist locally as well (`public/assets/<slug>/link.png`) — that's what the platforms preview when they fetch the canonical URL.
- The drafts are a starting point, not final copy. Expect to tweak before posting — the user has the lived context the model doesn't.
- LinkedIn and X don't auto-detect canonical URLs the same way Slack does, so the explicit link line is non-negotiable.
- Do **not** schedule or post automatically. This skill drafts; the user posts.
