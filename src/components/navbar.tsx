import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Arrow } from './editorial'
const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <nav className="nav" aria-label="Main navigation">
      <Link to="/" className="wordmark" aria-label="Andrew Zhuk home">
        <img className="personal-mark" src="/images/editorial/andrew-zhuk-mark.svg" width="44" height="44" alt="" aria-hidden="true" />
        <div>Andrew Zhuk<span>Independent mind. Hands-on builder.</span></div>
      </Link>
      <button
        type="button"
        className="menu-toggle"
        aria-controls="navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <div id="navigation" className={`nav-links ${open ? 'open' : ''}`}>
        <Link to="/about/" activeClassName="active" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link
          to="/projects/"
          partiallyActive
          activeClassName="active"
          onClick={() => setOpen(false)}
        >
          Work
        </Link>
        <Link to="/posts/" partiallyActive activeClassName="active" onClick={() => setOpen(false)}>
          Journal
        </Link>
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Let’s talk <Arrow />
        </a>
      </div>
    </nav>
  )
}
export default Navbar
