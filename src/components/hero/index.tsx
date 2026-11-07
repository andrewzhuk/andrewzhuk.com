import React from 'react'
import { Link } from 'gatsby'
import { Arrow } from '../editorial'
const Hero = () => (
  <section className="hero" aria-label="Introduction">
    <div className="hero-rail">
      <span>Personal website</span>
      <span>Product. People. Possibilities.</span>
    </div>
    <div className="hero-intro">
      <div className="hero-facts">
        <div>
          <strong>15+</strong>
          <span>Years in engineering</span>
        </div>
        <div>
          <strong aria-label="From zero to one">
            0<span className="fact-arrow" aria-hidden="true">→</span>1
          </strong>
          <span>Ideas into products</span>
        </div>
      </div>
      <h1>
        Hello<span>.</span>
      </h1>
      <p className="hero-subtitle">
        I’m Andrew — a founder
        <br />
        who builds.
      </p>
      <Link className="underlined" to="/about/">
        A little about me <Arrow />
      </Link>
    </div>
    <img
      className="hero-portrait"
      src="/images/editorial/andrew-approved.webp"
      alt="Andrew Zhuk"
      width="1402"
      height="1122"
      fetchPriority="high"
    />
    <div className="hero-bottom">
      <span>Founder & CEO, Atlarius</span>
      <a href="#selected-work">
        Discover my work <span aria-hidden="true">↓</span>
      </a>
      <span>Software & systems architecture</span>
    </div>
  </section>
)
export default Hero
