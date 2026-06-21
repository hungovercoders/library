# dataGriff facts — Slopstopper

> Reminder: these facts are the source of truth for first-person claims about slopstopper in any hungovercoders content. Never invent specifics not listed here.

## origin-want-going-to-production-2026-06-21

- **Date / period:** Derived from the 2026-06-21 blog post "Stopping my AI Slop with Slopstopper CLI and Tooling" (author's own prose). Captures dataGriff's posture on *why slopstopper exists* at the point hungovercoders went to production.
- **Fact (want):** The want was driven by going-to-production dread on AI-accelerated builds, not a tidy engineering plan. *"I was vibe coding more and more when a sudden dread started creeping up my spine as I decided to go live with some of them."* The specific worries: *"Were they secure? Were they easy to maintain? Did I have a billion duplicated context tokens in my docs costing me a small fortune?"*
- **Fact (honest moment):** Up to that point he hadn't cared — *"I didn't care up to this point as I was having too much fun building things"* — then reached for guardrails: *"I needed to collect some basic guardrails together to help me keep on top of this, which is where slopstopper was born."*
- **Fact (verdict):** Slopstopper is a portable suite of checks dropped into any *fairly* compatible repo, running the same `task ss:<check>` locally and in CI. The win he names is *"catch regressions before they become long-term technical debt"* and *"peace of mind that I am attempting to consider security and reliability as part of the development process — which is just too darn fun at the moment with AI to keep remembering the important stuff."*
- **Never claim:**
  - No invented numbers, durations, or counts (no "after three production incidents", "a fortnight of cleanup", etc.)
  - No specific named incident, outage, or breach — none is on record
  - Don't claim slopstopper is finished, polished, or production-grade — he frames it as mid-journey (see install-maturity fact)
- **Allowed framings:** (verbatim phrases free to quote or paraphrase recognisably)
  - *"I was vibe coding more and more when a sudden dread started creeping up my spine"*
  - *"Were they secure? Were they easy to maintain?"*
  - *"a billion duplicated context tokens in my docs costing me a small fortune"*
  - *"I didn't care up to this point as I was having too much fun building things"*
  - *"I needed to collect some basic guardrails together to help me keep on top of this"*
  - *"which is where slopstopper was born"*
  - *"catch regressions before they become long-term technical debt"*
  - *"peace of mind that I am attempting to consider security and reliability"*
  - *"too darn fun at the moment with AI to keep remembering the important stuff"*
  - *"going to production definitely changes your perspective and what is important"*
- **Permissions:** use anywhere within slopstopper content. The going-to-production-dread framing is brand-positive (doer-not-theorist, folk tales of *now*) and is the canonical opener register for slopstopper posts — start here rather than defaulting to pub metaphors.
- **Source:** 2026-06-21 blog post (author's own prose).

## install-maturity-and-private-repo-cost-2026-06-21

- **Date / period:** Derived from the same 2026-06-21 post. Captures the honest limitations dataGriff is open about.
- **Fact (honest moment — maturity):** He's candid that the install isn't perfect. *"It is worth noting that the installation of slopstopper may not be perfect at this point and it is something I am working on."* Self-aware about the trap ahead: *"'It works on my repos' might be something I state too often in the not too distant future."*
- **Fact (honest moment — cost):** The real limitation he surfaced is GitHub Actions cost on private repos. *"If you're using private repos slopstopper may not be a great fit for you because it will in its current state consume a fair bit of action minutes."* Public repos are free; private repos are billed. He owns the follow-up: *"I will need to work on finding more efficient ways to invoke slopstopper no doubt."*
- **Fact (deployment context):** Deployment sits outside slopstopper. He consolidated on Cloudflare and values PR branch previews: *"I am a big fan of PR branch previews which give me further confidence before merging to main"*, including *"tap it into claude code or copilot on my phone, and take a look at what that idea might look like in minutes."*
- **Fact (would do differently / what next):** Keep working on it despite the niche install; roll out wider. *"I definitely want to keep working on slopstopper, even if the install is a bit niche"*, *"I'll definitely roll it out to the rest of my sites for peace of mind"*, *"try to think of even simpler ways to gain confidence in our AI accelerated workflows."*
- **Never claim:**
  - Don't claim slopstopper works cleanly on every repo shape — monorepos and private repos have known friction
  - Don't quantify the action-minute cost with invented figures
  - Don't claim he's already fixed the efficiency/cost problem — it's stated as future work
- **Allowed framings:** (verbatim phrases free to quote or paraphrase recognisably)
  - *"the installation of slopstopper may not be perfect at this point and it is something I am working on"*
  - *"it works on my repos"* (as the self-aware caveat he's wary of overusing)
  - *"if you're using private repos slopstopper may not be a great fit for you"*
  - *"it will in its current state consume a fair bit of action minutes"*
  - *"I will need to work on finding more efficient ways to invoke slopstopper"*
  - *"I am a big fan of PR branch previews which give me further confidence before merging to main"*
  - *"tap it into claude code or copilot on my phone"*
  - *"even if the install is a bit niche"*
  - *"roll it out to the rest of my sites for peace of mind"*
  - *"even simpler ways to gain confidence in our AI accelerated workflows"*
  - *"save the world from slop"* (the community/closer note)
- **Permissions:** use anywhere within slopstopper content. The honesty about install maturity and private-repo cost is load-bearing and brand-positive — keep it in rather than sanding it off; it's what makes the tool's advocacy credible.
- **Source:** 2026-06-21 blog post (author's own prose).
