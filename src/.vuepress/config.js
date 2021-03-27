const MarkdownIt = require('markdown-it')
const Katex = require('katex')

module.exports = {
  title: 'Aya Prover Docs',
  description: '',
  head: [
    ['link', {
      rel: 'stylesheet',
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.css",
      integrity: "sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG",
      crossorigin: "anonymous",
    }],
    ['link', {
      rel: 'icon',
      href: `/static/img/logo.svg`,
    }],
  ],
  base: '/',
  themeConfig: {
    repo: 'aya-prover/aya-dev',
    logo: '/static/img/logo.svg',
    docsRepo: 'aya-prover/aya-prover-docs',
    docsDir: 'src',
    docsBranch: 'main',
    editLinks: true,
    lastUpdated: 'Last updated',
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],
    sidebarDepth: 2,
    sidebar: {
      // Add an entry if there is a new subdirectory created
      '/guide/': [{
        title: 'Guide',
        children: [
          // If a new file created under this subdirectory, add the filename without `.md` here
          // The order here will be that displayed on the sidebar
          '',
        ],
      }],
    }
  },
  markdown: {
    extendMarkdown(md) {
      md.render = (src, env) =>
        MarkdownIt.prototype.render.call(
          md,
          src
            .replace(/(?<=[^\\])\$\$([^]+?)\$\$/mg, (_, str) =>
              Katex.renderToString(str, { throwOnError: false, displayMode: true }))
            .replace(/(?<=[^\\])\$([^]+?)\$/mg, (_, str) =>
              Katex.renderToString(str, { throwOnError: false, displayMode: false })),
          env)
          .replace(/\\\$/g, '$')
    },
  },
}
