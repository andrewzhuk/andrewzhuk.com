import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        {process.env.GATSBY_EDITORIAL_PREVIEW !== '1' && <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TF88ZLGM');`,
          }}
        />}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          key="favicon"
          rel="icon"
          type="image/png"
          href="/images/favicon/favicon-96x96.png?v=zhe-1"
          sizes="96x96"
        />
        <link
          key="favicon-svg"
          rel="icon"
          type="image/svg+xml"
          href="/images/favicon/favicon.svg?v=zhe-1"
        />
        <link key="favicon-ico" rel="shortcut icon" href="/images/favicon/favicon.ico?v=zhe-1" />
        <link
          key="apple-touch-icon"
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link key="site-webmanifest" rel="manifest" href="/images/favicon/site.webmanifest" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {process.env.GATSBY_EDITORIAL_PREVIEW !== '1' && <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TF88ZLGM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>}
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
