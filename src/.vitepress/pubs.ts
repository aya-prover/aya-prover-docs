import type { Publications, Author } from "./interface"

const teslaZhang: Author = {
  name: 'Tesla Zhang',
  link: 'https://ice1000.org'
};
export const publications: Publications = [
  {
    type: 'Papers',
    items: [
      {
        title: 'A simpler encoding of indexed types',
        venue: 'TyDe 2021',
        authors: [teslaZhang],
        links: [
          ['arxiv', '2103.15408'],
          ['doi', '10.1145/3471875.3472991']
        ],
        comment: `Describes the simple syntax for defining type families in Aya.`
      },
    ],
  },
  {
    type: 'Notes',
    items: [
      {
        title: '(Co)conditions hit the path',
        authors: [teslaZhang],
        links: [['arxiv', '2405.12994']],
        comment: `An interesting language feature, no longer used in Aya.
          This document describes the type checking algorithm, and does not discuss any metatheory.
          Still used in Arend.`
      },
      {
        title: 'Two tricks to trivialize higher-indexed families',
        authors: [teslaZhang],
        links: [['arxiv', '2309.14187']],
        comment: `Not directly related to Aya, but discusses the idea of Fording,
          which is used in Aya.`
      },
      {
        title: 'A tutorial on implementing De Morgan cubical type theory',
        authors: [teslaZhang],
        links: [['arxiv', '2210.08232']],
        comment: `Describes how to type check De Morgan cubical primitives and partial elements.
          The part about partial elements is still relevant to Aya.`
      },
      {
        title: 'Elegant elaboration with function invocation',
        authors: [teslaZhang],
        links: [['arxiv', '2105.14840']],
        comment: `Describes how δ-reduction works in Aya.`
      },
    ],
  }
]
