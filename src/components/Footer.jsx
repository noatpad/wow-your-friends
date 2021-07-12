import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'

import { colors } from './design'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  background: #000b;
  color: white;

  a {
    color: inherit;
    text-decoration: none;
  }
`

const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 .5em .5em;
`

const Icon = styled.i`
  font-size: 1.7em;
  padding: .4em;
  margin: 0 .4em;

  &:hover {
    color: ${props => props.color};
  }
`

const Strawberry = styled.div`
  position: relative;
`

const GIF = styled.img`
  height: 2.5em;
`

const Glow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1px;
  width: 1px;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 1.2em .5em #ff8088,
    0 0 .6em .3em #ffa9ae50;
`

const Footnote = styled.p`
  font-size: .7em;
  color: #999;
`

const Footer = () => {
  // GraphQL //
  const { file: { publicURL: strawberryURL }} = useStaticQuery(graphql`
    query {
      # Get strawberry GIF URL
      file(name: { eq: "strawberry" }) {
        publicURL
      }
    }
  `)

  // Hooks //
  // Auto-animation of floating strawberry GIF (one-time hook)
  useEffect(() => {
    anime({
      targets: "#footer-strawberry",
      easing: "easeInOutQuad",
      duration: 1000,
      direction: "alternate",
      loop: true,
      translateY: "-15%"
    })

    anime({
      targets: "#strawberry-glow",
      easing: "easeInOutQuad",
      duration: 1000,
      direction: "alternate",
      loop: true,
      top: ["50%", "35%"]
    })
  }, [])

  // Animations //
  // Toggleable animation for hovering icons
  const hoverAnim = (hover, className, color) => {
    const target = `.${className}`
    anime.remove(target)
    anime({
      targets: target,
      easing: "spring(1, 100, 50, 0)",
      translateY: hover ? "-10%" : "0%",
      color: hover ? color : "#fff"
    })
  }

  return (
    <Container className="footer">
      <Strawberry>
        <GIF id="footer-strawberry" className="pixelated" src={strawberryURL} alt="A floating strawberry"/>
        <Glow id="strawberry-glow"/>
      </Strawberry>
      <IconsDiv>
        <a className="reddit-icon" href="https://www.reddit.com/user/TammyDanny" target="_blank" rel="noopener noreferrer" aria-label="Visit /u/TammyDanny on Reddit">
          <Icon
            className="reddit-icon fab fa-reddit-alien"
            onMouseEnter={() => hoverAnim(true, "reddit-icon", colors.reddit)}
            onMouseLeave={() => hoverAnim(false, "reddit-icon", colors.reddit)}/>
        </a>
        <a className="twitter-icon" href="https://twitter.com/noatpad" target="_blank" rel="noopener noreferrer" aria-label="Visit @noatpad on Twitter">
          <Icon
            className="twitter-icon fab fa-twitter"
            onMouseEnter={() => hoverAnim(true, "twitter-icon", colors.twitter)}
            onMouseLeave={() => hoverAnim(false, "twitter-icon", colors.twitter)}/>
        </a>
        <a className="github-icon" href="https://github.com/noatpad/wow-your-friends" target="_blank" rel="noopener noreferrer" aria-label="Visit the GitHub repository">
          <Icon
            className="github-icon fab fa-github"
            onMouseEnter={() => hoverAnim(true, "github-icon", colors.github)}
            onMouseLeave={() => hoverAnim(false, "github-icon", colors.github)}/>
        </a>
      </IconsDiv>
      <p>A website made by a clueless danny</p>
      <Footnote>Open sourced on GitHub | Hosted on Netlify</Footnote>
    </Container>
  )
}

export default Footer
