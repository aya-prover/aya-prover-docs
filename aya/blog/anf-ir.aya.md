# An IR for Aya

In the [previous blog post](./jit-compile), we introduced the architecture of the Aya JIT compiler,
where the unfolding behavior (and several other related things) of function definitions are compiled
into JVM bytecode.

We have optimized the compilation process since then, by introducing an intermediate representation (IR)
for it, so we have an opportunity to perform some basic optimizations and transformations on the IR before
generating JVM bytecode.

The Aya compilation pipeline goes through the following stages:

* Source code (`String`) → parsing (`AyaParser`) → Parse tree (`GenericNode`)
* - → (basic syntax checking) → Concrete syntax tree (`Expr`)
* - → (resolving and desugaring) → Concrete syntax tree still
* - → (type checking) → Core language
* - → (compilation) → Aya IR
* - → (JVM bytecode generation) → JVM class files

There are three important languages: the concrete syntax tree, the core language, and the IR.
If you're familiar with Rust, the concrete syntax tree is like the HIR, the core language is like
the THIR, and the Aya IR is like MIR.

A related change is that we now have `let` expressions in the core, which is a β-redex.
They will be reduced when checking conversion, but will be kept after type checking.
They play a significant role in the code generation and optimization.

## A-Normal Form

The IR does not allow expressions to nest, unlike in the core language.
