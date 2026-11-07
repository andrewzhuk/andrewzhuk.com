import React from 'react'
import { Link } from 'gatsby'
import { Arrow } from './editorial'
const Footer = () => (
  <footer id="contact" className="footer">
    <div className="footer-top">
      <span className="micro">Good things start with a conversation.</span>
      <span className="micro">Founder / Engineer / Builder</span>
    </div>
    <a
      className="footer-title"
      href="https://www.linkedin.com/in/winhack/"
      target="_blank"
      rel="noreferrer"
    >
      Let’s talk.
      <Arrow />
    </a>
    <div className="footer-bottom">
      <Link to="/">© {new Date().getFullYear()} Andrew Zhuk</Link>
      <div>
        <a href="https://www.linkedin.com/in/winhack/" target="_blank" rel="noreferrer">
          LinkedIn <Arrow />
        </a>
        <a href="https://github.com/andrewzhuk" target="_blank" rel="noreferrer">
          GitHub <Arrow />
        </a>
        <a href="https://atlarius.com" target="_blank" rel="noreferrer">
          Atlarius <Arrow />
        </a>
      </div>
      <a href="#top">Back to top</a>
    </div>
  </footer>
)
export default Footer
