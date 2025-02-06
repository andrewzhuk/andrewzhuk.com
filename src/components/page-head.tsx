import React from 'react'
// import { useSiteMetadata } from '../hooks/use-site-metadata'

interface PageHeadProps {
  title?: string
  description?: string
  pathname?: string
  children?: React.ReactNode
  image?: string
}

export const PageHead = ({ title, description, image, pathname, children }: PageHeadProps) => {
  // const siteMetadata = useSiteMetadata()

  // const seo = {
  //   title: title || 'Andrew Zhuk',
  //   description: description || 'Personal website of Andrew Zhuk - Software Engineer',
  //   url: `https://andrewzhuk.com${pathname || ''}`
  // }

  return (
    <>
      <title>{title || 'Andrew Zhuk'}</title>
      <meta name="description" content={description || 'Personal website of Andrew Zhuk - Software Engineer'} />

      <meta property="og:title" content={title || 'Andrew Zhuk'} />
      <meta property="og:description" content={description || 'Personal website of Andrew Zhuk - Software Engineer'} />
      <meta property="og:url" content={`https://andrewzhuk.com${pathname || ''}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || ''} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || 'Andrew Zhuk'} />
      <meta name="twitter:description" content={description || 'Personal website of Andrew Zhuk - Software Engineer'} />
      <meta name="twitter:creator" content="@imandrewzhuk" />
      <meta name="twitter:image" content={image || ''} />

      <link rel="canonical" href={`https://andrewzhuk.com${pathname || ''}`} />
      {children}
    </>
  )
}

export default PageHead
