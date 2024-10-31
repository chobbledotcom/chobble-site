const sass = require("sass");
const path = require("path");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  // Compile Sass before the build
  eleventyConfig.on("beforeBuild", () => {
    const result = sass.compile("src/scss/style.scss", {
      style: "compressed"
    });
    fs.mkdirSync("_site/css", { recursive: true });
    fs.writeFileSync("_site/css/style.css", result.css);
  });
  
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
