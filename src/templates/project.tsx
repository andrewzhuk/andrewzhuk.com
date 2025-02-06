import React, { useEffect, type ReactNode } from 'react'
import { graphql, Link, type PageProps } from 'gatsby'
import { GatsbyImage, getImage, StaticImage, type IGatsbyImageData } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import TableOfContents from '../components/table-of-contents'
import generateTableOfContents from '../utils/table-of-contents'
import PageHead from '../components/page-head'
import { MDXProvider } from '@mdx-js/react'
import { GithubIcon, LinksIcon } from '@remixicons/react/fill'
import Tip from '../components/tip'
interface ProjectData {
  mdx: {
    body: string
    frontmatter: {
      title: string
      description: string
      technologies: string[]
      opensource: boolean
      github: string
      url?: string
      thumbnail: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  }
  previous: {
    frontmatter: {
      title: string
      slug: string
    }
  } | null
  next: {
    frontmatter: {
      title: string
      slug: string
    }
  } | null
}

const ProjectTemplate = ({ data, children }: { data: ProjectData; children: ReactNode }) => {
  const { mdx: project, previous, next } = data
  const image = getImage(project.frontmatter.thumbnail)
  const tableOfContents = generateTableOfContents(project.body)
  console.log('data', data)

  const shortcodes = { Link, StaticImage, Tip } // Provide common components here

  useEffect(() => {
    const content = document.querySelector('.template-content')
    if (content) {
      const headings = content.querySelectorAll('h1, h2, h3')
      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
        }
      })
    }
  }, [])

  return (
    <Layout>
      <article className="template-container">
        <div className="template-header">
          <h1 className="template-title">{project.frontmatter.title}</h1>
          <div className="template-meta">
            <span>{project.frontmatter.technologies.join(' • ')}</span>
          </div>
        </div>

        <div className="template-content">
          <main className="template-main">
            {image && (
              <div className="template-image">
                <GatsbyImage image={image} alt={project.frontmatter.title} />
              </div>
            )}
            <div className="template-links">
              {project.frontmatter.github && (
                <a
                  href={project.frontmatter.github}
                  className="template-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="icon" />
                  GitHub
                </a>
              )}
              {project.frontmatter.url && (
                <a
                  href={project.frontmatter.url}
                  className="template-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinksIcon className="icon" />
                  Live Demo
                </a>
              )}
            </div>
            <div className="article-content">
              <MDXProvider components={shortcodes}>{children}</MDXProvider>
            </div>
          </main>
          <aside className="template-sidebar">
            {tableOfContents.length > 0 && (
              <div className="table-of-contents">
                <h4>Contents</h4>
                <TableOfContents items={tableOfContents} />
              </div>
            )}
          </aside>
        </div>

        <nav className="template-navigation">
          {previous && (
            <Link
              to={`/projects/${previous.frontmatter.slug}`}
              className="template-nav-item prev"
              rel="prev"
            >
              <div className="template-nav-label">Previous Project</div>
              <div className="template-nav-title">{previous.frontmatter.title}</div>
            </Link>
          )}
          {!previous && <div className="template-nav-item prev disabled" aria-hidden="true"></div>}
          {next && (
            <Link
              to={`/projects/${next.frontmatter.slug}`}
              className="template-nav-item next"
              rel="next"
            >
              <div className="template-nav-label">Next Project</div>
              <div className="template-nav-title">{next.frontmatter.title}</div>
            </Link>
          )}
          {!next && <div className="template-nav-item next disabled" aria-hidden="true"></div>}
        </nav>
      </article>
    </Layout>
  )
}

export const Head = ({ data: { mdx: project } }: PageProps<ProjectData>) => (
  <>
    <PageHead
      title={`${project.frontmatter.title} - Project | Andrew Zhuk`}
      description={project.frontmatter.description}
      image={
        project.frontmatter.thumbnail
          ? `https://andrewzhuk.com/${project.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback?.src}`
          : undefined
      }
    />
    <meta name="keywords" content={project.frontmatter.technologies.join(', ')} />
    {project.frontmatter.github && (
      <meta property="og:see_also" content={project.frontmatter.github} />
    )}
    {project.frontmatter.url && <meta property="og:see_also" content={project.frontmatter.url} />}
  </>
)

export const query = graphql`
  query ProjectBySlug($id: String!, $previousProjectId: String, $nextProjectId: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        technologies
        opensource
        github
        url
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
      body
    }
    previous: mdx(id: { eq: $previousProjectId }) {
      frontmatter {
        title
        slug
      }
    }
    next: mdx(id: { eq: $nextProjectId }) {
      frontmatter {
        title
        slug
      }
    }
  }
`

export default ProjectTemplate
