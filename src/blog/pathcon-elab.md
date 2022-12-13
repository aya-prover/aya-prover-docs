# Elaboration of path constructors

<!-- This is just a collection of elaboration rules that are used in Aya. -->
This is not a blog post, but a reference for developers and type theory implementers.

Content below assumes knowledge on cubical type theory, for example the extension type and higher inductive types.

## Syntax

+ $[\overline i] X\{\overline{\phi\mapsto u}\}$: extension types, `PathP A a b` in Agda corresponds to $[i] A~i\{i=0\mapsto a, i=1\mapsto b\}$.
+ $i$ is sometimes used to denote $i=1$ and $\neg i$ is used to denote $i=0$.

## Flattening

Used in higher inductive type elaboration.

$$
\newcommand{\flattenOp}[1]{\textsf{flatten}(#1)}
\cfrac{A \ne [\overline i] X\set{\cdots} \quad A\ne \Pi(x:X)\to Y}
{\flattenOp{A} := A}
$$

$$
\newcommand{\flattenOp}[1]{\textsf{flatten}(#1)}
\cfrac
{\flattenOp{X}:=[\overline j] Y\set{\overline{\phi'\mapsto u'}}}
{\flattenOp{[\overline i] X\set{\overline{\phi\mapsto u}}}
:=
[\overline i,\overline j] Y\set{\overline{\phi'\mapsto u'~@~\overline j},\overline{\phi\mapsto u}}}
$$

$$
\newcommand{\flattenOp}[1]{\textsf{flatten}(#1)}
\cfrac{}
{\flattenOp{\Pi(x:X)\to Y}:=\Pi(x:X)\to \flattenOp{Y}}
$$

## Example

$$
\begin{align*}
\textsf{isProp}(A)&:=\Pi(a~b:A) \to [i]A\set{i\mapsto a,\neg i\mapsto b}\\
\textsf{isSet}(A)&:=\Pi(a~b:A)\to\textsf{isProp}([i]A\set{i\mapsto a,\neg i\mapsto b})\\
\end{align*}
$$

So the normal form of `isSet` is:

$$
\begin{align*}
\Pi(a~b:A)&\to\Pi(p~q:[i]A\set{i\mapsto a,\neg i\mapsto b})\\
&\to \big[j\big] \big([i]A\set{i\mapsto a,\neg i\mapsto b}\big)
\Set{j\mapsto q, \neg j\mapsto p}\\
\end{align*}
$$

And $\textsf{flattenOp}(\textsf{isSet}(A))$ is:

$$
\begin{align*}
\Pi(a~b:A)&\to\Pi(p~q:[i]A\set{i\mapsto a,\neg i\mapsto b})\\
&\to \big[j~i\big] A
\Set{i\mapsto a,\neg i\mapsto b,j\mapsto q~@~i, \neg j\mapsto p~@~i}\\
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
