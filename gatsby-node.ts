import { type GatsbyNode } from 'gatsby'
import path from 'path'

interface Item {
  node: {
    id: string
    frontmatter: {
      title: string
      description: string
      tags: string[]
      slug: string
      lang: string
    }
    internal: {
      contentFilePath: string
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/post.tsx')
  const projectTemplate = path.resolve('./src/templates/project.tsx')

  // Query for blog posts
  const blogResult = await graphql<{ allMdx: { edges: Item[] } }>(`
    query CreateBlogPages {
      allMdx(
        filter: { internal: { contentFilePath: { regex: "/content/posts/" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              description
              tags
              slug
              lang
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild('Error while creating blog pages', blogResult.errors)
    return
  }

  const posts = blogResult.data?.allMdx.edges || []

  if (posts.length > 0) {
    // Group posts by language
    const postsByLang: { [key: string]: typeof posts } = {}
    posts.forEach(post => {
      const lang = post.node.frontmatter.lang
      if (!postsByLang[lang]) {
        postsByLang[lang] = []
      }
      postsByLang[lang].push(post)
    })

    // Create pages for each language
    Object.entries(postsByLang).forEach(([lang, langPosts]) => {
      langPosts.forEach((post, index) => {
        // Find previous and next posts on the same language
        const previousPostId = index === 0 ? null : langPosts[index - 1].node.id
        const nextPostId = index === langPosts.length - 1 ? null : langPosts[index + 1].node.id

        // Find all translations of the current post
        const translations = posts.filter(p => 
          p.node.frontmatter.slug === post.node.frontmatter.slug && 
          p.node.frontmatter.lang !== post.node.frontmatter.lang
        ).map(t => ({
          lang: t.node.frontmatter.lang,
          slug: t.node.frontmatter.slug
        }))

        // Create page for the current language
        const pagePath = post.node.frontmatter.lang === 'en' 
          ? `/posts/${post.node.frontmatter.slug}`
          : `/${post.node.frontmatter.lang}/posts/${post.node.frontmatter.slug}`

        createPage({
          path: pagePath,
          component: `${postTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
          context: {
            id: post.node.id,
            previousPostId,
            nextPostId,
            translations,
            currentLang: lang
          }
        })
      })
    })
  }

  // Query for projects
  const projectResult = await graphql<{ allMdx: { edges: Item[] } }>(`
    query CreateProjectPages {
      allMdx(
        sort: { frontmatter: { position: ASC } }
        filter: { internal: { contentFilePath: { regex: "/content/projects/" } } }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              description
              tags
              slug
              lang
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (projectResult.errors) {
    reporter.panicOnBuild('Error while creating project pages', projectResult.errors)
    return
  }

  const projects = projectResult.data?.allMdx.edges || []

  if (projects.length > 0) {
    projects.forEach((project, index) => {
      const previousProjectId = index === 0 ? null : projects[index - 1].node.id
      const nextProjectId = index === projects.length - 1 ? null : projects[index + 1].node.id

      // Find all translations of the current project
      // const translations = projects.filter(p => 
      //   p.node.frontmatter.slug === project.node.frontmatter.slug && 
      //   p.node.frontmatter.lang !== project.node.frontmatter.lang
      // ).map(t => ({
      //   lang: t.node.frontmatter.lang,
      //   slug: t.node.frontmatter.slug
      // }))

      // Create page for the current language
      // const pagePath = project.node.frontmatter.lang === 'en' 
      //   ? `/projects/${project.node.frontmatter.slug}`
      //   : `/${project.node.frontmatter.lang}/projects/${project.node.frontmatter.slug}`

      createPage({
        path: `/projects/${project.node.frontmatter.slug}`,
        component: `${projectTemplate}?__contentFilePath=${project.node.internal.contentFilePath}`,
        context: {
          id: project.node.id,
          previousProjectId,
          nextProjectId,
          // translations
        }
      })
    })
  }
}
