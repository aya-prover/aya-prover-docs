# Class extension with definitional projection

We want a class system with the following basic capabilities:

+ Classes can be extended with new fields (similar to `extends` in Java).
+ Multiple inheritance is possible, because we can detect conflicts, and in case that really happens, we reject it.
+ Subtyping is available and uses coercion. This will be discussed in another post.

To add more flexibility to it, we want the following feature.
Suppose we have a class `Precat` for precategories (written in pseudocode):

```
class Precat
| Ob : Type
| Hom : Ob -> Ob -> Type
| Hom-set (A B : Ob) : isSet (Hom A B)
| id (A : Ob) : Hom A A
| ....
```

Suppose the syntax for creating an instance of a class is `new Precat { Ob := .., Hom := .., ... }`.

Then, I want the following:

+ `Precat` is the type for all instances of the class `Precat`.
+ `Precat { Ob := Group }` is the type for all instances of the class `Precat` whose `Ob` field is (definitionally) `Group`.
+ `Precat { Ob := Group, Hom := GroupHom }` is the type for all instances of the class `Precat` whose `Ob` field is `Group` and `Hom` field is `GroupHom`.
+ etc.

This is called *anonymous class extension*, already implemented in the Arend language.
As a syntactic sugar, we may write `Precat { Ob := Group }` as `Precat Group`, where the application is ordered the same as the fields in the class definition.
We further want *definitional projection*:

+ Suppose `A : Precat Group`, then `A.Ob` is *definitionally* equal to `Group`.
+ Suppose `A : Precat Group GroupHom`, then `A.Hom` is *definitionally* equal to `GroupHom`.

This concludes the basic features of the class system.
To implement this, it may seem that we need to have access to types in the normalizer,
which makes it very heavy (in contrast to the lightweight normalizer you can have for plain MLTT).

A uniform implementation of this definitional projection requires the definitional equality to commute with substitution, say, we may have

$$
{A : \text{Precat} ⊢ A.\text{Ob} : \mathcal U}
$$

This is a normal form. Then,
we have `Grp : Precat Group` (so `Grp.Ob` is definitionally equal to `Group`),
and we may perform the substitution $[\text{Grp} / \text{A}]$ on the above normal form:

$$
\text{Grp} : \text{Precat}~\text{Group} ⊢ \text{Grp}.\text{Ob} : \mathcal U
$$

We want the above to be equal to `Group` as well.
Without access to contexts, it seems really hard!

Here's a trick: whenever we see `A : Precat Group`, we *elaborate* it into
(the idea is similar to an η-expansion):

```
A ==> new Precat
  { Ob := Group
  , Hom := A.Hom
  , Hom-set := A.Hom-set
  , id := A.id
  , ...
  }
```

By that, we will *never* have `A.Ob` in the source language, because it always gets elaborated into `Group` directly. In case we partially know about `A` from the type,
we really elaborate the type information right into the core term. So,
we don't even have a chance to touch the bare `A` (not being projected) in the core language,
and anything of a class type is _always_ in an introduction form.

This should implement the definitional projection feature without even modifying the MLTT normalizer.
