---
name: hc-datagriff-interview
description: Interview dataGriff to capture real lived experience for a topic, then append the facts to datagriff-facts.md so future hungovercoders content cites truth instead of inventing it
allowed-tools: Read, Edit, Write
argument-hint: <topic — e.g. "Claude Code", "Bento", "Launch blog post (film picker)">
disable-model-invocation: true
---

Capture real first-person material for a topic and append it to `~/.claude/hungovercoders/voice/datagriff-facts.md`. Every hungovercoders content-generating skill loads that file as the source of truth for personal claims; this skill is how it gets populated.

**Why it exists.** The dataGriff voice rewards specificity (numbers, durations, physical reactions, specific moments). When the writer is an AI and hasn't been told the lived take, those specifics get *invented* — which corrodes the brand promise of honest content. This skill is the mandatory upstream step before writing any post or lesson on a topic that isn't already covered in the facts file.

## Step 1 — Confirm the topic

Read `$ARGUMENTS` as the topic. If empty, ask the user: *"Which topic are we capturing facts for? (Claude Code, Bento, AWS fundamentals, the hungovercoders brand journey, the launch blog post, general developer life, or something new.)"*

Read `~/.claude/hungovercoders/voice/datagriff-facts.md` and check whether the topic already has a `## <Topic>` section. If yes, this run will append to that section. If no, create a new section using the canonical naming and tell the user before continuing.

## Step 2 — Run the interview

Ask the user, one question at a time, waiting for the answer before the next. Each question accepts *"skip"* as an answer — that fact gets left off the record.

**Use plain conversational text, not the AskUserQuestion tool** — the answers are open prose, not multiple choice. Number the questions so the user can return to them. Read every answer back as you receive it so the user can correct before it's written.

Questions, in order:

1. **The want.** "What did you actually want when you first reached for `<topic>`? Not the marketing pitch — the specific itch that made you try it. One or two sentences in your own words."
2. **The first use.** "Tell me about a specific time you used it for real — a moment, not a general pattern. What were you working on, what did you try, what happened?"
3. **The honest moment.** "What's a real `first time I tried this it broke / surprised me / made no sense` story? Anything that tripped you up that an honest blog post would mention?"
4. **The verdict.** "If a fellow hungovercoder asked you today — would you use it again? What for, what not for? Where does it sit in your kit?"
5. **Would do differently.** "Knowing what you know now, what would you do differently if you were starting again with this?"
6. **Hard rules.** "Anything I should NEVER attribute to you on this topic? Specific claims that aren't true, or framings you'd reject? Numbers / durations / feelings you've never said?"
7. **Permission posture.** "Default permission for these facts — *use anywhere*, *use with softening qualifier*, *do not use publicly without checking*, or something else?"

After each answer, paraphrase it back briefly and ask *"Right? Anything to sharpen?"* before moving on.

## Step 3 — Structure the entry

Convert the answers into the `datagriff-facts.md` format:

```markdown
### <short title for this fact, kebab-case, derived from the want or the honest moment>
- **Date / period:** <interview date, e.g. 2026-06-06; plus the rough period of the experience if the user said one>
- **Fact (want):** <answer 1, in dataGriff's own words where possible>
- **Fact (first use):** <answer 2>
- **Fact (honest moment):** <answer 3>
- **Fact (verdict):** <answer 4>
- **Fact (would do differently):** <answer 5>
- **Never claim:** <answer 6, if any — bullet-list each forbidden framing>
- **Allowed framings:** <pull 2–3 verbatim phrases from the user's answers that future prose can quote or paraphrase recognisably>
- **Permissions:** <answer 7>
- **Source:** Interview on <date>
```

If a question was skipped, omit that bullet. Keep the user's voice — if they said *"two months in"*, write *"two months in"*, not *"after a brief period"*.

## Step 4 — Show + confirm

Show the user the proposed entry verbatim. Ask: *"Good to write this to the facts file? Or want me to redraft anything?"* Edit and reshow until the user says yes.

## Step 5 — Append to the facts file

Use `Edit` to append the entry to the matching `## <Topic>` section in `~/.claude/hungovercoders/voice/datagriff-facts.md`. Place new entries above any existing `### ` sub-sections so the most recent is at the top.

If the topic section doesn't exist yet, create it just before the closing line of the file (preserving the order of other topics roughly alphabetically — Bento before Claude Code etc., but new topics go wherever fits).

## Step 6 — Suggest next steps

After appending, tell the user:

- The fact short title is now citable as *"per datagriff-facts.md: `<Topic>` → `<short title>`"*
- Future content-generating skills (`hc-write-lessons`, `hc-launch`, etc.) will read this entry automatically and refuse to invent contradicting first-person claims
- If they want to capture more facts on the same topic, run this skill again — entries accumulate
- If they're about to rewrite existing content on this topic, the next skill to reach for is `/hc-review-blog <path>` or `/hc-review-series <repo>`, which will flag prose that contradicts or invents around these facts

## Edge cases

- **No topic supplied and no existing facts file** — create the facts file from `datagriff-facts.md`'s canonical structure (see the file itself for the template) and proceed.
- **User rejects every question** — ask explicitly: *"Should I close without writing anything?"* and respect the answer. Don't write an empty entry.
- **Topic name overlaps with an existing one** — confirm the user wants a new entry under the existing section rather than a new section.
- **Long answers** — don't summarise without permission. The point of this skill is the user's actual words; paraphrasing defeats it. If an answer is too long, ask the user *"want me to keep this whole, or trim to the load-bearing sentence?"*

## Out of scope

- Editing prose that's already been written. That's the job of `hc-review-blog` / `hc-review-series` once this skill has populated the facts.
- Inventing facts when the user skips a question. Skipped means skipped.
- Posting or publishing — this skill only writes to the facts file.
