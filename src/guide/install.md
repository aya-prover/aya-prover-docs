# Install Aya

At this stage of development, we recommend using the nightly version of Aya.
Go to [GitHub Release], there will be a plenty of files.
It's updated per-commit in the `main` branch,
but the release date displayed is very old and is an issue of GitHub itself.

Checking the section below that fits your platform.
After the installation, run `aya --help` for general instructions and
`aya -i` to start an interactive REPL.
If you chose the jlink version, the `bin` folder contains the executable scripts.

[GitHub Release]: https://github.com/aya-prover/aya-dev/releases/tag/nightly-build

## Download from GitHub Release

Aya is available for Windows, Linux, and macOS, as listed below.

|         | x64                  | aarch64                  |
| ------- | -------------------- | ------------------------ |
| Windows | [zip][win-zip-x64]   | [zip][win-zip-aarch64]   |
| Linux   | [zip][linux-zip-x64] | [zip][linux-zip-aarch64] |
| macOS   | [zip][macos-zip-x64] | [zip][macos-zip-aarch64] |

[win-zip-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_windows-x64.zip
[linux-zip-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_linux-x64.zip
[macos-zip-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_macos-x64.zip

[win-zip-aarch64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_windows-aarch64.zip
[linux-zip-aarch64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_linux-aarch64.zip
[macos-zip-aarch64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_macos-aarch64.zip

Here's a hands-on script I wrote to (re)install Aya to `$AYA_PREFIX`
(define the variable somewhere or replace with your preferred prefix, e.g. `/opt/aya`) on Linux x64:

```bash
#!/bin/bash
sudo mkdir -p ${AYA_PREFIX:-/tmp}
sudo chown $USER ${AYA_PREFIX:-/tmp}
rm -rf ${AYA_PREFIX:-/tmp}/*
cd ${AYA_PREFIX:-/tmp}
wget https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_linux-x64.zip
unzip aya-prover_jlink_linux-x64.zip
rm aya-prover_jlink_linux-x64.zip
cd -
```

If it's the first time you install Aya, you may want to do
(or replace `~/.bashrc` with your shell's rc file):

```bash
echo 'export PATH="$AYA_PREFIX/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Try/Install Aya using Nix package manager

Make sure you have Nix installed with experimental features `nix-command flakes`.

TODO: binary cache

### Nix3 CLI

Activate the devShell containing Aya:

```sh
nix shell github:aya-prover/aya-dev#aya
```

Or Install Aya in user profile:

```sh
nix profile install github:aya-prover/aya-dev#ayaPackages.standard-library
```

### Usage in flake.nix

Add flake input in `flake.nix`:
  
```nix
inputs.aya-dev.url = "github:aya-prover/aya-dev";
```

Then you can access Aya under `inputs.aya-dev.packages.${system}`:
- `aya` : aya + aya-lsp
- `aya-minimal`: aya (without standard library) + aya-lsp
- `aya.withPackages (p: [ p.foo p.bar ])`: aya (with libraries `ayaPackages.foo` and `ayaPackages.bar`) + aya-lsp

You may fetch an example `flake.nix` which provides an Aya devShell with [flake-parts](flake-parts):

```sh
nix flake init -t github:definfo/dev-templates#aya

# Enter the devShell
nix develop
# OR auto-activate devShell within current directory
direnv allow
```

[flake-parts]: https://flake.parts

## Use Aya in GitHub Actions

If you want to use Aya in your GitHub Actions workflow, you can use [aya-prover/setup-aya][setup-aya] like

```yaml
- name: Setup Aya
  uses: aya-prover/setup-aya@latest
  with:
    version: 'nightly-build'
```

The step above will install the latest version of Aya to `PATH`.
You can find the complete example [here][aya-action-example].

[setup-aya]: https://github.com/aya-prover/setup-aya
[aya-action-example]: https://github.com/aya-prover/setup-aya/blob/main/.github/workflows/test-setup-nightly.yml

## If you already have Java runtime...

Very cool! Now you can try the prebuilt jars (much smaller and platform-independent)
or build Aya from source.

We will (hopefully) always be using the latest release of Java, rather than LTS,
unless there are breaking changes on the byte code format.

### Prebuilt binary

Download the jar version of [cli][cli-jar] (for using command line) and [lsp][lsp-jar]
(for using VSCode) and run it with `java --enable-preview -jar [file name].jar`.

[lsp-jar]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/lsp-fatjar.jar
[cli-jar]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/cli-fatjar.jar

### Build from source

Clone the repository. Then, run build with `./gradlew` followed by a task name.
If you have problems downloading dependencies (like you are in China),
check out [how to][proxy] let gradle use a proxy.

[proxy]: https://docs.gradle.org/current/userguide/build_environment.html#sec:accessing_the_web_via_a_proxy

```bash
# build Aya and its language server as applications to `ide-lsp/build/image/current`
# the image is usable in Java-free environments 
./gradlew jlinkAya --rerun-tasks
# build Aya and its language server as executable
# jars to <project>/build/libs/<project>-<version>-fat.jar
./gradlew fatJar
# build a platform-dependent installer for Aya and its language
# server with the jlink artifacts to ide-lsp/build/jpackage
# requires https://wixtoolset.org/releases on Windows
./gradlew jpackage
# run tests and generate coverage report to build/reports
./gradlew testCodeCoverageReport
# (Windows only) show the coverage report in your default browser
./gradlew showCCR
```

Gradle supports short-handed task names, so you can run `./gradlew fJ` to invoke `fatJar`,
`tCCR` to invoke `testCodeCoverageReport`, and so on.
