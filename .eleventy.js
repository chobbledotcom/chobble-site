const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { configureScss } = require("./src/_lib/scss");
const { configureScssFiles } = require("./src/_lib/scss-files");
const { encryptEmailsInHtml } = require("./src/_lib/encrypt-emails");
const { datesFor, formatHuman } = require("./src/_lib/git-dates");

module.exports = async function (eleventyConfig) {
  const { EleventyRenderPlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  const { eleventyImageTransformPlugin } = await import("@11ty/eleventy-img");
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg", "png", "svg"],
    widths: [200, 310, 620, 900, 1200, "auto"],
    svgShortCircuit: "size",
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {},
    },
  });

  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Get the newest date in a collection
  eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection || !collection.length) return new Date();
    return new Date(
      Math.max(...collection.map((item) => item.date?.getTime() || 0)),
    );
  });

  eleventyConfig.addWatchTarget("./src/**/*");

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@botpoison/browser/dist/index.js":
      "/assets/js/botpoison.js",
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/favicon.png": "/favicon.ico",
    "src/assets/favicon.png": "/favicon.png",
  });

  // Add date filters
  eleventyConfig.addFilter("date", function (date, format) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  });

  // Add RFC 822 date filter for RSS feed
  eleventyConfig.addFilter("dateToRfc822", function (date) {
    return new Date(date).toUTCString();
  });

  // Git-derived publication/modification dates, keyed by inputPath.
  eleventyConfig.addFilter("gitDates", function (inputPath) {
    return datesFor(inputPath);
  });

  eleventyConfig.addFilter("humanDate", function (iso) {
    return formatHuman(iso);
  });

  eleventyConfig.addFilter("isoDate", function (iso) {
    if (!iso) return "";
    return new Date(iso).toISOString().slice(0, 10);
  });

  // Sorted example cards, captured at collection time so the exampleCards
  // shortcode below can use it without depending on the liquid call context.
  let exampleCards = [];
  eleventyConfig.addCollection("exampleCards", (api) => {
    exampleCards = api
      .getFilteredByGlob("./src/examples/*.md")
      .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
  });

  // Emit a chunk of example cards between prose sections:
  //   {% exampleCards 0, 6 %} in a markdown page renders cards 0-5.
  // Used by src/examples.md to interleave copy with the portfolio cards.
  const escapeHtml = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  eleventyConfig.addShortcode("exampleCards", function (start, count) {
    const sorted = exampleCards;
    const chunk = sorted.slice(Number(start), Number(start) + Number(count));
    if (chunk.length === 0) return "";
    const cards = chunk
      .map((ex, i) => {
        const eager = Number(start) + i < 4 ? ' loading="eager"' : "";
        const colour = ex.data.colour
          ? ` style="background: ${ex.data.colour}"`
          : "";
        return `<li>
  <a href="${ex.url}#content" class="example-thumb"${colour}>
    <img${eager} eleventy:widths="310,465,629" sizes="(min-width: 1100px) 310px, (min-width: 780px) calc(50vw - 45px), 100vw" class="thumbnail" src="/assets/examples/${ex.fileSlug}.png" alt="" />
  </a>
  <h2><a href="${ex.url}#content">${escapeHtml(ex.data.title)}</a></h2>
  ${ex.data.snippet ?? ""}
</li>`;
      })
      .join("");
    return `<ul class="cards">
${cards}
</ul>`;
  });

  // Encrypt mailto: links at build time
  eleventyConfig.addTransform("encryptEmails", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return encryptEmailsInHtml(content);
    }
    return content;
  });

  // Configure SCSS
  configureScss(eleventyConfig);
  configureScssFiles(eleventyConfig);

  // Base configuration
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["liquid", "njk", "md", "html"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
  };
};
