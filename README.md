# Aya Prover Docs

The documentation and dev blog for the [Aya Prover].

## Build

Please use a modern Node.js (version >= 16) and pnpm. See:

+ <https://deb.nodesource.com/setup_16.x>
+ <https://deb.nodesource.com/setup_19.x> (latest when this doc is written)
+ <https://pnpm.io/installation>

```sh
pnpm i
pnpm dev # run this line to have a hot-reloading environment when writing
pnpm build # run this line to build static fies
```

[Aya Prover]: https://github.com/aya-prover/aya-dev

## Add a page to some category

All markdown files are under `/src/`. To add a page simply create a `.md` file in one subdirectory. GitHub flavored markdown and LaTeX are (WIP).

To have this page shown in the sidebar, edit `/src/.vitepress/config.ts`. see [VitePress sidebar](https://vitepress.vuejs.org/guide/theme-sidebar#sidebar)

## Creating a new category

Simply create a new subdirectory under `/src/` And add files. Each category must contain an `index.md` which will be its homepage.

To have this category shown in the navbar, edit `/src/.vuepress/config.ts`. see [VitePress navbar](https://vitepress.vuejs.org/guide/theme-nav#nav)


