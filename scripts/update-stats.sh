#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "=== Fetching Uptime Kuma stats ==="
node scripts/fetch-uptime.js

echo ""
echo "=== Fetching Lighthouse scores ==="
node scripts/fetch-lighthouse.js

echo ""
echo "=== Merging stats ==="
node scripts/merge-stats.js

echo ""
echo "=== Done ==="
