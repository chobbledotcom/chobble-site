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
    const timeout = setTimeout(() => {
      socket.disconnect();
      reject(new Error("Socket.io connection timed out"));
    }, 30000);

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

          socket.emit("getMonitorList", (res) => {
            clearTimeout(timeout);
            socket.disconnect();
            resolve(res);
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
  if (!UPTIME_KUMA_USERNAME || !UPTIME_KUMA_PASSWORD) {
    console.error(
      "Error: UPTIME_KUMA_USERNAME and UPTIME_KUMA_PASSWORD environment variables are required"
    );
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

  const monitorsByName = {};
  for (const [id, monitor] of Object.entries(monitorList)) {
    monitorsByName[monitor.name] = { ...monitor, id: parseInt(id) };
  }
  console.log(`Found ${Object.keys(monitorsByName).length} monitors`);

  // Get real-time stats from Prometheus metrics
  let prometheusData = {};
  if (UPTIME_KUMA_API_KEY) {
    try {
      const auth = Buffer.from(`:${UPTIME_KUMA_API_KEY}`).toString("base64");
      const metricsText = await httpGet(`${UPTIME_KUMA_URL}/metrics`, {
        Authorization: `Basic ${auth}`,
      });
      prometheusData = parsePrometheusMetrics(metricsText);
      console.log("Fetched Prometheus metrics");
    } catch (err) {
      console.log(`Prometheus metrics unavailable: ${err.message}`);
    }
  }

  // Fetch 7-day uptime percentages from badge API
  console.log("Fetching 7-day uptime percentages...");
  const results = {};

  for (const site of sites) {
    const monitor = monitorsByName[site.uptimeMonitor];
    const prom = prometheusData[site.uptimeMonitor] || {};

    if (monitor) {
      const uptimePercent = await fetchUptimePercent(monitor.id, "168");

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
      results[site.url] = {
        status: "unknown",
        responseTime: null,
        certDaysRemaining: null,
        uptimePercent: null,
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
