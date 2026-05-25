# library — agent orientation

This repo is the source of truth for the hungovercoders content system. It holds two kinds of content and a set of Claude Code skills.

## Layout

```
voice/        Shared AI context. The voice guide, blog template, video template, worked example.
              These files get installed into ~/.claude/hungovercoders/voice/ so skills can find
              them at a stable user-level path. AI is expected to load these.

reference/    Human reference. Roadmap, OKRs, technical implementation spec. Read by the author
              for planning and build cadence — not auto-loaded into any model context.
              `reference/archive/` holds documents superseded by other parts of the system.

skills/       Claude Code skills (hc-new-series, hc-write-lessons, hc-launch, hc-review-series).
              Each skill is a directory containing a SKILL.md. Symlinked into ~/.claude/skills/
              by install-skills.sh, so they invoke as /hc-launch, /hc-write-lessons, etc.

install-skills.sh   Symlinks skills/* into ~/.claude/skills/ and voice/* into
                    ~/.claude/hungovercoders/voice/. Run once after cloning, and any time the
                    library is moved.
```

## How the workflow stays portable

The library can be cloned **anywhere on the machine** — `~/dev/hungovercoders/library`, `~/code/library`, an external drive, doesn't matter. After running `./install-skills.sh` once, the skills and voice content are reachable from any working directory via stable `~/.claude/...` paths.

`learn.*` repos do **not** depend on the library being checked out next to them. Their `AGENTS.md` files describe only their own conventions. Voice context is loaded by the hc- skills at invocation time, not by `@` includes pointing at a sibling library directory.

If you move the library, re-run `./install-skills.sh` from the new location to refresh symlinks.

## Editing rules

- Keep `voice/` files load-bearing — anything here will be read into model context, so don't pad them.
- Keep `reference/` files human-readable — they're the author's planning material, not AI prompt material.
- Skills in `skills/<name>/SKILL.md` should reference voice content via `~/.claude/hungovercoders/voice/<file>.md`, never via `~/dev/hungovercoders/library/...`.
