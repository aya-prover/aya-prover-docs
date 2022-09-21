# Elaboration of the "extension" type

Aya uses the so-called "extension" type
(probably first-appeared [here]) as a generalized version of path type.

[here]: https://arxiv.org/abs/1705.07442

Instead of using the conventional path type, as in Cubical Agda:

+ `PathP (λ i → A i) a b` for `a : A 0` and `b : A 1`
+ `λ i → a : PathP (λ i → A i) (a 0) (a 1)` for `a : A i`
+ `p i : A i` for `p : PathP (λ i → A i) a b`
  + `p 0 = a` and `p 1 = b`

This type looks good, but it does not scale to higher dimensions.
Consider, for example, the type of a square with four faces specified
(from Agda's cubical library):

```
Square :
  {a₀₀ a₀₁ : A} (a₀₋ : a₀₀ ≡ a₀₁)
  {a₁₀ a₁₁ : A} (a₁₋ : a₁₀ ≡ a₁₁)
  (a₋₀ : a₀₀ ≡ a₁₀) (a₋₁ : a₀₁ ≡ a₁₁)
  → Type _
Square a₀₋ a₁₋ a₋₀ a₋₁ = PathP (λ i → a₋₀ i ≡ a₋₁ i) a₀₋ a₁₋
```

It gets even worse when the type is heterogeneous:

```
SquareP :
  (A : I → I → Type ℓ)
  {a₀₀ : A i0 i0} {a₀₁ : A i0 i1} (a₀₋ : PathP (λ j → A i0 j) a₀₀ a₀₁)
  {a₁₀ : A i1 i0} {a₁₁ : A i1 i1} (a₁₋ : PathP (λ j → A i1 j) a₁₀ a₁₁)
  (a₋₀ : PathP (λ i → A i i0) a₀₀ a₁₀) (a₋₁ : PathP (λ i → A i i1) a₀₁ a₁₁)
  → Type ℓ
SquareP A a₀₋ a₁₋ a₋₀ a₋₁ = PathP (λ i → PathP (λ j → A i j) (a₋₀ i) (a₋₁ i)) a₀₋ a₁₋
```

We have decided to use a partial element to represent these faces,
and so we can freely add or delete these a face, without having to
explicitly write down all faces for generality.
This leads to the following syntax:

```
--------  ↓ type           ↓ the "i = 0" end is b
[| i |] (A i) {| i := a | ~ i := b |}
-- ^ interval         ^ the "i = 1" end is a
```

The above type is equivalent to `PathP (λ i → A i) a b`.
We may use this to simplify the type signature of path concatenation:

```
def concat {A : Type}
  (p : [| i |] A {| |})
  (q : [| i |] A {| ~ i := p 1 |})
  : [| i |] A {| ~ i := p 0 | i := q 1 |}
```

It has fewer parameters than the conventional version:

```
def concat {A : Type}
  {a b c : A}
  (p : Path A a b)
  (q : Path A b c)
  : Path A a c
```

Now, how to implement this type? We have decided to overload lambdas
and expressions as Cubical Agda did, but we have encountered several problems.
Here's the story, in chronological order.

## First attempt

**Principle**: do not annotate the terms (including variable references) with types, because this is going to harm efficiency and the code that tries to generate terms (now they'll have to generate the types as well, pain!).

**Problem**: reduction of path application is type-directed, like `p 1` will reduce according to the type of `p`.

**Solution**: annotate the path applications instead.
Every time we do type checking and we get a term of path type,
we "η-expand" it into a normal lambda expression with a path application inside.
This secures the reduction of path applications.

**New Problem**: we expand too much. In case we want to unify the type of term
with a path type, the term is actually η-expanded and has a _Π-type_.
So, we have the manually write path lambdas everywhere, e.g. given `p : Path A a b`,
and only `λ i → p i` is a valid term of type `Path A a b`, not `p` (which is internally a lambda).

**Lesson**: we need to preserve the types _somehow_,
generate path applications only when necessary.

## Second attempt

**New Solution**: when checking something against a path type, we directly apply the boundary checks,
instead of trying to invoke synthesize and unify the types.
This eliminates a lot of `λ i → p i` problems.

**New Problem**: this is incompatible with implicit arguments. Consider the following problem:

+ have: `idp : {a : A} -> Path A a a`
+ elaborated: `λ i → idp i : {a : A} -> I -> A`
+ check: `idp : Path Nat zero zero`

The new solution will try to apply the boundary before inserting the implicit arguments,
which leads to type-incorrect terms.

**Lesson**: we probably should not change the bidirectional type checking algorithm too much.

## Third attempt

**New Solution**: the type information is known in the bidirectional type checking anyway,
so we only generate path applications during the type checking of application terms.

This has worked so far, with some unsolved problems (yet to be discussed):

+ Is `p : [| i |] A {| |}` an instance of type `[| i |] A {| i := a |}`?
  + Currently, Aya do not think so.
+ Can we automatically turn Agda-style squares to its preferred version in generalized path type?
  + Related issue: [530](https://github.com/aya-prover/aya-dev/issues/530)
  + A sort of "flattening"

If you have any thoughts, feel free to reach out and thanks for reading!
