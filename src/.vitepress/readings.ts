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

const universes: PublicationItem[] = [
  {
    title: 'Crude but Effective Stratification',
    authors: [mb],
    links: [['slides', 'https://personal.cis.strath.ac.uk/conor.mcbride/Crude.pdf']],
  },
  {
    title: 'Generalized Universe Hierarchies and First-Class Universe Levels',
    authors: [akJR],
    links: [['arxiv', '2103.00223']],
  },
  {
    title: 'Dependently typed lambda calculus with a lifting operator',
    authors: [{
      name: 'Damien Rouhling',
      link: 'https://www-sop.inria.fr/members/Damien.Rouhling'
    }],
    links: [['online', 'https://www-sop.inria.fr/members/Damien.Rouhling/data/internships/M1Report.pdf']],
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
    ]
  },
  {
    title: 'Impredicative Observational Equality',
    authors: [tabareau, loic],
    venue: 'POPL 2023',
    links: [
      ['online', 'https://hal.inria.fr/hal-03857705'],
      ['doi', '10.1145/3571739']
    ]
  },
  {
    title: 'Failure of Normalization in Impredicative Type Theory with Proof-Irrelevant Propositional Equality',
    authors: [aa, coquand],
    venue: 'LMCS 2020',
    links: [
      ['arxiv', '1911.08174'],
    ]
  }
]

const equality: PublicationItem[] = [
  {
    title: 'Separating Path and Identity Types in Presheaf Models of Univalent Type Theory',
    authors: [{ name: 'Andrew Swan' }],
    links: [['arxiv', '1808.00920']],
  },
  {
    title: 'A Syntax for Higher Inductive-Inductive Types',
    authors: [akaposi, akJR],
    venue: 'FSCD 2018',
    links: [['doi', '10.4230/LIPIcs.FSCD.2018.20']],
  },
  {
    title: 'Signatures and Induction Principles for Higher Inductive-Inductive Types',
    venue: 'LMCS 2020',
    authors: [akaposi, akJR],
    links: [
      ['arxiv', '1902.00297'],
      ['doi', '10.23638/LMCS-16(1:10)2020']
    ],
  },
  {
    title: 'Contributions to Multimode and Presheaf Type Theory',
    authors: [{
      name: 'Andreas Nuyts',
    }],
    links: [
      ['online', 'https://lirias.kuleuven.be/retrieve/581985']
    ],
  },
  {
    title: 'Observational Equality: Now for Good',
    venue: 'POPL 2022',
    authors: [loic, tabareau],
    links: [
      ['doi', '10.1145/3498693'],
      ['conference', 'https://dl.acm.org/doi/pdf/10.1145/3498693']
    ],
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
    ]
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
    ]
  },
  {
    title: 'Automating Kan composition',
    authors: [{
      name: 'Maximilian Doré',
    }],
    links: [
      ['slides', 'https://europroofnet.github.io/assets/wg6/stockholm-kickoff-slides/dore-europroofnet-stockholm-slides.pdf'],
    ],
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
      ['online', 'https://www.cs.cmu.edu/~cangiuli/papers/abcfhl.pdf']],
  },
  {
    title: 'A cubical type theory for higher inductive types',
    authors: [simonHuber],
    links: [['online', 'https://www.cse.chalmers.se/~simonhu/misc/hcomp.pdf']]
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
    ]
  },
  {
    title: 'On Higher Inductive Types in Cubical Type Theory',
    venue: 'LICS 2018',
    authors: [
      coquand,
      simonHuber,
      andersMortberg,
    ],
    links: [
      ['arxiv', '1802.01170'],
      ['doi', '10.1145/3209108.3209197']
    ]
  },
  {
    title: 'Computational Semantics of Cartesian Cubical Type Theory',
    venue: 'PhD thesis',
    authors: [carlo],
    links: [
      ['online', 'https://carloangiuli.com/papers/thesis.pdf']
    ]
  },
  {
    title: 'A Cubical Language for Bishop Sets',
    venue: 'LMCS 2022',
    authors: [jon, carlo, danielGratzer],
    links: [
      ['arxiv', '2003.01491'],
      ['doi', '10.46298/lmcs-18%281%3A43%292022']
    ]
  },
  {
    title: 'Cubical Syntax for Reflection-Free Extensional Equality',
    venue: 'FSCD 2019',
    authors: [jon, carlo, danielGratzer],
    links: [
      ['arxiv', '1904.08562'],
      ['doi', '10.4230/LIPIcs.FSCD.2019.31']
    ]
  }
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
    ]
  },
  {
    title: 'Full reduction at full throttle',
    authors: [
      { name: 'Mathieu Boespflug' },
      { name: 'Maxime Dénès' }, { name: 'Benjamin Grégoire' }
    ],
    venue: 'CPP 2011',
    links: [
      ['online', 'https://inria.hal.science/hal-00650940/file/full_throttle.pdf'],
      ['doi', '10.1007/978-3-642-25379-9_26']
    ]
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
  },
  {
    title: 'Elaboration with First-Class Implicit Function Types',
    authors: [akJR],
    venue: "ICFP 2020",
    links: [
      ['github', 'AndrasKovacs/implicit-fun-elaboration'],
      ['doi', '10.1145/3408983'],
    ],
  },
  {
    title: 'Higher-Order Constraint Simplification In Dependent Type Theory',
    authors: [{
      name: 'Jason Reed',
    }],
    venue: 'LFMTP 2009',
    links: [
      ['doi', '10.1145/1577824.1577832'],
      ['online', 'https://www.cs.cmu.edu/~jcreed/papers/csl08-hocs.pdf']
    ]
  }
]

const patterns: PublicationItem[] = [
  {
    title: 'Copatterns: programming infinite structures by observations',
    authors: [aa,
      { name: 'Brigitte Pientka' },
      { name: 'David Thibodeau' },
      { name: 'Anton Setzer' }
    ],
    venue: 'POPL 2013',
    links: [
      ['doi', '10.1145/2480359.2429075'],
      ['online', 'https://www.cse.chalmers.se/~abela/popl13.pdf']
    ]
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
    ]
  },
  {
    title: 'Elaborating Dependent (Co)Pattern Matching',
    links: [
      ['doi', '10.1145/3236770']
    ],
    authors: [agdakx, aa],
    venue: 'ICFP 2018',
  }
]

export const readings: Publications = [
  {
    type: 'Universes',
    items: universes
  },

  {
    type: 'Equality and Higher/Quotient Inductive Types',
    items: equality
  },

  {
    type: 'Cubical Type Theory',
    items: cubical
  },

  {
    type: 'Compilation',
    items: compilation
  },

  {
    type: 'Unification, Implicits, and Constraints',
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
