import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';
import markdownItKatex from '@iktakahiro/markdown-it-katex';

export default defineConfig({
  title: 'Aya Prover',
  description: '',
  head: [
    ['link', {
      rel: 'stylesheet',
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css",
      crossorigin: "anonymous",
    }],
    ['link', {
      rel: 'stylesheet',
      href: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;0,900;1,300;1,700&display=swap",
    }],
    ['link', {
      rel: 'icon',
      href: `/logo.svg`,
    }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aya-prover' },
    ],
    editLink: {
      pattern: 'https://github.com/aya-prover/aya-prover-docs/tree/main/src/:path',
      text: 'Suggest changes to this page',
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Publications', link: '/pubs/' },
      { text: 'Blog', link: '/blog/' },
    ],
    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: 'Path type elaboration', link: '/blog/path-elab' },
          { text: 'Binary operators', link: '/blog/binops' },
          { text: 'Index unification?', link: '/blog/index-unification' },
          { text: 'Language extensions?', link: '/blog/lang-exts' },
        ]
      },
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide/' },
          { text: 'Install', link: '/guide/install' },
          { text: 'Tutorial for Haskellers', link: '/guide/haskeller-tutorial' },
          { text: 'Recommended Reading', link: '/guide/readings' },
        ]
      },
    ]
  },
  // extendsMarkdown: (md) => {
  //   md.render = (src, env) =>
  //     MarkdownIt.prototype.render.call(
  //       md,
  //       src
  //         .replace(/(?<=[^\\])\$\$([^]+?)\$\$/mg, (_, str) =>
  //           Katex.renderToString(str, { throwOnError: false, displayMode: true }))
  //         .replace(/(?<=[^\\])\$([^]+?)\$/mg, (_, str) =>
  //           Katex.renderToString(str, { throwOnError: false, displayMode: false })),
  //       env)
  //       .replace(/\\\$/g, '$')
  // },
  markdown: {
    config: (md) => {
      md.use(footnote)
      md.use(markdownItKatex)
    }
  },
})
