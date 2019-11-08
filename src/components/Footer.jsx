import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em 2em;
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
  margin: .5em;
`

const Icon = styled.i`
  font-size: 1.7em;
  padding: .6em;
  margin: .2em;

  &:hover {
    color: ${props => props.color};
  }
`

const GIF = styled.img`
  height: 2.5em;
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

  // Auto-animation of floating strawberry GIF
  anime({
    targets: "#footer-strawberry",
    easing: "easeInOutQuad",
    duration: 1000,
    direction: "alternate",
    loop: true,
    translateY: "-20%"
  })

  // TODO: When published, add information & links to repo
  return (
    <Container className="footer">
      <IconsDiv>
        <a className="twitter-icon" href="https://twitter.com/aCluelessDanny" target="_blank" rel="noopener noreferrer">
          <Icon
            className="twitter-icon fab fa-twitter"
            onMouseEnter={() => hoverAnim(true, "twitter-icon", "#38a1f3")}
            onMouseLeave={() => hoverAnim(false, "twitter-icon", "#38a1f3")}/>
        </a>
        <GIF id="footer-strawberry" className="pixelated" src={strawberryURL} alt="A floating strawberry"/>
        <a className="github-icon" href="?" target="_blank" rel="noopener noreferrer">
          <Icon
            className="github-icon fab fa-github"
            onMouseEnter={() => hoverAnim(true, "github-icon", "#6e5494")}
            onMouseLeave={() => hoverAnim(false, "github-icon", "#6e5494")}/>
        </a>
      </IconsDiv>
      <p>A website made by a clueless danny</p>
      <Footnote>Open sourced on GitHub | Hosted on ?</Footnote>
    </Container>
  )
}

export default Footer
