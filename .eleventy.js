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
