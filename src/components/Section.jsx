import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'
import useMeasure from 'use-measure'

const Container = styled.div`
  margin: 4em 0;
`

const HeaderContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding-right: 1em;
  cursor: pointer;
`

const Icon = styled.i`
  font-size: 1.8em;
  margin-right: .25rem;
`

const Header = styled.h2`
  padding: .25em 0;
`

const Cards = styled.div`
  height: 0;
  overflow: hidden;
`

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3em;
`

const Postcard = styled.div`
  position: relative;
  width: 75%;
  padding: 1em;
  margin: 1.5em 0;
  background: #f2ebe8;
  background: url(${props => props.url}) no-repeat center center;
  background-size: contain;
  color: #4a453f;
  text-align: center;

  &::after {
    display: block;
    content: "";
    width: 100%;
    padding-top: calc(553 / 859 * 100%);
  }
`

const PostcardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0%;
  padding: 2em;
  font-size: 1.1em;

  ul, ol {
    padding: 0 1em;
    text-align: left;
  }

  & > * + * {
    margin-top: .4em;
  }
`

const Section = ({ header, postcards }) => {
  // State
  const [showSection, setShowSection] = useState(false)

  // useMeasure() hook to animate 'auto'
  const measureRef = useRef()
  const { height: cardsWrapperHeight } = useMeasure(measureRef)

  //

  // Hook to toggle postcard animation
  useEffect(() => {
    let tl = anime.timeline({
      easing: 'easeOutCubic',
      duration: 750,
    })

    tl
      .add({
        targets: ".cards",
        height: showSection ? cardsWrapperHeight : 0
      })
      .add({
        targets: ".postcard",
        easing: "easeOutExpo",
        opacity: showSection ? 1 : 0,
        translateY: showSection ? 0 : "-100%",
        rotate: (_, i) => {
          const { rotateOffset, clockwise = true } = postcards[i]
          if (showSection) {
            return rotateOffset
          } else {
            return rotateOffset + (clockwise ? 5 : -5)
          }
        },
        delay: anime.stagger(65)
      }, "130")
  }, [showSection])

  // GraphQL
  const { postcardImage: { publicURL: postcardURL }} = useStaticQuery(graphql`
    query {
      # Get URL of postcard background image
      postcardImage: file(name: {eq: "postcard"}) {
        publicURL
      }
    }
  `)

  return (
    <Container>
      <HeaderContainer
        onClick={() => setShowSection(!showSection)}
      >
        <Icon className="fas fa-fw fa-angle-right"/>
        <Header>{header}</Header>
      </HeaderContainer>
      <Cards className="cards">
        <CardsWrapper ref={measureRef}>
          {postcards.map(({ content }) => (
            <Postcard className="postcard" url={postcardURL}>
              <PostcardWrapper>
                {content}
              </PostcardWrapper>
            </Postcard>
          ))}
        </CardsWrapper>
      </Cards>
    </Container>
  )
}

export default Section
