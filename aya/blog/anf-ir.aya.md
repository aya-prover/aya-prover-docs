# An IR for Aya

```aya-hidden
open inductive Nat | zero | suc Nat

def infix + Nat Nat : Nat
| zero, n => n
| n, zero => n
| suc m, n => suc (m + n)
| m, suc n => suc (m + n)

def infix * Nat Nat : Nat
| zero, n => zero
| n, zero => zero
| suc m, n => n + (m * n)
```

In the [previous blog post](./jit-compile), we introduced the architecture of the Aya JIT compiler,
where the unfolding behavior (and several other related things) of function definitions are compiled
into JVM bytecode.

We have optimized the compilation process since then, by introducing an intermediate representation (IR)
for it, so we have an opportunity to perform some basic optimizations and transformations on the IR before
generating JVM bytecode.

The Aya compilation pipeline goes through the following stages,
where - means the result of the previous stage:

* parsing (`AyaParser`) : Source code (`String`) → Parse tree (`GenericNode`)
* basic syntax checking : - → Concrete syntax tree (`Expr`)
* resolving and desugaring : - → Concrete syntax tree (`Expr`)
* type checking : - → Core language (`CoreExpr`)
* compilation : - → Aya IR (`AyaIR`)
* JVM bytecode generation : - → JVM class files

There are three important languages: the concrete syntax tree, the core language, and the IR.
If you're familiar with Rust, the concrete syntax tree is like the HIR, the core language is like
the THIR, and the Aya IR is like MIR. If you're unfamiliar with Rust but you know how Aya IR works,
then you basically know how Rust IR works too. This is completely coincidental.

A related change is that we now have `let` expressions in the core, which is a β-redex.
They will be reduced when checking conversion, but will be kept after type checking.
They play a significant role in the code generation and optimization.

## A-Normal Form

The IR does not allow expressions to nest, unlike in the core language.
So, terms like `f (g x) + h y` will be transformed into

```aya-lexer
let var0 = FnCall(g, x)
let var1 = FnCall(f, var0)
let var2 = FnCall(h, y)
let var3 = FnCall(Add, var1, var2)
```

and the use of this expression will be replaced by `var3`.

To different audiences, this form may resemble different things:

* For functional programmers, this is similar to A-normal form (ANF),
  which is an IR for functional languages where arguments to functions must be trivial
  (either constants or variables).
* For compilers, this is similar to three-address code (TAC),
  except that function calls in Aya allow arbitrary many arguments, so it's more like
  "n-address code".

For binding structures, we compile them into a JVM lambda function wrapped in a `Closure` expression.
For example, the core language term `f (λx. x + 1)` will be compiled into

```aya-lexer
let var0 = Closure(x -> {
    let var1 = FnCall(Add, x, 1)
    return var1
  })
let var1 = FnCall(f, var0)
```

And function definitions are compiled into top-level functions.

Now, what benefits does this form bring us?

## Let-elimination

We mentioned earlier that we now have `let` expressions in the core language.
We can compile `let` expreessions directly into the `let` in the IR, and this is referred to
as "let-elimination".

Consider the core language term `let x = f y in g x x`. Using let-elimination it will be compiled into

```aya-lexer
let var0 = FnCall(f, y)
let var1 = FnCall(g, var0, var0)
```

Without let-elimination or let expressions in the core language, this be represented in the core as
`g (f y) (f y)`, which will be compiled into

```aya-lexer
let var0 = FnCall(f, y)
let var1 = FnCall(f, y)
let var2 = FnCall(g, var0, var1)
```

which is not good because of the duplicated computation.
By the way, it's possible to have `let` expressions in the core language and
not let-elimination, which will compile the above into

```aya-lexer
let var0 = FnCall(f, y)
let var1 = Closure(x -> FnCall(g, x, x))
let var2 = Let(var0, var1)
```

which is also not good because of the unnecessary closure creation.

Let-elimination guarantees that `let` introduced by the type checker will be preserved in the IR.
We have replaced several things with `let` expressions in the core language to take advantage of this,
such as the use of function parameters with the presence of pattern matching. For example,

```aya
def foo (param : Nat) : Nat
| zero => param // notice the use of `param`
| suc patternVar => param + patternVar // notice the use of `param`
```

Due to the semantics of pattern matching,
the `param` in the first clause is replaced with `zero`,
and the `param` in the second clause is replaced with `suc patternVar`.
This will introduce some duplication if `param` is used multiple times.
We now compile this substitution as `let` bindings in the beginning of the clause body.

## Tail-recursion optimization

Aya supports explicitly annotated tail-recursive functions:

```aya
def fac-rec (n : Nat) : Nat
| zero => 1
| suc k => fac-rec k * n

tailrec def fac-aux (n : Nat) (acc : Nat) : Nat
| zero, acc => acc
| suc k, acc => fac-aux k (acc * n)

def fac (n : Nat) : Nat => fac-aux n 1
```

The function `fac-rec`() is a recursive implementation of factorial as a reference,
while `fac-aux`() is a tail-recursive implementation of factorial with an accumulator.
The `tailrec` modifier makes the compiler to check all recursive calls to be at the top-level of
the clause bodies, which will guarantee the generated IR to have these recursive calls at tail positions.
Then we can optimize them in the JIT-compiled code (there's no optimization in the interpreter yet).

This looks trivial, as we can just compile the function into a while loop, and for each tail recursion,
we reassign the function parameters and `continue` the loop.
However, since we now introduce these `let` expressions, the function body may not be just a recursive call,
but a recursive call wrapped in a `let` expression.
Consider the second clause of `fac-aux`():

```aya-lexer
// what you might think the core term looks like:
FnCall(fac-aux, k, FnCall(*, acc, n))

// what the core term actually looks like:
Let(ConCall(suc, k), n ->
  FnCall(fac-aux, k, FnCall(*, acc, n)))
```

We want the function body to be `FnCall(fac-aux, ..)`, not a `let`. But with let-elimination,
it's actually what's inside the `let` body that will be at the tail position.
So we can relax the tail-recursion requirement to look inside `let` expressions.

These two features work together nicely!

## Dataflow analysis

With the IR in A-normal form, it's easy to perform certain optimizations on the code.

Consider the expression `f (g x) (g x)`, it is obvious that the `g x` is computed twice,
and it would be nice if we can merge them into one computation. However, there can be potentially
very complex expressions, and looking for common sub-expressions will be very complicated,
because comparing subexpressions is expensive.

Not good!

Using ANF, the expressions are always flat:

```aya-lexer
let var0 = FnCall(g, x)
let var1 = FnCall(g, x)
let var2 = FnCall(f, var0, var1)
```

We can build a table of expressions and the lookup will be linear time in the number of `let` bindings.

Much better!

In fact, since Aya is a pure language, without the tail-recursion optimization,
the IR is already in SSA form, so a lot of analysis techniques from SSA can be applied here,
and we can do a lot of optimizations.

With tail-recursion, there is mutation of function parameters, but that's the only place where we need
to introduce some φ-nodes, so most SSA techniques still apply.

## Trying and testing

In the Aya repl, you can use `:optimized-anf` command followed by a function to see the ANF IR generated for it:

```aya-lexer
> :optimize-anf fac
__58theKid.invoke(UnaryOperator, Term) → Term
  let %0: IntegerTerm := invoke _base$_base_Nat.makeInteger (1)
  let %1: Term := invoke __58theKid$__58theKid_fac_45aux.invoke (arg%0, arg%1, %0)
  return %1
> :optimize-anf fac-aux
__58theKid$__58theKid_fac_45aux.invoke(UnaryOperator, Term, Term) → Term
  loop
    let %0: Term := null
    let %1: Term := null
    let %2: int := 0
    let %3: boolean := false
    breakable
      let %4: Object := invoke arg%0.apply(arg%1)
      let %5: Term := checkcast %4 Term
      if let %6: ConCallLike := %5
        let %7: ConDefLike := invoke %6.ref()
        let %8: _base$_base_Nat_zero := _base$_base_Nat_zero.INSTANCE
        if ref eq %7 %8
          %0 := arg%2
          %2 := 1
          break
      else
        break
      let %6: Object := invoke arg%0.apply(arg%1)
      let %7: Term := checkcast %6 Term
      if let %8: ConCallLike := %7
        let %9: ConDefLike := invoke %8.ref()
        let %10: _base$_base_Nat_suc := _base$_base_Nat_suc.INSTANCE
        if ref eq %9 %10
          let %11: ImmutableSeq := invoke %8.conArgs()
          let %12: Object := invoke %11.get(0)
          let %13: Term := checkcast %12 Term
          %0 := %13
          %1 := arg%2
          %2 := 2
    switch %2 amongst 3
      case 0 →
        let %4: __58theKid$__58theKid_fac_45aux := __58theKid$__58theKid_fac_45aux.INSTANCE
        let %5: ImmutableSeq := invoke ImmutableSeq.of(arg%1, arg%2)
        let %6: FnCall := new (%4, 0, %5)
        return %6
      case 1 → return %0
      default
        let %4: _base$_base_Nat_suc := _base$_base_Nat_suc.INSTANCE
        let %5: IntegerTerm := invoke _base$_base_Nat.makeInteger(0)
        let %6: IntegerOps$ConRule := new (%4, %5)
        let %7: ImmutableSeq := invoke ImmutableSeq.empty()
        let %8: ImmutableSeq := invoke ImmutableSeq.of(%0)
        let %9: RuleReducer$Con := new (%6, 0, %7, %8)
        let %10: Term := invoke %9.make()
        let %11: Term := invoke _base$_base__42.invoke(arg%0, %1, %10)
        arg%1 := %0
        arg%2 := %11
        continue
```

A few remarks on the output:

* The function names are mangled to include the module name and special characters are replaced with their ASCII codes.
* The first parameter of `invoke` is a normalizer for computing the WHNF of terms, which is used in the pattern matching
  state machine,
* `%2` indicats which clause is matched, which is used in the `switch` statement later, where `0` means stuck,
  and it will return the original function call as-is,
* The `default` case in the `switch` statement is the tail-recursive call, which reassigns the function parameters
  and continues the loop,
* This result of code generation is a mixture of both high-level constructs like `breakable` and some low-level JVM stuff.
  This is temporary. We might introduce some further abstractions in the future.

Thank you for reading!
