# Moving away from univalent type theory

Aya is now moving away from univalent type theory.

Note that this does not mean we are moving away from cubical type theory --
we are trying to adapt an _extensional_ version cubical type theory, called XTT,
which is a cubical approach towards _observational equality_ (the idea is due to Altenkirch and McBride):
the equality type `a =_A b` is no longer defined uniformly for all types `A`,
but rather defined by assuming a closed (inductive-recursive) universe,
and defining a type family `(A : Type) -> A -> A -> Type` by casing on what `A` is.
For function types, we can define it as pointwise equality, which makes function extensionality
true by definition.

In case of cubical, this is automatic, due to how path types are defined.

The reference for XTT can be found in the paper _A Cubical Language for Bishop Sets_ by
Sterling, Angiuli, and Gratzer. This paper has a previous version which has a universe hierarchy,
called _Cubical Syntax for Reflection-Free Extensional Equality_, by the same authors.

We plan to use XTT as the basis for Aya's type theory.
We will change the following in v0.30 Aya:

1. We will implement a universe à la Tarski to reuse the type checking of subtypes and paths.
2. The impredicative `Prop` universe will be removed due to the complications it caused.
3. The binding representation will be changed to locally nameless.
   By that we can make closed term completely serializable.
4. We will try to implement definition-level controlling unfolding. This has a several advantages:
   the type checking order of bodies can be inferred from the annotations,
   and we can detect more cycles instead of reporting errors due to not being able to unfold unchecked function.
5. We wish to remove implicitness information from core terms, and keep them a feature related to function calls.
   $\Pi$-types should not know the _name_ of the parameter, which is natural due to $\alpha$-equality.
   This means named arguments will only work for direct function calls.

Yes, the last two items indicate a major change in the implementation of Aya,
which is essentially a rewrite of the type checker.
We took this chance to revisit a couple of old issues and fix them.
Currently, we have suceeded in extracting a Java module for the syntax definition from the type checker module,
which will benefit third-party libraries who want to deal with serialized Aya terms.

We will not adapt the following features from XTT:

1. Partial elements are first-class citizens, i.e. they have manifest "cubical" phases.
   Instead we will have first class total elements and use a `Partial` type to represent partial elements.
2. Intervals are not types. We will adapt the 2LTT-style solution from Cubical Agda, which has some universes
   to classify exo-types.
3. The type-case operator will remain internal to the type checker.
   While this might be useful in the future development related to metaprogramming,
   we do not see any immediate use for it except for implementing the computation of generalized coercion.
4. As we already said, we do not intend to add an impredicative `Prop` universe,
   while the XTT paper said they intend to add it.
   We encourage the users to embrace the axiom of propositional resizing,
   which makes not just `Prop`s to be impredicative, but also all h-props
   (e.g. types that are provably props) to be impredicative.

The development is still in a private work-in-progress repository,
which we will open-source and be ported to the main repo once we
can compile this website with the new type checker,
which implies complete support for inductive types except for the positivity checker.

We will also have to rewrite some guides about higher inductive types,
and instead use some quotient type examples.

From that, we will start considering support for classes with extensions,
and try to formalize some mathematics and do some real-world programming with Aya,
partially bootstrapping the type checker.

Stay tuned!
