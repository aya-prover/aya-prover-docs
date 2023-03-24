# Elaboration of path constructors

<!-- This is just a collection of elaboration rules that are used in Aya. -->
This is not a blog post, but a reference for developers and type theory implementers.

Content below assumes knowledge on cubical type theory, for example the extension type and higher inductive types.

## Syntax

+ $[\overline i] X\{\overline{φ↦ u}\}$: extension types, `PathP A a b` in Agda corresponds to $[i] A~i\{i=0↦ a, i=1↦ b\}$.
+ $i$ is sometimes used to denote $i=1$ and $¬ i$ is used to denote $i=0$.

## Flattening

Used in higher inductive type elaboration.

$$
\newcommand{\flattenOp}[1]{\textsf{flatten}(#1)}
\cfrac{A \ne [\overline i] X\set{\cdots} \quad A\ne Π(x:X)→ Y}
{\flattenOp{A} := A}
$$

$$
\newcommand{\flattenOp}[1]{\textsf{flatten}(#1)}
\cfrac
{\flattenOp{X}:=[\overline j] Y\set{\overline{φ'↦ u'}}}
{\flattenOp{[\overline i] X\set{\overline{φ↦ u}}}
:=
[\overline i,\overline j] Y\set{\overline{φ'↦ u'~@~\overline j},\overline{φ↦ u}}}
$$

$$
\newcommand{\flattenOp}[1]{\textsf{flatten}(#1)}
\cfrac{}
{\flattenOp{Π(x:X)→ Y}:=Π(x:X)→ \flattenOp{Y}}
$$

## Example

$$
\begin{align*}
\textsf{isProp}(A)&:=Π(a~b:A) → [i]A\set{i↦ a,¬ i↦ b}\\
\textsf{isSet}(A)&:=Π(a~b:A)→\textsf{isProp}([i]A\set{i↦ a,¬ i↦ b})\\
\end{align*}
$$

So the normal form of `isSet` is:

$$
\begin{align*}
Π(a~b:A)&→Π(p~q:[i]A\set{i↦ a,¬ i↦ b})\\
&→ \big[j\big] \big([i]A\set{i↦ a,¬ i↦ b}\big)
\Set{j↦ q, ¬ j↦ p}\\
\end{align*}
$$

And $\textsf{flattenOp}(\textsf{isSet}(A))$ is:

$$
\begin{align*}
Π(a~b:A)&→Π(p~q:[i]A\set{i↦ a,¬ i↦ b})\\
&→ \big[j~i\big] A
\Set{i↦ a,¬ i↦ b,j↦ q~@~i, ¬ j↦ p~@~i}\\
\end{align*}
$$

So for example, set truncation from HoTT looks like this:

```
data SetTrunc (A : Type)
| mk : A -> SetTrunc A
| trunc : isSet (SetTrunc A)
```

The `trunc` constructor is elaborated to cubical syntax by flattening the type and attach the partial on the return type to the constructor, something like this:

```
trunc : Π (a b : SetTrunc A)
    -> (p q : a = b)
    -> (j i : I) -> SetTrunc A
  { i = 1 -> a
  ; i = 0 -> b
  ; j = 1 -> q @ i
  ; j = 0 -> p @ i
  }
```

Aya is currently working on the so-called `IApplyConfluence` problem for recursive higher inductive types like `SetTrunc`,
see [this question](https://proofassistants.stackexchange.com/q/1890/32) which is a problem I'm wrapping my head around at the moment.
More details will be posted later.
