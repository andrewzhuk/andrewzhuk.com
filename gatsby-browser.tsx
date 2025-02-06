import './src/styles/global.css'
import 'prismjs/themes/prism-tomorrow.css'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { type GatsbyBrowser } from 'gatsby'
import { Link } from 'gatsby'
import Tip from './src/components/tip'

const components = {
  Link: Link,
  Tip: Tip
}

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
