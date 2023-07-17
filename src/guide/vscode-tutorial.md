# So you are using VSCode

Go to [GitHub Releases], click the latest successful run,
scroll down to the bottom of the page, download the "aya-prover-vscode-extension", and unzip it.
Then, follow [VSCode docs](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix) to install the extension.

[GitHub Releases]: https://github.com/aya-prover/aya-vscode/releases/tag/nightly-build

It remains to configure the Aya language server. There are two ways to use the server.
First, open settings, search for "Aya path", you should see a text box. Then, you have a choice:

1. Use a jar file. Put your `lsp-fatjar.jar` file path there. Make sure you have a `java`
   executable in the Path (recommended) or in `java.home` key in the settings json.
2. Use the jlink version of Aya. Put the `aya-lsp` (or `aya-lsp.bat` if you are on Windows)
   file path there, which is under the `bin` folder of the jlink distribution.
   In this case, you **don't** need to have a `java` executable in the Path.

Then, open a directory that is an Aya project (see [project-tutorial](project-tutorial)).
Open any `.aya` file, you should see some basic highlight (keywords, comments, etc.).
Wait for VSCode to activate the extension, and hit `Ctrl+L Ctrl+L` to load the file.
At this point, you should see advanced highlight (type names, constructors, etc.),
with clickable definitions.

The rest of the features should be quite discoverable for regular programmers,
such as hovering a red or a yellow wavy line to see the error message, etc.
Please create issues and discuss ideas on how to improve the error reports.
