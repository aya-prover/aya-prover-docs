# Well, so you know some Haskell

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
by `:normalize` followed by `NF`, `WHNF`, or `NULL` (means don't normalize).

To work multiline, use the pair `:{` and `:}` -- same as GHCi.

## Programming in Aya

An Aya project consists of a directory with a `aya.json` file (project metadata)
and a `src` directory for source code. Here's a sample `aya.json`:

```json
{
  "ayaVersion": "0.23",
  "name": "<project name>",
  "version": "<project version>",

  "dependency": {
    "<name of dependency>": { "file": "<directory to your dependency>" },
    // We plan to support other sources of dependencies, but you know,
    // we do not have money to host a package repository.
  }
}
```

About modules:

+ Aya module names are separated by `::`, not `.`.
+ Aya infers the module names automagically, using the same rule as of Haskell.
+ Aya imports (`import X`) are qualified by default, use `open import X` to unqualify.
  This is short for `import X` followed by `open X`.
+ Aya supports restricted import `open import X using (x)` (this only imports `x` from `X`) you may also use `open import X hiding (x)` to import everything except `x` from `X`.
+ Aya supports renamed import `open import X using (x as y)` and the meaning is obvious.
+ To re-export, use a `public open`.

Ok, natural numbers. In Haskell:

```haskell
data Nat = Zero | Suc Nat
```

In Aya:

```aya
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

```aya
def infixl <+> Nat Nat : Nat
| 0, n => n
| suc m, n => suc (m <+> n)
```

The `infixl` declares `<+>` to be a left-associative infix operator.
Other options include `infix`, `infixr`, `fixl`, and `fixr`.
Without it, the function will work the same as normal function.
Unlike Haskell, we do not distinguish "operator" names and "function" names.

We do not use a number to denote precedence, but a partial order.
This allows arbitrary insertion of new precedence level into previously defined ones.
Say you want `<+>` to have a lower precedence than `<*>`, you can do:

```aya
def infixl <+> Nat Nat : Nat
/// .... omitted
looser <*>
```

You also have `tighter`, with the obvious meaning.