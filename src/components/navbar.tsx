import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <StaticImage
            className="nav-logo"
            src="../images/me.jpeg"
            alt="Andrew Zhuk"
            placeholder="blurred"
            layout="fixed"
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
          />
          <span className="nav-name">Andrew Zhuk</span>
        </Link>
        <div className="nav-links">
          <Link to="/posts" className="nav-link" activeClassName="active">
            Blog
          </Link>
          <Link to="/projects" className="nav-link" activeClassName="active">
            Projects
          </Link>
          <Link to="/about" className="nav-link" activeClassName="active">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
