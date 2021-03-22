const fs = require('fs')
const grayMatter = require('gray-matter')
const markdownIt = require('markdown-it')({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) {
    return ''
  }
})

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'markdown-plugin',
    resolve: {
      input: ['.md'],
      output: ['.html']
    },
    async load ({ filePath }) {
      const source = fs.readFileSync(filePath, 'utf-8')

      const { data: frontmatter, content: markdown } = grayMatter(source)
      const html = markdownIt.render(markdown)

      return `
      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Frontend Helpers" />
        <title>${frontmatter.title}: Frontend Helpers</title>
        <script type="module" src="/docs/index.js"></script>
      </head>

      <body>
        <section class="section">
          <div class="container">
            <a href="/">Back to home</a>

            <hr />
      
            <h1 class="title is-1">
              ${frontmatter.title}
            </h1>
            <p class="subtitle">
              ${frontmatter.description}
            </p>

            <div class="content">
              ${html}
            </div>
          </div>
        </section>
      </body>

      </html>
      `
    }
  }
}
