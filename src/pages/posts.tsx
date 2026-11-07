import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PageHead from '../components/page-head'
import { SectionLabel, Arrow } from '../components/editorial'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import type { PostNode } from '../types'
const BlogPage = ({ data }: { data: { posts: { edges: Array<{ node: PostNode }> } } }) => (
  <Layout>
    <div className="page-heading">
      <SectionLabel number="01">Notes & observations</SectionLabel>
      <h1>
        The
        <br />
        <span className="serif">journal.</span>
      </h1>
      <p>
        On building software, making trade-offs,
        <br />
        and caring about the people using it.
      </p>
    </div>
    <section className="journal-grid">
      {data.posts.edges.map(({ node }, i) => {
        const f = node.frontmatter
        const img = getImage(f.thumbnail)
        return (
          <Link to={`/posts/${f.slug}/`} className="journal-card" key={f.slug}>
            {img && (
              <div className="journal-art">
                <GatsbyImage image={img} alt="" />
              </div>
            )}
            <div className="journal-card-meta">
              <span className="micro">{f.tags?.slice(0, 2).join(' / ')}</span>
              <span>/{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h2>{f.title}</h2>
            <p>{f.description}</p>
            <span className="underlined">
              Read the story <Arrow />
            </span>
          </Link>
        )
      })}
    </section>
  </Layout>
)
export default BlogPage
export const Head = () => (
  <PageHead
    title="Journal — Andrew Zhuk"
    pathname="/posts/"
    description="Notes on software engineering, product quality, architecture, and the decisions behind building products."
  />
)
export const query = graphql`
  query BlogPageQuery {
    posts: allMdx(
      sort: { frontmatter: { date: DESC } }
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
  }
`
