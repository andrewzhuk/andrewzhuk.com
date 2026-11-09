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
      <SectionLabel number="01">Experience</SectionLabel>
      <div>
        <h2>Give me a startup idea and I’ll play the business forward in my head.</h2>
        <div className="intro-details">
          <div>
            <p>
              Who pays first? Why would that customer switch to our product? Where do we find
              the next hundred customers? And if things go well, how much will it cost us to
              serve each new customer?
            </p>
            <p>
              I learned to think this way by building startups. I launched my first startup in
              2008. I turned twenty that same year. Since then, I’ve built ventures of my own and
              led engineering as CTO for other founders.
            </p>
            <p>
              I’m a software architect. Building startups meant learning to read the numbers,
              develop an eye for what makes a product feel right, and decide where the team
              should spend the next few months. That experience changed how I design software.
              I think about how customers will use it and whether the company can build, sell,
              and support it. Today, I make those decisions at Atlarius.
            </p>
          </div>
          <div>
            <h3>Technologies I work with</h3>
            <dl className="experience-stack">
              <div>
                <dt>Web</dt>
                <dd>TypeScript, React, Next.js</dd>
              </div>
              <div>
                <dt>Backend & data</dt>
                <dd>Rust, Node.js, Ruby, PostgreSQL</dd>
              </div>
              <div>
                <dt>Infrastructure</dt>
                <dd>Docker, Kubernetes, Terraform, CI/CD</dd>
              </div>
            </dl>
          </div>
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
    description="Founder of Atlarius and hands-on software architect with 15+ years in engineering. Building startups since 2008 as a founder and CTO."
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
