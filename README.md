# Aya Prover Docs

## Build

Please use a modern Node.js (I'm using 14).

```sh
npm install
npm run dev # run this line to have a hot-reloading environment when writing
npm run build # run this line to build static fies
```

The output files are under `/src/.vuepress/dist/`.

## Add a page to some category

All markdown files are under `/src/`. To add a page simply create a `.md` file in one subdirectory. GitHub flavored markdown and LaTeX are allowed.

To have this page shown in the sidebar, edit `/src/.vuepress/config.ts`. Say, creating a file `getting-started.md` in the subdirectory `/guide/` would require changing like this:

```diff
module.exports = {
  ...,
  themeConfig: {
    ...,
    sidebar: {
      ...,
      '/guide/': [{
        title: 'Guide',
        children: [
          '',
          ...,
+         'getting-started',
          ...,
        ],
      }],
      ...,
    },
    ...,
  },
  ...,
}
```

## Creating a new category

Simply create a new subdirectory under `/src/` And add files. Each category must contain an `index.md` which will be its homepage.

To have this category shown in the navbar, edit `/src/.vuepress/config.ts`. E.g. creating a category `/api/` would require:

```diff
module.exports = {
  ...,
  themeConfig: {
    ...,
    nav: [
      ...,
+     { text: 'API', link: '/api/' },
      ...,
    ],
    sidebar: {
      ...,
+     '/api/': [{
+       title: 'API',
+       children: [
+         '',
+       ],
+     }],
    ...,
  },
  ...,
}
```
