const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
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
