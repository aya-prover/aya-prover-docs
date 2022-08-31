# Binary operators in Aya

We have designed a binary operator system in Aya
which happens to be (we didn't copy!) very similar to [Rhombus] (a.k.a. Racket 2)
and [Swift 5.7].

 [Rhombus]: https://plt.cs.northwestern.edu/pkg-build/doc/enforest/Operator_Precedence_and_Associativity.html
 [Swift 5.7]: https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID550

TL;DR: it supports making _any_ identifier a custom operator
with precedences specified by a partial ordering.
Left and right associativities are supported.

The precedence and associativity information is bound to a
name, not a definition. This means we can import a name from
another module with changes to its name, associativity, and precedence.
Importing with renaming is an established feature, but changing associativity
and precedence is not that popular (though implemented in Agda already).

Here are some code examples:
