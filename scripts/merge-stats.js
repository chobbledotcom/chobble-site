#!/usr/bin/env node

// Merges uptime.json and lighthouse.json with sites.json
// into a single stats.json for the Eleventy template

const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "src", "_data");

const sites = JSON.parse(
  fs.readFileSync(path.join(dataDir, "sites.json"), "utf-8")
);

let uptime = {};
try {
  uptime = JSON.parse(
    fs.readFileSync(path.join(dataDir, "uptime.json"), "utf-8")
  );
} catch (_) {
  console.log("No uptime.json found, skipping uptime data");
}

let lighthouse = {};
try {
  lighthouse = JSON.parse(
    fs.readFileSync(path.join(dataDir, "lighthouse.json"), "utf-8")
  );
} catch (_) {
  console.log("No lighthouse.json found, skipping lighthouse data");
}

const stats = {
  lastUpdated: new Date().toISOString(),
  sites: sites.map((site) => ({
    name: site.name,
    url: site.url,
    uptime: uptime[site.url] || null,
    lighthouse: lighthouse[site.url] || null,
  })),
};

const outputPath = path.join(dataDir, "stats.json");
fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2) + "\n");
console.log(`Wrote merged stats to ${outputPath}`);
