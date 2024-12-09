# Type Theory in Type Theory using Quotient Inductive Types

[Link](https://www.cs.nott.ac.uk/~psztxa/publ/tt-in-tt.pdf) to the original paper
(which can also be found in [related papers](/guide/readings)).

Here's a self-contained full definition.

## Prelude

```aya
prim I
prim Path
prim coe

variable A B : Type
def infix = (a b : A) : Type => Path (\i => A) a b
def refl {a : A} : a = a => \i => a
def pmap (f : A -> B) {a b : A} (p : a = b) : f a = f b => \i => f (p i)

// Copied from Carlo Angiuli's thesis
def transport {a b : A} (B : A -> Type) (p : a = b) (x : B a) : B b
  => coe 0 1 (\y => B (p y)) x
```

## Context

```aya
open inductive Con : Type
| •
| infix ▷ (Γ : Con) (Ty Γ)
```

An instance of the type `Con`{} corresponds to the $Γ$ in the judgment $Γ~\text{ctx}$, and these constructors correspond (on-the-nose) to:

$$
\cfrac{}{·~\text{ctx}}
\quad
\cfrac{Γ~\text{ctx} \quad Γ⊢A~\text{type}}{Γ \vartriangleright A~\text{ctx}}
$$

It uses the judgment $Γ⊢A~\text{type}$, which is defined below.

## Types

```aya
open inductive Ty (Γ : Con) : Type
| U
| Π (A : Ty Γ) (B : Ty (Γ ▷ A))
| El (A : Tm Γ U)
| Subst {Δ : Con} (Ty Δ) (s : Γ << Δ)
| SubId {A : Ty Γ} : Subst A (id refl) = A
| SubAss {Δ Θ : Con} {A : Ty Θ} {θ : Γ << Δ} {δ : Δ << Θ}
  : Subst (Subst A δ) θ = Subst A (δ ∘ θ)
| SubU {Δ : Con} (δ : Γ << Δ) : Subst U δ = U
| SubEl {Δ : Con} {δ : Γ << Δ} {a : Tm Δ U}
  : Subst (El a) δ = El (transport (Tm _) (SubU δ) (sub a))
| SubΠ {Δ : Con} (σ : Γ << Δ) {A : Ty Δ} {B : Ty (Δ ▷ A)}
  : Subst (Π A B) σ = Π (Subst A σ) (Subst B (ext σ A))
```

The `ext`{} operator corresponds to the ↑ operator in the paper:

```aya
variable Γ Δ : Con
def ext (δ : Γ << Δ) (A : Ty Δ) : Γ ▷ Subst A δ << Δ ▷ A =>
  δ ∘ π₁ (id refl) ∷ transport (Tm _) SubAss (π₂ (id refl))
```

An instance of the type `Ty Γ`{} corresponds to the $A$ in the judgment $Γ⊢A~\text{type}$.
The constructor `U`{} corresponds to the following rule:

$$
\cfrac{}{Γ⊢\mathcal{U}~\text{type}}
$$

I believe you already know how `Π`{} works.
The constructor `El`{} computes the type corresponds to an instance of `U`{}:

$$
\cfrac{Γ⊢A:\mathcal{U}}{Γ⊢\text{El}(A)~\text{type}}
$$

Note that it uses the judgment $Γ⊢A:\mathcal{U}$, which is defined below.

## Substitution objects

```aya
open inductive infix << (Γ : Con) (Δ : Con) : Type
   tighter = looser ▷
| _, • => ε
| _, Δ' ▷ A => infixr ∷ (δ : Γ << Δ') (Tm Γ (Subst A δ)) tighter =
| infix ∘ {Θ : Con} (Θ << Δ) (Γ << Θ) tighter = ∷
| π₁ {A : Ty Δ} (Γ << Δ ▷ A)
| id (Γ = Δ)
| idl• {s : Γ << Δ} : id refl ∘ s = s
| idr• {s : Γ << Δ} : s ∘ id refl = s
| ass {Θ Ξ : Con} {ν : Γ << Ξ} {δ : Ξ << Θ} {σ : Θ << Δ}
  : (σ ∘ δ) ∘ ν = σ ∘ (δ ∘ ν)
| π₁β {δ : Γ << Δ} {A : Ty Δ} (t : Tm Γ (Subst A δ)) : π₁ (δ ∷ t) = δ
| _, _ ▷ _ => πη {δ : Γ << Δ} : (π₁ δ ∷ π₂ δ) = δ
| _, Δ' ▷ A => ∷∘ {Θ : Con} {σ : Θ << Δ'} {δ : Γ << Θ} {t : Tm Θ (Subst A σ)}
  : (σ ∷ t) ∘ δ = (σ ∘ δ) ∷ transport (Tm _) SubAss (sub t)
| _, • => εη {δ : Γ << •} : δ = ε
```

An instance of type `Γ << Δ`{} corresponds to the $σ$ in the substitution typing $Γ ⊢ σ : Δ$.

## Terms

```aya
open inductive Tm (Γ : Con) (Ty Γ) : Type
| _, Π A B => λ (Tm (Γ ▷ A) B)
| Γ' ▷ A, B => app (Tm Γ' (Π A B))
| _, Subst A δ => sub (Tm _ A)
| _, Subst A (π₁ δ) => π₂ (Γ << _ ▷ A)
| _, Subst B δ as A => π₂β {Δ : Con} (t : Tm Γ A)
  : transport (Tm _) (pmap (Subst B) (π₁β t)) (π₂ (δ ∷ t)) = t
| _ ▷ _, A => Πβ (f : Tm Γ A) : app (λ f) = f
| _, Π _ _ as A => Πη (f : Tm Γ A) : λ (app f) = f
| _, Π A B => subλ {Δ : Con} {σ : Γ << Δ} {A' : Ty Δ} {B' : Ty (Δ ▷ A')}
  (fording : Π (Subst A' σ) (Subst B' _) = Π A B) {t : Tm (Δ ▷ A') B'}
  : let ford := transport (Tm _) fording
    in ford (transport (Tm _) (SubΠ σ) (sub (λ t)))
     = ford (λ (sub t))
```

An instance of type `Tm Γ A` corresponds to the $t$ in the judgment $Γ⊢t:A$.
