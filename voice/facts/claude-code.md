# dataGriff facts — Claude Code

> Reminder: these facts are the source of truth for first-person claims about Claude Code in any hungovercoders content. Never invent specifics not listed here.

## current-posture-and-feature-experience-2026-06-06

- **Date / period:** Interview captured 2026-06-06. Covers current lived experience of Claude Code's individual features at the time the learn.claude-code series shipped.
- **Fact (permissions):** Has not yet invested in curating permission allow/deny lists. *"Haven't leveraged permissions very well."* Day-to-day flow: **at home, plan mode then auto-edit (more cavalier); at work, plan mode then manually accept edits** — explicitly because the guardrails and practices haven't been set up yet. *"Definitely sleep walked into accepting things when pressing 2 over and over."* Has not used the OS-level sandbox.
- **Fact (CLAUDE.md):** Still learning best practice — the learn.claude-code series itself is part of that learning. The specific thing repeatedly retyped into sessions was *not* "be terse" but the **development-discipline pattern: don't work in main, ensure branches, commit, raise a draft PR.** Currently working on optimising file size. Real practice in use: writes `AGENTS.md` and imports it into `CLAUDE.md` via `@` syntax so non-Claude-Code agents can use the same context.
- **Fact (plan mode):** *"Plan mode has been smooth for me and used it a lot from the offset, helps me have a conversation with claude."* No rough edges encountered. Has NOT hit the ExitPlanMode-confirmation-flow weirdness, the reject-as-guidance misinterpretation, or any other plan-mode bug. Reframes plan mode as a *dialogue tool*, not just a thinking gear.
- **Fact (slash commands and skills):** **First skill built was for ODCS data contract creation** — *"when I first tried to make data contracts it just kept making JSON schemas when I wanted a fully fledged and linted ODCS"*. Has since written skills for media workflows (blogging and tutorials with the dataGriff tone of voice — i.e. the hungovercoders content library). **Started as commands, then moved to skills on conversation** — *"skills were the better investment."* The workflow has changed in a load-bearing way: *"work becomes conversational now, interactive and refine as a pair while maintaining who I am due to interview techniques introduced."* Source-controls the user-level `~/.claude/CLAUDE.md` in a `datagriff/dotfiles` repo with symlinks.
- **Fact (hooks):** Has only written hooks in tutorials (Anthropic courses). *"Not made one myself in anger for a real repo."* The cinema's `films-validate.sh` is therefore the first real-ish hook. Has NOT hit the stderr-vs-stdout gotcha personally — knows about it from the course content.
- **Fact (subagents and Task tool):** *"Not used subagents or task tool so excited by that tutorial!"* Subagents are entirely fresh ground. Has NOT had the "free speed-up" surprise, the "subagent missed matches" issue, or written custom subagent prompts.
- **Fact (MCP):** **Uses the Linear MCP** to *"write plans out to external sources for refinement with my peers once I have finished"*, then *"use agents to action the issue with the context of other documents around it too like projects and initiatives."* Has NOT used the GitHub MCP — *"the cli seems to work ok on demand when interacting with claude."* Open question worth answering for readers: when is MCP a real win over CLI for things like GitHub?
- **Fact (worktrees):** **Used worktrees once.** Was unsure how to perform maintenance of the extra directories. Raised a genuine reader question — *"why wouldn't I just use them all the time and not use branches as they provide isolation"*. The *truthful* lived pain that worktrees solve: *"definitely hit multiple pieces of work in different terminals on same repo though and accidentally polluted branches"* (this replaces the fabricated *"git checkout main mid-session and lose half-staged files"* scenario).
- **Fact (libraries built in the cinema shape):** **One library built — the writing library (hungovercoders content library).** *"Specific to the hungovercoder media suite so makes sense full on library."* The release-notes and code-review use cases the prior prose claimed *"would be useful"* but **would just be skills, not full libraries** — the library shape is overkill for single-focus jobs.
- **Never claim:**
  - Specific quantified usage durations or counts that aren't listed here (no "for a month", "for a fortnight", "two weeks of writing prompts", "third day clicking allow", "by end of the week eight times", etc.)
  - That dataGriff has hit hooks/subagents/MCP gotchas he hasn't (stderr Tuesday morning, subagent missing matches, SQLite-forgot-to-rebuild)
  - That plan mode has rough edges in his experience — it doesn't
  - That dataGriff has built multiple libraries in the cinema shape — only the writing library exists
  - That permissions are fully curated for him — they're not yet
- **Allowed framings:** (verbatim phrases free to quote or paraphrase recognisably)
  - *"haven't leveraged permissions very well"*
  - *"plan and then auto edit at home now as I am more cavalier"*
  - *"working I mostly use plan then manually accept edits"*
  - *"not taken the time to put the guardrails and practices in yet"*
  - *"sleep walked into accepting things when pressing 2 over and over"*
  - *"haven't used OS-level sandbox"*
  - *"still learning best practice for claude.md which this will help with"*
  - *"definitely repeated myself with development practices like work in main, ensure branches, commit and raise a draft PR"*
  - *"need to optimise the size of claude files"*
  - *"try to use AGENTS.md and then import that using @ into claude.md so other agents can utilise too"*
  - *"plan mode has been smooth for me"*
  - *"used it a lot from the offset"*
  - *"helps me have a conversation with claude"*
  - *"created a skill for data contract creation to ensure uses ODCS"*
  - *"when I first tried to make data contracts it just kept making JSON schemas"*
  - *"written other skills now to help with my media such as blogging and tutorials with a tone of voice"*
  - *"work becomes conversational now, interactive and refine as a pair while maintaining who I am due to interview techniques introduced"*
  - *"did start these as commands but on conversation skills were the better investment"*
  - *"datagriff/dotfiles where I am keeping my user claude.md source controlled"*
  - *"only wrote a hook in the claude tutorials on anthropic courses but not made one myself in anger for a real repo"*
  - *"not used subagents or task tool so excited by that tutorial"*
  - *"leveraged the linear mcp to write plans out to external sources for refinement with my peers once I have finished"*
  - *"use agents to action the issue with the context of other documents around it too like projects and initiatives"*
  - *"haven't used github mcp as cli seems to work ok on demand when interacting with claude"*
  - *"used worktrees once but was unsure how to perform maintenance of the extra directories"*
  - *"why wouldn't I just use them all the time and not use branches as they provide isolation"*
  - *"definitely hit multiple pieces of work in different terminals on same repo though and accidentally polluted branches"*
  - *"writing library is specific to the hungovercoder media suite so makes sense full on library"*
  - *"would just be skills rather than full on libraries"*
- **Permissions:** use anywhere within Claude Code content. The honesty about being mid-journey on permissions/hooks/subagents is brand-positive (folk tales of *now*, doer-not-theorist); the captured framings reinforce why the series is structured around earning the discipline rather than performing expertise.
- **Source:** Interview on 2026-06-06.

## from-copilot-to-auto-mode-discipline

- **Date / period:** Interview captured 2026-06-06. The arc covered roughly the first months of dataGriff using Claude Code.
- **Fact (want):** dataGriff was happy using Copilot in an agentic chat interface and felt he was doing OK there. The honest want was driven by *outside pressures*: industry trumpets and increased usage around him made him want to see what the fuss was about and ensure he was skilled in something becoming increasingly common. The love came later — *"it is now awesome and I love using it, including straight from the terminal"* — and multi-threaded terminal tools like cmux or zed have really opened his eyes.
- **Fact (first use):** Migrated the hungovercoders blog from Jekyll to Astro, and from `blog.hungovercoders.com` to `hungovercoders.com`, in an afternoon. *"Ripping through code using auto mode and following guidance in cloudflare and google search console. all done so quick. it was awesome."*
- **Fact (honest moment):** *"I got in a auto edit accept changes loop without thinking and kept pressing yes without planning or reading correctly… I ended up doing a force push and rewriting history on a repo so lost all public lineage. luckily wasn't an important repo but made me realise very easy to give brain over and getting guardrails in with an intent to use auto mode as a discipline is a better goal than lazily pressing 2 over and over."*
- **Fact (verdict):** *"Use it all the time now for parallel threads of work and development output and idea delivery is through the roof. I still need to harden up the tooling to make rapid change safe in all the places, but that is why doing a small scoped example so its easy to see the hello world of the SDLC in isolation without worrying about complex codebases yet."*
- **Fact (would do differently):** *"I don't think you can do anything other than just use it to see what breaks — but if had the discipline at the start I would setup the guardrails and race for automode proficiency as quickly as possible. that is where maximum throughput lives, embedding the policies then letting rip with development knowing the guardrails are there."*
- **Never claim:**
  - No false numbers
  - No false durations
  - No feelings dataGriff never said
- **Allowed framings:** (verbatim phrases free to quote or paraphrase recognisably)
  - *"I was happy using Copilot"*
  - *"the industry trumpets and increased usage around me"*
  - *"wanted to see what the fuss was about"*
  - *"ensure I was skilled in something becoming increasingly common"*
  - *"multiple threaded terminal tools like cmux or zed"*
  - *"ripping through code using auto mode"*
  - *"in an afternoon"*
  - *"all done so quick"*
  - *"it was awesome"*
  - *"got in a auto edit accept changes loop without thinking"*
  - *"kept pressing yes without planning or reading correctly"*
  - *"force push and rewriting history… lost all public lineage"*
  - *"very easy to give brain over"*
  - *"getting guardrails in with an intent to use auto mode as a discipline is a better goal than lazily pressing 2 over and over"*
  - *"use it all the time now for parallel threads of work"*
  - *"development output and idea delivery is through the roof"*
  - *"still need to harden up the tooling to make rapid change safe in all the places"*
  - *"small scoped example so its easy to see the hello world of the SDLC in isolation"*
  - *"if had the discipline at the start I would setup the guardrails and race for automode proficiency as quickly as possible"*
  - *"maximum throughput lives, embedding the policies then letting rip with development knowing the guardrails are there"*
- **Permissions:** use anywhere within Claude Code content (lessons, blog posts on Claude Code, social copy about Claude Code). The force-push story specifically is cleared to be the lesson 13 honest moment — it grounds the cage-and-guardrails frame the whole series teaches.
- **Source:** Interview on 2026-06-06.
