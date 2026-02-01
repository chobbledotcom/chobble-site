#!/usr/bin/env node

// Runs Lighthouse CLI against the least-recently-updated site in sites.json
// and merges the result into src/_data/lighthouse.json
//
// Each entry includes a lastUpdated timestamp so we can rotate through
// all sites over time (one site per daily run).
//
// Requires: npm install -g lighthouse

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const TIMEOUT = 120000; // 2 minutes per site

function runLighthouse(url) {
  const tmpFile = path.join(__dirname, "..", `lh-${Date.now()}.json`);

  try {
    execSync(
      `npx lighthouse "${url}" --output=json --output-path="${tmpFile}" --chrome-flags="--headless --no-sandbox --disable-gpu" --only-categories=performance,accessibility,best-practices,seo --quiet`,
      {
        timeout: TIMEOUT,
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    const report = JSON.parse(fs.readFileSync(tmpFile, "utf-8"));
    const categories = report.categories;

    return {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round(
        (categories["best-practices"]?.score || 0) * 100
      ),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };
  } catch (err) {
    console.error(`    Lighthouse failed: ${err.message}`);
    return null;
  } finally {
    try {
      fs.unlinkSync(tmpFile);
    } catch (_) {}
  }
}

function findLeastRecentlyUpdatedSite(sites, existing) {
  let oldest = null;
  let oldestTime = Infinity;

  for (const site of sites) {
    const entry = existing[site.url];
    if (!entry || !entry.lastUpdated) {
      // Never been audited - pick this one immediately
      return site;
    }
    const time = new Date(entry.lastUpdated).getTime();
    if (time < oldestTime) {
      oldestTime = time;
      oldest = site;
    }
  }

  return oldest;
}

async function main() {
  const sitesPath = path.join(__dirname, "..", "src", "_data", "sites.json");
  const lighthousePath = path.join(
    __dirname,
    "..",
    "src",
    "_data",
    "lighthouse.json"
  );

  const sites = JSON.parse(fs.readFileSync(sitesPath, "utf-8"));

  // Load existing lighthouse data if available
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync(lighthousePath, "utf-8"));
  } catch (_) {
    console.log("No existing lighthouse.json found, starting fresh");
  }

  const site = findLeastRecentlyUpdatedSite(sites, existing);
  if (!site) {
    console.log("No sites to audit");
    return;
  }

  console.log(`Running Lighthouse for ${site.name} (${site.url})...`);
  const scores = runLighthouse(site.url);

  if (scores) {
    existing[site.url] = {
      ...scores,
      lastUpdated: new Date().toISOString(),
    };
    console.log(
      `  Performance: ${scores.performance}, Accessibility: ${scores.accessibility}, Best Practices: ${scores.bestPractices}, SEO: ${scores.seo}`
    );
  } else {
    // Still update the timestamp so we don't retry the same failing site forever
    existing[site.url] = {
      ...(existing[site.url] || {}),
      lastUpdated: new Date().toISOString(),
    };
    console.log(`  Failed - timestamp updated to avoid retry loop`);
  }

  fs.writeFileSync(lighthousePath, JSON.stringify(existing, null, 2) + "\n");
  console.log(`\nWrote lighthouse data to ${lighthousePath}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
