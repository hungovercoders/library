---
name: hc-datagriff-interview
description: Interview dataGriff to capture real lived experience for a topic, then write the facts to the matching voice/facts/<slug>.md file so future hungovercoders content cites truth instead of inventing it
allowed-tools: Read, Edit, Write
argument-hint: <topic — e.g. "Claude Code", "Bento", "AWS fundamentals", "brand journey">
disable-model-invocation: true
---

Capture real first-person material for a topic and write it to the matching `~/.claude/hungovercoders/voice/facts/<slug>.md` file. Every hungovercoders content-generating skill loads the per-topic file relevant to the work it's doing as the source of truth for personal claims; this skill is how those files get populated.

**Note on launch-post topics.** A launch blog post about an existing learn.* series shares facts with the series. Run the interview against the series topic (e.g. `Claude Code`), not the launch post itself — the launch post then reads `voice/facts/claude-code.md`. Only create a separate facts file when the topic is genuinely standalone.

**Why it exists.** The dataGriff voice rewards specificity (numbers, durations, physical reactions, specific moments). When the writer is an AI and hasn't been told the lived take, those specifics get *invented* — which corrodes the brand promise of honest content. This skill is the mandatory upstream step before writing any post or lesson on a topic that isn't already covered in the facts file.

## Step 1 — Confirm the topic and resolve the file path

Read `$ARGUMENTS` as the topic. If empty, ask: *"Which topic are we capturing facts for? (Claude Code, Bento, AWS fundamentals, the hungovercoders brand journey, the launch blog post, general developer life, or something new.)"*

Derive the **slug** from the topic: lowercase, hyphenated, no `learn.` prefix. *Claude Code → `claude-code`*. *AWS fundamentals → `aws-fundamentals`*. *The hungovercoders brand journey → `brand-journey`*. If unsure, propose the slug and ask the user to confirm before continuing.

Resolve the file path to `~/.claude/hungovercoders/voice/facts/<slug>.md`. Read `~/.claude/hungovercoders/voice/facts/README.md` for the convention and `~/.claude/hungovercoders/voice/facts/<slug>.md` if it exists.

- If it exists: this run will append a new `## <fact short title>` entry to it.
- If it doesn't exist: this run will create it. Use the template in `voice/facts/README.md` (one `#` heading, the reminder line, then the new entry).

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

Convert the answers into the per-topic facts file format (per `voice/facts/README.md`):

```markdown
## <short title for this fact, kebab-case, derived from the want or the honest moment>
- **Date / period:** <interview date, e.g. 2026-06-06; plus the rough period of the experience if the user said one>
- **Fact (want):** <answer 1, in dataGriff's own words where possible>
- **Fact (first use):** <answer 2>
- **Fact (honest moment):** <answer 3>
- **Fact (verdict):** <answer 4>
- **Fact (would do differently):** <answer 5>
- **Never claim:** <answer 6, if any — bullet-list each forbidden framing>
- **Allowed framings:** <verbatim phrases pulled from the user's answers (often a longer list — capture every distinctive phrase, not just two or three) so future prose can quote or paraphrase recognisably>
- **Permissions:** <answer 7>
- **Source:** Interview on <date>
```

If a question was skipped, omit that bullet. Keep the user's voice — if they said *"two months in"*, write *"two months in"*, not *"after a brief period"*.

## Step 4 — Show + confirm

Show the user the proposed entry verbatim. Ask: *"Good to write this to the facts file? Or want me to redraft anything?"* Edit and reshow until the user says yes.

## Step 5 — Write to the per-topic facts file

Two cases:

- **File exists** — use `Edit` to insert the new `## <fact short title>` entry just below the file's opening reminder block (so the most recent fact is at the top of the entry list).
- **File doesn't exist** — use `Write` to create it. Template:

  ```markdown
  # dataGriff facts — <Topic>

  > Reminder: these facts are the source of truth for first-person claims about <Topic> in any hungovercoders content. Never invent specifics not listed here.

  <the new entry>
  ```

After writing, also update `voice/facts/README.md`'s "What's in here" section to list the new file.

## Step 6 — Suggest next steps

After appending, tell the user:

- The fact short title is now citable as *"per voice/facts/`<slug>`.md → `<short title>`"*
- Future content-generating skills (`hc-write-lessons`, `hc-launch`, etc.) will read this entry automatically (they load only the matching per-topic file, so context cost stays proportional to the topic being written) and refuse to invent contradicting first-person claims
- If they want to capture more facts on the same topic, run this skill again — entries accumulate in the same per-topic file
- If they're about to rewrite existing content on this topic, the next skill to reach for is `/hc-review-blog <path>` or `/hc-review-series <repo>`, which will flag prose that contradicts or invents around these facts

## Edge cases

- **No topic supplied** — ask the user before deriving a slug. Don't guess.
- **User rejects every question** — ask explicitly: *"Should I close without writing anything?"* and respect the answer. Don't write an empty entry.
- **Topic file doesn't exist** — use `Write` to create it from the template above (and add it to `voice/facts/README.md`'s listing).
- **Slug ambiguity** — if the topic could map to more than one existing file (e.g. *"Claude API"* vs *"Claude Code"*), propose the slug and ask the user to confirm.
- **Long answers** — don't summarise without permission. The point of this skill is the user's actual words; paraphrasing defeats it. If an answer is too long, ask the user *"want me to keep this whole, or trim to the load-bearing sentence?"*

## Out of scope

- Editing prose that's already been written. That's the job of `hc-review-blog` / `hc-review-series` once this skill has populated the facts.
- Inventing facts when the user skips a question. Skipped means skipped.
- Posting or publishing — this skill only writes to the facts file.
