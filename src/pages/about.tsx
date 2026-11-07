import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import PageHead from '../components/page-head'
import { SectionLabel, Arrow } from '../components/editorial'
const AboutPage = () => (
  <Layout>
    <div className="page-heading">
      <SectionLabel number="01">The person behind the work</SectionLabel>
      <h1>
        Curiosity.
        <br />
        <span className="serif">Then code.</span>
      </h1>
    </div>
    <section className="about-story">
      <div className="about-photo">
        <img
          src="/images/editorial/andrew-approved.webp"
          alt="Andrew Zhuk"
          width="1402"
          height="1122"
        />
        <span className="micro">Andrew Zhuk / Founder & engineer</span>
      </div>
      <div className="about-biography">
        <span className="micro">A little about me</span>
        <h2>
          I like turning
          <br />
          “what if” into
          <br />
          <span className="serif">something real.</span>
        </h2>
        <p>
          I’m Andrew, a software engineer, systems architect, and founder of Atlarius. I’ve spent
          more than 15 years building software and understanding what makes products work — from the
          interface to the infrastructure.
        </p>
        <p>
          I’m happiest when I can connect the product idea with the engineering behind it.
          Understanding a problem, making the trade-offs, building the system, and learning from
          what happens next.
        </p>
        <p>
          Atlarius is where those interests meet today: a native workspace for teams, bringing tools
          and conversations closer to the work itself.
        </p>
        <Link className="underlined" to="/projects/atlarius/">
          What I’m building <Arrow />
        </Link>
      </div>
    </section>
    <section className="approach-section">
      <SectionLabel number="02">How I work</SectionLabel>
      <div className="approach-list">
        <div>
          <span>01</span>
          <h3>See the whole picture.</h3>
          <p>
            The product, the people, the architecture, and the cost of running it. The connections
            matter.
          </p>
        </div>
        <div>
          <span>02</span>
          <h3>Stay close to the details.</h3>
          <p>
            I work hands-on across frontend, backend, and infrastructure. Good decisions need an
            understanding of the actual system.
          </p>
        </div>
        <div>
          <span>03</span>
          <h3>Care about what lasts.</h3>
          <p>
            Performance, maintainability, and resource use are part of the experience. Quality
            continues long after release.
          </p>
        </div>
      </div>
    </section>
    <section className="technical-section">
      <SectionLabel number="03">My toolkit</SectionLabel>
      <h2>
        Different layers.
        <br />
        One connected system.
      </h2>
      <div className="toolkit">
        <div>
          <h3>Interfaces</h3>
          <p>React · Next.js · Gatsby · Vue</p>
        </div>
        <div>
          <h3>Applications & data</h3>
          <p>Rust · Node.js · Ruby · PostgreSQL</p>
        </div>
        <div>
          <h3>Infrastructure</h3>
          <p>Kubernetes · Docker · Terraform · CI/CD</p>
        </div>
      </div>
    </section>
  </Layout>
)
export default AboutPage
export const Head = () => (
  <PageHead
    title="About — Andrew Zhuk"
    pathname="/about/"
    description="Andrew Zhuk, founder of Atlarius and software architect with over 15 years of hands-on engineering experience."
  />
)
