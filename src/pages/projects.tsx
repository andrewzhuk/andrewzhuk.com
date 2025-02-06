import React from "react"
import { graphql, type PageProps } from "gatsby"
import Layout from "../components/layout"
import Item from "../components/item"
import PageHead from "../components/page-head"
import { type ProjectNode } from "../types"

interface ProjectsPageData {
  projects: {
    edges: Array<{
      node: ProjectNode;
    }>;
  };
}

const ProjectsPage = ({ data }: { data: ProjectsPageData }) => {
  return (
    <Layout>
      <div className="">
        <div className="latest-items head">
          <div className="title">My Projects</div>
        </div>
        <div className="wrapper-items">
          <div className="items grided">
            {data.projects.edges.map(({ node }) => (
              <Item key={node.frontmatter.slug} type="project" node={node} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsPage

export const Head = () => (
  <>
    <PageHead title="Projects | Andrew Zhuk" description="My projects" />
  </>
)

export const query = graphql`
  query ProjectsQuery {
    projects: allMdx(
      sort: { frontmatter: { position: ASC } }
      filter: { internal: { contentFilePath: { regex: "/content/projects/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            slug
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 800)
              }
            }
          }
        }
      }
    }
  }
`
