import type { Author, Publications } from "./interface"
const thierryCoquand: Author = {
  name: 'Thierry Coquand',
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
const guillaumeBrunerie: Author = {
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
export const readings: Publications = [
  {
    type: 'General Type Theory',
    items: [
      {
        title: 'Observational Equality: Now for Good',
        venue: 'POPL 2022',
        authors: [
          { name: 'Loïc Pujet' },
          { name: 'Nicolas Tabareau' },
        ],
        links: [
          ['doi', '10.1145/3498693'],
          ['conference', 'https://dl.acm.org/doi/pdf/10.1145/3498693']
        ],
      },
      {
        title: 'Generalized Universe Hierarchies and First-Class Universe Levels',
        authors: [akJR],
        links: [['arxiv', '2103.00223']],
      },
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
      }
    ],
  },
  {
    type: 'Univalent Type Theory',
    items: [
      {
        title: 'Separating Path and Identity Types in Presheaf Models of Univalent Type Theory',
        authors: [{ name: 'Andrew Swan' }],
        links: [['arxiv', 'https://arxiv.org/abs/1808.00920']],
      },
      {
        title: 'A Syntax for Higher Inductive-Inductive Types',
        authors: [akaposi, akJR],
        links: [['doi', '10.4230/LIPIcs.FSCD.2018.20']],
      },
      {
        title: 'Signatures and Induction Principles for Higher Inductive-Inductive Types',
        authors: [akaposi, akJR],
        links: [['arxiv', '1902.00297']],
      },
      {
        title: 'Syntax and models of Cartesian cubical type theory',
        authors: [
          { name: 'Carlo Angiuli' },
          guillaumeBrunerie,
          thierryCoquand,
          { name: 'Robert Harper' },
          { name: 'Kuen-Bang Hou (Favonia)' },
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
          { name: 'Cyril Cohen' },
          thierryCoquand,
          simonHuber,
          andersMortberg,
        ],
        links: [
          ['arxiv', '1611.02108'],
          ['doi', '10.4230/LIPIcs.TYPES.2015.5'],
        ]
      }
    ]
  },
  {
    type: 'Implementation',
    items: [
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
        title: 'Cubical Agda: A Dependently Typed Programming Language with Univalence and Higher Inductive Types',
        authors: [saizan, aa, andersMortberg],
        links: [
          ['doi', '10.1145/3341691'],
        ]
      }
    ]
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
      }
    ]
  }
]
