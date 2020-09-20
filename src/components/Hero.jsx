import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'
import { useMediaQuery } from 'react-responsive'

import { breakpoints } from './design'

const Title = styled.h1`
  margin: 3em 0;
  font-size: 4em;
  font-weight: normal;
  text-align: center;
  text-shadow: 0 3px #31315c;

  @media screen and (${breakpoints.large}) {
    font-size: 3.5em;
  }

  @media screen and (${breakpoints.mid}) {
    font-size: 2.8em;
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
  opacity: 0;
`

const Hero = ({ loaded }) => {
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
  // Custom hook for repsonsive design
  const isMobile = useMediaQuery({ query: `(${breakpoints.mobile})` });

  // Animate each letter of title
  useEffect(() => {
    if (!loaded) { return; }

    anime({
      targets: ".title .letter",
      easing: "easeOutQuart",
      duration: 700,
      delay: anime.stagger(50, { start: 150 }),
      translateY: ["-1.1em", 0],
      opacity: [0, 1]
    })
  }, [loaded])

  // Split title into words
  const words = title.split(' ')

  return (
    <Title className="title">
      {words.map((word, i) => {
        const letters = [...word]
        return (
          <React.Fragment key={i}>
            <Word>
              {letters.map((letter, j) => (
                <Letter className="letter" key={`${i} ${j}`}>{letter}</Letter>
              ))}
            </Word>
            {isMobile && i === 1 && <br/>}
          </React.Fragment>
        )
      })}
    </Title>
  )
}

export default Hero
