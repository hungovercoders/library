# dataGriff facts — per topic

This directory is the source of truth for first-person claims dataGriff makes in hungovercoders content. **One file per topic**, so content-generating skills load only the facts relevant to what they're writing — not every fact ever captured.

## Convention

- One markdown file per topic at `voice/facts/<slug>.md`
- Slug is the topic name, lowercase, hyphenated. The `learn.` prefix is dropped.
  - `learn.claude-code` → `voice/facts/claude-code.md`
  - `learn.bento` → `voice/facts/bento.md`
  - `learn.aws-fundamentals` → `voice/facts/aws-fundamentals.md`
  - The hungovercoders brand journey → `voice/facts/brand-journey.md`
- Content-generating skills (hc-write-lessons, hc-launch, hc-review-blog, hc-review-series) load *only* the file matching the current series/post topic.
- `/hc-datagriff-interview` writes to the file matching the topic it was invoked with. If the file doesn't exist yet, it creates one.

## File format

Each topic file:

```markdown
# dataGriff facts — <Topic>

> Reminder: these facts are the source of truth for first-person claims about <Topic> in any hungovercoders content. Never invent specifics not listed here.

## <short title for this fact, kebab-case>
- **Date / period:** <when this happened, if relevant>
- **Fact (want):** <what dataGriff actually wanted when reaching for this>
- **Fact (first use):** <a specific real moment>
- **Fact (honest moment):** <a real failure or surprise>
- **Fact (verdict):** <today's view>
- **Fact (would do differently):** <retrospective>
- **Never claim:** <bullet list of forbidden framings>
- **Allowed framings:** <verbatim phrases the user actually said, so prose can quote or paraphrase recognisably>
- **Permissions:** <"use anywhere within <Topic> content" | "use with softening qualifier" | other>
- **Source:** <interview date, or other source>
```

When citing a fact, prose review skills use: *"per voice/facts/`<slug>`.md → `<fact short title>`"*.

## What's in here

`claude-code.md` — facts from the 2026-06-06 interview about Claude Code.

`slopstopper.md` — facts derived from the 2026-06-21 slopstopper install blog post (author's own prose).

(Other topic files will arrive as `/hc-datagriff-interview` is run for them.)
