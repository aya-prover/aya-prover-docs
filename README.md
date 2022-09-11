# Aya Prover Docs

## Build

Please use a modern Node.js ( recommend use node >= 14).

```sh
pnpm i
pnpm dev # run this line to have a hot-reloading environment when writing
pnpm build # run this line to build static fies
```

## Add a page to some category

All markdown files are under `/src/`. To add a page simply create a `.md` file in one subdirectory. GitHub flavored markdown and LaTeX are (WIP).

To have this page shown in the sidebar, edit `/src/.vitepress/config.ts`. see [VitePress sidebar](https://vitepress.vuejs.org/guide/theme-sidebar#sidebar)
## Creating a new category

Simply create a new subdirectory under `/src/` And add files. Each category must contain an `index.md` which will be its homepage.

To have this category shown in the navbar, edit `/src/.vuepress/config.ts`. see [VitePress navbar](https://vitepress.vuejs.org/guide/theme-nav#nav)


