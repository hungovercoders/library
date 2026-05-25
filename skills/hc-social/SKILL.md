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
- `~/.claude/hungovercoders/voice/datagriff-voice-guide.md` — voice rules, what dataGriff is *not*, opinion beats, metaphor library

You do **not** need the blog template for this — the post itself is the source. You're adapting voice across platforms, not constructing one.

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

**Step 3 — Draft LinkedIn**

LinkedIn audience: technical professionals, hiring managers, the wider tech community. The voice guide's "what dataGriff is not — LinkedIn" rule applies: **no emoji rockets, no "Excited to share that…"** openers. But you can keep the self-deprecation and the worldview — that's what makes the post stand out from the LinkedIn slurry.

Shape:
- **Hook** (1–2 lines): the post's want, or its verdict in a sharper form. State the thing you built and the take you formed.
- **The substance** (2–4 short paragraphs, ~250–400 words total): one paragraph naming what the topic actually ships, one paragraph on the working demo, one paragraph carrying the honest moment, one paragraph with the verdict. Use line breaks between paragraphs — LinkedIn rewards whitespace.
- **The takeaway**: a single line distilling the worldview hook from the post's verdict (small/cheap/yours, one-hungovered-person-on-a-Tuesday, etc.).
- **The link**: `Full write-up: <canonical URL>` on its own line.
- **Tags**: 3–5 hashtags, all lower-case, technical (`#bento`, `#streaming`, `#dataengineering`, `#claudecode`). Skip `#hungovercoders` — it's not discoverable on LinkedIn.

Length cap: ~1,300 characters including the link. Stay under it — LinkedIn truncates around 1,500.

**Step 4 — Draft X (Twitter)**

X audience: same tech crowd but skimming. Voice can be more pub-energy here — Welsh inflections, beer references, self-deprecation all welcome.

Draft **a thread of 4–6 tweets**, each under 280 characters. Shape:

1. **Hook tweet** — the want, or "I built X. Here's what I learned." Strong opening hook with a single concrete promise. End with a hook for the thread ("🧵" is banned by the voice guide; use "Thread —" or "Walking through this:" or no marker at all).
2. **Tweet 2** — what the topic actually is, in one tight sentence.
3. **Tweet 3** — the demo / what got built. Mention the composition ("Three things working together: X, Y, Z").
4. **Tweet 4** — the honest moment, kept short.
5. **Tweet 5** — the verdict, distilled. The "I'd use this for X, not Y" beat.
6. **Tweet 6 (closer)** — link to the blog: `Full thing: <canonical URL>` and optionally the series link if it's a launch post.

Also draft a **single-tweet variant** for the user who prefers not to thread: 280 chars, hook + verdict + link.

**Step 5 — Draft Mastodon**

Mastodon audience: technical, federated, often Linux/open-source-curious. Voice the same as X but a touch more technical, less performative. The 500-character cap gives breathing room.

Single toot, ~400–500 chars. Shape:
- Opening sentence with the want
- One sentence on what was built
- One sentence carrying the honest moment or verdict
- Link to the blog
- 2–3 hashtags (`#bento`, `#dataengineering`, `#streaming` — Mastodon search runs on hashtags more than X does)

**Step 6 — Voice checks across all three drafts**

Before printing, scan every draft for:

- **Banned LinkedIn language** in the LinkedIn draft: no "Excited to share", no rockets, no "thrilled", no "passionate about"
- **No em-dashes as decoration** — em-dashes are fine where a comma would confuse, but not as a substitute for paragraph breaks
- **No "journey"** (unless literal), no "leverage" (verb, except ironic), no "robust", no "production-grade", no "seamless", no "stakeholder"
- **British spellings**: `flavour`, `colour`, `behaviour`, `organisation`
- **Voice texture** — each draft should contain at least one self-deprecating or honest beat. Not a manufactured one — pull from the post's actual honest moment

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

- Run after `hc-launch` and after the build verifies (`hc-preflight` or `npm run build`). The share image needs to exist.
- The drafts are a starting point, not final copy. Expect to tweak before posting — the user has the lived context the model doesn't.
- LinkedIn and X don't auto-detect canonical URLs the same way Slack does, so the explicit link line is non-negotiable.
- Do **not** schedule or post automatically. This skill drafts; the user posts.
