# Binary operators in Aya

We have designed a binary operator system in Aya which happens to be (we didn't copy!) very similar to
[Rhombus](https://plt.cs.northwestern.edu/pkg-build/doc/enforest/Operator_Precedence_and_Associativity.html) (a.k.a. Racket 2)
and [Swift 5.7](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID550).

TL;DR: it supports making _any_ identifier a custom operator
with precedences specified by a partial ordering.
Left and right associativities are supported in addition to that.

The precedence and associativity information is bound to a
name, not a definition. This means we can import a name from
another module with changes to its name, associativity, and precedence.
Importing with renaming is an established feature, but changing associativity
and precedence is not that popular (though implemented in Agda already).

```aya-hidden
inductive Nat
```

Here are some code examples (implementations are omitted for simplicity):

```aya
// Left-associative
def infixl + (x y : Nat) : Nat => {??}
// Left-associative, bind tighter than +
def infixl * (x y : Nat) : Nat => {??} tighter +
// Prefix operator
def fixl ! (x : Nat) : Nat => {??}
// Postfix operator
def fixr ? (x : Nat) : Nat => {??}
```

The `tighter` keyword works like this: when there are expressions like
`a * b + c` which may either mean `(a * b) + c` or `a * (b + c)`,
we will put the tighter operator in the parenthesis.
In case we found the two operators share the same priority, Aya will report an error.

When importing operators from other modules,
we can locally specify additional associativity and precedence information:

```
open import Primitives using (
  invol       as fixl  ~  tighter =, \/, /\,
  intervalMin as infix /\ tighter \/,
  intervalMax as infix \/,
)
```

This should allow fine-grained control over the precedence and associativity of operators.
In case there is a cycle in the graph of operator precedence, Aya will report an error.

Specifying precedence of operators with a partial ordering is way better than with a number.
In Haskell, if we already have `infix 3 +` and `infix 4 *`, and we hope to add a new operator
which has higher precedence than `+` but lower than `*`, it's going to be impossible.
Agda introduced [float-point precedence](https://github.com/agda/agda/issues/3991)
levels to address the issue, but I think it does not solve the essential problem:
that I have to lookup the numbers (of existing operator precedences)
every time I write a new operator.

In the future, we plan to support mixfix operators as in Agda
(the current framework can support mixfix easily, but abusing mixfix notations can harm readability).
