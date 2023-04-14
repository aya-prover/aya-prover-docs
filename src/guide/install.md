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

| Platform | Architecture | JLink                    | Native               |
|----------|--------------|--------------------------|----------------------|
| Windows  | x64          | [zip][win-zip-x64]       | [exe][win-exe-x64]   |
| Linux    | x64          | [zip][linux-zip-x64]     | [exe][linux-exe-x64] |
| macOS    | x64          | [zip][macos-zip-x64]     | [exe][macos-exe-x64] |
| Windows  | aarch64      | [zip][win-zip-aarch64]   | Unavailable yet      |
| Linux    | aarch64      | [zip][linux-zip-aarch64] | Unavailable yet      |
| macOS    | aarch64      | [zip][macos-zip-aarch64] | Unavailable yet      |

[win-zip-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_windows-x64.zip
[win-exe-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_native_windows-x64.exe
[linux-zip-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_linux-x64.zip
[linux-exe-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_native_linux-x64
[macos-zip-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_macos-x64.zip
[macos-exe-x64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_native_macos-x64

[win-zip-aarch64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_windows-aarch64.zip
[linux-zip-aarch64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_linux-aarch64.zip
[macos-zip-aarch64]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_macos-aarch64.zip

Here's a hands-on script I wrote to (re)install Aya to `/etc/aya` on Linux x64:

```bash
#!/bin/bash
sudo mkdir -p /etc/aya
sudo chown $USER /etc/aya
rm -rf /etc/aya/*
cd /etc/aya
wget https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover_jlink_linux-x64.zip
unzip aya-prover_jlink_linux-x64.zip
rm aya-prover_jlink_linux-x64.zip
cd -
```

If it's the first time you install Aya, you may want to do
(or replace `~/.bashrc` with your shell's rc file):

```bash
echo 'export PATH="/etc/aya/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## If you already have Java runtime...

Very cool! Now you can try the prebuilt jars (much smaller and platform-independent)
or build Aya from source.

We will always be using the latest release of Java.
Not that we do not stay on LTS releases.

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
