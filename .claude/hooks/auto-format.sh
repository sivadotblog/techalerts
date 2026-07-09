#!/bin/bash
# PostToolUse(Edit|Write) — formats the edited file when a formatter is
# available; silently does nothing otherwise. Always exits 0 (never blocks).

input=$(cat)
if command -v jq >/dev/null 2>&1; then
  file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
else
  file=$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)
fi
{ [ -n "$file" ] && [ -f "$file" ]; } || exit 0

case "$file" in
  *.py)
    if command -v ruff >/dev/null 2>&1; then
      ruff format "$file" >/dev/null 2>&1
    elif command -v black >/dev/null 2>&1; then
      black -q "$file" >/dev/null 2>&1
    fi
    ;;
  *.js|*.jsx|*.ts|*.tsx|*.css|*.md|*.json)
    # Project-local prettier only (--no-install): respects each repo's choice.
    dir=$(dirname "$file")
    (cd "$dir" 2>/dev/null && npx --no-install prettier --write "$file" >/dev/null 2>&1)
    ;;
esac

exit 0
