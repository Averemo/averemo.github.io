module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/meander');
  eleventyConfig.addPassthroughCopy('src/meander_custom');
  eleventyConfig.addPassthroughCopy('src/quiz.js');

  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['md', 'njk', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
