#!/bin/bash
# Install hungovercoders Claude Code skills and shared voice content.
# Run from the library directory: cd <wherever-library-lives> && ./install-skills.sh
# Re-run after pulling updates, or after moving the library to a new path —
# symlinks point at the current location of this script's parent directory.

set -euo pipefail

LIBRARY_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_SRC="$LIBRARY_DIR/skills"
VOICE_SRC="$LIBRARY_DIR/voice"

SKILLS_TARGET="$HOME/.claude/skills"
VOICE_TARGET="$HOME/.claude/hungovercoders/voice"

if [ ! -d "$SKILLS_SRC" ]; then
  echo "Error: $SKILLS_SRC not found. Is this the library root?" >&2
  exit 1
fi

if [ ! -d "$VOICE_SRC" ]; then
  echo "Error: $VOICE_SRC not found. Is this the library root?" >&2
  exit 1
fi

mkdir -p "$SKILLS_TARGET" "$VOICE_TARGET"

echo "installing skills to $SKILLS_TARGET"
for skill_dir in "$SKILLS_SRC"/*/; do
  name="$(basename "$skill_dir")"
  ln -sfn "${skill_dir%/}" "$SKILLS_TARGET/$name"
  echo "  linked: $name"
done

echo "installing voice content to $VOICE_TARGET"
for v in "$VOICE_SRC"/*.md; do
  name="$(basename "$v")"
  ln -sf "$v" "$VOICE_TARGET/$name"
  echo "  linked: $name"
done

echo ""
echo "hungovercoders library installed."
echo "  skills:        $SKILLS_TARGET"
echo "  voice content: $VOICE_TARGET"
echo ""
echo "Library source: $LIBRARY_DIR (can be moved — re-run this script after moving)"
