#!/bin/bash
# Install hungovercoders Claude Code skills and shared voice content.
# Run from the library directory: cd <wherever-library-lives> && ./install-skills.sh
# Re-run after pulling updates, or after moving the library to a new path —
# symlinks point at the current location of this script's parent directory.

set -euo pipefail

LIBRARY_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMANDS_SRC="$LIBRARY_DIR/.claude/commands"
VOICE_SRC="$LIBRARY_DIR/voice"

COMMANDS_TARGET="$HOME/.claude/commands"
VOICE_TARGET="$HOME/.claude/hungovercoders/voice"

if [ ! -d "$COMMANDS_SRC" ]; then
  echo "Error: $COMMANDS_SRC not found. Is this the library root?" >&2
  exit 1
fi

if [ ! -d "$VOICE_SRC" ]; then
  echo "Error: $VOICE_SRC not found. Is this the library root?" >&2
  exit 1
fi

mkdir -p "$COMMANDS_TARGET" "$VOICE_TARGET"

echo "installing slash commands to $COMMANDS_TARGET"
for skill in "$COMMANDS_SRC"/*.md; do
  name="$(basename "$skill")"
  ln -sf "$skill" "$COMMANDS_TARGET/$name"
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
echo "  skills:        $COMMANDS_TARGET"
echo "  voice content: $VOICE_TARGET"
echo ""
echo "Library source: $LIBRARY_DIR (can be moved — re-run this script after moving)"
