#!/bin/bash
# PreToolUse(Bash) guard — denies destructive commands.
# Exit 2 = block the tool call (stderr is shown to Claude); exit 0 = allow.

input=$(cat)
if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)
else
  cmd=$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)
fi
[ -z "$cmd" ] && exit 0

# Strip quote characters so quoted paths still match the target patterns.
c=$(printf '%s' "$cmd" | tr -d "\"'")
H="$HOME"

has() { printf '%s' "$c" | grep -Eq "$1"; }
deny() { printf 'BLOCKED by block-dangerous.sh: %s\n' "$1" >&2; exit 2; }

# rm with recursive+force flags aimed at /, ~, $HOME, or the ~/code root
if has "(^|[;&|][[:space:]]*)(sudo[[:space:]]+)?rm[[:space:]]" \
   && has "[[:space:]](-[[:alpha:]]*[rR]|--recursive)" \
   && has "[[:space:]](-[[:alpha:]]*f|--force)"; then
  if has "[[:space:]](/|~|\\\$HOME|$H|~/code|\\\$HOME/code|$H/code)/?\\*?([[:space:]]|$|;|&|\\|)"; then
    deny "rm -rf targeting /, home directory, or ~/code root"
  fi
fi

# force-push to main/master
if has "git[[:space:]]+push" && has "(--force([[:space:]]|$|=)|[[:space:]]-f([[:space:]]|$))" \
   && has "(main|master)"; then
  deny "force-push to main/master"
fi

# hard reset to origin main/master
if has "git[[:space:]]+reset[[:space:]]+--hard" && has "origin/(main|master)"; then
  deny "git reset --hard to origin/main|master"
fi

has "chmod[[:space:]]+-R[[:space:]]+777" && deny "chmod -R 777"
has "(^|[[:space:];|&])mkfs" && deny "mkfs (filesystem format)"
has "(^|[[:space:];|&])dd[[:space:]].*of=/dev/" && deny "dd writing to a device"

exit 0
