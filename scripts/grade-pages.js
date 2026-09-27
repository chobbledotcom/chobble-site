#!/usr/bin/env node

// grade-pages.js - grade local chobble-site pages against the house content
// rules using Jev (TypeSafe System One) via the OpenCode zen API.
//
// A port of bcn-tools' db-grade-page.py, adapted for this repo: it reads the
// local markdown source under src/ (no fetching - the files are the site),
// and the fuzzy checks focus on EEAT (Experience, Expertise,
// Authoritativeness, Trustworthiness), which is combined into a headline
// EEAT score (0-100 + letter) alongside the overall weighted score.
//
// Single page: full per-check report. No args / multiple pages: parallel
// batch with a worst-first ranked table and aggregate failure stats, so a
// sweep of the site surfaces the pages that need upgrading most.
//
// Usage:
//   ./grade-pages.js                                           # all content pages
//   ./grade-pages.js src/services/static-websites.md            # one page, full report
//   ./grade-pages.js /services/static-websites/                 # URL shorthand
//   ./grade-pages.js src/services                               # a whole directory
//   ./grade-pages.js --prefix guides                            # sweep one section
//   ./grade-pages.js <page> --no-jev                            # mechanical checks only
//   ./grade-pages.js --json / --csv out.csv / --list-checks
//
// The Jev API key is read from OPENCODE_API_KEY or
// /run/secrets/opencode_api_key. The check schema lives in CHECKS below -
// weights, thresholds and per-page-type applicability all live there. Batch
// mode always exits 0 (it is a report); single-page mode exits 1 on critical
// failures (e.g. a broken internal link).

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");

const SITE_URL = "https://www.chobble.com";
const ZEN_SYSTEMONE_URL = "https://opencode.ai/zen/v1/systemone";
const DEFAULT_MODEL = "jev-1.13";
const DEFAULT_KEY_FILE = "/run/secrets/opencode_api_key";

// Cap on the prose sent to Jev per page (body and body_house). Sits above
// the longest page in this repo (~17k chars) with headroom so real pages
// never truncate - grading a partially-visible body is how long guides get
// mis-scored. Kept as a payload guard: an over-limit state would come back
// as HTTP 400 and quietly degrade the page to mechanical-only grading.
const MAX_BODY_CHARS = 24000;
const MAX_LINKS = 40;

// Files excluded from grading. Legal text is excluded because the house voice
// deliberately does not apply to it; the rest are tooling or boilerplate. They
// all stay in the URL map so links to them still resolve.
const SKIP_GRADE = new Set([
  "src/terms.md",
  "src/privacy.md",
  "src/complaints.md",
  "src/404.md",
  "src/thank-you.md",
  "src/webhook.html",
  "src/stats.html",
  "src/redirects.html",
  "src/external-redirects.html",
]);

// Never real HTML pages (robots.txt / sitemap.xml generators) - excluded from
// the URL map entirely.
const SKIP_URLMAP = new Set(["src/robots.njk", "src/sitemp.njk"]);

const SKIP_DIRS = new Set([
  "_data",
  "_includes",
  "_layouts",
  "_lib",
  "assets",
  "css",
]);
const CONTENT_EXT = new Set([".md", ".html", ".njk"]);

// Root-level listing pages that mirror a directory of the same name
// (src/guides.md + src/guides/). Thin by design - the thin-content check
// skips them.
const LISTING_PAGES = new Set([
  "src/services.md",
  "src/guides.md",
  "src/examples.md",
  "src/videos.md",
  "src/prestwich.md",
]);

const ALL_TYPES = [
  "home",
  "about",
  "service",
  "guide",
  "example",
  "landing",
  "video",
  "page",
];

// ---------------------------------------------------------------------------
// Page discovery + extraction
// ---------------------------------------------------------------------------

function walkContentFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkContentFiles(full, out);
    } else if (CONTENT_EXT.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

function relPath(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function outputUrl(rel) {
  const noExt = rel.slice("src/".length).replace(/\.(md|html|njk)$/, "");
  const dir = path.posix.dirname(noExt);
  const base = path.posix.basename(noExt);
  if (dir === ".") return base === "index" ? "/" : `/${base}/`;
  return `/${dir}/${base === "index" ? "" : base + "/"}`;
}

function detectPageType(rel) {
  if (rel === "src/index.md") return "home";
  if (rel.startsWith("src/about/")) return "about";
  if (rel.startsWith("src/services/")) return "service";
  if (rel.startsWith("src/guides/")) return "guide";
  if (rel.startsWith("src/examples/")) return "example";
  if (rel.startsWith("src/prestwich/")) return "landing";
  if (rel.startsWith("src/videos/")) return "video";
  return "page";
}

function stripQuotes(s) {
  return s.replace(/^["']|["']$/g, "");
}

/** Minimal frontmatter parser: scalars and lists (block or inline). The
 * frontmatter in this repo never goes beyond that, so a full YAML dependency
 * would be weight for nothing. */
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { data: {}, body: text };
  const data = {};
  const lines = m[1].split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const kv = lines[i].match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const val = kv[2].trim();
    if (val === "") {
      const items = [];
      i++;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        items.push(stripQuotes(lines[i].replace(/^\s+-\s+/, "").trim()));
        i++;
      }
      data[key] = items;
      continue;
    }
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => stripQuotes(s.trim()))
        .filter(Boolean);
      i++;
      continue;
    }
    data[key] = stripQuotes(val);
    i++;
  }
  return { data, body: text.slice(m[0].length).replace(/^\r?\n/, "") };
}

/** Markdown body to plain prose text: scripts, styles, code fences, images
 * and markup are dropped so word counts and phrase checks see real copy. */
function markdownToText(md) {
  let t = md;
  t = t.replace(/<script[\s\S]*?<\/script>/gi, " ");
  t = t.replace(/<style[\s\S]*?<\/style>/gi, " ");
  t = t.replace(/<!--[\s\S]*?-->/g, " ");
  t = t.replace(/```[\s\S]*?```/g, " ");
  t = t.replace(/~~~[\s\S]*?~~~/g, " ");
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  t = t.replace(/<img[^>]*>/gi, " ");
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  t = t.replace(/<a\s[^>]*>([\s\S]*?)<\/a>/gi, "$1");
  t = t.replace(/<\/?[a-zA-Z][^>]*>/g, " ");
  t = t.replace(/^\s{0,3}#{1,6}\s+/gm, " ");
  t = t.replace(/(\*\*|__|\*|_|`)/g, " ");
  t = t.replace(/^\s*>\s?/gm, " ");
  t = t.replace(/^\s*[-*+]\s+/gm, " ");
  t = t.replace(/^\s*\d+\.\s+/gm, " ");
  t = t.replace(/^\s*[-*_]{3,}\s*$/gm, " ");
  return t.replace(/\s+/g, " ").trim();
}

/** Drop blockquote lines (testimonials and other quoted voices) - the house
 * voice rules explicitly do not apply inside quotation marks. */
function stripBlockquotes(md) {
  return md
    .split(/\r?\n/)
    .filter((line) => !/^\s*>/.test(line))
    .join("\n");
}

/** Drop fenced code blocks - they are not prose. */
function stripCodeFences(md) {
  return md.replace(/```[\s\S]*?```/g, " ").replace(/~~~[\s\S]*?~~~/g, " ");
}

const ASSET_PREFIX_RE = /^\/(assets|css|img|fonts|favicon)/;

/** Internal page links from the copy: markdown links plus raw HTML anchors,
 * deduped, fragments/queries stripped, trailing slash normalised. Asset
 * paths are ignored (passthrough files, not pages). */
function extractLinks(md) {
  const links = [];
  const seen = new Set();
  const push = (text, href) => {
    if (!href) return;
    href = href.trim();
    if (!href.startsWith("/") || href.startsWith("//")) return;
    if (ASSET_PREFIX_RE.test(href)) return;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean || clean === "/") return;
    const norm = clean.endsWith("/") ? clean : clean + "/";
    text = (text || "").replace(/\s+/g, " ").trim();
    if (!text) return;
    const key = `${norm}|${text}`;
    if (seen.has(key)) return;
    seen.add(key);
    links.push({ text, href: norm });
  };
  let m;
  const mdRe = /(?<!!)\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g;
  while ((m = mdRe.exec(md)) !== null) push(m[1], m[2]);
  const htmlRe = /<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  while ((m = htmlRe.exec(md)) !== null) push(m[2], m[1]);
  return links.slice(0, MAX_LINKS);
}

/** Build the extraction state for one page. */
function extractPage(file, forcedType) {
  const rel = relPath(file);
  const text = fs.readFileSync(file, "utf8");
  const { data: fm, body } = parseFrontmatter(text);
  const pageType = forcedType || detectPageType(rel);
  const url = outputUrl(rel);

  // rendered <title> / meta description follow the liquid in base.html:
  // {{ meta_title | default: title }} and
  // {{ meta_description | default: description | escape }}
  const metaTitle =
    fm.meta_title !== undefined && fm.meta_title !== ""
      ? fm.meta_title
      : fm.title || "";
  const metaDescription =
    fm.meta_description !== undefined && fm.meta_description !== ""
      ? fm.meta_description
      : fm.description || "";

  const noQuotes = stripCodeFences(stripBlockquotes(body));
  const prose = markdownToText(stripCodeFences(body));
  const proseNoQuotes = markdownToText(noQuotes);

  const h1Count = (body.match(/^# /gm) || []).length;
  const subCount = (body.match(/^#{2,3} /gm) || []).length;
  const words = prose.split(/\s+/).filter(Boolean).length;

  return {
    file: rel,
    url,
    pageType,
    title: fm.title || "",
    snippet: fm.snippet || "",
    heading: fm.heading || "",
    metaTitle,
    metaDescription,
    body,
    prose,
    proseNoQuotes,
    words,
    links: extractLinks(body),
    h1Count,
    subCount,
    tail: proseNoQuotes.slice(-320),
  };
}

// ---------------------------------------------------------------------------
// Check schema
//
// engine: "code" -> fn(extraction) returns [status, goodness, note];
//         status in {PASS, WARN, FAIL, SKIP}; SKIP drops the check from the
//         weighted total
// engine: "jev"  -> question is sent to Jev (one call per page), then graded
//
// For jev noul checks: threshold on the probability; invert=true when the
// question asks for a *bad* thing and low probability is good.
// ---------------------------------------------------------------------------

const US_SPELLING_RE = new RegExp(
  "\\b(color|center|centers|centered|favorite|favorites|organize[ds]?|organization" +
    "|organizational|specialize[ds]?|specializing|recognize[ds]?|analyz(e|es|ed|ing)" +
    "|optimiz(e|es|ed|ing|ation)|traveling|traveled|jewelry|gray|aluminum)\\b",
  "gi",
);

// House voice no-go list (CLAUDE.md), the mechanically detectable part.
// Blockquotes are stripped before this runs, so quoted client voices are
// not flagged. Hits are FAIL - these phrases do not belong in house copy.
const NO_GO_PATTERNS = [
  [/\bowt\b/i, "owt"],
  [/\bnowt\b/i, "nowt"],
  [/our kid/i, "our kid"],
  [/\bay up\b/i, "ay up"],
  [/by 'eck/i, "by 'eck"],
  [/ee bah gum/i, "ee bah gum"],
  [/\breet\b/i, "reet"],
  [/\bsummat\b/i, "summat"],
  [/'appy/i, "'appy"],
  [/\bfella\b/i, "fella"],
  [/salt of the earth/i, "salt of the earth"],
  [/honest as the day/i, "honest as the day"],
  [/passionate about/i, "passionate about"],
  [/\bno-nonsense\b/i, "no-nonsense"],
  [/\bproper (good|great|easy|simple|sorted|nice|sound|brilliant)\b/i, "proper as intensifier"],
  [/\bdead (easy|simple|good|bad|quick|straightforward)\b/i, "dead as intensifier"],
  [/\bleverage[sd]?\b/i, "leverage"],
  [/\bsynerg(y|ies|istic)\b/i, "synergy"],
  [/value-add/i, "value-add"],
  [/best-in-class/i, "best-in-class"],
  [/world-class/i, "world-class"],
  [/\bsupercharg(e|es|ed|ing)\b/i, "supercharge"],
  [/\bunlock(s|ed|ing)?\b/i, "unlock"],
  [/level[- ]up/i, "level up"],
  [/in safe hands/i, "in safe hands"],
  [/got you covered/i, "got you covered"],
  [/second to none/i, "second to none"],
  [/tried and true/i, "tried and true"],
];

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}]/gu;

function checkMetaTitleLength(x) {
  const n = x.metaTitle.length;
  if (n > 70 || n === 0) return ["FAIL", 0, `${n} chars (target <= 60)`];
  if (n > 60 || n < 15) return ["WARN", 0.5, `${n} chars (target <= 60, and not trivially short)`];
  return ["PASS", 1, `${n} chars`];
}

function checkMetaDescriptionPresent(x) {
  if (!x.metaDescription.trim())
    return ["FAIL", 0, "no meta_description (or description) in frontmatter"];
  return ["PASS", 1, "present"];
}

function checkMetaDescriptionLength(x) {
  const n = x.metaDescription.length;
  if (!n) return ["SKIP", 0, "no meta description to measure"];
  if (n > 175) return ["FAIL", 0, `${n} chars (target <= 155)`];
  if (n > 155 || n < 50) return ["WARN", 0.5, `${n} chars (target <= 155, and not trivially short)`];
  return ["PASS", 1, `${n} chars`];
}

function checkH1(x) {
  if (x.pageType === "home") {
    // the home layout injects the h1 from frontmatter `heading`
    return x.heading
      ? ["PASS", 1, "h1 rendered by the home layout from frontmatter `heading`"]
      : ["FAIL", 0, "home layout injects the h1 from frontmatter `heading`, which is missing"];
  }
  if (x.h1Count === 1) return ["PASS", 1, "exactly one h1 in the markdown"];
  if (x.h1Count === 0) return ["FAIL", 0, "no h1 (# heading) in the markdown body"];
  return ["WARN", 0.5, `${x.h1Count} h1s in the markdown body`];
}

function checkThinContent(x) {
  if (LISTING_PAGES.has(x.file))
    return ["SKIP", 0, "section listing page - thin by design"];
  const floors = {
    service: [150, 300],
    guide: [300, 600],
    example: [150, 300],
    landing: [150, 300],
    about: [250, 500],
    home: [100, 200],
    video: [40, 80],
    page: [80, 150],
  };
  const [failAt, warnAt] = floors[x.pageType] || [80, 150];
  if (x.words < failAt) return ["FAIL", 0, `${x.words} words of copy`];
  if (x.words < warnAt) return ["WARN", 0.5, `${x.words} words of copy`];
  return ["PASS", 1, `${x.words} words of copy`];
}

function checkSubheadingStructure(x) {
  if (x.words < 350)
    return ["SKIP", 0, `copy short enough (${x.words} words) to skip subheadings`];
  if (x.subCount >= 2) return ["PASS", 1, `${x.subCount} subheadings over ${x.words} words`];
  if (x.subCount === 1) return ["WARN", 0.5, `only 1 subheading over ${x.words} words`];
  return ["FAIL", 0, `no subheadings over ${x.words} words`];
}

function checkNoEmDash(x) {
  const n = (x.proseNoQuotes.match(/\u2014/g) || []).length;
  if (n) return ["FAIL", 0, `${n} em-dash(es) in copy - house style is hyphens with spaces around them`];
  return ["PASS", 1, "no em-dashes in copy"];
}

function checkUkSpelling(x) {
  const hits = x.proseNoQuotes.match(US_SPELLING_RE);
  if (hits)
    return [
      "WARN",
      0,
      `US spelling(s) in copy: ${[...new Set(hits.map((h) => h.toLowerCase()))].slice(0, 5).join(", ")}`,
    ];
  return ["PASS", 1, "no US spellings detected"];
}

function checkNoGoPhrases(x) {
  const hits = [];
  for (const [re, label] of NO_GO_PATTERNS) {
    if (re.test(x.proseNoQuotes)) hits.push(label);
  }
  if (hits.length)
    return ["FAIL", 0, `house no-go phrase(s): ${hits.slice(0, 5).join(", ")} (see CLAUDE.md voice guide)`];
  return ["PASS", 1, "no house no-go phrases"];
}

function checkEmoji(x) {
  const hits = x.proseNoQuotes.match(EMOJI_RE);
  if (hits)
    return [
      "WARN",
      0.5,
      `emoji in copy (${[...new Set(hits)].join(" ")}) - fine when the emoji is genuinely the subject (e.g. the Bandcamp £6.66 🤘 easter egg), otherwise cut`,
    ];
  return ["PASS", 1, "no emoji in copy"];
}

function checkFirstPerson(x) {
  const we = (x.proseNoQuotes.match(/\bwe\b|\bour\b/gi) || []).length;
  const us = (x.proseNoQuotes.match(/\bus\b/g) || []).length;
  const n = we + us;
  if (!n) return ["PASS", 1, "first person throughout - no 'we' for a one-person business"];
  const sample = (x.proseNoQuotes.match(/[^.]*\b(we|our|us)\b[^.]*/i) || [""])[0]
    .trim()
    .slice(0, 70);
  return [
    "WARN",
    0.5,
    `${n} 'we/our/us' - it's just Stef, so 'I' unless quoting or meaning "you and I" (e.g. "${sample}")`,
  ];
}

function checkInternalLinkCount(x) {
  const n = x.links.length;
  const rich = ["service", "guide", "example", "landing", "about"].includes(x.pageType);
  const sample = x.links.map((l) => l.text).slice(0, 5).join(", ");
  if (rich) {
    if (n >= 3) return ["PASS", 1, `${n} internal link(s) in copy (${sample.slice(0, 90)})`];
    if (n >= 1) return ["WARN", 0.5, `${n} internal link(s) in copy (${sample.slice(0, 90)})`];
    return ["FAIL", 0, "no internal links in copy"];
  }
  if (n >= 1) return ["PASS", 1, `${n} internal link(s) in copy (${sample.slice(0, 90)})`];
  return ["WARN", 0.5, "no internal links in copy"];
}

function checkInternalLinksResolve(x, urlMap) {
  const broken = [];
  for (const l of x.links) {
    if (!urlMap.has(l.href)) broken.push(`${l.text} -> ${l.href}`);
  }
  if (broken.length)
    return ["FAIL", 0, `broken link(s): ${broken.slice(0, 3).join("; ")}`];
  return ["PASS", 1, "all copy links resolve to local pages"];
}

function checkCtaClose(x) {
  const ctaish = [
    "form below",
    "contact form",
    "fill in the form",
    "get in touch",
    "drop me a message",
    "send me a message",
    "message me",
  ].some((w) => x.tail.toLowerCase().includes(w));
  if (ctaish) return ["PASS", 1, "page closes with a contact CTA (house convention: one, at the bottom)"];
  return ["WARN", 0.5, `page does not close with a contact CTA (tail: "...${x.tail.slice(-80)}")`];
}

const CHECKS = [
  { id: "meta_title_length", label: "Meta title length", engine: "code",
    fn: checkMetaTitleLength, types: ALL_TYPES, weight: 3 },
  { id: "meta_description_present", label: "Meta description present", engine: "code",
    fn: checkMetaDescriptionPresent, types: ALL_TYPES, weight: 6 },
  { id: "meta_description_length", label: "Meta description length", engine: "code",
    fn: checkMetaDescriptionLength, types: ALL_TYPES, weight: 2 },
  { id: "h1_present", label: "Exactly one h1", engine: "code",
    fn: checkH1, types: ALL_TYPES, weight: 3 },
  { id: "thin_content", label: "Copy not thin", engine: "code",
    fn: checkThinContent, types: ALL_TYPES, weight: 5 },
  { id: "subheading_structure", label: "Subheading structure", engine: "code",
    fn: checkSubheadingStructure, types: ALL_TYPES, weight: 2 },
  { id: "no_em_dash", label: "No em-dashes in copy", engine: "code",
    fn: checkNoEmDash, types: ALL_TYPES, weight: 3 },
  { id: "uk_spelling", label: "UK spellings", engine: "code",
    fn: checkUkSpelling, types: ALL_TYPES, weight: 2 },
  { id: "no_go_phrases", label: "House no-go phrases absent", engine: "code",
    fn: checkNoGoPhrases, types: ALL_TYPES, weight: 5 },
  { id: "emoji_check", label: "No emoji (unless the subject)", engine: "code",
    fn: checkEmoji, types: ALL_TYPES, weight: 1 },
  { id: "first_person", label: "First person, not 'we'", engine: "code",
    fn: checkFirstPerson, types: ALL_TYPES, weight: 2 },
  { id: "internal_link_count", label: "Internal links in copy", engine: "code",
    fn: checkInternalLinkCount, types: ALL_TYPES, weight: 4 },
  { id: "internal_links_resolve", label: "Internal links resolve", engine: "code",
    fn: checkInternalLinksResolve, types: ALL_TYPES, weight: 5, critical: true },
  { id: "cta_close", label: "Closes with a contact CTA", engine: "code",
    fn: checkCtaClose, types: ALL_TYPES, weight: 2 },

  // --- EEAT: Experience, Expertise, Authoritativeness, Trustworthiness ---
  // Each dimension is a 0-3 score. The four are combined in code into an
  // overall EEAT score (see computeEeat) and also feed the weighted total.
  { id: "eeat_experience", label: "EEAT: Experience", engine: "jev",
    types: ALL_TYPES, weight: 4,
    question: {
      type: "score",
      instructions:
        "How much first-hand experience does `body` show for a freelance web " +
        "developer's page? Look for real named projects and clients, past " +
        "employment with dates and numbers (e.g. Bandcamp 2019-2024, Bouncy " +
        "Castle Network 2009-2019, 1,000+ customers), years in the trade, " +
        "things the author personally built, migrated or fixed, and concrete " +
        "outcomes (e.g. 'one enquiry a week', 'perfect Lighthouse scores'). " +
        "Generic claims like 'years of experience' with nothing behind them " +
        "do not count.",
      criteria: [
        "No experience signals - could describe any freelancer",
        "Vague experience claims ('experienced developer') with no specifics",
        "Concrete first-hand experience - named projects, clients, jobs, dates or numbers",
        "Rich, specific experience throughout - named clients with outcomes, employment history with dates and figures, lived-in detail",
      ],
    },
    score_pass: 2, score_warn: 1 },
  { id: "eeat_expertise", label: "EEAT: Expertise", engine: "jev",
    types: ALL_TYPES, weight: 4,
    question: {
      type: "score",
      instructions:
        "How much genuine technical expertise does `body` show? For this " +
        "site, expertise means precise, current technical detail: named " +
        "tools used correctly in context (Eleventy, Ruby on Rails, Deno, " +
        "esbuild, Bunny.net edge, PagesCMS, JSON-LD structured data, Core " +
        "Web Vitals), practical process detail (git backups, migrations, " +
        "hosting, editing workflows), and advice that shows the author has " +
        "actually done the work. Buzzword lists do not count.",
      criteria: [
        "No technical or practical detail - could be anyone",
        "Shallow or generic technical claims, buzzwords without substance",
        "Solid, correct technical/practical detail - tools named in context, process explained",
        "Deep expertise throughout - precise technical detail, nuanced practical guidance, honest trade-offs between approaches",
      ],
    },
    score_pass: 2, score_warn: 1 },
  { id: "eeat_authoritativeness", label: "EEAT: Authoritativeness", engine: "jev",
    types: ALL_TYPES, weight: 3,
    question: {
      type: "score",
      instructions:
        "How authoritative does the person behind this page come across? " +
        "Signals: named recognisable employers or clients (Bandcamp, Bouncy " +
        "Castle Network, named local businesses), review mentions " +
        "(Trustpilot, Checkatrade, Google), open-source code others can " +
        "inspect (git.chobble.com, GitHub), verifiable identifiers " +
        "(Companies House CIC number), and links to evidence pages in " +
        "`internal_links` (/examples/, /reviews/). Unsupported " +
        "self-descriptions like 'leading' do not count.",
      criteria: [
        "No authority signals at all",
        "Self-asserted standing ('experienced', 'trusted') with nothing backing it up",
        "Named clients/employers, review or open-source references appear",
        "Strong - recognisable named employers, client projects with outcomes, review links, verifiable identifiers, evidence pages linked",
      ],
    },
    score_pass: 2, score_warn: 1 },
  { id: "eeat_trustworthiness", label: "EEAT: Trustworthiness", engine: "jev",
    types: ALL_TYPES, weight: 5,
    question: {
      type: "score",
      instructions:
        "How trustworthy does `body` feel? Concrete trust signals for a " +
        "solo web business: transparent pricing with real numbers (£200/hour " +
        "flat rate, £10/month hosting, 50% charity discount), no lock-in " +
        "and you own the code, honest limits ('what I won't pretend to be', " +
        "recommending competitors, 'I might be wrong'), the CIC asset lock " +
        "and 10% charitable donation, clear contact and response promises, " +
        "and no dark patterns. Generic reassurance ('you're in safe hands') " +
        "does not count.",
      criteria: [
        "No trust signals at all",
        "Generic reassurance with nothing concrete behind it",
        "Concrete signals - real prices, clear terms, honest scope, clear contact",
        "Strong - transparent pricing plus honest limits plus no lock-in plus verifiable commitments, and recommending alternatives when they fit better",
      ],
    },
    score_pass: 2, score_warn: 1 },
  { id: "concrete_facts", label: "Concrete facts vs marketing filler", engine: "jev",
    types: ALL_TYPES, weight: 5,
    question: {
      type: "score",
      instructions:
        "How concrete is `body`: specific facts, numbers, prices, named " +
        "tools, real places (Prestwich, Cuckoo), named projects and clients " +
        "- versus marketing filler that could describe any web developer " +
        "at any agency?",
      criteria: [
        "Generic filler throughout, no specific facts",
        "Mostly generic with one or two specifics",
        "A healthy mix of concrete facts and selling copy",
        "Concrete facts, numbers, prices and named examples throughout",
      ],
    },
    score_pass: 2, score_warn: 1 },
  { id: "social_proof", label: "Social proof mention", engine: "jev",
    types: ALL_TYPES, weight: 2, threshold: 0.5,
    question: {
      type: "noul",
      instructions:
        "Does `body` or `internal_links` show social proof: reviews, " +
        "ratings, testimonials, named clients, or links to /reviews/ or " +
        "/examples/ pages?",
      criteria: {
        true: "A review, rating, testimonial, named client or examples link appears",
        false: "No social proof anywhere",
      },
    } },
  { id: "honest_limits", label: "Honest limits / recommends alternatives", engine: "jev",
    types: ALL_TYPES, weight: 3, threshold: 0.5,
    question: {
      type: "noul",
      instructions:
        "Does `body` admit limits or point the reader elsewhere when " +
        "appropriate: 'what I won't pretend to be' style caveats, 'I might " +
        "be wrong', recommending competitors or specialists, saying when " +
        "something is not a good fit, or noting what the service does not " +
        "include?",
      criteria: {
        true: "Honest limits or redirection to someone better suited appears",
        false: "Copy claims competence without caveats",
      },
    } },
  // Cliché score: 0-3 where 0 = riddled, 3 = clean (same direction as the
  // EEAT dimensions: high is good). Judge rubric mirrors the house
  // anti-patterns list - the structural clichés regex cannot catch
  // (rhythm, closers, strawmen, objection handling). FAIL = riddled,
  // WARN = multiple clichés, PASS = clean or a couple of mild hits.
  { id: "cliche_score", label: "Cliché score", engine: "jev",
    types: ALL_TYPES, weight: 4,
    question: {
      type: "score",
      instructions:
        "Judge `body_house` for copywriting clichés - the trying-too-hard " +
        "failure modes, not individual phrases. IMPORTANT: score ONLY the " +
        "text in `body_house`. The `body` field exists for other questions " +
        "and contains quoted third-party client reviews and quoted AI " +
        "output - do not judge it here. body_house has blockquotes already " +
        "stripped; only house copy is judged. Look for: fragment " +
        "sentences in prose ('No lock-in.'); punchy parallel rhythm and " +
        "cinematic one-line closers ('And the rest is history.'); " +
        "X / X / X - Y build-ups and lists of three with a deflating " +
        "comic third; strawmen set up to knock down ('Most developers " +
        "overcharge'); handling objections nobody raised ('and yes, even " +
        "in Prestwich'); forced enthusiasm in headings ('Ready to " +
        "supercharge...'); faux humility undercut by a sales close; sassy " +
        "or self-congratulatory lines ('That is not shabby', 'no " +
        "remembering to hit a button'); overselling modifiers ('blazing " +
        "fast', 'practically psychic'); CTAs bolted into mid-page " +
        "paragraphs. Score follows the legend: 0 means riddled, 3 means " +
        "clean - high is good.",
      criteria: [
        "Riddled - the page is built from advert structures; several distinct failure modes appear",
        "Multiple clichés - three or more distinct hits, or one structural cliché repeated",
        "A cliché or two - one or two mild hits that a light rewrite would trim",
        "Clean - no cliché patterns; plain comfortable prose",
      ],
    },
    score_pass: 2, score_warn: 1 },
  // Searcher intent: does the page answer what a searcher landing here
  // would want, early enough and including mismatch handling? The judge
  // works out the likely searcher from url and page_type in the state.
  { id: "searcher_intent", label: "Searcher intent", engine: "jev",
    types: ALL_TYPES, weight: 4,
    question: {
      type: "score",
      instructions:
        "Judge whether `body` addresses searcher intent for this page. " +
        "First work out who searches for or lands on a page like this - " +
        "the `url` and `page_type` in the state say which: a service " +
        "page gets buyers evaluating whether to hire the business; an " +
        "example or case-study page gets prospects weighing up a " +
        "similar build AND possible accidental traffic wanting to book " +
        "the client's services; a guide gets people wanting to learn " +
        "something or solve a problem; a hub or listing page gets " +
        "browsers deciding what to read next. Then judge: does `body` " +
        "say early who the page is for and what it offers, answer the " +
        "main questions that searcher would have (cost, process, " +
        "evidence, next step), and handle intent mismatch plainly where " +
        "it matters - pointing accidental traffic to the right place " +
        "rather than leaving them to work it out?",
      criteria: [
        "No intent addressed - the page never says who it is for or what a searcher would want from it",
        "Intent implied but late or incomplete - a searcher has to work out what the page offers, or leaves with the main questions unanswered",
        "Intent addressed - who the page is for and the searcher's main questions are answered clearly",
        "Intent addressed early and completely - searcher questions answered up front, next steps obvious, mismatches handled plainly",
      ],
    },
    score_pass: 2, score_warn: 1 },
];

// ---------------------------------------------------------------------------
// Jev client
// ---------------------------------------------------------------------------

function loadApiKey() {
  const key = process.env.OPENCODE_API_KEY;
  if (key) return key.trim();
  try {
    return fs.readFileSync(DEFAULT_KEY_FILE, "utf8").trim();
  } catch {
    return null;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callJev(state, questions, model, apiKey, sessionId) {
  const payload = { model, state, questions };
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(ZEN_SYSTEMONE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "User-Agent": "grade-pages/0.1 (chobble-site)",
          "x-opencode-session": sessionId,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { resp: await res.json(), err: null, req: payload };
      const bodyText = (await res.text()).slice(0, 400);
      lastErr = `HTTP ${res.status}: ${bodyText}`;
      if (res.status === 429) {
        await sleep(5000 * (attempt + 1));
        continue;
      }
      if ([400, 401, 402].includes(res.status)) break; // won't fix on retry
    } catch (e) {
      lastErr = `${e.name}: ${e.message}`;
    }
    await sleep(1000 + attempt);
  }
  return { resp: null, err: lastErr, req: payload };
}

// ---------------------------------------------------------------------------
// Grading
// ---------------------------------------------------------------------------

function buildJevState(x) {
  return {
    page: {
      url: x.url,
      page_type: x.pageType,
      title: x.title,
      meta_title: x.metaTitle,
      meta_description: x.metaDescription,
      snippet: x.snippet,
    },
    body: x.prose.slice(0, MAX_BODY_CHARS),
    body_truncated: x.prose.length > MAX_BODY_CHARS,
    // blockquotes stripped - quoted client voices are not house copy and
    // must not be judged against the voice rules (see CLAUDE.md)
    body_house: x.proseNoQuotes.slice(0, MAX_BODY_CHARS),
    internal_links: x.links,
    business: {
      name: "Chobble CIC",
      who: "one freelance web developer (Stef) based in Prestwich, Manchester",
      context:
        "solo business; 20+ years in web development including senior roles at " +
        "Bandcamp (payments/growth) and Bouncy Castle Network (lead developer)",
    },
  };
}

function activeChecks(x) {
  return CHECKS.filter(
    (c) => c.types.includes(x.pageType) && !(c.requires && !c.requires(x)),
  );
}

function runMechanical(x, checks, urlMap) {
  const results = {};
  for (const c of checks) {
    if (c.engine !== "code") continue;
    const [status, goodness, note] = c.fn(x, urlMap);
    results[c.id] = {
      label: c.label,
      engine: "code",
      weight: c.weight,
      status,
      goodness,
      note,
      critical: !!c.critical,
    };
  }
  return results;
}

function buildJevQuestions(checks) {
  const questions = {};
  const meta = {};
  for (const c of checks) {
    if (c.engine !== "jev") continue;
    questions[c.id] = JSON.parse(JSON.stringify(c.question));
    meta[c.id] = c;
  }
  return { questions, meta };
}

function gradeJevAnswers(answers, meta) {
  const results = {};
  for (const [cid, c] of Object.entries(meta)) {
    const ans = answers[cid];
    if (!ans) continue;
    const entry = {
      label: c.label,
      engine: "jev",
      weight: c.weight,
      critical: !!c.critical,
      raw: ans,
    };
    if (ans.type === "noul") {
      const p = ans.noul;
      const good = c.invert ? 1 - p : p;
      entry.value = p;
      entry.goodness = good;
      const thr = c.threshold || 0.5;
      entry.status =
        good >= thr ? "PASS" : good >= thr - 0.3 ? "WARN" : "FAIL";
      entry.note = `noul=${p.toFixed(2)}`;
    } else if (ans.type === "score") {
      const s = ans.score;
      const levels =
        (ans.legend && Object.keys(ans.legend).length) ||
        (c.question && c.question.criteria ? c.question.criteria.length : 0);
      let good;
      if (c.score_direction === "at_most") {
        good = s <= c.score_pass ? 1 : s <= c.score_warn ? 0.5 : 0;
      } else {
        good = s >= c.score_pass ? 1 : s >= c.score_warn ? 0.5 : 0;
      }
      entry.value = s;
      entry.goodness = good;
      entry.status = good === 1 ? "PASS" : good === 0.5 ? "WARN" : "FAIL";
      entry.note = `score=${s.toFixed(2)}/${levels ? levels - 1 : "?"} (conf ${(ans.confidence || 0).toFixed(2)})`;
    } else if (ans.type === "choice") {
      entry.value = ans.choice;
      entry.note = `choice=${ans.choice} (conf ${(ans.confidence || 0).toFixed(2)})`;
      entry.goodness = (c.pass_choices || []).includes(ans.choice) ? 1 : 0;
      entry.status = entry.goodness ? "PASS" : "FAIL";
    }
    // a hard FAIL the model itself is not confident about is a review flag,
    // not a verdict (TypeSafe confidence architecture: act only when confident)
    const conf = ans.confidence;
    if (conf !== undefined && conf !== null && conf < 0.3 && entry.status === "FAIL") {
      entry.status = "WARN";
      entry.goodness = 0.5;
      entry.note += " [low confidence - human review]";
    }
    results[cid] = entry;
  }
  return results;
}

function summarise(results) {
  const counted = Object.fromEntries(
    Object.entries(results).filter(([, v]) => v.status !== "SKIP"),
  );
  const totalW = Object.values(counted).reduce((a, r) => a + r.weight, 0);
  const gotW = Object.values(counted).reduce((a, r) => a + r.weight * r.goodness, 0);
  const score = totalW ? Math.round((100 * gotW) / totalW) : 0;
  const letter =
    score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 45 ? "D" : "F";
  const counts = { PASS: 0, WARN: 0, FAIL: 0 };
  for (const r of Object.values(counted)) counts[r.status]++;
  return { score, letter, counts };
}

const EEAT_IDS = [
  "eeat_experience",
  "eeat_expertise",
  "eeat_authoritativeness",
  "eeat_trustworthiness",
];

/** Aggregate the four EEAT dimension scores (0-3 each) into a headline.
 * Returns null when no EEAT dimensions were graded (e.g. mechanical-only). */
function computeEeat(results) {
  const dims = {};
  for (const cid of EEAT_IDS) {
    const r = results[cid];
    if (r && typeof r.value === "number") dims[cid] = r.value;
  }
  if (!Object.keys(dims).length) return null;
  const mean = Object.values(dims).reduce((a, v) => a + v, 0) / Object.keys(dims).length;
  const score = Math.round((mean / 3) * 100);
  const letter =
    mean >= 2.5 ? "A" : mean >= 2.0 ? "B" : mean >= 1.5 ? "C" : mean >= 1.0 ? "D" : "F";
  return {
    mean: Math.round(mean * 100) / 100,
    score,
    letter,
    dimensions: dims,
  };
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function printReport(x, result) {
  console.log(`Chobble page grader - ${x.url} (${x.file})`);
  console.log(`page type: ${x.pageType} | words: ${x.words} | checks: ${Object.keys(result.checks).length}`);
  console.log();
  for (const r of Object.values(result.checks)) {
    const mark = { PASS: "+", WARN: "~", FAIL: "X", SKIP: "-" }[r.status];
    const crit = r.critical && r.status === "FAIL" ? " [CRITICAL]" : "";
    console.log(
      `  [${mark}] ${r.status.padEnd(4)} ${r.label.padEnd(46)} (${r.engine.padEnd(4)} w${r.weight}) ${r.note}${crit}`,
    );
  }
  console.log();
  const c = result.counts;
  console.log(`Score: ${result.score}/100 (${result.letter}) - ${c.PASS} pass, ${c.WARN} warn, ${c.FAIL} fail`);
  if (result.eeat) {
    const e = result.eeat;
    const dims = EEAT_IDS.filter((cid) => cid in e.dimensions)
      .map((cid) => `${cid.replace("eeat_", "")} ${e.dimensions[cid].toFixed(1)}`)
      .join(" | ");
    console.log(`EEAT: ${e.score}/100 (${e.letter}) - ${dims}`);
  }
  if (result.jev) {
    console.log(
      `Jev: model=${result.jev.model}, ${result.jev.input_tokens} in / ${result.jev.output_tokens} out tokens, ${result.jev.seconds.toFixed(2)}s`,
    );
  }
  for (const r of Object.values(result.checks)) {
    if (r.critical && r.status === "FAIL") console.log(`CRITICAL: ${r.label}: ${r.note}`);
  }
}

// ---------------------------------------------------------------------------
// Single-page pipeline (used by both single and batch modes)
// ---------------------------------------------------------------------------

async function gradePage(file, opts, urlMap) {
  const tStart = Date.now();
  try {
    const x = extractPage(file, opts.type);
    const checks = activeChecks(x);
    const results = runMechanical(x, checks, urlMap);

    let jevInfo = null;
    let jevError = null;
    const jevChecks = checks.filter((c) => c.engine === "jev");
    if (jevChecks.length && !opts.noJev) {
      if (!opts.apiKey) {
        jevError = "no API key";
      } else {
        const { questions, meta } = buildJevQuestions(jevChecks);
        const state = buildJevState(x);
        const tJev = Date.now();
        const { resp, err, req } = await callJev(
          state,
          questions,
          opts.model,
          opts.apiKey,
          `grade-pages-${x.url.replace(/[^a-z0-9]/gi, "").slice(-40)}`,
        );
        if (opts.verbose) {
          console.error("--- jev request ---");
          console.error(JSON.stringify(req, null, 2));
          console.error("--- jev response ---");
          console.error(JSON.stringify(resp, null, 2));
        }
        if (err) {
          jevError = err;
        } else {
          jevInfo = {
            model: resp.model || opts.model,
            input_tokens: resp.usage?.input_tokens,
            output_tokens: resp.usage?.output_tokens,
            seconds: (Date.now() - tJev) / 1000,
          };
          Object.assign(results, gradeJevAnswers(resp.answers || {}, meta));
        }
      }
    }

    const { score, letter, counts } = summarise(results);
    return {
      file: x.file,
      url: x.url,
      page_type: x.pageType,
      score,
      letter,
      counts,
      checks: results,
      eeat: computeEeat(results),
      jev: jevInfo,
      jev_error: jevError,
      seconds: Math.round(((Date.now() - tStart) / 1000) * 100) / 100,
    };
  } catch (e) {
    return {
      file: relPath(file),
      url: relPath(file),
      page_type: "?",
      score: null,
      letter: "E",
      counts: { PASS: 0, WARN: 0, FAIL: 0 },
      checks: {},
      eeat: null,
      jev: null,
      jev_error: null,
      error: `${e.name}: ${e.message}`,
      seconds: Math.round(((Date.now() - tStart) / 1000) * 100) / 100,
    };
  }
}

// ---------------------------------------------------------------------------
// Batch mode
// ---------------------------------------------------------------------------

async function runBatch(targets, opts, urlMap) {
  const t0 = Date.now();
  const rows = new Array(targets.length);
  let done = 0;
  let next = 0;
  const workers = Math.min(opts.workers, targets.length);
  const runner = async () => {
    while (next < targets.length) {
      const i = next++;
      const row = await gradePage(targets[i], opts, urlMap);
      rows[i] = row;
      done++;
      if (row.score === null) {
        console.error(
          `[${done}/${targets.length}] SKIP ${row.url} - ${(row.error || "").slice(0, 80)}`,
        );
      } else {
        const fails = Object.entries(row.checks)
          .filter(([, r]) => r.status === "FAIL")
          .map(([cid]) => cid)
          .join(",");
        console.error(
          `[${done}/${targets.length}] ${String(row.score).padStart(3)} ${row.letter} ${row.page_type.padEnd(8)} ${(fails || "-").slice(0, 60)} ${row.url}`,
        );
      }
    }
  };
  await Promise.all(Array.from({ length: workers }, runner));

  rows.sort((a, b) => (a.score === null) - (b.score === null) || (a.score ?? 0) - (b.score ?? 0));

  const graded = rows.filter((r) => r.score !== null);
  const errored = rows.filter((r) => r.score === null);

  if (opts.json) {
    console.log(JSON.stringify(rows, null, 2));
  } else {
    console.log(
      `\nChobble page grader - batch of ${targets.length} (workers=${opts.workers}, model=${opts.model})`,
    );
    console.log(
      `${"Score".padStart(5)} ${"L".padEnd(2)} ${"EAT".padStart(5)} ${"Type".padEnd(9)} ${"p/w/x".padEnd(9)} Failed checks`,
    );
    console.log("-".repeat(110));
    for (const r of rows) {
      if (r.score === null) {
        console.log(
          `${"---".padStart(5)} ${"-".padEnd(2)} ${"".padStart(5)} ${r.page_type.padEnd(9)} ${"".padEnd(9)} ${r.url} - ${(r.error || "").slice(0, 60)}`,
        );
        continue;
      }
      const c = r.counts;
      const fails = Object.entries(r.checks)
        .filter(([, chk]) => chk.status === "FAIL")
        .map(([cid]) => cid)
        .join(",");
      const e = r.eeat ? `${r.eeat.score}${r.eeat.letter}` : "-";
      console.log(
        `${String(r.score).padStart(5)} ${r.letter.padEnd(2)} ${String(e).padStart(5)} ${r.page_type.padEnd(9)} ${`${c.PASS}/${c.WARN}/${c.FAIL}`.padEnd(9)} ${fails || "-"} ${r.url}`,
      );
    }

    if (graded.length) {
      const scores = graded.map((r) => r.score).sort((a, b) => a - b);
      const median = scores[Math.floor(scores.length / 2)];
      const letters = {};
      for (const r of graded) letters[r.letter] = (letters[r.letter] || 0) + 1;
      const wall = (Date.now() - t0) / 1000;
      console.log("-".repeat(110));
      console.log(
        `${graded.length} graded, ${errored.length} errored | median ${median} | ${Object.keys(letters).sort().map((l) => `${l}:${letters[l]}`).join(" ")} | ${wall.toFixed(0)}s total, ${(wall / Math.max(targets.length, 1)).toFixed(1)}s/page`,
      );
      const failCounter = {};
      const warnCounter = {};
      for (const r of graded) {
        for (const chk of Object.values(r.checks)) {
          if (chk.status === "FAIL") failCounter[chk.label] = (failCounter[chk.label] || 0) + 1;
          else if (chk.status === "WARN") warnCounter[chk.label] = (warnCounter[chk.label] || 0) + 1;
        }
      }
      const top = (counter, n) =>
        Object.entries(counter)
          .sort((a, b) => b[1] - a[1])
          .slice(0, n);
      if (Object.keys(failCounter).length) {
        console.log("\nMost-failed checks across the batch:");
        for (const [label, n] of top(failCounter, 10)) console.log(`  FAIL x${String(n).padEnd(4)} ${label}`);
      }
      if (Object.keys(warnCounter).length) {
        console.log("\nMost-warned checks across the batch:");
        for (const [label, n] of top(warnCounter, 5)) console.log(`  WARN x${String(n).padEnd(4)} ${label}`);
      }
      const eeatRows = graded.filter((r) => r.eeat);
      if (eeatRows.length) {
        const eeatScores = eeatRows.map((r) => r.eeat.score).sort((a, b) => a - b);
        console.log(
          `\nEEAT: ${eeatRows.length} pages graded | median ${eeatScores[Math.floor(eeatScores.length / 2)]}/100 | worst: ${eeatRows
            .slice()
            .sort((a, b) => a.eeat.score - b.eeat.score)
            .slice(0, 5)
            .map((r) => `${r.url} ${r.eeat.score}${r.eeat.letter}`)
            .join(", ")}`,
        );
      }
    }
  }

  if (opts.csv) {
    const esc = (v) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [
      ["score", "letter", "eeat", "eeat_letter", "page_type", "url", "pass", "warn", "fail", "failed_checks", "jev_error", "error"].join(","),
    ];
    for (const r of rows) {
      lines.push(
        [
          r.score ?? "",
          r.letter,
          r.eeat?.score ?? "",
          r.eeat?.letter ?? "",
          r.page_type,
          r.url,
          r.counts.PASS,
          r.counts.WARN,
          r.counts.FAIL,
          Object.entries(r.checks)
            .filter(([, chk]) => chk.status === "FAIL")
            .map(([cid]) => cid)
            .join(";"),
          r.jev_error || "",
          r.error || "",
        ]
          .map(esc)
          .join(","),
      );
    }
    fs.writeFileSync(opts.csv, lines.join("\n") + "\n");
    console.error(`\nCSV written to ${opts.csv}`);
  }
  return 0;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function usage() {
  console.log(`Usage: grade-pages.js [targets] [options]

Targets (default: all gradeable content pages):
  src/services/static-websites.md   a source file
  /services/static-websites/        URL shorthand
  https://www.chobble.com/guides/   full URL
  src/services                      a directory

Options:
  --prefix <s>    only pages whose URL contains this substring
  --limit <n>    grade at most n pages
  --workers <n>  parallel batch workers (default 4)
  --csv <path>   write batch results to a CSV file
  --json         machine-readable output
  --no-jev       mechanical checks only
  --model <id>   Jev model id (default ${DEFAULT_MODEL})
  --type <t>     force page type (${ALL_TYPES.join(", ")})
  --list-checks  print the check schema and exit
  --verbose      dump the jev request/response
  --help         this message`);
}

function parseArgs(argv) {
  const opts = {
    targets: [],
    prefix: null,
    limit: 0,
    workers: 4,
    csv: null,
    json: false,
    noJev: false,
    model: DEFAULT_MODEL,
    type: null,
    listChecks: false,
    verbose: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const nextVal = () => {
      if (i + 1 >= argv.length) throw new Error(`${a} needs a value`);
      return argv[++i];
    };
    if (a === "--prefix") opts.prefix = nextVal();
    else if (a === "--limit") opts.limit = parseInt(nextVal(), 10) || 0;
    else if (a === "--workers") opts.workers = Math.max(1, parseInt(nextVal(), 10) || 4);
    else if (a === "--csv") opts.csv = nextVal();
    else if (a === "--json") opts.json = true;
    else if (a === "--no-jev") opts.noJev = true;
    else if (a === "--model") opts.model = nextVal();
    else if (a === "--type") opts.type = nextVal();
    else if (a === "--list-checks") opts.listChecks = true;
    else if (a === "--verbose") opts.verbose = true;
    else if (a === "--help" || a === "-h") opts.help = true;
    else if (a.startsWith("--")) throw new Error(`unknown option ${a}`);
    else opts.targets.push(a);
  }
  if (opts.type && !ALL_TYPES.includes(opts.type)) {
    throw new Error(`unknown page type '${opts.type}' (${ALL_TYPES.join(", ")})`);
  }
  return opts;
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error(e.message);
    usage();
    return 2;
  }
  if (opts.help) {
    usage();
    return 0;
  }

  if (opts.listChecks) {
    for (const c of CHECKS) {
      console.log(
        `${c.id.padEnd(26)} ${c.engine.padEnd(5)} w${String(c.weight).padEnd(3)} [${c.types.join(",")}]  ${c.label}${c.critical ? " [CRITICAL]" : ""}`,
      );
    }
    return 0;
  }

  // Build the URL map from every content file (graded or not) so internal
  // link resolution sees the whole site, including redirect_from aliases.
  const urlMap = new Map();
  for (const file of walkContentFiles(SRC)) {
    const rel = relPath(file);
    if (SKIP_URLMAP.has(rel)) continue;
    urlMap.set(outputUrl(rel), rel);
    const { data: fm } = parseFrontmatter(fs.readFileSync(file, "utf8"));
    for (const alias of fm.redirect_from || []) {
      const norm = alias.endsWith("/") ? alias : alias + "/";
      if (!urlMap.has(norm)) urlMap.set(norm, rel);
    }
  }

  // Resolve targets: files, directories, URLs, or everything gradeable.
  const gradeable = walkContentFiles(SRC)
    .map(relPath)
    .filter((rel) => !SKIP_GRADE.has(rel) && !SKIP_URLMAP.has(rel));
  const targets = [];
  for (const t of opts.targets) {
    const clean = t.replace(/\/+$/, "") || "/";
    const asFile = path.resolve(ROOT, t.startsWith("/") ? `.${t}` : t);
    if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) {
      const rel = relPath(asFile);
      if (!urlMap.has(outputUrl(rel)))
        throw new Error(`${t} is not a content page under src/`);
      targets.push(asFile);
      continue;
    }
    if (fs.existsSync(asFile) && fs.statSync(asFile).isDirectory()) {
      const dir = asFile + path.sep;
      const inside = gradeable
        .filter((rel) => path.resolve(ROOT, rel).startsWith(dir))
        .map((rel) => path.join(ROOT, rel));
      if (!inside.length) throw new Error(`no gradeable pages under ${t}`);
      targets.push(...inside);
      continue;
    }
    // URL shorthand: /services/foo/ or https://www.chobble.com/services/foo/
    let urlPath = t.startsWith(SITE_URL) ? t.slice(SITE_URL.length) : t;
    if (!urlPath.startsWith("/")) throw new Error(`cannot resolve target '${t}'`);
    const norm = clean === "/" ? "/" : clean + "/";
    const rel = urlMap.get(norm) || urlMap.get(clean);
    if (!rel) throw new Error(`no local page found for '${t}'`);
    targets.push(path.join(ROOT, rel));
  }
  if (!targets.length) targets.push(...gradeable.map((rel) => path.join(ROOT, rel)));

  let pool = targets;
  if (opts.prefix) pool = pool.filter((f) => outputUrl(relPath(f)).includes(opts.prefix));
  if (opts.limit > 0) pool = pool.slice(0, opts.limit);
  if (!pool.length) {
    console.error("no pages match the given targets/filters");
    return 2;
  }

  opts.apiKey = opts.noJev ? null : loadApiKey();

  if (pool.length === 1 && !opts.json) {
    const result = await gradePage(pool[0], opts, urlMap);
    if (result.score === null) {
      console.error(`ERROR grading ${result.url}: ${result.error}`);
      return 2;
    }
    const x = extractPage(pool[0], opts.type);
    printReport(x, result);
    if (result.jev_error)
      console.error(`note: Jev unavailable (${result.jev_error}); report is mechanical-only`);
    return Object.values(result.checks).some((r) => r.critical && r.status === "FAIL") ? 1 : 0;
  }

  return runBatch(pool, opts, urlMap);
}


main()
  .then((code) => process.exit(code || 0))
  .catch((e) => {
    console.error(e.message);
    process.exit(2);
  });
