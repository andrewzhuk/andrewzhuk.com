import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ArrowRightUpIcon from '@remixicons/react/line/ArrowRightUpIcon'
export const Arrow = ({ className = '' }: { className?: string }) => (
  <ArrowRightUpIcon aria-hidden="true" className={`arrow ${className}`} />
)
export const projectDetails: Record<string, { category: string; summary: string }> = {
  fafty: { category: 'Product / Web3', summary: 'Video publishing meets digital ownership.' },
  menutto: { category: 'Product / Hospitality', summary: 'A more connected guest experience.' },
  'osm-pg-import': {
    category: 'Open source / Geospatial',
    summary: 'OpenStreetMap, ready for PostgreSQL.'
  },
  remixicons: {
    category: 'Open source / Developer tools',
    summary: 'A component layer for Remix Icon.'
  },
  'sequel-generate-slug': {
    category: 'Open source / Ruby',
    summary: 'Readable URLs, across languages.'
  }
}
export const SectionLabel = ({
  number,
  children
}: {
  number: string
  children: React.ReactNode
}) => (
  <div className="section-label">
    <span>({number})</span>
    <span>{children}</span>
  </div>
)
export const ProjectTile = ({ node, index = 0 }: { node: any; index?: number }) => {
  const f = node.frontmatter
  const d = projectDetails[f.slug]
  const img = getImage(f.thumbnail)
  return (
    <Link className={`project-tile tile-${f.slug}`} to={`/projects/${f.slug}/`}>
      <div className="project-art">
        {img && <GatsbyImage image={img} alt={`${f.title} project`} objectFit="contain" />}
        <span className="project-open">
          <Arrow />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <span className="micro">{d?.category || 'Product & engineering'}</span>
          <h3>{f.title}</h3>
          <p>{d?.summary || f.description}</p>
        </div>
        <span className="project-index">/{String(index + 2).padStart(2, '0')}</span>
      </div>
    </Link>
  )
}
export const AtlariusTile = () => (
  <div className="atlarius-tile">
    <div className="atlarius-copy">
      <span className="micro">Current focus / Founder & CEO</span>
      <h3>Atlarius</h3>
      <p>
        A native Mac workspace where technical teams can work with infrastructure and talk
        to each other in the same app.
      </p>
      <Link className="underlined" to="/projects/atlarius/">
        Explore the project <Arrow />
      </Link>
      <a className="investor-note" href="https://www.linkedin.com/in/winhack/">
        Open to conversations with early-stage investors <Arrow />
      </a>
    </div>
    <div className="atlarius-art">
      <img
        src="/images/editorial/atlarius.webp"
        alt="Atlarius product preview: Kubernetes tools and a team conversation in a demo workspace"
        width="1440"
        height="900"
        loading="lazy"
      />
    </div>
    <span className="image-note">Product in development · Demo workspace</span>
  </div>
)
export const WritingRow = ({ node, index = 0 }: { node: any; index?: number }) => {
  const f = node.frontmatter
  return (
    <Link className="writing-row" to={`/posts/${f.slug}/`}>
      <span className="writing-number">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <span className="micro">{f.tags?.slice(0, 2).join(' / ') || 'Ideas & observations'}</span>
        <h3>{f.title}</h3>
      </div>
      <Arrow />
    </Link>
  )
}
