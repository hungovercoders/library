# dataGriff facts — DuckDB, Harlequin, dbt and AWS (the learn.harlequin series)

> Reminder: these facts are the source of truth for first-person claims about the three-part DuckDB series (`learn.harlequin`) in any hungovercoders content. Never invent specifics not listed here. Everything below covers part three only; parts one and two were written before this file existed and have no entries.

## part-three-cheapest-thing-that-also-runs-local
- **Date / period:** Claude Code cloud session on 2026-11-20 and 2026-11-21. Not an interview: these are his own messages and the screenshots he sent while the work was done.
- **Fact (want, in his words on 2026-11-21):** *"As well as improving my recent API template I was also busting to continue the dbt series and introduce another environment with the aws emulator, my new favourite toy. Bringing three environments to my one dbt setup, proving the easy multi environment config."*
- **Fact (day context):** *"My day started at the park with a sausage bap for me and an ice-cream for my dog."*
- **Fact (naming):** *"Instead of rungs call them environments cos they are."* The laptop, AWS Emulator and real AWS are environments. Do not call them rungs.
- **Fact (what next):** *"I'll likely have to follow up with two blogs after this. Automating deploy with actions and automating whole process from an odcs data contract with skills! Anyway let's do the basics and show that first, building on previous posts."*
- **Fact (how the runtime was chosen):** *"What's the cheapest thing that can also run local to do this on in production?"* That question chose Fargate. He then said *"go with fargate"* and later *"stick with fargate, write up part 3 with the three rungs"*.
- **Fact (questions he asked along the way):**
  - *"why wouldn't I use something like airflow? Why is a container better?"*, then *"add that airflow paragraph to part 3's closing"*.
  - *"What was the reason we didn't use a lambda with a container?"*
  - *"Is there anything else that could run a scheduled batch job like this?"* and *"What is batch?"*
  - *"How could I get notified of failures?"*, then *"add the failure notifications to the terraform"*.
- **Fact (the emulator):** *"Could I also use the aws emulator in this blog post too? Would be good to deploy everything there too and ensure it works."* He then asked for two experiments in turn: *"try the public image experiment"* and *"Try the zip lambda"*. Claude Code ran both, and the earlier image push, in its own sandbox. He did not run them.
- **Fact (the resource group):** *"should we also deploy everything into a resource group queried by a tag and show that as a screenshot from aws to show its all in an environment too?"*
- **Fact (the three-environment picture):** *"it would be good to have a screenshot of all three environments doing the same query showing same results and output, just diff environments to highlight the whole thing"*. Also *"can I query from AWS and show that in blog too? just to prove the environment"*.
- **Fact (first use, real AWS):** He ran the real-account steps himself from his own terminal with `scripts/aws.sh`, in eu-west-2, on 2026-11-21. The first run passed ten of ten and exited 0 (his capture is timed 18:21). A second passing run was captured at 18:32 to 18:33 after the script masked the account id. A deliberately failing run stopped at 18:43:35 with exit code 1, and the alert email is timed 18:44.
- **Fact (honest moment):** Three things stopped him on his own machine, each shown in a message or capture he sent:
  - *"mise ERROR No version is set for shim: terraform"* on his first deploy attempt.
  - `error: cannot pull with rebase: You have unstaged changes`, from a changed `infra/.terraform.lock.hcl`.
  - `zsh: command not found: aws-emulator` when he went to start the emulator.
- **Fact (privacy):** His first terminal capture showed his AWS account id inside the bucket name. He said: *"ensure any images or blog posts are scrubbed of any personal details (my email, aws accounts or anything along those lines anywhere!!)"*. The scripts mask the id as a result.
- **Fact (how to tell it):** On reading *"I asked for the cheapest thing… and the answer was a container"* he said: *"Change this to I wanted instead of I asked. I don't want to hide I'm using AI, but at this point writing about a conversation I had is an odd read for a consumer."* His questions above are therefore written as wants.
- **Fact (who did what):** Claude Code wrote the Terraform, the Dockerfile and the scripts, and did the emulator investigation in its sandbox. He ran the real-AWS deploy, runs and captures, and ran the emulator locally for the three-environment capture.
- **Fact (verdict):** Not given. He has not said whether he would use this for real.
- **Fact (would do differently):** Not asked. Do not manufacture one.
- **Never claim:**
  - Any feeling about the work: nervous, relieved, excited, surprised, unsure. He expressed none.
  - That he personally hit the emulator's limits (the stuck bucket, the security group error, the ECR push, the ECS task, the Lambda runtime, the missing export folder). Those happened in Claude Code's sandbox.
  - That he saw the 06:00 schedule fire. Every run was started by hand.
  - Any cost figure, or that it "costs pennies". No bill was looked at.
  - Any day-context detail beyond the park, the sausage bap and the dog's ice-cream.
  - "Rungs", "ladder" or "climbing" for the environments. Claude Code suggested the phrase and he replaced it.
- **Allowed framings:** (verbatim from the session)
  - *"busting to continue the dbt series"*
  - *"another environment with the aws emulator, my new favourite toy"*
  - *"three environments to my one dbt setup, proving the easy multi environment config"*
  - *"let's do the basics and show that first, building on previous posts"*
  - *"the cheapest thing that can also run local"*
  - *"deploy everything there too and ensure it works"*
  - *"to show its all in an environment too"*
  - *"all three environments doing the same query showing same results"*
  - *"just to prove the environment"*
- **Permissions:** use anywhere within the DuckDB series content.
- **Source:** Claude Code session, 2026-11-20 to 2026-11-21 (his messages and screenshots). An `/hc-datagriff-interview harlequin` is still needed for the verdict and the would-do-differently line.
