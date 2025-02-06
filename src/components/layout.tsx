import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="layout">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
