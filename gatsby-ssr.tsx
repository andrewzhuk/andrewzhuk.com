import React from 'react'
import GoogleTagManager from './src/components/google-tag-manager'

const HtmlAttributes = {
  lang: 'en'
}

const BodyAttributes = {
  className: 'dark'
}

const PreBodyComponents = [
  <GoogleTagManager key="google-tag-manager" />
]

const HeadComponents = [  
  // <meta
  //   key="viewport"
  //   name="viewport"
  //   content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
  // />,
]

export const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
  setPreBodyComponents
}) => {
  setHeadComponents(HeadComponents)
  setHtmlAttributes(HtmlAttributes)
  setBodyAttributes(BodyAttributes)
  setPreBodyComponents(PreBodyComponents)
}

// // Wraps every page in a component
// exports.wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }