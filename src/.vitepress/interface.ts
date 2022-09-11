export interface Author {
  name: string
  link: string,
}

export interface PublicationItem {
  author: Author
  title: string
  venue?: string
  links: [string,string][]
}

export interface Publicaion {
  type: 'Papers'|'Preprints'|'Theses'|'Talks'|'Workshops'|'Tutorials'|'Misc'
  items: PublicationItem[]
}

export type Publicaions = Publicaion[]
