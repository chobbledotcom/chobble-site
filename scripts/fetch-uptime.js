#!/usr/bin/env node

// Fetches uptime stats from Uptime Kuma:
// - Socket.io API for monitor list (name -> ID mapping)
// - Prometheus /metrics for status, response time, cert days
// - Badge API for precise 7-day uptime percentages

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { io } = require("socket.io-client");

const UPTIME_KUMA_URL =
  process.env.UPTIME_KUMA_URL || "https://uptime.chobble.com";
const UPTIME_KUMA_USERNAME = process.env.UPTIME_KUMA_USERNAME || "";
const UPTIME_KUMA_PASSWORD = process.env.UPTIME_KUMA_PASSWORD || "";
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

function getMonitorList(url, username, password) {
  return new Promise((resolve, reject) => {
    const socket = io(url, { transports: ["websocket"] });
    const monitors = {};
    const timeout = setTimeout(() => {
      socket.disconnect();
      reject(new Error("Socket.io connection timed out"));
    }, 30000);

    // Monitor data arrives via monitorList events, not the callback
    socket.on("monitorList", (data) => {
      Object.assign(monitors, data);
    });

    socket.on("connect", () => {
      socket.emit(
        "login",
        { username, password, token: "" },
        (loginRes) => {
          if (!loginRes.ok) {
            clearTimeout(timeout);
            socket.disconnect();
            reject(new Error("Login failed: " + (loginRes.msg || "unknown")));
            return;
          }

          // Request the monitor list; data arrives via monitorList events above
          socket.emit("getMonitorList", () => {
            // Give a moment for monitorList events to arrive
            setTimeout(() => {
              clearTimeout(timeout);
              socket.disconnect();
              resolve(monitors);
            }, 1000);
          });
        }
      );
    });

    socket.on("connect_error", (err) => {
      clearTimeout(timeout);
      socket.disconnect();
      reject(new Error("Socket.io connect error: " + err.message));
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

    if (!monitors[name]) monitors[name] = {};

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
  const missing = [];
  if (!UPTIME_KUMA_USERNAME) missing.push("UPTIME_KUMA_USERNAME");
  if (!UPTIME_KUMA_PASSWORD) missing.push("UPTIME_KUMA_PASSWORD");
  if (!UPTIME_KUMA_API_KEY) missing.push("UPTIME_KUMA_API_KEY");
  if (missing.length > 0) {
    console.error(`Error: missing environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }

  const dataDir = path.join(__dirname, "..", "src", "_data");
  const sitesPath = path.join(dataDir, "sites.json");
  const sites = JSON.parse(fs.readFileSync(sitesPath, "utf-8"));

  // Get monitor list from socket.io API (gives us name -> ID mapping)
  console.log(`Connecting to ${UPTIME_KUMA_URL}...`);
  const monitorList = await getMonitorList(
    UPTIME_KUMA_URL,
    UPTIME_KUMA_USERNAME,
    UPTIME_KUMA_PASSWORD
  );

  const entries = Object.entries(monitorList);
  if (entries.length === 0) {
    console.error("Error: getMonitorList returned no monitors - check credentials");
    process.exit(1);
  }

  // Log first monitor's structure to help debug field name mismatches
  const [sampleId, sampleMonitor] = entries[0];
  console.log(`Sample monitor (ID ${sampleId}): name="${sampleMonitor.name}", hostname="${sampleMonitor.hostname}", url="${sampleMonitor.url}"`);

  const monitorsByName = {};
  for (const [id, monitor] of entries) {
    monitorsByName[monitor.name] = { ...monitor, id: parseInt(id) };
  }

  const monitorCount = Object.keys(monitorsByName).length;
  console.log(`Found ${monitorCount} monitors`);

  // Verify our sites.json names actually match monitors in Uptime Kuma
  const matched = sites.filter((s) => monitorsByName[s.uptimeMonitor]);
  if (matched.length === 0) {
    console.error(
      "Error: none of the uptimeMonitor names in sites.json matched any monitors from Uptime Kuma"
    );
    console.error(
      "  Sites expect:",
      sites.map((s) => s.uptimeMonitor).slice(0, 5).join(", "),
      "..."
    );
    console.error(
      "  Uptime Kuma has:",
      Object.keys(monitorsByName).slice(0, 5).join(", "),
      "..."
    );
    process.exit(1);
  }

  // Get real-time stats from Prometheus metrics
  const auth = Buffer.from(`:${UPTIME_KUMA_API_KEY}`).toString("base64");
  const metricsText = await httpGet(`${UPTIME_KUMA_URL}/metrics`, {
    Authorization: `Basic ${auth}`,
  });
  const prometheusData = parsePrometheusMetrics(metricsText);

  const promCount = Object.keys(prometheusData).length;
  if (promCount === 0) {
    console.error("Error: Prometheus /metrics returned no monitor data - check UPTIME_KUMA_API_KEY");
    process.exit(1);
  }
  console.log(`Fetched Prometheus metrics for ${promCount} monitors`);

  // Fetch 7-day uptime percentages from badge API
  console.log("Fetching 7-day uptime percentages...");
  const results = {};
  let uptimeSuccesses = 0;

  for (const site of sites) {
    const monitor = monitorsByName[site.uptimeMonitor];
    const prom = prometheusData[site.uptimeMonitor] || {};

    if (monitor) {
      const uptimePercent = await fetchUptimePercent(monitor.id, "168");
      if (uptimePercent !== null) uptimeSuccesses++;

      results[site.url] = {
        status: prom.status || (monitor.active !== false ? "up" : "down"),
        responseTime: prom.responseTime || null,
        certDaysRemaining: prom.certDaysRemaining || null,
        uptimePercent,
      };
      console.log(
        `  ${site.name}: ID ${monitor.id}, ${results[site.url].status}, ${prom.responseTime || "-"}ms, 7d uptime ${uptimePercent !== null ? uptimePercent + "%" : "N/A"}`
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
  console.log(`\nWrote uptime data to ${outputPath} (${Object.keys(results).length} sites, ${uptimeSuccesses} with uptime %)`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
