#!/usr/bin/env node

// Runs Lighthouse CLI against each site in sites.json
// and writes results to src/_data/lighthouse.json
//
// Requires: npm install -g lighthouse
// Or: npx lighthouse (used by default)

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

async function main() {
  const sitesPath = path.join(__dirname, "..", "src", "_data", "sites.json");
  const sites = JSON.parse(fs.readFileSync(sitesPath, "utf-8"));

  const results = {};

  for (const site of sites) {
    console.log(`Running Lighthouse for ${site.name} (${site.url})...`);
    const scores = runLighthouse(site.url);
    if (scores) {
      results[site.url] = scores;
      console.log(
        `  Performance: ${scores.performance}, Accessibility: ${scores.accessibility}, Best Practices: ${scores.bestPractices}, SEO: ${scores.seo}`
      );
    } else {
      results[site.url] = null;
      console.log(`  Failed`);
    }
  }

  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "_data",
    "lighthouse.json"
  );
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote lighthouse data to ${outputPath}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
