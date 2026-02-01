#!/usr/bin/env node

// Fetches uptime stats from Uptime Kuma:
// - Prometheus /metrics for monitor IDs, status, response time, cert days
// - Badge API for precise 7-day uptime percentages
//
// Requires UPTIME_KUMA_API_KEY environment variable.

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const UPTIME_KUMA_URL =
  process.env.UPTIME_KUMA_URL || "https://uptime.chobble.com";
const UPTIME_KUMA_API_KEY = process.env.UPTIME_KUMA_API_KEY || "";

function httpGet(url, headers = {}) {
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
    const id = labels.monitor_id;
    if (!name || !id) continue;

    if (!monitors[name]) {
      monitors[name] = {
        id: parseInt(id),
        name,
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
  const match = svg.match(/(\d+(?:\.\d+)?)%/);
  return match ? parseFloat(match[1]) : null;
}

async function fetchUptimePercent(monitorId, duration) {
  try {
    const url = `${UPTIME_KUMA_URL}/api/badge/${monitorId}/uptime/${duration}`;
    const svg = await httpGet(url);
    return parseUptimeFromBadgeSvg(svg);
  } catch (_) {
    return null;
  }
}

async function main() {
  if (!UPTIME_KUMA_API_KEY) {
    console.error("Error: UPTIME_KUMA_API_KEY environment variable is required");
    process.exit(1);
  }

  const dataDir = path.join(__dirname, "..", "src", "_data");
  const sitesPath = path.join(dataDir, "sites.json");
  const sites = JSON.parse(fs.readFileSync(sitesPath, "utf-8"));

  // Fetch Prometheus metrics (includes monitor IDs)
  console.log(`Fetching metrics from ${UPTIME_KUMA_URL}/metrics`);
  const auth = Buffer.from(`:${UPTIME_KUMA_API_KEY}`).toString("base64");
  const metricsText = await httpGet(`${UPTIME_KUMA_URL}/metrics`, {
    Authorization: `Basic ${auth}`,
  });
  const monitors = parsePrometheusMetrics(metricsText);

  const monitorCount = Object.keys(monitors).length;
  if (monitorCount === 0) {
    console.error("Error: Prometheus /metrics returned no monitor data - check UPTIME_KUMA_API_KEY");
    process.exit(1);
  }
  console.log(`Found ${monitorCount} monitors`);

  // Verify our sites.json names actually match monitors
  const matched = sites.filter((s) => monitors[s.uptimeMonitor]);
  if (matched.length === 0) {
    console.error(
      "Error: none of the uptimeMonitor names in sites.json matched any monitors"
    );
    console.error(
      "  Sites expect:",
      sites.map((s) => s.uptimeMonitor).slice(0, 5).join(", "),
      "..."
    );
    console.error(
      "  Prometheus has:",
      Object.keys(monitors).slice(0, 5).join(", "),
      "..."
    );
    process.exit(1);
  }

  // Fetch 7-day uptime percentages from badge API
  console.log("Fetching 7-day uptime percentages...");
  const results = {};
  let uptimeSuccesses = 0;

  for (const site of sites) {
    const monitor = monitors[site.uptimeMonitor];

    if (monitor) {
      const uptimePercent = await fetchUptimePercent(monitor.id, "168");
      if (uptimePercent !== null) uptimeSuccesses++;

      results[site.url] = {
        status: monitor.status || "unknown",
        responseTime: monitor.responseTime || null,
        certDaysRemaining: monitor.certDaysRemaining || null,
        uptimePercent,
      };
      console.log(
        `  ${site.name}: ID ${monitor.id}, ${monitor.status}, ${monitor.responseTime || "-"}ms, 7d uptime ${uptimePercent !== null ? uptimePercent + "%" : "N/A"}`
      );
    } else {
      console.log(
        `  ${site.name}: monitor "${site.uptimeMonitor}" not found in Uptime Kuma`
      );
    }
  }

  if (uptimeSuccesses === 0) {
    console.error("Error: badge API returned no uptime percentages for any monitor");
    process.exit(1);
  }

  const outputPath = path.join(dataDir, "uptime.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2) + "\n");
  console.log(
    `\nWrote uptime data to ${outputPath} (${Object.keys(results).length} sites, ${uptimeSuccesses} with uptime %)`
  );
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
