# Impredicative Props are hard

Throughout this blog post, I will use the term `Prop` to mean the type of propositions,
which _does not_ have to be strict, but has the property that it cannot eliminate to `Type`.

## Motivation

Long time ago I wrote a [PASE question](https://proofassistants.stackexchange.com/q/1970/32)
regarding definitional irrelevance.
An important pro of `Prop` in my opinion is that it is more convenient to be turned impredicative.
Mathematicians want impredicativity for various reasons, one thing being that it is natural to
have a proposition being a quantification over types, which I think is true.

Now I want to point out several reasons to _avoid_ `Prop` and impredicativity based on `Prop`.
Note that I'm not asking you to get rid of impredicativity in general!

## Ad-hoc termination rules of impredicative `Prop`

There is another [related PASE question](https://proofassistants.stackexchange.com/q/1803/32)
regarding termination. You don't have to read it, I'll paraphrase the example.

Usually, for structural induction, we have the notion of "comparing term size". For instance,
if we have a pattern `suc n`, then recursively call the function itself with `n` on the same
position is considered good, because we think `n < suc n`. But consider the following example.

It makes sense to define the following type:

```haskell
data BrouwerTree
  = Leaf Bool
  | Branch (Nat -> BrouwerTree)
```

and have the following structural-induction:

```haskell
left :: BrouwerTree -> Bool
left (Leaf b) = b
left (Branch xs) = left (xs 0)
```

Note that in the clause of `left (Branch xs)`, the recursive call `left (xs 0)` is
considered smaller, in other words, we think `xs 0 < Branch xs`.

This assumption is called 'predicative assumption'.
As you may tell from the name, it can only be made on things that are predicative,
and we know `Prop` is usually impredicative, so we should not allow this.
At this point, you might expect a proof of false using predicative assumption on `Prop`,
which I'll show in this blog post.

Note that allowing such recursion pattern is very important!
The famous W-type is also using this assumption.

A counterexample with `Prop` looks like this (since we need to talk about
universes and dependent types, we start using Agda syntax instead of Haskell):

```
data Bad : Prop where
  branch : ((P : Prop) → P → P) → Bad

bad : Bad
bad = branch (λ P p → p)

no-bad : Bad → ⊥
no-bad (branch x) = no-bad (x Bad bad)

very-bad : ⊥
very-bad = no-bad bad
```

Notice that the `no-bad (branch x)` clause uses the recursion `no-bad (x Bad bad)`,
which is only valid with the predicative assumption. So, having this predicative assumption
actually proves false for `Prop`, so for `Prop`, we need to patch the termination checker
to ban this rule. So, how hard is it to patch the termination checker?

Coq and Lean have a similar problem, but they are generating eliminators for inductive definitions,
so they can generate the correct eliminator for `Prop`, instead of patching the termination checker.
Then, Coq carefully implements a comparison function for size-decreasing arguments (this means
eliminators are not the "most primitive" thing in Coq, but the termination checker is also part of it.
I got this piece of information from Lysxia and Meven Lennon-Bertrand).
In Coq, the eliminator for `Bad` is

```
Bad_ind : forall P : Prop,
    ((forall p : Prop, p -> p) -> P) ->
    Bad -> P
```

Note that there is no recursive arguments, so there is no recursion allowed.

Now, this sounds like just adding some `if` statements to the termination checker,
but the situation is actually worse. In Agda, metavariables are pervasive,
like the following code is partially accepted:

```
data Bad : Prop where
  b : ((P : { }0) → P → P) → Bad
```

Agda will not fail on this code, but then what to do in the termination checker is really unclear.
If you're using a termination checker, you want to get rid of impredicativity of `Prop`!
This eliminates the need of a universe-based irrelevance.

## Alternative ways to impredicativity

We may use axioms to get impredicativity.
Suppose we define (since we no longer have it in the language) `Prop := Σ (A : Type) (isProp A)`,
there are two different axioms that imply impredicativity of `Prop`:

+ Propositional resizing, which is basically a restatement of impredicativity.
+ Classical axioms, which implies that `A : Prop` is either `⊤` or `⊥`,
  which further implies that `Prop ≅ Bool`, which implies resizing.
+ A completely separate layer in the type theory that only concerns logic and propositions.
  This is similar to the solution in Russell's original simple theory of types,
  where we replace the "simple type" with dependent types.

If we think of the right way of doing math is to work with classical axioms,
why on earth are we forging a weaker theorem as part of the language?
