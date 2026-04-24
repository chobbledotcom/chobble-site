const { execFileSync } = require("child_process");
const path = require("path");

const cache = new Map();

function runGit(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (e) {
    return "";
  }
}

function datesFor(inputPath) {
  if (!inputPath) return null;
  const rel = inputPath.replace(/^\.\//, "");
  if (cache.has(rel)) return cache.get(rel);

  const created = runGit([
    "log",
    "--follow",
    "--diff-filter=A",
    "--format=%aI",
    "--",
    rel,
  ])
    .split("\n")
    .filter(Boolean)
    .pop();

  const modified = runGit(["log", "-1", "--format=%aI", "--", rel]);

  if (!created && !modified) {
    cache.set(rel, null);
    return null;
  }

  const result = {
    published: created || modified || null,
    updated: modified || created || null,
  };
  cache.set(rel, result);
  return result;
}

function formatHuman(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

module.exports = { datesFor, formatHuman };
