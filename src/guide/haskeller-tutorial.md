# So you know some Haskell

Great. I expect you to know something about GHCi and algebraic data types.
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

In Aya:

```
data Nat | zero | suc Nat
```

We don't enforce capitalization of constructors.
The constructors need to be qualified (like `Nat::zero`) to access.
As you may expect, `Nat` automatically becomes a module, so we can use `open` and `public open`
to unqualify the constructors.

Bonus: if you define a data type that _looks like_ `Nat`, then you can use numeric literals.

Functions are defined with `def`, followed by pattern matching.
Consider this natural number addition in Haskell:

```haskell
(<+>) :: Nat -> Nat -> Nat
Zero <+> n = n
Suc m <+> n = Suc (m <+> n)

infixl 6 <+>
```

In Aya (remember the numeric literal thing?):

```
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

```
def infixl <+> Nat Nat : Nat
/// .... omitted
looser <*>
```

You also have `tighter`, with the obvious meaning.

The parameters and the return type are separated using `:`. The parameter types can
be written directly, without `->`. Aya allow naming the parameters like this:

```
def oh (x : Nat) : Nat
```

These names can be used for one-linear function bodies:

```
def oh (x : Nat) : Nat => x
```

For easily inferrable types, you can replace it with `_` and hope:

```
def oh (x : _) : Nat => x
```

Aya supports a painless version of the section syntax, where the top-level does
not need parentheses. See the following REPL output.

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

## Type-level programming

In Haskell:

```haskell
id :: a -> a
id x = x
```

In Aya:

```
def id {A : Type} (x : A) => x
```

Observations:

+ Type parameters have to be explicitly qualified using curly braces.
+ Curly braces denote parameters that are omitted (and will be inferred by type checker)
  in the pattern matching and invocations.
  So, parentheses denote parameters that are **not** omitted.
+ Apart from `Type`, we also have `Set`, `Prop`, and `ISet`. For now, don't use the others.

Type constructors are like `{F : Type -> Type}` (and yes, the `->` denotes function types,
works for both values and types), very obvious. Definition of `Maybe` in Aya:

```
data Maybe (A : Type) | nothing | just A
```

Here, `(A : Type)` is an explicit parameter, because you write `Maybe Nat`, not just `Maybe`.

There is a way to automagically insert the implicit parameters -- the `variable` keyword.

```
variable A : Type

// Now, since you are using A, so Aya inserts {A : Type}
def id (x : A) => x
```

## Dependent types

In Aya, type families are functions. Consider the following code
(they are using the `variable A` defined above):

```
// Unit type
open data Unit | unit

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

```
data Example (A : Type)
| cons (x : Maybe A) (FromJust x)
```

It is recommended to play with it in the REPL to get a feel of it.

There is a famous example of dependent types in Haskell -- the sized vector type:

```haskell
{-# LANGUAGE GADTs #-}
{-# LANGUAGE DataKinds #-}
-- Maybe you need more, but I don't recall. Sorry.

data Vec :: Nat -> Type -> Type where
  Nil :: Vec Zero a
  (:<) :: a -> Vec n a -> Vec (Suc n) a
infixr :<
```

In Aya, we have a better syntax:

```
data Vec (n : Nat) (A : Type)
| 0, A => nil
| suc n, A => infixr :< A (Vec n A)
```

The `:<` constructor is defined as a right-associative infix operator.
And yes, you can define like vector append painlessly:

```
variable n : Nat

def infixr ++ (Vec n A) (Vec m A) : Vec (n <+> m) A
| nil, ys => ys
| x :< xs, ys => x :< xs ++ ys
tighter :<
```

Imagine how much work this is in Haskell.

<!--
There is one more bonus: in Aya, you may modify the definition of `<+>` to be:

```
def overlap infixl <+> Nat Nat : Nat
| 0, n => n
| n, 0 => n
| suc m, n => suc (m <+> n)
```

Then we may add the following clause to `++`:

```
| xs, nil => xs
```
-->
