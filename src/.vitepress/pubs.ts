import type { Publications } from "./interface"
export const publications: Publications = [
  {
    type: 'Papers',
    items: [
      {
        title: 'A simpler encoding of indexed types',
        venue: 'TyDe 2021',
        authors: [{
          name: 'Tesla Zhang',
          link: 'http://personal.psu.edu/yqz5714/'
        }],
        links: [
          ['arxiv', '2103.15408'],
          ['doi', '10.1145/3471875.3472991'],
          ['conference', 'https://personal.psu.edu/yqz5714/gadt-cr.pdf'],
          ['online', 'https://personal.psu.edu/yqz5714/gadt.pdf']
        ],
      },
    ],
  },
  {
    type: 'Preprints',
    items: [
      {
        title: 'Elegant elaboration with function invocation',
        authors: [{
          name: 'Tesla Zhang',
          link: 'http://personal.psu.edu/yqz5714/'
        }],
        links: [['arxiv', '2105.14840'], ['online', 'https://personal.psu.edu/yqz5714/defcall.pdf']],
      },
    ],
  }
]
