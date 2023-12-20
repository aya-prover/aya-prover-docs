# Fake literate mode

The Aya compiler generates styled (e.g. with colors and text attributes)
code snippets for many targets, like HTML, LaTeX, etc.,
and it's tempting to use the same tool but for different languages.
This is what the _fake literate_ mode is for.
Right now it only targets LaTeX, but it can be extended to other languages.
Let me know if you want other backend supports.

To start, install the latest version of Aya, put the following code in a file named `hello.flcl`:

```
keyword: data where;
symbol: ≃;
data: Int;
constructor: zero succ;
------
data Int where
  zero : Int
  succ : Int ≃ Int
```

Then, run the following command to generate literate output,
where you replace `<AYA>` with either `java -jar <path-to-aya.jar>` or `aya` depending on your installation:

```
<AYA> --fake-literate hello.flcl
```

Then it will print the following output:

```
\AyaKeyword{data}\hspace{0.5em}\AyaData{Int}\hspace{0.5em}\AyaKeyword{where}~\\
\hspace{1.0em}\AyaConstructor{zero}\hspace{0.5em}:\hspace{0.5em}\AyaData{Int}~\\
\hspace{1.0em}\AyaConstructor{succ}\hspace{0.5em}:\hspace{0.5em}\AyaData{Int}\hspace{0.5em}≃\hspace{0.5em}\AyaData{Int}
```

You may add `-o hello.tex` to let it write to a file instead of printing to the console.
With minimal configurations such as below, you can compile it with any LaTeX toolchain:

```tex
\usepackage{newunicodechar}
\newunicodechar{≃}{\ensuremath{\mathrel{\simeq}}}

\usepackage{xcolor}

% Aya highlighting
\definecolor{AyaFn}{HTML}{00627a}
\definecolor{AyaConstructor}{HTML}{067d17}
\definecolor{AyaStruct}{HTML}{00627a}
\definecolor{AyaGeneralized}{HTML}{00627a}
\definecolor{AyaData}{HTML}{00627a}
\definecolor{AyaPrimitive}{HTML}{00627a}
\definecolor{AyaKeyword}{HTML}{0033b3}
\definecolor{AyaComment}{HTML}{8c8c8c}
\definecolor{AyaField}{HTML}{871094}
\newcommand\AyaFn[1]{\textcolor{AyaFn}{#1}}
\newcommand\AyaConstructor[1]{\textcolor{AyaConstructor}{#1}}
\newcommand\AyaCall[1]{#1}
\newcommand\AyaStruct[1]{\textcolor{AyaStruct}{#1}}
\newcommand\AyaGeneralized[1]{\textcolor{AyaGeneralized}{#1}}
\newcommand\AyaData[1]{\textcolor{AyaData}{#1}}
\newcommand\AyaPrimitive[1]{\textcolor{AyaPrimitive}{#1}}
\newcommand\AyaKeyword[1]{\textcolor{AyaKeyword}{#1}}
\newcommand\AyaLocalVar[1]{\textit{#1}}
\newcommand\AyaComment[1]{\textit{\textcolor{AyaComment}{#1}}}
\newcommand\AyaField[1]{\textcolor{AyaField}{#1}}
```

The following code provides a quick macro to include the generated code:

```tex
\newcommand{\includeFlcl}[1]{{
\vspace{0.15cm}
\RaggedRight
% https://tex.stackexchange.com/a/35936/145304
\setlength\parindent{0pt}
\setlength{\leftskip}{1cm}
\input{#1}

\setlength{\leftskip}{0cm}
\vspace{0.15cm}
}}
```

Use `\includeFlcl{hello}` to include the generated code in your document.
