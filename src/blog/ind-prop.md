# Inductive Prop are so wrong!

Throughout this blog post, I will use the term `Prop` to mean the type of propositions,
which _does not_ have to be strict, but has the property that it cannot eliminate to `Type`.

## Motivation

Long time ago I wrote a [PASE question](https://proofassistants.stackexchange.com/q/1970/32)
regarding definitional irrelevance.
An important pro of `Prop` in my opinion is that it is more convenient to be turned impredicative.
Mathematicians want impredicativity for various reasons, which I will not explain in detail here.

Now I want to point out several reasons to _avoid_ `Prop` and impredicativity based on `Prop`.
Note that I'm not asking you to get rid of impredicativity in general!

If you're a type theorist and you surf the web, you probably have seen Jon Sterling complaining about
inductive Props from a semantic point of view (I think there is something in the [second XTT paper],
but I've heard more of it from various discord servers).

[second XTT paper]: https://arxiv.org/abs/2003.01491

## Ad-hoc termination rules of impredicative `Prop`

There is another [related PASE question](https://proofassistants.stackexchange.com/q/1803/32)
regarding termination. You don't have to read it, I'll paraphrase the example.

It makes sense to define the following type:

```idris
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
considered smaller. This assumption is called 'predicative assumption',
which cannot be made for `Prop` because it is impredicative.
The famous W-type is also using this assumption.

A counterexample with `Prop` looks like this
(since we need to talk about Props, we start using Agda syntax instead of Haskell):

```
data Bad : Prop where
  b : ((P : Prop) → P → P) → Bad

bad : Bad
bad = b (λ P p → p)

no-bad : Bad → ⊥
no-bad (b x) = no-bad (x Bad bad)

very-bad : ⊥
very-bad = no-bad bad
```

Notice that the `no-bad (b x)` clause uses the recursion `no-bad (x Bad bad)`,
which is only valid with the predicative assumption. So, having this predicative assumption
actually proves false for `Prop`, so for `Prop`, we need to patch the termination checker
to ban this rule. It just doesn't feel right! 

Coq and Lean have a similar problem, but they are generating eliminators for inductive definitions,
so they can generate the correct eliminator for `Prop`,
instead of patching the termination checker.
In Coq, the eliminator for `Bad` is

```
Bad_ind : forall P : Prop,
    ((forall p : Prop, p -> p) -> P) ->
    Bad -> P
```

Note that there is no recursive arguments, so there is no recursion allowed.
There is no need to patch the termination checker in Coq.
If you're using a termination checker, you want to get rid of impredicativity of `Prop`!
This eliminates the need of a universe-based irrelevance.

## Alternative ways to impredicativity

We may use axioms to get impredicativity.
Suppose we define (since we no longer have it in the language) `Prop := Σ (A : Type) (isProp A)`,
there are two different axioms that imply impredicativity of `Prop`:

+ Propositional resizing, which is basically a restatement of impredicativity.
+ Classical axioms, which implies that `A : Prop` is either `⊤` or `⊥`, which further implies that `Prop ≅ Bool`, which implies resizing.

If we think of the right way of doing math is to work with classical axioms,
why on earth are we forging a theorem into the language?
