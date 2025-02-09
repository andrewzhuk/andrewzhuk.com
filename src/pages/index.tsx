import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Items from '../components/items'
import PageHead from '../components/page-head'
import { ArrowRightSIcon } from '@remixicons/react/line'
import type { IndexPageData } from '../types'

const IndexPage = ({ data }: { data: IndexPageData }) => {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Latest Projects Section */}
      <section className="latest-items">
        <div className="head">
          <div className="title">Latest Projects</div>
          <Link to="/projects" className="link">
            View all projects
            <ArrowRightSIcon className="icon" />
          </Link>
        </div>
        <Items type="project" items={data.projects.edges} />
      </section>

      {/* Latest Posts Section */}
      <section className="latest-items">
        <div className="head">
          <div className="title">Latest Posts</div>
          <Link to="/posts" className="link">
            View all posts
            <ArrowRightSIcon className="icon" />
          </Link>
        </div>
        <Items type="post" items={data.posts.edges} />
      </section>
    </Layout>
  )
}

export const Head = () => (
  <>
    <PageHead
      title="Andrew Zhuk - Full Stack Developer"
      description="Personal website and blog of Andrew Zhuk, Full Stack Developer specializing in web development and blockchain technologies."
    />
  </>
)

export const query = graphql`
  query HomePageQuery {
    posts: allMdx(
      limit: 6
      filter: {
        internal: { contentFilePath: { regex: "/content/posts/" } }
        frontmatter: { lang: { eq: "en" } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            slug
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 800)
              }
            }
          }
        }
      }
    }
    projects: allMdx(
      sort: { frontmatter: { position: ASC } }
      limit: 6
      filter: { internal: { contentFilePath: { regex: "/content/projects/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            slug
            opensource
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

export default IndexPage
