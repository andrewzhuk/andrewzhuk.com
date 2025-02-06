import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import PageHead from '../components/page-head'
const AboutPage = () => {
  return (
    <Layout>
      <div className="about-container">
        <div className="about-grid">
          <div className="about-image-container">
            <StaticImage
              src="../images/profile.jpeg"
              alt="Andrew Zhuk"
              className="rounded-lg"
              objectFit="cover"
              layout="fullWidth"
              placeholder="blurred"
            />
          </div>

          <div className="about-content">
            <h1 className="about-header">
              I'm Andrew Zhuk. I live in Kyiv Ukraine & Valencia Spain, where I build the
              future.
            </h1>
            <p className="about-text">
              I'm a developer who happily works on both backend and frontend. As a seasoned
              engineer, I began my journey in IT back when people were just getting used to the idea
              that Windows wasn’t just a program but almost a full-fledged operating system. Since
              then, I’ve seen a lot, and technology continues to bring me joy every day, with some
              things pleasantly surprising me.
            </p>

            <p className="about-text">
              I love creating cool projects and experimenting with startup ideas. I live between
              lines of code, a cup of coffee, and a generous dose of good vibes. When I'm not
              immersed in the world of development, you can find me taking a walk or hanging out
              with friends, discussing the latest tech news. I believe that even an error in the
              code can be a reason to smile – because every problem hides a new solution.
            </p>

            <p className="about-text">
              On this page, I share my projects, ideas, and amusing stories from the world of IT.
              Let's make the digital world a little more interesting together!
            </p>

            <div className="about-skills">
              <h2 className="about-skills-title">Skills</h2>
              <div className="skills-list">
                <div className="skill-item">Frontend: React, Next, Gatsby, Vue, Nuxt</div>
                <div className="skill-item">
                  Backend: Node.js, Express, NestJS, Ruby, Roda, Rust, Actix Web
                </div>
                <div className="skill-item">
                  Blockchain: Solidity, Web3.js, Solana, Truffle, Hardhat
                </div>
                <div className="skill-item">
                  DevOps: Docker, Kubernetes, GitHub Actions, GitLab CI, Terraform
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export const Head = () => (
  <>
    <PageHead
      title="About Me | Andrew Zhuk"
      description="Learn more about Andrew Zhuk - Full Stack Developer specializing in web development and blockchain technologies."
    />
  </>
)
