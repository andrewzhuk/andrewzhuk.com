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
  const courseTemplate = path.resolve('./src/templates/course.tsx')

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

  // Query for courses
  const courseResult = await graphql<{ allMdx: { edges: Item[] } }>(`
    query CreateCoursePages {
      allMdx(
        sort: { frontmatter: { position: ASC } }
        filter: { internal: { contentFilePath: { regex: "/content/courses/" } } }
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

  if (courseResult.errors) {
    reporter.panicOnBuild('Error while creating course pages', courseResult.errors)
    return
  }

  const courses = courseResult.data?.allMdx.edges || []

  if (courses.length > 0) {
    courses.forEach((course, index) => {
      const previousCourseId = index === 0 ? null : courses[index - 1].node.id
      const nextCourseId = index === courses.length - 1 ? null : courses[index + 1].node.id

      // Find all translations of the current course
      // const translations = courses.filter(p => 
      //   p.node.frontmatter.slug === course.node.frontmatter.slug && 
      //   p.node.frontmatter.lang !== course.node.frontmatter.lang
      // ).map(t => ({
      //   lang: t.node.frontmatter.lang,
      //   slug: t.node.frontmatter.slug
      // }))

      // Create page for the current language
      // const pagePath = course.node.frontmatter.lang === 'en' 
      //   ? `/courses/${course.node.frontmatter.slug}`
      //   : `/${course.node.frontmatter.lang}/courses/${course.node.frontmatter.slug}`

      createPage({
        path: `/courses/${course.node.frontmatter.slug}`,
        component: `${courseTemplate}?__contentFilePath=${course.node.internal.contentFilePath}`,
        context: {
          id: course.node.id,
          previousCourseId,
          nextCourseId,
          // translations
        }
      })
    })
  }
}
