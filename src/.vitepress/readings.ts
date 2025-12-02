import type { Author, PublicationItem, Publications } from "./interface"
const mb: Author = {
  name: 'Conor McBride',
  // Doesn't support https
  link: 'http://strictlypositive.org',
};
const coquand: Author = {
  name: 'Thierry Coquand',
  link: 'https://www.cse.chalmers.se/~coquand',
};
const cohen: Author = {
  name: 'Cyril Cohen',
  link: 'https://perso.crans.org/cohen'
};
const akJR: Author = {
  name: 'András Kovács',
  link: 'https://andraskovacs.github.io',
};
const akaposi: Author = {
  name: 'Ambrus Kaposi',
  link: 'https://akaposi.github.io'
};
const simonHuber: Author = {
  name: 'Simon Huber',
  link: 'https://simhu.github.io',
};
const brunerie: Author = {
  name: 'Guillaume Brunerie',
  link: 'https://guillaumebrunerie.github.io',
};
const aa: Author = {
  name: 'Andreas Abel',
  link: 'https://www.cse.chalmers.se/~abela',
};
const saizan: Author = {
  name: 'Andrea Vezzosi',
  link: 'https://saizan.github.io',
};
const andersMortberg: Author = {
  name: 'Anders Mörtberg',
  link: 'https://staff.math.su.se/anders.mortberg',
};
const agdakx: Author = {
  name: 'Jesper Cockx',
  link: 'https://jesper.sikanda.be',
};
const bob: Author = {
  name: 'Robert Harper',
  link: 'https://www.cs.cmu.edu/~rwh',
};
const carlo: Author = {
  name: 'Carlo Angiuli',
  link: 'https://carloangiuli.com',
};
const danielGratzer: Author = {
  name: 'Daniel Gratzer',
  link: 'https://www.danielgratzer.com',
};
const jon: Author = {
  name: 'Jon Sterling',
  link: 'https://www.jonmsterling.com',
};
const loic: Author = {
  name: 'Loïc Pujet',
  link: 'https://pujet.fr',
};
const tabareau: Author = {
  name: 'Nicolas Tabareau',
  link: 'https://tabareau.fr'
};
const favonia: Author = {
  name: 'Kuen-Bang Hou (Favonia)',
  link: 'https://favonia.org',
};
const benjaminGregoire: Author = {
  name: 'Benjamin Grégoire',
  link: 'https://www-sop.inria.fr/members/Benjamin.Gregoire',
}
const brigittePientka: Author = {
  name: 'Brigitte Pientka',
  link: 'https://www.cs.mcgill.ca/~bpientka',
}
const altenkirch: Author = {
  name: 'Thorsten Altenkirch',
  link: 'https://people.cs.nott.ac.uk/psztxa',
}
const jcreed: Author = {
  name: 'Jason Reed',
  link: 'http://jcreed.org',
}

const universes: PublicationItem[] = [
  {
    title: 'Crude but Effective Stratification',
    authors: [mb],
    links: [['slides', 'https://personal.cis.strath.ac.uk/conor.mcbride/Crude.pdf']],
    venue: 'Unpublished Manuscript',
    comment: `This is the foundation of universe polymorphism in Aya. I prefer calling this design
      'McBride universes' to emphasize the origin. The design decision is subject to changes, though --\
      in case there is any substantial expressiveness limitation in practice.`
  },
  {
    title: 'Generalized Universe Hierarchies and First-Class Universe Levels',
    authors: [akJR],
    links: [['arxiv', '2103.00223']],
    comment: `Just an interesting idea, not used in Aya.`
  },
  {
    title: 'Dependently typed lambda calculus with a lifting operator',
    authors: [{
      name: 'Damien Rouhling',
      link: 'https://www-sop.inria.fr/members/Damien.Rouhling'
    }],
    links: [['online', 'https://www-sop.inria.fr/members/Damien.Rouhling/data/internships/M1Report.pdf']],
    comment: `A more implementation-oriented write-up of McBride universe, specifying
      the equational theory for terms.`
  },
  {
    title: 'An Order-Theoretic Analysis of Universe Polymorphism',
    venue: 'POPL 2023',
    authors: [
      favonia, carlo,
      { name: 'Reed Mullanix' },
    ],
    links: [
      ['online', 'https://favonia.org/files/mugen.pdf'],
      ['doi', '10.1145/3571250'],
    ],
    comment: `This paper justifies the theoretical strength and generality of McBride universe.`
  },
  {
    title: 'Impredicative Observational Equality',
    authors: [tabareau, loic],
    venue: 'POPL 2023',
    links: [
      ['hal', 'hal-03857705'],
      ['doi', '10.1145/3571739']
    ],
    comment: `This paper adds observational equality to calculus of constructions.
      The impredicativity part I don't really care that much, but the overly complicated treatment
      of indexed families reminds me of transpX in cubical Agda. Maybe Aya is right about avoiding
      indexed families in the core type theory.`
  },
  {
    title: 'Failure of Normalization in Impredicative Type Theory with Proof-Irrelevant Propositional Equality',
    authors: [aa, coquand],
    venue: 'LMCS 2020',
    links: [
      ['arxiv', '1911.08174'],
    ],
    comment: `TL;DR: the normal form of proofs of strict propositions need a special definition, and do not
      try to reduce these proof terms.`
  }
]

const equality: PublicationItem[] = [
  // {
  //   title: 'Separating Path and Identity Types in Presheaf Models of Univalent Type Theory',
  //   authors: [{ name: 'Andrew Swan' }],
  //   links: [['arxiv', '1808.00920']],
  // },
  // {
  //   title: 'A Syntax for Higher Inductive-Inductive Types',
  //   authors: [akaposi, akJR],
  //   venue: 'FSCD 2018',
  //   links: [['doi', '10.4230/LIPIcs.FSCD.2018.20']],
  // },
  {
    title: 'Signatures and Induction Principles for Higher Inductive-Inductive Types',
    venue: 'LMCS 2020',
    authors: [akaposi, akJR],
    links: [
      ['arxiv', '1902.00297'],
      ['doi', '10.23638/LMCS-16(1:10)2020']
    ],
    comment: `This paper contributes a way to compute induction principles and β-laws for
      qiits/hiits, but does not justify the existence of the initial algebras.`
  },
  {
    title: 'Type Theory in Type Theory using Quotient Inductive Types',
    authors: [altenkirch, akaposi],
    venue: 'POPL 2016',
    links: [
      ['doi', '10.1145/2837614.2837638'],
      ['online', 'https://people.cs.nott.ac.uk/psztxa/publ/tt-in-tt.pdf']
    ],
    comment: `This paper defines a dependent type theory as an interleaved qiit,
      which is supported natively by Aya. To do the same in Agda, one will need to use
      forward declarations.`
  },
  {
    title: 'The Münchhausen Method in Type Theory',
    authors: [altenkirch, akaposi,
      { name: 'Artjoms Šinkarovs' },
      { name: 'Tamás Végh' }
    ],
    venue: 'TYPES 2022',
    links: [
      ['doi', '10.4230/LIPIcs.TYPES.2022.10'],
    ],
    comment: `This paper justifies very dependent types in extensional type theory
      (or optionally in intensional type theory with transports), and motivates this
      feature with some examples. Aya supports this with automatic inference of type
      checking order and internal generation of forward declarations, without having
      to introduce mutual blocks or whatever special syntax for it.`
  },
  {
    title: 'Observational Equality: Now for Good',
    venue: 'POPL 2022',
    authors: [loic, tabareau],
    links: [
      ['doi', '10.1145/3498693'],
    ],
    comment: `Observational type theory with effective quotients.
      Not very useful paper for implementation -- you will be able to guess the design
      without reading this paper.`
  }
]

const cubical: PublicationItem[] = [
  {
    title: 'Cubical Agda: A Dependently Typed Programming Language with Univalence and Higher Inductive Types',
    authors: [saizan, aa, andersMortberg],
    venue: 'ICFP 2019',
    links: [
      ['doi', '10.1145/3341691'],
      ['online', 'https://staff.math.su.se/anders.mortberg/papers/cubicalagda2.pdf']
    ],
    comment: `The journal vesion of the Cubical Agda paper with more details, including transpX.
      This paper describes how the Cubical part of Cubical Agda works, which is not exactly how Aya works.
      But the ideas should transfer, such as the treatment of canonical hcomp in pattern matching.
      Cubical Agda uses De Morgan cubes, while Aya uses Cartesian cubes. But this shouldn't matter much
      with the presence of UIP anyway.`
  },
  {
    title: 'Normalization for Cubical Type theory',
    authors: [jon, carlo],
    venue: 'LICS 2020',
    links: [
      ['doi', '10.1109/LICS52264.2021.9470719'],
      ['arxiv', '2101.11479'],
      ['online', 'https://www.jonmsterling.com/papers/sterling-angiuli-2021.pdf'],
      ['slides', 'https://www.jonmsterling.com/slides/sterling-angiuli-2021.pdf']
    ],
    comment: `Unrelated to Aya, but very cool paper.`
  },
  {
    title: 'Automating Kan composition',
    authors: [{
      name: 'Maximilian Doré',
    }],
    links: [
      ['slides', 'https://europroofnet.github.io/assets/wg6/stockholm-kickoff-slides/dore-europroofnet-stockholm-slides.pdf'],
    ],
    comment: `Might be useful for automated cube filling in Aya in the future.
      The basic idea is to use forward reasoning to construct all cubes as we can.`
  },
  {
    title: 'Syntax and models of Cartesian cubical type theory',
    authors: [
      carlo, brunerie, coquand, bob, favonia,
      { name: 'Daniel R. Licata' },
    ],
    venue: 'MSCS 2021',
    links: [
      ['doi', '10.1017/S0960129521000347'],
    ],
    comment: `The theoretical foundation of Cartesian cubical type theory, but it's full cubical type theory --
      including the Glue type, which Aya does not need.`
  },
  {
    title: 'A cubical type theory for higher inductive types',
    authors: [simonHuber],
    links: [['online', 'https://www.cse.chalmers.se/~simonhu/misc/hcomp.pdf']],
    comment: `A document listing all the rules for a variant of the CCHM cubical type theory (see below)
      with the possibility to have canonical hcomps. The reason is that hcomp can commute with point constructors,
      but for path constructors you can't really do anything about it. So they should be canonical. In CCHM,
      the primitive operation is heterogeneous comp (denoted just comp, without h, which is horrible notation),
      and it computes on all type formers. This document decomposes comp into hcomp and transp, and make hcomp
      conditionally canonical, but not transp. This design influences all the subsequent cubical type theories, I think.`
  },
  {
    title: 'Cubical Type Theory: a constructive interpretation of the univalence axiom',
    venue: 'TYPES 2015',
    authors: [
      cohen,
      coquand,
      simonHuber,
      andersMortberg,
    ],
    links: [
      ['arxiv', '1611.02108'],
      ['doi', '10.4230/LIPIcs.TYPES.2015.5'],
    ],
    comment: `The original CCHM paper. Good read, but use a different paper for reference if you want to implement
      cubical type theory.`
  },
  // {
  //   title: 'On Higher Inductive Types in Cubical Type Theory',
  //   venue: 'LICS 2018',
  //   authors: [
  //     coquand,
  //     simonHuber,
  //     andersMortberg,
  //   ],
  //   links: [
  //     ['arxiv', '1802.01170'],
  //     ['doi', '10.1145/3209108.3209197']
  //   ]
  // },
  {
    title: 'Computational Semantics of Cartesian Cubical Type Theory',
    venue: 'PhD thesis',
    authors: [carlo],
    links: [
      ['online', 'https://carloangiuli.com/papers/thesis.pdf']
    ],
    comment: `A good introduction to computational type theory, a flavor of type theory that defines types
      as their logical relation, and prove typing rules as theorems. Clearly, it is extrinsic typing,
      and type checking is very undecidable. But you get much stronger typing, including but not limited to
      equality reflection.`
  },
  {
    title: 'A Cubical Language for Bishop Sets',
    venue: 'LMCS 2022',
    authors: [jon, carlo, danielGratzer],
    links: [
      ['arxiv', '2003.01491'],
      ['doi', '10.46298/lmcs-18%281%3A43%292022']
    ],
    comment: `The XTT reference paper. Aya's cubical and related features are strictly weaker than this,
      because we want to avoid type cases and strict propositions. It's also unclear how to implement
      boundary separation efficiently. This paper can be used as a justification of the metatheory of Aya.
      If there is a consistency/soundness bug in Aya's cubical features, this paper will help us fix it.`
  },
  // {
  //   title: 'Cubical Syntax for Reflection-Free Extensional Equality',
  //   venue: 'FSCD 2019',
  //   authors: [jon, carlo, danielGratzer],
  //   links: [
  //     ['arxiv', '1904.08562'],
  //     ['doi', '10.4230/LIPIcs.FSCD.2019.31']
  //   ]
  // }
]

const compilation: PublicationItem[] = [
  {
    title: 'Staged Compilation with Two-Level Type Theory',
    authors: [akJR],
    venue: 'ICFP 2022',
    links: [
      ['github', 'AndrasKovacs/staged'],
      ['online', 'https://andraskovacs.github.io/pdfs/2ltt.pdf'],
      ['doi', '10.1145/3547641'],
    ],
    comment: `Cool paper, not directly related to Aya.`
  },
  {
    title: 'Full Reduction at Full Throttle',
    authors: [
      { name: 'Mathieu Boespflug' },
      { name: 'Maxime Dénès' },
      benjaminGregoire
    ],
    venue: 'CPP 2011',
    links: [
      ['hal', 'hal-00650940'],
      ['doi', '10.1007/978-3-642-25379-9_26']
    ],
    comment: `Coq's native_compute. Similar but not exactly the same as Aya's JIT.`
  },
  {
    title: 'A Compiled Implementation of Strong Reduction',
    authors: [
      benjaminGregoire,
      { name: 'Xavier Leroy' },
    ],
    venue: 'ICFP 2002',
    links: [
      ['doi', '10.1145/581478.581501'],
    ],
    comment: `Coq's vm_compute. The preliminary work of the above paper.`
  }
]

const implicits: PublicationItem[] = [
  {
    title: 'A Categorical Perspective on Pattern Unification',
    authors: [saizan, aa],
    links: [['online', 'https://saizan.github.io/papers/pattern-unif.pdf']],
  },
  {
    title: 'The "Elaboration Zoo"',
    authors: [akJR],
    links: [['github', 'AndrasKovacs/elaboration-zoo']],
    comment: `A basic tutorial on type theory elaboration using normalization by evaluation
      and explicit substitution closures, and solve implicits (also known as metavariables,
      which is a very bad name) using a not-so-good version of pattern unification.`
  },
  {
    title: 'Elaboration with First-Class Implicit Function Types',
    authors: [akJR],
    venue: "ICFP 2020",
    links: [
      ['github', 'AndrasKovacs/implicit-fun-elaboration'],
      ['doi', '10.1145/3408983'],
    ],
    comment: `Fun paper, but I'd rather spend effort to avoid first-class implicit functions,
      because it's always unclear if you should infer the implicit at the end of a call,
      and manual annotation feels awkward.`
  },
  {
    title: 'Higher-Order Constraint Simplification In Dependent Type Theory',
    authors: [jcreed],
    venue: 'LFMTP 2009',
    links: [
      ['doi', '10.1145/1577824.1577832'],
      ['online', 'https://www.cs.cmu.edu/~jcreed/papers/csl08-hocs.pdf']
    ],
    comment: `This paper extends pattern unification to allow delayed equations.
      Aya has exactly this. For implementers you only read page 10, and maybe refer to earlier
      pages if you don't understand the notations.`
  },
  {
    title: 'Getting into the Flow: Towards Better Type Error Messages for Constraint-Based Type Inference',
    authors: [
      { name: 'Ishan Bhanuka' },
      { name: 'Lionel Parreaux' },
      { name: 'David Binder' },
      { name: 'Jonathan Immanuel Brachthäuser' }
    ],
    links: [
      ['doi', '10.1145/3622812']
    ],
    comment: `I haven't read this paper, but it can be useful. Aya pays extra attention to error messages.`
  }
]

const patterns: PublicationItem[] = [
  {
    title: 'Copatterns: programming infinite structures by observations',
    authors: [aa,
      brigittePientka,
      { name: 'David Thibodeau' },
      { name: 'Anton Setzer' }
    ],
    venue: 'POPL 2013',
    links: [
      ['doi', '10.1145/2480359.2429075'],
      ['online', 'https://www.cse.chalmers.se/~abela/popl13.pdf']
    ],
    comment: `Everyone should know about copatterns because they are so cool,
      but no one cares about how productivity checking works except for very few people.`
  },
  {
    title: 'Overlapping and Order-Independent Patterns',
    links: [
      ['online', 'https://jesper.sikanda.be/files/overlapping-and-order-independent-patterns.pdf']
    ],
    authors: [
      agdakx,
      { name: 'Dominique Devriese' },
      { name: 'Frank Piessens' },
    ],
    comment: `A cool pattern matching feature that's exclusively available in Aya.
      There is a more efficient implementation in Aya, but I have no time writing a paper about it.`
  },
  {
    title: 'Elaborating Dependent (Co)Pattern Matching',
    links: [
      ['doi', '10.1145/3236770']
    ],
    authors: [agdakx, aa],
    venue: 'ICFP 2018',
    comment: `The paper you need to read about coverage checking of dependent pattern matching.
      The uniform treatment of patterns and copatterns is very elegant.`
  }
]

export const readings: Publications = [
  {
    type: 'Universes',
    items: universes
  },

  {
    type: 'Quotients and Mutual Recursion related to Inductive Types',
    items: equality
  },

  {
    type: 'Cubical Type Theory',
    items: cubical
  },

  {
    type: 'Performance and Code Generation',
    items: compilation
  },

  {
    type: 'Implicits and Inference',
    items: implicits
  },

  {
    type: 'Pattern Matching',
    items: patterns
  },

  {
    type: 'Miscellaneous',
    items: [
      {
        title: 'Contributions to Multimode and Presheaf Type Theory',
        authors: [{
          name: 'Andreas Nuyts',
        }],
        links: [
          ['online', 'https://lirias.kuleuven.be/retrieve/581985']
        ],
        comment: `Some results on syntax and semantics of multimodal dependent type theory.
          Aya will eventually add native support for modalities, and this paper can be used
          as a reference of the type theory.`
      },
      {
        title: 'Tabled Typeclass Resolution',
        authors: [
          { name: 'Daniel Selsam' },
          { name: 'Sebastian Ullrich' },
          { name: 'Leonardo de Moura' }
        ],
        links: [
          ['arxiv', '2001.04301']
        ],
        comment: `Basically teaches you how to design the cache for type class resolution,
          to deal with multi-param typeclasses and class inheritance with large depth.
          It concerns with complicated instance resolution with backtracking.`
      },
      {
        title: "Coq's Vibrant Ecosystem for Verification Engineering",
        venue: 'CPP 2022',
        authors: [
          { name: 'Andrew W. Appel', link: 'https://orcid.org/0000-0001-6009-0325' },
        ],
        links: [
          ['online', 'https://www.cs.princeton.edu/~appel/papers/ecosystem.pdf'],
          ['doi', '10.1145/3497775.3503951'],
        ]
      },
      {
        title: 'The End of History? Using a Proof Assistant to Replace Language Design with Library Design',
        authors: [
          { name: 'Adam Chlipala' },
          { name: 'Benjamin Delaware' },
          { name: 'Samuel Duchovni' },
          { name: 'Jason Gross' },
          { name: 'Clément Pit-Claudel' },
          { name: 'Sorawit Suriyakarn' },
          { name: 'Peng Wang' },
          { name: 'Katherine Ye' },
        ],
        venue: 'SNAPL 2017',
        links: [
          ['doi', '10.4230/LIPIcs.SNAPL.2017.3'],
          ['online', 'https://drops.dagstuhl.de/opus/volltexte/2017/7123/pdf/LIPIcs-SNAPL-2017-3.pdf']
        ],
      }
    ]
  }
]
