import type { Publications } from "./interface"
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
        authors: [{ name: 'András Kovács' }],
        links: [['arxiv', '2103.00223']],
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
        authors: [{ name: 'Ambrus Kaposi' }, { name: 'András Kovács' }],
        links: [['doi', '10.4230/LIPIcs.FSCD.2018.20']],
      },
      {
        title: 'Signatures and Induction Principles for Higher Inductive-Inductive Types',
        authors: [{ name: 'Ambrus Kaposi' }, { name: 'András Kovács' }],
        links: [['arxiv', '1902.00297']],
      },
      {
        title: 'Syntax and models of Cartesian cubical type theory',
        authors: [
          { name: 'Carlo Angiuli'},
          { name: 'Guillaume Brunerie'},
          { name: 'Thierry Coquand'},
          { name: 'Robert Harper'},
          { name: 'Kuen-Bang Hou (Favonia)'},
          { name: 'Daniel R. Licata'},
        ],
        venue: 'MSCS 2021',
        links: [
          ['doi', '10.1017/S0960129521000347'],
          ['online', 'https://www.cs.cmu.edu/~cangiuli/papers/abcfhl.pdf']],
      },
      {
        title: 'A cubical type theory for higher inductive types',
        authors: [{ name: 'Simon Huber' }],
        links: [['online', 'https://www.cse.chalmers.se/~simonhu/misc/hcomp.pdf']]
      },
      {
        title: 'Cubical Type Theory: a constructive interpretation of the univalence axiom',
        authors:[
          { name: 'Cyril Cohen' },
          { name: 'Thierry Coquand' },
          { name: 'Simon Huber' },
          { name: 'Anders Mörtberg' },
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
        authors: [{ name: 'Andrea Vezzosi' }, { name: 'Andreas Abel' }],
        links: [['online', 'https://saizan.github.io/papers/pattern-unif.pdf']],
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
