import React from 'react'
import { Link } from 'gatsby'
import { Arrow } from '../editorial'
const Hero = () => (
  <section className="hero" aria-label="Introduction">
    <div className="hero-rail" aria-hidden="true">
      <span>Personal website</span>
    </div>
    <div className="hero-intro">
      <div className="hero-experience">
        <strong>15+</strong>
        <span>Years in software engineering</span>
      </div>
      <h1>
        Hello<span>.</span>
      </h1>
      <p className="hero-subtitle">
        I’m Andrew Zhuk, founder of Atlarius and a software architect.
      </p>
      <p className="hero-approach">
        I’ve spent my career building startups, as a founder and as a CTO.
      </p>
      <p className="hero-skills">
        Rapid prototyping · Systems architecture · Distributed systems
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
    </div>
  </section>
)
export default Hero
