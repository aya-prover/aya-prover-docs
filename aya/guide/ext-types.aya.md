# Extension types

In this tutorial, we introduce a simple extension to the traditional "path type"
in cubical type theory -- the extension type.
Basic knowledge on cubical type theory is assumed.
Some primitive definitions:

```aya
prim I prim coe prim coeFill
prim intervalInv
prim intervalMax
inline def ~ => intervalInv
variable A B : Type
def Path (A : I -> Type) (a : A 0) (b : A 1)
   => [| i |] A i { i := b | ~ i := a }
//     ^^^^^^^^^^^^^^^^^^^^^^
//    this is an extension type
def infix = {A : Type} => Path (λ x => A)
def refl {a : A} : a = a => λ i => a
```

The extension type is essentially a generalized version of the path type,
which can be n-dimensional instead of just 1-dimensional like the path type,
and the boundaries can be arbitrarily specified.
For example, `a = b` in cubical type theory is essentially the same as
`[| i |] A { i := b | ~ i := a }`, where `A` is the type of `a` and `b`.
That `i := b` says "when the path is applied by 1, it should return `b`",
and in general, `φ := u` says "when the path application makes `φ` equal to `1`,
then the path should return `u`".

When there are no boundaries specified, the extension type can be written as `[| i |] A`.
For higher dimensional extension types, one write `[| i j k |] A` etc.

As a simple exercise, explain how `~ i := a` works.
Hint: `~ i` is the same as `1 - i`.

So, how are these types superior to the traditional path type?

## Examples

The extension type reduces the unification burden.
This is a traditional definition of path symmetry:

```aya
example def sym {a b : A} (p : a = b) : b = a => \i => p (~ i)
```

Note that it has two implicit arguments, which will be figured out by the type checker.
However, with the extension type, we do not have to specify the boundaries!

```aya
def sym (p : [| i |] A) : p 1 = p 0 => \i => p (~ i)
```

Yes, by that we have inverted the path!
This also happens to `cong`, which is renamed to `pmap`{} in Aya:

```aya
def pmap (f : A -> B) (p : [| i |] A) : f (p 0) = f (p 1)
   => \i => f (p i)
```

Now, let's take a look at the transitivity of paths:

```aya
def cast (p : A ↑ = B) : A -> B => (\i => p i).coe
example def concat {a b c : A} (p : a = b) (q : b = c) : a = c =>
  cast (\i => a = q i) p
```

We can make `p` boundary-free, and use `p 1` as a replacement of `b`:

```aya
def concat (p : [| i |] A) (q : [| i |] A { ~ i := p 1 }) : p 0 = q 1
   => cast (\i => p 0 = q i) p
```

Now we can say bye bye to these implicit arguments!

## Higher inductive types

Higher inductive types in Aya are also defined using the extension type syntax.
The Agda-style syntax is working in progress.

We first introduce a convenient function for "both boundaries":

```aya
def inline ∂ (i : I) => intervalMax i (~ i)
```

This function should be used when opposite boundaries are equal,
for example, we may write the type of `refl` as:

```aya
example def Refl {a : A} => [| i |] A { ∂ i := a }
```

The simplest example is the definition of circles:

```aya
example open data S¹
| base
| loop : base = base
```

Aya will slightly analyze the definition and transform `loop : base = base`
into `loop (i : I)` where either $i = 0$ or $i = 1$ makes it reduce to `base`:

```aya
open data S¹
| base
| loop (i : I) { ∂ i := base }
```

This means that `loop i` is equal to `base` when `i` is equal to `0` or `1`.
Aya has nice coercive subtyping between path and pi types, so we may say:

```aya
example def test : base = base => loop
```

As another example, the definition of torus in cubical Agda has a mysterious
type for the `face` constructor, which looks like `PathP (\i -> line1 i = line1 i) line2 line2`.
This is quite hard for beginners to read, but it can be made clear using the extension type:

```aya
open data T²
| point
| line1 (i : I) { ∂ i := point }
| line2 (i : I) { ∂ i := point }
| face (i j : I) { ∂ i := line2 j | ∂ j := line1 i }
```

The traditional type still works
(due to a small problem we have to manually eta-expand it a little for now):

```aya
example def traditional
  : Path (\i => line1 i = line1 i) line2 line2
  => \i => face i
```

For the record, one may also work with the HoTT-book definition of torus:

```aya
example data Torus
| pt
| l1 : pt = pt
| l2 : pt = pt
| tub : concat l1 l2 = concat l2 l1
```

But this is less pleasant to work with, because the boundaries
are using `concat` which is a complicated definition.

## Off-topic interesting results

There is a higher inductive type that is essentially the same as the
interval type:

```aya
open data Interval
| left | right
| line : left = right
```

The elimination rule of `Interval`{} implies function extensionality.
To avoid cheating, we will not use path application or path abstraction
in the proof, to imitate pure MLTT with HITs.

```aya
private def lemma (f g : A → B) (∀ x → f x = g x) : Interval -> A -> B
| f, _, _, left, a => f a
| _, g, _, right, a => g a
| _, _, p, line i, a => p a i

def funExtFromInterval (f g : A → B) (p : ∀ x → f x = g x) : f = g =>
  pmap (lemma f g p) line
```

Note that even though we are using equation combinators like `pmap`{} which
are implemented using path application and abstraction,
it is not considered cheating because these are already theorems in MLTT anyway.
One may also prove them by path induction in cubical type theory, but why bother!
