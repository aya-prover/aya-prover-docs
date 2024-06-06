# Extended pruning for pattern unification

```aya
prim I
prim Path (A : I -> Type) (a : A 0) (b : A 1) : Type
```

The vanilla pattern unification is very limited.
Consider:

```aya-hidden
prim coe
variable A B : Type
def infix = (a b : A) => Path (\i => A) a b
def refl {a : A} : a = a => fn i => a

open inductive Nat
| zero
| suc Nat
overlap def infix + Nat Nat : Nat
| 0, n => n
| n, 0 => n
| suc m, n => suc (m + n)
| m, suc n => suc (m + n)
tighter =
def pmap (f : A -> B) {a b : A} (p : a = b) : f a = f b
   => fn i => f (p i)
variable n m o : Nat
// Definitions
open inductive Vec (n : Nat) (A : Type)
| 0, A => nil
| suc n, A => infixr :< A (Vec n A)
overlap def infixr ++ (Vec n A) (Vec m A) : Vec (n + m) A
| nil, ys => ys
| ys, nil => ys
| x :< xs, ys => x :< xs ++ ys
tighter :< =
def +-assoc {a b c : Nat} : (a + b) + c = a + (b + c) elim a
| 0 => refl
| suc _ => pmap suc +-assoc
def ++-assoc-type (xs : Vec n A) (ys : Vec m A) (zs : Vec o A)
  =>
```

```aya
 Path (fn i => Vec (+-assoc i) A)
      ((xs ++ ys) ++ zs)
      (xs ++ (ys ++ zs))
```

This is the equality between two sized vectors: `(xs ++ (ys ++ zs))` and `((xs ++ ys) ++ zs)`,
the left hand side has type `Vec (xs.size ++ (ys.size ++ zs.size)) A`,
and the right hand side has type `Vec ((xs.size ++ ys.size) ++ zs.size)`.

So, the equality type is heterogeneous, and I introduce a type `Vec (+-assoc i) A` for it, where `+-assoc`{} is the associativity.

So this should type check, right? But pattern unification fails! I've left the two sides of `+-assoc`{} implicit,
so I'm supposed to infer what numbers' associativity I care about, using pattern unification.

Then, pattern unification _fails_ because the constraints are generated from cubical boundaries,
where the "interval" variable is substituted to its sides. So, we have this type
(the `Path`{} is called `PathP` in Agda):

```
Γ ­⊢ Path (fn i => Vec (+-assoc i) Nat) vecA vecB
```

Note the type of `+-assoc`{} is `+-assoc`{show=type}.

So elaboration inserts metavariables:

```
Γ ­⊢ Path (fn i => Vec (+-assoc {?} {?} {?} i) Nat) vecA vecB
```

Where these metavariables have the following scope:

```
Γ , i : I ­⊢ ? : Nat
```

Note that the `i : I` binding is in-scope. So the metavariables with their spines added together becomes:

```
Γ ­⊢ Path (fn i => Vec (+-assoc {?a Γ i} {?b Γ i} {?c Γ i} i) Nat) vecA vecB
```

Then, we get the following tycking problems, according to the rules of `Path`{}:

```
vecA : Vec (+-assoc {?a Γ 0} {?b Γ 0} {?c Γ 0} 0) Nat
vecB : Vec (+-assoc {?a Γ 1} {?b Γ 1} {?c Γ 1} 1) Nat
```

Look at the spines of all of these metavariables. None of them are in pattern fragment.
So _every_ equality constraint cannot be solved by pattern, because they're always equality _after a substitution_!

This can be solved by further extending your algorithm with pruning or a constraint system with a "lax"
mode of solving metas when your equations rely essentially on non-pattern equations,
but I feel it has defeated the point of finding the most general solution,
which I used to believe to be the purpose of pattern unification....

## Case Study

Right now Aya will try to prune these non-pattern arguments out and try to solve them.
This obviously generates non-unique solutions, but I think it will be useful in practice.

In Agda, the following code is in the library:

```
++-assoc : ∀ {m n k} (xs : Vec A m) (ys : Vec A n) (zs : Vec A k) →
          PathP (λ i → Vec A (+-assoc m n k (~ i)))
          ((xs ++ ys) ++ zs) (xs ++ ys ++ zs)
++-assoc {m = zero} [] ys zs = refl
++-assoc {m = suc m} (x ∷ xs) ys zs i = x ∷ ++-assoc xs ys zs i
```

However, if we replace the `m` with `_`, Agda will fail with the following error:

```
Failed to solve the following constraints:
  _41 (xs = (x ∷ xs)) (ys = ys) (zs = zs) = x ∷ ++-assoc xs ys zs i1
    : Vec A
      (+-assoc (_m_39 (xs = (x ∷ xs)) (ys = ys) (zs = zs) (i = i1)) n k
       (~ i1))
    (blocked on any(_41, _57))
  _40 (xs = (x ∷ xs)) (ys = ys) (zs = zs) = x ∷ ++-assoc xs ys zs i0
    : Vec A
      (+-assoc (_m_39 (xs = (x ∷ xs)) (ys = ys) (zs = zs) (i = i0)) n k
       (~ i0))
    (blocked on any(_40, _57))
  +-assoc (_m_39 (xs = xs) (ys = ys) (zs = zs) (i = i)) n k (~ i)
    = _n_49
    : ℕ
    (blocked on _n_49)
  +-assoc (_m_39 (xs = (x ∷ xs)) (ys = ys) (zs = zs) (i = i)) n k
  (~ i)
    = ℕ.suc _n_49
    : ℕ
    (blocked on _m_39)
  _40 (xs = []) (ys = ys) (zs = zs)
    = _41 (xs = []) (ys = ys) (zs = zs)
    : _x.A_43
    (blocked on any(_40, _41))
  _x.A_43
    = Vec A
      (+-assoc (_m_39 (xs = []) (ys = ys) (zs = zs) (i = i)) n k (~ i))
    : Type
    (blocked on _x.A_43)
  _m_39 (i = i0) = m : ℕ (blocked on _m_39)
  _m_39 (i = i1) + (n + k) = m + (n + k) : ℕ (blocked on _m_39)
```

In Aya, this will raise the following warning:

```
  6 │       def ++-assoc-type (xs : Vec n A) (ys : Vec m A) (zs : Vec o A)
  7 │         => Path (fn i => Vec (+-assoc i) A)
  8 │         (xs ++ (ys ++ zs))
    │          ╰──────────────╯ ?a n A m o xs ys zs 0 >= n, ?b n A m o xs ys zs 0 >= m,
                                ?c n A m o xs ys zs 0 >= o
  9 │         ((xs ++ ys) ++ zs)
    │          ╰──────────────╯
    │          ╰──────────────╯ ?a n A m o xs ys zs 1 >= n, ?b n A m o xs ys zs 1 >= m,
                                ?c n A m o xs ys zs 1 >= o

Info: Solving equation(s) with not very general solution(s)
```

The inline equations are the type checking problems that Aya did something bad to solve.

Conor McBride told me pattern unification is a good algorithm, but the problem of interest
might not be what we think it is. It is good for _undergraduate induction_, i.e. the
object being induct on is a variable, and the _motive_ of such induction is pattern.
This is an enlightening perspective!
But now that we have more problems, I think we might want to extend it.
Just think about how many people use `--lossy-unification` in Agda.
