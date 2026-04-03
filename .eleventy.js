module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/meander');
  eleventyConfig.addPassthroughCopy('src/meander_custom');
  eleventyConfig.addPassthroughCopy('src/quiz.js');

  // Configure Markdown to open external links in a new tab
  eleventyConfig.amendLibrary("md", mdLib => {
    const defaultRender = mdLib.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    mdLib.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      const aIndex = tokens[idx].attrIndex('target');
      const hrefIndex = tokens[idx].attrIndex('href');

      if (hrefIndex >= 0) {
        const href = tokens[idx].attrs[hrefIndex][1];
        // Check if the link is external (starts with http:// or https://)
        if (/^https?:\/\//.test(href)) {
          if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']);
          } else {
            tokens[idx].attrs[aIndex][1] = '_blank';
          }

          // Add rel="noopener noreferrer" for security
          const relIndex = tokens[idx].attrIndex('rel');
          if (relIndex < 0) {
            tokens[idx].attrPush(['rel', 'noopener noreferrer']);
          } else {
            tokens[idx].attrs[relIndex][1] = 'noopener noreferrer';
          }
        }
      }

      return defaultRender(tokens, idx, options, env, self);
    };
  });

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
