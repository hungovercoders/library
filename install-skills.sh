#!/bin/bash
# Install hungovercoders Claude Code skills by symlinking them to ~/.claude/commands/
# Run from the library directory: cd ~/dev/hungovercoders/library && ./install-skills.sh
# Re-run after pulling updates — symlinks mean changes are immediately reflected.

set -euo pipefail

COMMANDS_DIR="$(pwd)/.claude/commands"
TARGET_DIR="$HOME/.claude/commands"

if [ ! -d "$COMMANDS_DIR" ]; then
  echo "Error: .claude/commands not found. Run this script from the library root." >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"

for skill in "$COMMANDS_DIR"/*.md; do
  name="$(basename "$skill")"
  ln -sf "$skill" "$TARGET_DIR/$name"
  echo "  linked: $name"
done

echo "hungovercoders skills installed to $TARGET_DIR"
