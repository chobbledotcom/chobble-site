#!/usr/bin/env node

// Fetches uptime stats from Uptime Kuma's Prometheus metrics endpoint
// and 7-day uptime percentages from the badge API.
//
// The badge API uses numeric monitor IDs which we auto-discover by
// iterating through IDs and matching monitor names to our sites.

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const UPTIME_KUMA_URL =
  process.env.UPTIME_KUMA_URL || "https://uptime.chobble.com";
const UPTIME_KUMA_API_KEY = process.env.UPTIME_KUMA_API_KEY || "";
const MAX_MONITOR_ID = 100;

function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}`));
        } else {
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
  });
}

function parsePrometheusMetrics(text) {
  const monitors = {};

  for (const line of text.split("\n")) {
    if (line.startsWith("#") || line.trim() === "") continue;

    const match = line.match(/^(\w+)\{([^}]*)\}\s+(.+)$/);
    if (!match) continue;

    const [, metric, labelsStr, valueStr] = match;
    const value = parseFloat(valueStr);

    const labels = {};
    for (const pair of labelsStr.match(/(\w+)="([^"]*)"/g) || []) {
      const [, k, v] = pair.match(/(\w+)="([^"]*)"/);
      labels[k] = v;
    }

    const name = labels.monitor_name;
    if (!name) continue;

    if (!monitors[name]) {
      monitors[name] = {
        name,
        type: labels.monitor_type,
        url: labels.monitor_url,
      };
    }

    if (metric === "monitor_status") {
      monitors[name].status = value === 1 ? "up" : "down";
    } else if (metric === "monitor_response_time") {
      monitors[name].responseTime = value;
    } else if (metric === "monitor_cert_days_remaining") {
      monitors[name].certDaysRemaining = value;
    }
  }

  return monitors;
}

function parseUptimeFromBadgeSvg(svg) {
  // Badge SVGs contain text like "99.97%" or "100%"
  const match = svg.match(/(\d+(?:\.\d+)?)%/);
  return match ? parseFloat(match[1]) : null;
}

function parseNameFromBadgeSvg(svg) {
  // The badge title contains the monitor name, e.g. <title>example.com | Uptime</title>
  // Or the first text element has the label
  const titleMatch = svg.match(/<title>([^|<]+)/);
  if (titleMatch) return titleMatch[1].trim();
  return null;
}

async function discoverMonitorIds(monitorNames) {
  const nameToId = {};
  const targetNames = new Set(monitorNames);
  let found = 0;
  let consecutiveMisses = 0;

  console.log("Discovering monitor IDs from badge API...");

  for (let id = 1; id <= MAX_MONITOR_ID; id++) {
    if (found >= targetNames.size) break;
    // Stop after 10 consecutive 404s to avoid wasting time
    if (consecutiveMisses > 10) break;

    try {
      const url = `${UPTIME_KUMA_URL}/api/badge/${id}/uptime`;
      const svg = await fetch(url);
      const name = parseNameFromBadgeSvg(svg);
      consecutiveMisses = 0;

      if (name && targetNames.has(name)) {
        nameToId[name] = id;
        found++;
        console.log(`  Found: ${name} = ID ${id}`);
      }
    } catch (_) {
      consecutiveMisses++;
    }
  }

  return nameToId;
}

async function fetchUptimePercent(monitorId, duration) {
  try {
    const url = `${UPTIME_KUMA_URL}/api/badge/${monitorId}/uptime/${duration}`;
    const svg = await fetch(url);
    return parseUptimeFromBadgeSvg(svg);
  } catch (_) {
    return null;
  }
}

async function main() {
  if (!UPTIME_KUMA_API_KEY) {
    console.error(
      "Error: UPTIME_KUMA_API_KEY environment variable is required"
    );
    process.exit(1);
  }

  const dataDir = path.join(__dirname, "..", "src", "_data");
  const sitesPath = path.join(dataDir, "sites.json");

  const sites = JSON.parse(fs.readFileSync(sitesPath, "utf-8"));

  // Fetch Prometheus metrics for status, response time, cert days
  const auth = Buffer.from(`:${UPTIME_KUMA_API_KEY}`).toString("base64");
  const metricsUrl = `${UPTIME_KUMA_URL}/metrics`;

  console.log(`Fetching metrics from ${metricsUrl}`);
  const metricsText = await fetch(metricsUrl, {
    Authorization: `Basic ${auth}`,
  });

  const monitors = parsePrometheusMetrics(metricsText);

  // Discover monitor IDs for badge API
  const monitorNames = sites.map((s) => s.uptimeMonitor);
  const nameToId = await discoverMonitorIds(monitorNames);

  // Fetch 7-day uptime percentages from badge API
  console.log("\nFetching 7-day uptime percentages...");
  const uptimePercents = {};
  for (const site of sites) {
    const id = nameToId[site.uptimeMonitor];
    if (id) {
      uptimePercents[site.uptimeMonitor] = await fetchUptimePercent(id, "168");
    }
  }

  const results = {};
  for (const site of sites) {
    const monitor = monitors[site.uptimeMonitor];
    const uptimePercent = uptimePercents[site.uptimeMonitor] ?? null;

    if (monitor) {
      results[site.url] = {
        status: monitor.status || "unknown",
        responseTime: monitor.responseTime || null,
        certDaysRemaining: monitor.certDaysRemaining || null,
        uptimePercent,
      };
      console.log(
        `  ${site.name}: ${monitor.status}, ${monitor.responseTime}ms, cert ${monitor.certDaysRemaining}d, 7d uptime ${uptimePercent !== null ? uptimePercent + "%" : "N/A"}`
      );
    } else {
      results[site.url] = {
        status: "unknown",
        responseTime: null,
        certDaysRemaining: null,
        uptimePercent,
      };
      console.log(
        `  ${site.name}: monitor "${site.uptimeMonitor}" not found`
      );
    }
  }

  const outputPath = path.join(dataDir, "uptime.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote uptime data to ${outputPath}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
