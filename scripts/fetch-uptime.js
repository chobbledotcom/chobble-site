#!/usr/bin/env node

// Fetches uptime stats from Uptime Kuma's Prometheus metrics endpoint
// and writes results to src/_data/uptime.json
//
// Maintains a rolling 30-day history in src/_data/uptime-history.json
// to calculate uptime percentages.

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const UPTIME_KUMA_URL =
  process.env.UPTIME_KUMA_URL || "https://uptime.chobble.com";
const UPTIME_KUMA_API_KEY = process.env.UPTIME_KUMA_API_KEY || "";
const HISTORY_DAYS = 30;

function fetch(url, headers) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } else {
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
  });
}

function parsePrometheusMetrics(text) {
  const monitors = {};

  for (const line of text.split("\n")) {
    if (line.startsWith("#") || line.trim() === "") continue;

    const match = line.match(
      /^(\w+)\{([^}]*)\}\s+(.+)$/
    );
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

function loadHistory(historyPath) {
  try {
    return JSON.parse(fs.readFileSync(historyPath, "utf-8"));
  } catch (_) {
    return {};
  }
}

function updateHistory(history, url, status) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (!history[url]) {
    history[url] = [];
  }

  // Don't add duplicate entries for the same day
  const lastEntry = history[url][history[url].length - 1];
  if (lastEntry && lastEntry.date === today) {
    lastEntry.status = status;
  } else {
    history[url].push({ date: today, status });
  }

  // Keep only the last 30 days
  if (history[url].length > HISTORY_DAYS) {
    history[url] = history[url].slice(-HISTORY_DAYS);
  }
}

function calculateUptimePercent(history, url) {
  const entries = history[url];
  if (!entries || entries.length === 0) return null;

  const upCount = entries.filter((e) => e.status === "up").length;
  return Math.round((upCount / entries.length) * 100);
}

async function main() {
  if (!UPTIME_KUMA_API_KEY) {
    console.error("Error: UPTIME_KUMA_API_KEY environment variable is required");
    process.exit(1);
  }

  const dataDir = path.join(__dirname, "..", "src", "_data");
  const sitesPath = path.join(dataDir, "sites.json");
  const historyPath = path.join(dataDir, "uptime-history.json");

  const sites = JSON.parse(fs.readFileSync(sitesPath, "utf-8"));

  const auth = Buffer.from(`:${UPTIME_KUMA_API_KEY}`).toString("base64");
  const metricsUrl = `${UPTIME_KUMA_URL}/metrics`;

  console.log(`Fetching metrics from ${metricsUrl}`);
  const metricsText = await fetch(metricsUrl, {
    Authorization: `Basic ${auth}`,
  });

  const monitors = parsePrometheusMetrics(metricsText);
  const history = loadHistory(historyPath);

  const results = {};
  for (const site of sites) {
    const monitor = monitors[site.uptimeMonitor];
    const status = monitor?.status || "unknown";

    if (status !== "unknown") {
      updateHistory(history, site.url, status);
    }

    const uptimePercent = calculateUptimePercent(history, site.url);

    if (monitor) {
      results[site.url] = {
        status,
        responseTime: monitor.responseTime || null,
        certDaysRemaining: monitor.certDaysRemaining || null,
        uptimePercent,
      };
      console.log(
        `  ${site.name}: ${status}, ${monitor.responseTime}ms, cert ${monitor.certDaysRemaining}d, 30d uptime ${uptimePercent !== null ? uptimePercent + "%" : "N/A"}`
      );
    } else {
      results[site.url] = {
        status: "unknown",
        responseTime: null,
        certDaysRemaining: null,
        uptimePercent,
      };
      console.log(`  ${site.name}: monitor "${site.uptimeMonitor}" not found`);
    }
  }

  const outputPath = path.join(dataDir, "uptime.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote uptime data to ${outputPath}`);

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");
  console.log(`Wrote uptime history to ${historyPath}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
