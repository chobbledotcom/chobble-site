const path = require("path");

module.exports = function(eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addWatchTarget("./_site/css/");
  
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
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
