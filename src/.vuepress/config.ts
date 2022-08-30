import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import MarkdownIt from 'markdown-it';
import Katex from 'katex';

export default defineUserConfig({
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
      href: `/static/img/logo.svg`,
    }],
  ],
  base: '/',
  theme: defaultTheme({
    repo: 'aya-prover/aya-dev',
    logo: '/static/img/logo.svg',
    docsRepo: 'aya-prover/aya-prover-docs',
    docsDir: 'src',
    docsBranch: 'main',
    editLink: true,
    lastUpdated: true,
    navbar: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Publications', link: '/pubs.html' },
    ],
    sidebarDepth: 2,
    sidebar: {
      // Add an entry if there is a new subdirectory created
      '/guide/': [{
        text: 'Guide',
        children: [
          // If a new file created under this subdirectory, add the filename without `.md` here
          // The order here will be that displayed on the sidebar
          '',
        ],
      }],
    }
  }),
  extendsMarkdown: (md) => {
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
})
