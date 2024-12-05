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

This is a relatively well-known and well-studied problem, and there are
[several ways](https://jesper.sikanda.be/posts/1001-syntax-representations.html)
(allow me to delegate the introduction of this subject to Jesper's blog) to implement it.
In the context of Aya we are interested in the locally nameless (LN)
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
whose body will allow the use of bound variables. If a term is completely outside a `TermV1::lam`{},
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

def applyV2 (t : ClosureV2) (s : TermV2) : TermV2 => {??}
```

By designing the term structure like this, it is clear that which terms are meant to be applied.
In the implementation of `applyV2`{}, we traverse `t` and build a new term based on `t`.

HOAS implements closures and substitution differently,
which instead of traversing and replacing `TermV2::bound`{} with a term,
it constructs terms directly by using a function in the meta-level language
(the definition below is accepted because Aya doesn't yet have a positivity checker):

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

1.  We have _local type inference_ (also known as _solving metavariables_), which involves in creating unknown terms
   and replace them with known terms later. This means we also need to _traverse_ and _mutate_ the terms, which is unrealistic for HOAS (this can be done in a very slow way).
2. We support type checking _recursive_ functions. When checking the body of a recursive function, the recursive calls cannot be unfolded
   because the body is not yet constructed, and before termination check we cannot really know if unfolding such definitions is a good idea.
   But once the type checking finishes, these self-references will become unfoldable. So, at least something needs to be modified -- either
   the terms or the evaluation context.

Some may argue that one can mutate HOAS by implementing a function like this:

```hs
transformTerm :: Term -> Term
transformClosure :: Closure -> Closure
-- body :: Term -> Term
transformClosure (mkClosure body) = mkClosure (\t ->
   transformTerm (body t))
```

This is a very bad idea, because it will run `transformTerm` every time the closure is applied, while for locally nameless approach, the transformation is done only once.
This is caused by the fact that the meta-level language does not have computation under
binders, so `transformTerm (body t)` does not compute for `body`.
If the meta-level language has some symbolic computation abilities, then this approach is slightly more reasonable,
but in practice a meta-level language with such abilities is not as efficient.

To solve this problem, Aya introduces a _hybrid_ approach.

## Combining HOAS and Locally Nameless

We introduce the closure to allow _two_ representations of closures:
one for HOAS, and one for any first-order syntax such as locally nameless.
Then, we define substitution on both variants.

```aya
open inductive ClosureV4 : Type
| mkJit (body : TermV4 -> TermV4)
| mkLn (body : TermV4)

// The locally-nameless substitution,
// replacing the outermost bound variable in `t` with `s`.
def substV4 (t : TermV4) (s : TermV4) : TermV4 => {??}

// `elim t` means we only intend to pattern match on `t`.
def applyV4 (t : ClosureV4) (s : TermV4) : TermV4 elim t
| mkJit body => body s
| mkLn body => substV4 body s
```

During type checking, we use the locally nameless representation `mkLn`{}, so we have the freedom to mutate them and transform as we wish.
When type checking is done for a cluster of definitions, and the terms are finalized, we generate the meta-level code for the HOAS function bodies,
and then we dynamically compile these functions and replace the implementation of closures with the compiled functions in the `mkJit` variant.

This process is very similar to JIT-compilation in the usual sense, but slightly different:
since the terms are used for type checking, we have to preserve all the type information at runtime,
and the JIT-compiled code should deal with open terms.
These are not present in the traditional JIT compilation, but with HOAS it's very easy to do.
The dynamic compilation is based on the class loading mechanism of the JVM,
therefore we refer to this process as _JJH_ (JVM JIT HOAS). All three components are essential to the approach!

To support locally nameless we have to also include `TermV4::bound`{}:

```aya
inductive TermV4 : Type
| bound (deBruijnIndex : Nat)
| free (name : UID)
| lam (body : ClosureV4)
| app (fun : TermV4) (arg : TermV4)
```

In fact, we can extend it with more constructors with closures,
and it is very clear how the binders work just by looking at the term structure:

```aya
| pi (domain : TermV4) (codomain : ClosureV4)
```

We will never forget to substitute the codomain of a pi type because otherwise there will be a type error in the meta-level language.

## Related Work

Coq has two tactics that seemingly do similar things: `vm_compute` and `native_compute`.
The `vm_compute` tactic translates Coq terms to an abstract machine (not using HOAS),
evaluate it and _read-back_ the result to Coq terms (also not in HOAS),
while `native_compute` produces machine code and do something similar, but using HOAS in the generated code.
For the purpose of conversion checking, it is enough to just compare the results of
the abstract machine, and reading back the result is not necessary.

The native code generation is known to be faster than the VM-based approaches,
as described in the paper _Full Reduction at Full Throttle_,
and the prior work on `vm_compute` is described in _A Compiled Implementation of Strong Reduction_.
Both papers can be found in [related papers](/guide/readings).

Aya reuses JVM, a highly optimized VM with two JIT compilers that produce machine code,
and has HOAS built-in to the core language, so there is no need of reading back -- the result of compilation is directly used in our core
language rather than a separately defined language. This also makes it less errorprone because a bug in the compiled code is
a bug in the core language, which is well-understood and well-tested.
But then the correctness (mainly type safety) of the core language relies on the correctness of the JJH compiler,
which we do not intend to formally verify, but we believe (with reasonable confidence due to the amount of testing) that it is correct.

Speaking of VM-based evaluation, Lean4 also has an evaluator based on a VM for interpreting code,
and Agda also seems to have an abstract machine for reducing code.
These two evaluators, together with `vm_compute`, are based on a VM written by the proof assistant developers,
which may not be the most efficient VM, and apparently these VMs do not have a second JIT compiler that produces machine code.

JJH relies on the fact that the type checker is written in a VM-based language, but we can do the same thing in a native language
by using the JIT compilation feature of LLVM or GCC.
In the first _Workshop on Implementations of Type Systems_ (WITS), I had the privilege to listen to an exciting talk on an
ongoing work on Lean4 that JIT-compiles tactics to native code. They will have a similar advantage to JJH, but it only works on
tactics rather than the whole language.

When I was at the workshop, I was very jealous of the Lean team to have the manpower and resource to do such a thing --
I have been dreaming to do it for a long time (inspired by the work by András Kovács and Minghao Liu on `mlang`).
But look at what we've done now! I am satisfied ♪(≧∀≦)ゞ.
