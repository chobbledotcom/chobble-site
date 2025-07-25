const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { configureScss } = require("./src/_lib/scss");
const { configureScssFiles } = require("./src/_lib/scss-files");

module.exports = async function (eleventyConfig) {
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
