import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PageHead from '../components/page-head'
import { Arrow, SectionLabel, AtlariusTile, WritingRow } from '../components/editorial'
import type { IndexPageData } from '../types'
const IndexPage = ({ data }: { data: IndexPageData }) => (
  <Layout>
    <Hero />
    <section className="intro-section">
      <SectionLabel number="01">A little context</SectionLabel>
      <div>
        <h2>
          I connect the dots between
          <br />
          an idea and the real world.
        </h2>
        <div className="intro-details">
          <p>
            Product thinking, software engineering, and the systems underneath. I like understanding
            the whole picture — and getting my hands into the details.
          </p>
          <p>
            Today, that energy goes into{' '}
            <Link to="/projects/atlarius/" className="inline-link">
              Atlarius
            </Link>
            : a native workspace for teams. This is a collection of what I’m building, what I’ve
            learned, and what’s on my mind.
          </p>
        </div>
      </div>
    </section>
    <section className="work-section" id="selected-work">
      <div className="section-heading">
        <SectionLabel number="02">Current project</SectionLabel>
      </div>
      <h2 className="display-heading">What I’m building</h2>
      <AtlariusTile />
    </section>
    <section className="journal-section">
      <div className="section-heading">
        <SectionLabel number="03">The journal</SectionLabel>
        <Link className="underlined" to="/posts/">
          All writing <Arrow />
        </Link>
      </div>
      <h2 className="display-heading">Thinking out loud.</h2>
      <div className="writing-list">
        {data.posts.edges.map(({ node }, i) => (
          <WritingRow node={node} index={i} key={node.frontmatter.slug} />
        ))}
      </div>
    </section>
  </Layout>
)
export const Head = () => (
  <PageHead
    title="Andrew Zhuk — Founder & Software Architect"
    pathname="/"
    description="Founder of Atlarius. Software and systems architect. Building products, connecting ideas, and sharing notes from the work."
  />
)
export const query = graphql`
  query HomePageQuery {
    posts: allMdx(
      sort: { frontmatter: { date: DESC } }
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
  }
`

export default IndexPage
