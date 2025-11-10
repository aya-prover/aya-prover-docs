# Aya Prover Docs

[![.github/workflows/deploy.yml](https://github.com/aya-prover/aya-prover-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/aya-prover/aya-prover-docs/actions/workflows/deploy.yml)
[![github pages](https://github.com/aya-prover/aya-prover.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/aya-prover/aya-prover.github.io/actions/workflows/pages/pages-build-deployment)

The documentation and dev blog for the [Aya Prover].

## Build

Please use a modern Node.js (version >= 22) and `pnpm`. See:

+ <https://deb.nodesource.com/setup_22.x> (latest when this doc is written)
+ <https://pnpm.io/installation>

```sh
pnpm i
# run this to have hot-reloading environment when writing
pnpm dev
# run this to build static files
pnpm build
```

[Aya Prover]: https://github.com/aya-prover/aya-dev

## Add a page to some category

All markdown files are under `/src/`. To add a page simply create a `.md` file in one subdirectory. GitHub flavored markdown and LaTeX are (WIP).

To have this page shown in the sidebar, edit `/src/.vitepress/config.ts`.
See [VitePress sidebar](https://vitepress.vuejs.org/guide/theme-sidebar#sidebar)

## Creating a new category

Simply create a new subdirectory under `/src/` And add files. Each category must contain an `index.md` which will be its homepage.

To have this category shown in the navbar, edit `/src/.vuepress/config.ts`.
See [VitePress navbar](https://vitepress.vuejs.org/guide/theme-nav#nav)


