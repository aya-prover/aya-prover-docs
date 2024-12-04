# JJH (JVM JIT HOAS) compilation for Aya

In this post I'd like to introduce the _JJH_ compilation architecture of the new Aya type checker,
which is based on the JIT (Just-In-Time) compilation on the Java VM for closures implemented using HOAS (Higher-Order Abstract Syntax).
I'll explain.

```aya-hidden
open inductive Nat | Zero | S Nat
open inductive UID
```

## Pros and Cons of HOAS

When implementing an interpreter, we have a meta-level language that we use to write the interpreter itself,
and the object level language which we interpret. In case of higher-order languages,
the object level language will have lambda expressions, and the representation of closures in the meta level language
will be very important for the performance of the interpreter.
To implement closures, we need to represent binders and variable references, and implement a substitution operation.

[several ways]: https://jesper.sikanda.be/posts/1001-syntax-representations.html

This is a relatively well-known and well-studied problem, and there are [several ways] (allow me to delegate the introduction
of this subject to Jesper's blog) to implement it. In the context of Aya we are interested in the locally nameless (LN)
representation and HOAS, and I'll assume brief familiarity with these concepts.

Consider STLC, the syntax can be defined as the following type, assuming an appropriate type `UID`{}:

```aya
inductive TermV1 : Type
| bound (deBruijnIndex : Nat)
| free (name : UID)
| lam (body : TermV1)
| app (fun : TermV1) (arg : TermV1)
```

The important constructor to consider here is `TermV1::lam`{},
whose body will allow the use of bound variables. If a term is completely outside of a `TermV1::lam`{},
it will make no sense. The substitution operation is only performed on bodies of lambdas,
by replacing a De Bruijn index with a term. It might make sense to use types to enforce that:

```aya
inductive ClosureV2 : Type
| mkClosure (body : TermV2)

inductive TermV2 : Type
| bound (deBruijnIndex : Nat)
| free (name : UID)
| lam (body : ClosureV2)
| app (fun : TermV2) (arg : TermV2)

def subst (t : ClosureV2) (s : TermV2) : TermV2 => {??}
```

We can view HOAS as essentially a different implementation of closures,
which instead of traversing and replacing `TermV2::bound`{} with a term,
it constructs terms directly by using a function in the meta-level language:

```aya
inductive ClosureV3 : Type
| mkClosure (body : TermV3 -> TermV3)

inductive TermV3 : Type
| free (name : UID)
| lam (body : ClosureV3)
| app (fun : TermV3) (arg : TermV3)
```

Intuitively, HOAS requires no term traversal to produce the result of substitution,
so it must be a lot faster. In reality, this is true, but only if these meta-level functions are known at the compile
time of the interpreter -- an assumption that is usually false. In practice, we parse the AST from a string,
resolve the names in it, desugar it, and then type check it before producing a term that can be interpreted.
This means we do not know the body of the closure at the compile time. Also, the terms during type checking are _mutable_:
we have _local type inference_ (also known as _solving metavariables_), which involves in creating unknown terms
and replace them with known terms later. This means we also need to _traverse_ the terms, which is unrealistic to HOAS.

To solve this problem, Aya  introduces a _hybrid_ approach.

## Hybrid mode








