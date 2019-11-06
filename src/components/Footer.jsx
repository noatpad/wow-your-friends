import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em 2em;
  background: #000b;

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
  transition: all .4s;

  &:hover {
    transform: translateY(-20%);
    color: ${props => props.color};
  }
`

const float = keyframes`
  to { transform: translateY(-20%); }
`

const GIF = styled.img`
  height: 2.5em;
  animation: ${float} 1s alternate infinite ease-in-out;
`

const Footnote = styled.p`
  font-size: .7em;
  color: #999;
`

// NOTE: Can't use react-spring as much here because of lag
const Footer = () => {
  const { file } = useStaticQuery(graphql`
    query {
      file(name: { eq: "strawberry" }) {
        publicURL
      }
    }
  `)

  return (
    <Container>
      <IconsDiv>
        <a href="https://twitter.com/aCluelessDanny" target="_blank" rel="noopener noreferrer">
          <Icon color={"#38a1f3"} className="fab fa-twitter"/>
        </a>
        <GIF className="pixelated" src={file.publicURL} alt="A floating strawberry"/>
        <a href="?" target="_blank" rel="noopener noreferrer">
          <Icon color={"#6e5494"} className="fab fa-github"/>
        </a>
      </IconsDiv>
      <p>A website made by a clueless danny</p>
      <Footnote>Open sourced on GitHub | Hosted on ?</Footnote>
    </Container>
  )
}

export default Footer
