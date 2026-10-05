#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "=== Fetching Uptime Kuma stats ==="
deno run -A scripts/fetch-uptime.js

echo ""
echo "=== Fetching Lighthouse scores ==="
# Lighthouse is a node app - this step needs node (nix shell or CI), deno cannot run it
node scripts/fetch-lighthouse.js

echo ""
echo "=== Merging stats ==="
deno run -A scripts/merge-stats.js

echo ""
echo "=== Done ==="
