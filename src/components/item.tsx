import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import type { PostNode, ProjectNode } from '../types'

export type ItemProps = { type: 'post'; node: PostNode } | { type: 'project'; node: ProjectNode }

const Item = ({ type, node }: ItemProps) => {
  const isProject = type === 'project'
  const isPost = type === 'post'
  const path = isProject ? `/projects/${node.frontmatter.slug}` : `/posts/${node.frontmatter.slug}`

  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <Link to={path} className="item-card-link">
              {'thumbnail' in node.frontmatter && node.frontmatter.thumbnail && (
                <div className="thumbnail-wrapper asset">
                  <div className="thumbnail">
                    <GatsbyImage
                      image={getImage(node.frontmatter.thumbnail)!}
                      alt={node.frontmatter.title}
                      style={{ clipPath: 'inset(0.5px)' }}
                    />
                  </div>
                </div>
              )}

              <div className="item-card-body">
                <div className="item-card-content">
                  <div className="item-head">
                    <div className="item-card-title">
                      <span>{node.frontmatter.title}</span>
                    </div>
                  </div>
                  {isProject && 'opensource' in node.frontmatter && node.frontmatter.opensource && (
                    <div className="item-opensource">Open source</div>
                  )}
                  <div className="item-description">{node.frontmatter.description}</div>
                  {isPost && 'tags' in node.frontmatter && node.frontmatter.tags && (
                    <div className="item-tags">
                      {node.frontmatter.tags.map((tag: string) => (
                        <div className="item-tag" key={tag}>{tag}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="item-card-action">
                  <button type="button">{isProject ? 'View project' : 'Read more'}</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
