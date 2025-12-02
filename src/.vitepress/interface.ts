export interface Author {
  name: string
  link?: string,
}

export interface PublicationItem {
  authors: Author[]
  title: string
  venue?: string
  links: [string,string][]
  comment?: string
}

export interface Publication {
  type: string,
  items: PublicationItem[]
}

export type Publications = Publication[]
