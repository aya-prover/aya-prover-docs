# Aya Package

An Aya project consists of a directory with a `aya.json` file (project metadata)
and a `src` directory for source code. Here's a sample `aya.json`:

```json
{
  "ayaVersion": "0.23",
  "name": "<project name>",
  "version": "<project version>",

  "dependency": {
    "<name of dependency>": {
      "file": "<directory to your dependency>"
    },
    // We plan to support other sources of dependencies,
    // but we do not have money to
    // host a package repository for now.
  }
}
```

To build a project, run `aya --make <parent dir of aya.json>` (incremental).
For force-rebuilding, replace `--make` with `--remake`.
For jar users, run `java --enable-preview -jar cli-fatjar.jar --make <parent dir of aya.json>`.
