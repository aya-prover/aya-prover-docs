# So you know some Haskell

Great. I expect you to know something about GHCi and algebraic data types.
This is an Aya tutorial for Haskell programmers.
If you find a bug, open an issue on GitHub!

## Working with the REPL

Aya has a REPL that works similar to GHCi. You can start it by running `aya -i` in your terminal,
and you can start typing definitions or expressions.

```bash
aya -i
```

If you're using jar with java, use the following instead:

```bash
java --enable-preview -jar cli-fatjar.jar -i
```

In the REPL, you can use `:l` to load a file, `:q` to quit, and `:?` to get help.
Use `:t` to show the type. Since it's dependent type, you can toggle normalization levels
by `:normalize` followed by `NF`, `WHNF`, or `NULL` (don't normalize).

To work multiline, use the pair `:{` and `:}` -- same as GHCi.

Aya supports pretty-printing of **any** terms, including ✨lambdas✨.
Note that Aya does not automatically support generic lambdas, so typing
`\x => x` would not work. You need to specify the type of `x`, like `\(x : Int) => x`.

Aya support `fn` as an alias to `\` instead of `λ`, similar to Coq and Lean (but not Agda).
This is because users (especially mathematicians) are likely to use `λ` as a variable name.
Similarly, we used `Fn` over `Pi` or `Π` for the same reason.

## Working with projects

Read [project-tutorial](project-tutorial), it is very short.
It is recommended to practice the following with an Aya project in VSCode,
see [vscode-tutorial](vscode-tutorial).

About modules:

+ Aya module names are separated by `::`, not `.`.
+ Aya infers the module names automagically, using the same rule as of Haskell.
+ Aya imports (`import X`) are qualified by default, use `open import X` to unqualify.
  This is short for `import X` followed by `open X`.
+ Aya supports restricted import `open import X using (x)` (this only imports `x` from `X`) you may also use `open import X hiding (x)` to import everything except `x` from `X`.
+ Aya supports renamed import `open import X using (x as y)` and the meaning is obvious.
+ To re-export, use a `public open`.

Ok, let's write some code!

## Programming in Aya

Natural numbers. In Haskell:

```haskell
data Nat = Zero | Suc Nat
```

In Aya (we replaced the keyword `data` with `inductive` because we want to use it as a package name):

```aya
inductive Nat | zero | suc Nat
```

We don't enforce capitalization of constructors.
The constructors need to be qualified (like `Nat::zero`) to access.
As you may expect, `Nat` automatically becomes a module, so we can use `open` and `public open`
to unqualify the constructors.

Bonus: if you define a data type that _looks like_ `Nat`, then you can use numeric literals.

Functions are defined with `def`, followed by pattern matching.
Consider this natural number addition in Haskell (intentionally not called `+` to avoid name clash with Prelude):

```haskell
(<+>) :: Nat -> Nat -> Nat
Zero <+> n = n
Suc m <+> n = Suc (m <+> n)

infixl 6 <+>
```

In Aya (remember the numeric literal thing?):

```aya
open Nat
def infixl <+> Nat Nat : Nat
| 0, n => n
| suc m, n => suc (m <+> n)
```

There are plenty of differences. Let's go through them one by one.

The `infixl` declares `<+>` to be a left-associative infix operator.
Other options include `infix`, `infixr`, `fixl`, and `fixr`.
Without it, the function will work the same as normal function.
Unlike Haskell, we do not distinguish "operator" names and "function" names.

We do not use a number to denote precedence, but a partial order.
This allows arbitrary insertion of new precedence level into previously defined ones.
Say you want `<+>` to have a lower precedence than `<*>`, you can do:

```aya-lexer
def infixl <+> Nat Nat : Nat
/// .... omitted
looser <*>
```

You also have `tighter`, with the obvious meaning.

The parameters and the return type are separated using `:`. The parameter types can
be written directly, without `->`. Aya allow naming the parameters like this:

```aya-lexer
def oh (x : Nat) : Nat
```

These names can be used for one-linear function bodies:

```aya
def oh (x : Nat) : Nat => x
```

Aya supports a painless version of the section syntax, where the top-level does
not need parentheses. See the following REPL output (the underscored names
are internally generated variable names. If you have an idea on how to make them
better, open an issue and let's discuss!).

```
> 1 <+>
suc

> <+> 1
λ _7 ⇒ _7 <+> 1

> 1 <+> 1
suc 1

> 2 <+>
λ _5 ⇒ suc (suc _5)

> <+> 2
λ _7 ⇒ _7 <+> 2
```

When we only need to pattern match on a subset of the parameters, we can use the `elim` keyword:

```aya
example def infixl [+] (a n : Nat) : Nat elim a
| 0 => n
| suc m => suc (m [+] n)
```

## Type-level programming

In Haskell:

```haskell
id :: a -> a
id x = x
```

In Aya:

```aya
def id {A : Type} (x : A) => x
```

Observations:

+ Type parameters have to be explicitly qualified using curly braces.
+ Curly braces denote parameters that are omitted (and will be inferred by type checker)
  in the pattern matching and invocations.
  So, parentheses denote parameters that are **not** omitted.
+ Apart from `Type`, we also have `Set`, and `ISet`. For now, don't use the others.

Type constructors are like `{F : Type -> Type}` (and yes, the `->` denotes function types,
works for both values and types), very obvious. Definition of `Maybe` in Aya:

```aya
open inductive Maybe (A : Type)
| nothing
| just A
```

Here, `(A : Type)` is an explicit parameter, because you write `Maybe Nat`, not just `Maybe`.

There is a way to automagically insert the implicit parameters -- the `variable` keyword.

```aya
variable A : Type

// Now, since you are using A, so Aya inserts {A : Type}
example def id (x : A) => x
```

Aya supports type aliases as functions. For example, we may define the type of binary
operators as a function:

```aya
def BinOp (A : Type) => A -> A -> A
```

Then, we can define `<+>` as:

```aya
example def infixl <+> : BinOp Nat
| 0, n => n
| suc m, n => suc (m <+> n)
```

## Type families

In Aya, type families are functions. Consider the following code
(they are using the `variable A` defined above):

```aya
// Unit type
open inductive Unit | unit

// A type family
def FromJust (x : Maybe A) : Type
| just a => A
| nothing => Unit

// A function that uses the type family
def fromJust (x : Maybe A) : FromJust x
| just a => a
| nothing => unit
```

And `fromJust (just a)` will evaluate to `a`.
In Haskell, you need to use some language extensions alongside some scary keywords.
These functions are available in constructors, too:

```aya
inductive Example (A : Type)
| cons (x : Maybe A) (FromJust x)
```

It is recommended to play with it in the REPL to get a feel of it.

There is a famous example of dependent types in Haskell -- the sized vector type:

```haskell
{-# LANGUAGE GADTs #-}
{-# LANGUAGE DataKinds #-}
-- Maybe you need more, I don't remember exactly

data Vec :: Nat -> Type -> Type where
  Nil :: Vec Zero a
  (:<) :: a -> Vec n a -> Vec (Suc n) a
infixr :<
```

In Aya, we have a better syntax:

```aya
open inductive Vec (n : Nat) (A : Type)
| 0, A => nil
| suc n, A => infixr :< A (Vec n A)
```

The `:<`() constructor is defined as a right-associative infix operator.
And yes, you can define like vector append painlessly:

```aya
variable m n : Nat

def infixr ++ (Vec n A) (Vec m A) : Vec (n <+> m) A
| nil, ys => ys
| x :< xs, ys => x :< xs ++ ys
tighter :<
```

Imagine how much work this is in Haskell.

## Overlapping patterns

There is one more bonus: in Aya, you may modify the definition of `<+>` to be:

```aya-lexer
overlap def infixl <+> Nat Nat : Nat
| 0, n => n
| n, 0 => n
| suc m, n => suc (m <+> n)
```

It says we not only compute `0 + n = n`, but when the first parameter is neither `0` nor `suc`,
we may take a look at the second parameter and seek for other potential computations.
This is completely useless at runtime, but very good for type checking.
For instance, we may want a `Vec`() of size `n`, and what we have is some `Vec`() of size `n + 0`.
Then having `n + 0` to directly reduce to `n` is very useful,
otherwise we will need to write a conversion function that does nothing but changes the type,
or use `unsafeCoerce`.

With `n + 0 = n` judgmentally, we now have more possibilities.
For instance, we can make `xs ++ nil = xs`. This involves in two steps: we first turni `++` into
a `overlap def`, then we add the following clause to `++`:

```aya-lexer
| xs, nil => xs
```

This makes `++` compute on more cases too.

For more information about this feature, checkout the [tutorial for proof assistant users](prover-tutorial).
