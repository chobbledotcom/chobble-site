const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Add RSS plugin and filters
  eleventyConfig.addPlugin(pluginRss);
  
  // Add RSS-specific filters
  eleventyConfig.addFilter("dateToRfc3339", (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString();
  });

  eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection || !collection.length) return new Date();
    return new Date(Math.max(...collection.map(item => item.date?.getTime() || 0)));
  });
  
  eleventyConfig.addFilter("htmlToAbsoluteUrls", (html, baseUrl) => {
    return html.replace(/(href|src)="\/(?!\/)/g, `$1="${baseUrl}/`);
  });

  // Watch SCSS files for changes
  eleventyConfig.addWatchTarget("./src/scss/");

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Add date filters
  eleventyConfig.addFilter("date", function(date, format) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
  });

  // Base configuration
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["liquid", "md"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};
