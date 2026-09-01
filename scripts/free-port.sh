#!/usr/bin/env bash
# Free one or more TCP ports by killing whatever is listening on them.
#
# Used as a preLaunchTask so dev servers always start on their canonical port
# instead of silently drifting to the next one — a drifted port means the phone
# or browser is pointed at a stale server.
#
# Usage: scripts/free-port.sh 3000 8081

set -u

for port in "$@"; do
  pids=$(ss -lptnH "sport = :${port}" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | sort -u)

  if [ -z "${pids}" ]; then
    echo "port ${port}: free"
    continue
  fi

  for pid in ${pids}; do
    name=$(ps -p "${pid}" -o comm= 2>/dev/null || echo "unknown")
    echo "port ${port}: killing pid ${pid} (${name})"
    kill "${pid}" 2>/dev/null || true
  done

  # Give them a moment to exit cleanly, then escalate if still holding the port.
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    ss -lntH "sport = :${port}" 2>/dev/null | grep -q . || break
    sleep 0.3
  done

  if ss -lntH "sport = :${port}" 2>/dev/null | grep -q .; then
    for pid in ${pids}; do kill -9 "${pid}" 2>/dev/null || true; done
    sleep 0.5
  fi

  if ss -lntH "sport = :${port}" 2>/dev/null | grep -q .; then
    echo "port ${port}: STILL HELD — resolve manually" >&2
    exit 1
  fi
  echo "port ${port}: freed"
done

exit 0
