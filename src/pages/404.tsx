import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import PageHead from '../components/page-head'
const NotFoundPage = () => (
  <Layout>
    <div className="page-heading">
      <span className="micro">A small detour.</span>
      <h1>
        404<span className="serif">.</span>
      </h1>
      <p>
        This page isn’t here.
        <br />
        <Link className="underlined" to="/">
          Back to the beginning
        </Link>
      </p>
    </div>
  </Layout>
)
export default NotFoundPage
export const Head = () => <PageHead title="Page not found — Andrew Zhuk" />
