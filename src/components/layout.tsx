import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import '../styles/global.css'
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="layout" id="top">
    <a className="skip-link" href="#main-content">
      Skip to content
    </a>
    <header>
      <Navbar />
    </header>
    <main id="main-content">{children}</main>
    <Footer />
  </div>
)
export default Layout
