# dataGriff facts — The repeatable unit of a software factory

> Reminder: these facts are the source of truth for first-person claims about the BDD and contract driven Lambda template (`template-aws-api`) and the "repeatable unit of a software factory" idea in any hungovercoders content. Never invent specifics not listed here.

## solve-it-once-then-let-determinism-do-the-work
- **Date / period:** Interview on 2026-11-14, the day the template was built in a Claude Code session.
- **Fact (want):** *"I'm aiming to solve what I can once so AI doesn't solve again from scratch. I want to leverage deterministic processes as much as possible and AI only needs to be used for novel non deterministic actions, or to follow explicit deterministic processes as per skills. I want to ensure isolation and portability for ease of testing and confidence at CI stage too."*
- **Fact (first use):** Told as a general pattern, not a specific moment. *"Making an API from first principles every time is a burden. Also I aim to be test driven but often end up lazy and do after. Having specs that drive the implementation and test mean they have to be done up front."*
- **Fact (honest moment):** Nothing tripped him up. The real reaction was excitement. *"In the past I would need LocalStack but the AWS Emulator came out last Wednesday and enabled all this more easily."* (Last Wednesday was 11 November 2026.) *"I was super excited when I saw Terraform deploy to it."*
- **Fact (what the post is about):** *"Big parts of the blog are the complementary contract and feature specs also acting as tests with determinism. Determinism being leveraged whenever it's available is key. Also the AWS Emulator and isolated dev to test. Shift left and confidence in PRs to main and production as well as human readable specs that act as tests too."*
- **Fact (verdict):** *"I'd use the pattern now. I also want to do the same skeleton for Cloudflare and other assets."* This is a statement about the pattern, not a claim that the template is production-proven.
- **Fact (what next):** *"Next steps though will be adding AsyncAPI functionality for an async message coming in as a pattern say on a queue, an event going out on EventBridge from say outbox, and also data contract to S3."*
- **Fact (would do differently):** Nothing. *"I think I'm happy with this really. Template gone well. Looking forward to adding more capabilities."* Do not manufacture a regret.
- **Fact (status):** *"Everything at moment is prepub and demos."*
- **Never claim:** (the interviewer's cautious defaults; questions 6 and 7 were skipped with "crack on with the post")
  - That the template or any API built on it has been deployed to a real AWS account or to production. It has not.
  - That he used AWS Emulator before the week of 11 November 2026.
  - Any figure for time or cost saved, or any duration for how long the build took.
  - A specific past project, employer or incident behind the "from first principles every time" burden. He named none.
  - That something went wrong or frustrated him during the build. He said nothing tripped him up.
- **Allowed framings:** (verbatim from the interview and from the build session)
  - *"solve what I can once so AI doesn't solve again from scratch"*
  - *"the skeleton is the same for all your APIs so don't ask AI to build it again"*
  - *"having a templated platform saves costs by solving everything known once up front"*
  - *"bring your own business logic"*
  - *"AI then resolves this but gets it as deterministic feedback too as the contract and features are tested"*
  - *"only leverage non deterministic work when no deterministic tools available. This is a principle"*
  - *"I aim to be test driven but often end up lazy and do after"*
  - *"specs that drive the implementation and test mean they have to be done up front"*
  - *"I was super excited when I saw Terraform deploy to it"*
  - *"as isolated and near production test can warrant as part of CI whilst staying fast and efficient"*
  - *"I only want context to be necessary as hard to manage"*
  - *"it is no longer a template then, it is an API"*
  - *"I'd use the pattern now"*
  - *"everything at moment is prepub and demos"*
- **Build record (AI in shot, attributable to the agent, not to dataGriff's feelings):**
  - Claude Code built the template in one session on 2026-11-14. The agent's sandbox would not run AWS Emulator, so every feature and fuzz run happened on GitHub Actions.
  - Two fresh agents implemented the example spec from the `implement-api` skill alone; CI was green on the first run both times.
  - A two-agent lifecycle test changed the spec of the implemented example and caught the implementation up, green first time. It exposed that the compatibility gate could not see a rule that changed while the contract's shape stayed the same; the gate now compares the feature files too.
  - The first `terraform apply` against the emulator in CI finished with "Apply complete! Resources: 15 added, 0 changed, 0 destroyed."
  - AWS Emulator 1.0.365 accepts Lambda and API Gateway definitions but cannot invoke a function, so the Lambda bundle runs behind a local stand-in for API Gateway.
- **Permissions:** not stated (question skipped). Treat as usable within content about this template and the software factory idea; check before using elsewhere.
- **Source:** Interview on 2026-11-14, plus dataGriff's own messages in the build session that day.
