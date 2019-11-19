import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'

import { breakpoints } from './design'

const Header = styled.h1`
  margin: 3em 0;
  font-size: 4em;
  font-weight: normal;
  text-align: center;
  text-shadow: 0 3px #31315c;

  @media screen and (${breakpoints.mobile}) {
    font-size: 3em;
  }
`

const Word = styled.span`
  white-space: nowrap;

  & + &::before {
    content: " ";
  }
`

const Letter = styled.span`
  display: inline-block;
  white-space: pre;
`

const Title = () => {
  // GraphQL //
  const { site: { siteMetadata: { title }}} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // Hooks //
  // Animate each letter of title
  useEffect(() => {
    anime({
      targets: ".title .letter",
      easing: "easeOutBack",
      duration: 700,
      delay: anime.stagger(50, { start: 150 }),
      translateY: ["-1.1em", 0],
      opacity: [0, 1]
    })
  }, [])

  // Split title into an array of characters
  // const letters = [...title]

  // Split title into words
  const words = title.split(' ')

  return (
    <Header className="title">
      {/* {letters.map((letter, i) => (
        <span key={i}>{letter}</span>
      ))} */}
      {words.map((word, i) => {
        const letters = [...word]
        return (
          <Word key={i}>
            {letters.map((letter, j) => (
              <Letter className="letter" key={j}>{letter}</Letter>
            ))}
          </Word>
        )
      })}
    </Header>
  )
}

export default Title
