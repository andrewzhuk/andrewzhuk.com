import React, { useEffect, type ReactNode } from 'react'
import { graphql, Link, type PageProps } from 'gatsby'
import { GatsbyImage, getImage, getSrc, StaticImage, type IGatsbyImageData } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import TableOfContents from '../components/table-of-contents'
import generateTableOfContents from '../utils/table-of-contents'
import PageHead from '../components/page-head'
import { MDXProvider } from '@mdx-js/react'
import Tip from '../components/tip'
import LanguageSwitcher from '../components/language-switcher'

interface PostData {
  mdx: {
    body: string
    frontmatter: {
      title: string
      description: string
      tags: string[]
      lang: string
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
      lang: string
    }
  } | null
  next: {
    frontmatter: {
      title: string
      slug: string
      lang: string
    }
  } | null
}

interface PageContext {
  translations: Array<{
    lang: string
    slug: string
  }>
  currentLang: string
}

const PostTemplate = ({ data, children, pageContext }: { data: PostData; children: ReactNode; pageContext: PageContext }) => {
  const { mdx: post, previous, next } = data
  const image = getImage(post.frontmatter.thumbnail)
  const tableOfContents = generateTableOfContents(post.body)

  const shortcodes = { Link, StaticImage, Tip }

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
          <h1 className="template-title">{post.frontmatter.title}</h1>
          <div className="template-meta">
            <span>{post.frontmatter.tags.join(' • ')}</span>
          </div>
        </div>

        <div className="template-content">
          <div className="template-main">
            {image && (
              <GatsbyImage
                image={image}
                alt={post.frontmatter.title}
                className="template-image"
              />
            )}
            <div className="article-content">
              <MDXProvider components={shortcodes}>{children}</MDXProvider>
            </div>
          </div>
          <aside className="template-sidebar">
            <LanguageSwitcher 
              translations={pageContext.translations} 
              currentLang={post.frontmatter.lang}
            />
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
              to={previous.frontmatter.lang === 'en'
                ? `/posts/${previous.frontmatter.slug}`
                : `/${previous.frontmatter.lang}/posts/${previous.frontmatter.slug}`}
              className="template-nav-item prev"
              rel="prev"
            >
              <span className="template-nav-label">Previous Post</span>
              <span className="template-nav-title">{previous.frontmatter.title}</span>
            </Link>
          )}
          {next && (
            <Link
              to={next.frontmatter.lang === 'en'
                ? `/posts/${next.frontmatter.slug}`
                : `/${next.frontmatter.lang}/posts/${next.frontmatter.slug}`}
              className="template-nav-item next"
              rel="next"
            >
              <span className="template-nav-label">Next Post</span>
              <span className="template-nav-title">{next.frontmatter.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  )
}

export const Head = ({ data: { mdx: post } }: PageProps<PostData>) => (
  <PageHead
    title={`${post.frontmatter.title} - Blog | Andrew Zhuk`}
    description={post.frontmatter.description}
    image={
      post.frontmatter.thumbnail
        ? `https://andrewzhuk.com/${post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback?.src}`
        : undefined
    }
  />
)

export const query = graphql`
  query PostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        description
        tags
        lang
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      frontmatter {
        title
        slug
        lang
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      frontmatter {
        title
        slug
        lang
      }
    }
  }
`

export default PostTemplate
