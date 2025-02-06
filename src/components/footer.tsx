import React from 'react'
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '@remixicons/react/line'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div>
          <p>&copy; {new Date().getFullYear()} Andrew Zhuk. All rights reserved.</p>
        </div>
        <div className="links">
          <a
            title="GitHub"
            href="https://github.com/andrewzhuk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="icon" />
          </a>
          <a
            title="LinkedIn"
            href="https://linkedin.com/in/winhack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="icon" />
          </a>
          <a
            title="X"
            href="https://twitter.com/imandrewzhuk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterXIcon className="icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
