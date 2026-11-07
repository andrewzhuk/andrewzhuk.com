import React from 'react'
interface Props {
  title?: string
  description?: string
  pathname?: string
  children?: React.ReactNode
  image?: string
}
const PageHead = ({
  title = 'Andrew Zhuk — Founder & Software Architect',
  description = 'Founder of Atlarius. Software and systems architect.',
  pathname,
  children,
  image = 'https://andrewzhuk.com/images/editorial/andrew-approved.webp'
}: Props) => (
  <>
    <title>{process.env.GATSBY_EDITORIAL_PREVIEW === '1' ? `${title} — Preview` : title}</title>
    <meta name="description" content={description} />
    {process.env.GATSBY_EDITORIAL_PREVIEW === '1' && (
      <meta name="robots" content="noindex, follow" />
    )}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {pathname && (
      <>
        <meta property="og:url" content={`https://andrewzhuk.com${pathname}`} />
        <link rel="canonical" href={`https://andrewzhuk.com${pathname}`} />
      </>
    )}
    <meta property="og:type" content="website" />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    {children}
  </>
)
export default PageHead
