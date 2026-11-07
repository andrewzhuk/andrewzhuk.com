import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PageHead from '../components/page-head'
import { SectionLabel, AtlariusTile, ProjectTile } from '../components/editorial'
import type { ProjectNode } from '../types'
const ProjectsPage = ({
  data
}: {
  data: { projects: { edges: Array<{ node: ProjectNode }> } }
}) => (
  <Layout>
    <div className="page-heading">
      <SectionLabel number="01">Products & open source</SectionLabel>
      <h1>
        Selected
        <br />
        <span className="serif">work.</span>
      </h1>
      <p>
        From product ideas to the tools behind them.
        <br />A few things I’ve put my mind and hands into.
      </p>
    </div>
    <section className="projects-page">
      <AtlariusTile />
      <div className="project-grid">
        {data.projects.edges.map(({ node }, i) => (
          <ProjectTile node={node} index={i} key={node.frontmatter.slug} />
        ))}
      </div>
    </section>
  </Layout>
)
export default ProjectsPage
export const Head = () => (
  <PageHead
    title="Work — Andrew Zhuk"
    pathname="/projects/"
    description="Products and open-source projects by Andrew Zhuk. Atlarius, Fafty, Menutto, and developer tools."
  />
)
export const query = graphql`
  query ProjectsQuery {
    projects: allMdx(
      sort: { frontmatter: { position: ASC } }
      filter: {
        internal: { contentFilePath: { regex: "/content/projects/" } }
        frontmatter: { slug: { ne: "atlarius" } }
      }
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
