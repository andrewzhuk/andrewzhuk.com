import { IGatsbyImageData } from 'gatsby-plugin-image'

interface Frontmatter {
  title: string
  description: string
  // date?: string
  slug: string
  position?: number
  opensource?: boolean
  github?: string
  url?: string
  thumbnail?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  technologies?: string[]
}

interface MdxNode {
  id: string
  body: string
  frontmatter: Frontmatter
  internal: {
    contentFilePath: string
  }
}

interface MdxEdge {
  node: MdxNode
}

interface MdxConnection {
  edges: MdxEdge[]
}

interface SiteMetadata {
  title: string
  author: string
  siteUrl: string
  description: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  menu: {
    about: string
    projects: string
    blog: string
  }
  siteLanguage: string
}

interface Site {
  siteMetadata: SiteMetadata
}

interface PageContext {
  id: string
  previousPostId?: string
  nextPostId?: string
  previousProjectId?: string
  nextProjectId?: string
}

export interface ProjectPageQuery {
  mdx: MdxNode
  previous?: {
    frontmatter: {
      title: string
      slug: string
    }
  }
  next?: {
    frontmatter: {
      title: string
      slug: string
    }
  }
}

export interface IndexPageQuery {
  site: Site
  projects: MdxConnection
}
