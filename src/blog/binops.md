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

Here are some code examples (implementations are omitted for simplicity):

```
-- Left-associative
def infixl + (x y : Nat) : Nat => {??}
-- Left-associative, bind tighter than +
def infixl * (x y : Nat) : Nat => {??} tighter +
```

The `tighter` keyword works like this: when there are expressions like
`a * b + c` which may either mean `(a * b) + c` or `a * (b + c)`,
we will put the tighter operator in the parenthesis.
In case we found the two operators share the same priority, Aya will report an error.

With imports, it looks like this:

```
open import Primitives using (
  invol as infix ~ tighter =, \/, /\,
  intervalMin as infix /\ tighter \/,
  intervalMax as infix \/,
)
```

Specifying operator precedences with a partial ordering is way better than with a number.
In Haskell, if we already have `infix 3 +` and `infix 4 *` and we hope to add a new operator
which has higher precedence than `+` but lower than `*`, it's going to be impossible.
Agda introduced [float-point precedence](https://github.com/agda/agda/issues/3991)
levels to address the issue, but I think it does not solve the essential problem:
that I have to lookup the numbers (of existing operator precedences)
every time I write a new operator.

In the future, we plan to support prefix and postfix operators,
and maybe mixfix as in Agda (the current framework can support mixfix easily,
but abusing mixfix notations can harm readability).
