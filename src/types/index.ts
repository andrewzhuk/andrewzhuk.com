import type { IGatsbyImageData } from "gatsby-plugin-image"

export interface Post {
    title: string
    description?: string
    slug: string
    thumbnail: IGatsbyImageData
    // date: string
    tags: string[]
  }
  
  export interface Project {
    title: string
    description: string
    opensource?: boolean
    slug: string
    thumbnail: IGatsbyImageData
    technologies: string[]
    // date?: string
    position?: number
  }
  
  export interface PostNode {
    frontmatter: Post
  }
  
  export interface ProjectNode {
    frontmatter: Project
  }
  
  export interface GraphQLEdge<T> {
    node: T
  }
  
  export interface GraphQLConnection<T> {
    edges: GraphQLEdge<T>[]
  }
  
  export interface IndexPageData {
    posts: GraphQLConnection<PostNode>
    projects: GraphQLConnection<ProjectNode>
  }