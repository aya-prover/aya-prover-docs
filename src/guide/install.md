# Install Aya

At this stage of development, we recommend using the nightly version of Aya.
Go to [GitHub Release], there will be a plenty of files.
Checking the section below that fits your platform.
After the installation, run `aya --help` for general instructions and
`aya -i` to start an interactive REPL.

[GitHub Release]: https://github.com/aya-prover/aya-dev/releases/tag/nightly-build

## If you already have Java 19 runtime...

Very cool! Now you can try the prebuilt binary or build from source.

### Prebuilt binary

Download the jar version of [cli][cli-jar] (for using command line)
and [lsp][lsp-jar] (for using VSCode) and run it with `java -jar [file name].jar`.

[lsp-jar]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/lsp-fatjar.jar
[cli-jar]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/cli-fatjar.jar

### Build from source

Clone the repository and following the instructions in `.github/README.md`.

## Windows

+ The [zip][win-zip] version of Aya runs in a JVM (built with jlink).
+ The [exe][win-exe] version of Aya is packed as a GraalVM Native Image.

[win-zip]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover-jlink-windows-latest_x86-64.zip
[win-exe]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-native-windows-latest_x86-64.exe

## Ubuntu Linux

+ The [zip][linux-zip] version of Aya runs in a JVM (built with jlink).
+ The [executable][linux-exe] version of Aya is packed as a GraalVM Native Image.

[linux-zip]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover-jlink-ubuntu-latest_x86-64.zip
[linux-exe]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-native-ubuntu-latest_x86-64

## Apple macOS

+ The [zip][mac-zip] version of Aya runs in a JVM (built with jlink).
+ The [executable][mac-exe] version of Aya is packed as a GraalVM Native Image.

[mac-zip]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-prover-jlink-macos-latest_x86-64.zip
[mac-exe]: https://github.com/aya-prover/aya-dev/releases/download/nightly-build/aya-native-macos-latest_x86-64
