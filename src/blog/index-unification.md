# Index unification in Aya

[#198]: https://github.com/aya-prover/aya-dev/pull/198

Aya implements a version of index unification algorithm that allows emission of obvious patterns. Here's an example.
Consider the famous "sized-vector" `Vec (n : Nat) (A : Type)` definition,
and we can perform some pattern matching:

```
len : ∀ {A} -> (n : Nat) -> Vec n A -> Nat
len a vnil = 0
len a (vcons _ x) = suc (len _ x)
```

This code may seem obviously correct, but why would I write about it if it's so simple? 😉 Let's run the type checking in our head, clause by clause
and pattern by pattern.

0. The first pattern in the first clause, `a`, is a valid pattern for `Nat`. This means we will substitute the codomain of the pattern matching with `[a/n]`, where `n` is the corresponding name _in the telescope_ and `a` is the term corresponding to the pattern.
1. The second pattern in the first clause, `vnil`, is a pattern for `Vec zero A`. However, the expected type is `Vec a A`, which does not match the type of the pattern.

So, here is the problem! The well-typed version of the program is actually:

```
len : ∀ {A} -> (n : Nat) -> Vec n A -> Nat
len zero vnil = 0
len (suc a) (vcons _ x) = suc (len a x)
```

However, isn't it obvious that the first pattern in the first clause must be `zero`?
It would be nice if the type checker can figure this out by itself.
In fact, both Agda and Idris can do this! In Agda, the feature is called "dotted patterns" in the documentation and "inaccessible patterns" in the paper.
I will prefer calling it "forced patterns" because the patterns are actually accessible (in the sense that the bindings in the patterns are used) and does not use the Agda dot syntax.

Forced patterns are not easy to implement. The simplest pattern type checking algorithm can be quite straightforward:
we check the type of the pattern, add the bindings to the context so we can type the rest of the telescope, and check the body of the clause.
With forced patterns, we will need to change the existing well-typed variable patterns into constructor patterns, so the algorithm becomes stateful.

In Aya, I introduced the concept of "meta patteriables" which is a funny reference to "meta variables" used in unification in conversion check.

## The so-called "meta patteriables"

Related PR: [#198]

When we see a variable pattern, we transform it into a `MetaPat` which is a "unification variable" pattern that can be "solved" into another pattern.
A reference to a `MetaPat` is converted into a special meta variable that has a mutable reference to the `MetaPat`
(this can be replaced by a mutable map in the type checking state when you need purity,
but I prefer mutable references for implementation simplicity).

When we are type checking a pattern of type `D a` for `D` an indexed inductive family and the expected type is `D b` where `b` is the special meta variable,
we claim that `b` is _solved_ to `a`, and the `MetaPat` that corresponds to `b` will be transformed into `a` when we finalize the type checking results.

There are two more cases to deal with:

0. In case a `MetaPat` is not "solved", we just let it be a variable pattern.
1. In case a `MetaPat` is "solved" more than once, we must make sure the solutions are identical.

Note that a `MetaPat` may contain bindings, but these bindings are already from the current context,
so we do not need to add them again to the context.

Now, let's run the new algorithm:

```
len : ∀ {A} -> (n : Nat) -> Vec n A -> Nat
len a vnil = 0
len a (vcons _ x) = suc (len _ x)
```

0. The first pattern in the first clause, `a`, is a valid pattern for `Nat`, so we generate a `MetaPat(a)` and substitute the codomain with `MetaPatRef(a)`, e.g. `Vec MetaPatRef(a) A -> Nat`.
1. The second pattern in the first clause, `vnil`, is a pattern for `Vec zero A`. The expected type is `Vec MetaPatRef(a) A`, and we solve `MetaPat(a)` to `zero`.
2. Now we check the body and finalize the clause. Since `a` is solved to `zero`, we generate the well-typed clause `len zero vnil = 0` which is exactly what we need.

Thanks for reading!
