# The Aya Prover

+ [Installation Guide](install)
+ [Tutorial for functional programmers](haskeller-tutorial) (such as ML, Haskell, or Idris users)
+ [Tutorial for dependent types or theorem prover users](prover-tutorial)
+ [Tutorial for VSCode extension](vscode-tutorial)
+ [Tutorial for the fake literate mode](fake-literate)

Aya is a programming language _and_ an interactive proof assistant designed for type-directed programming _and_ formalizing math.
Here's a piece of Aya code that defines singly-linked lists and a map function:

```aya
open inductive List (A : Type) : Type
| [] : List A
| infixr :> (x : A) (xs : List A) : List A

def map {A B : Type} (f : A -> B) (xs : List A) : List B elim xs
| [] => []
| x :> xs' => f x :> map f xs'
```

The type system of Aya has the following highlights:

+ Set-level cubical features so `funExt` and quotients are available without axioms (like [Agda], [redtt], and [Arend] but not higher-dimensional),
+ Overlapping and order-independent pattern matching makes simple functions compute better,
+ Practical functional programming features similar to [Haskell] and [Idris]: dependent pattern matching, typed holes, enchanted synthesis of implicit arguments.

The implementation of the Aya compiler has the following highlights:

+ Efficient type checking by JIT-compiling well-typed definitions to JVM higher-order abstract syntax, so substitution does not traverse terms,
+ Convenient interactive tools such as a language server for VSCode, a REPL, and hyperlinked document generation ([demo](../blog/tt-in-tt-qiit)),
+ Pre-compiled binary release.

[Arend]: https://arend-lang.github.io
[redtt]: https://redprl.org
[Agda]: https://wiki.portal.chalmers.se/agda/pmwiki.php
[Haskell]: https://www.haskell.org
[Idris]: https://www.idris-lang.org
