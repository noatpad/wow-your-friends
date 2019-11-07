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
  transform: translateY(-100%) rotate(0);
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

const StaticPostcard = styled(Postcard)`
  width: 100%;
  background: transparent;
`

// TODO: Replicate react-spring's animation with anime.js
const Section = ({ className, header, postcards }) => {
  // State
  const [showSection, setShowSection] = useState(false)

  // useMeasure() hook to animate 'auto'
  const measureRef = useRef()
  const { height: cardsWrapperHeight } = useMeasure(measureRef)

  // Toggleable animation for hovering headers
  const hoverAnim = hover => {
    const targets = `.${className} .headerContainer, .${className} .header`
    anime.remove(targets)
    anime({
      targets: targets,
      paddingLeft: hover ? 20 : 0,
      easing: "spring(1, 80, 10, 0)"
    })
  }

  // Animation timeline for toggling sections
  let tl = anime.timeline({
    easing: 'easeOutCubic',
    duration: 750,
    reverse: !showSection
  })

  tl.add({
      targets: `.${className} .cards`,
      height: showSection ? cardsWrapperHeight : 0
    })
    .add({
      targets: `.${className} .caret`,
      rotate: showSection ? 90 : 0
    }, 0)
    .add({
      targets: `.${className} .postcard`,
      easing: "easeOutExpo",
      opacity: showSection ? 1 : 0,
      translateY: showSection ? "0%" : "-100%",
      rotate: (_, i) => {
        const { stagnant = false, rotateOffset, clockwise = true } = postcards[i]
        console.log(postcards[i])
        if (stagnant) { return 0 }
        return rotateOffset + (showSection ? 0 : (clockwise ? 5 : -5))
      },
      delay: anime.stagger(65)
    }, 130)

  // Hook to toggle postcard animation
  useEffect(() => { tl.play() }, [showSection])

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
    <Container className={className}>
      <HeaderContainer
        className="headerContainer"
        onClick={() => setShowSection(!showSection)}
        onMouseEnter={() => hoverAnim(true)}
        onMouseLeave={() => hoverAnim(false)}
      >
        <Icon className="caret fas fa-fw fa-angle-right"/>
        <Header className="header">{header}</Header>
      </HeaderContainer>
      <Cards className="cards">
        <CardsWrapper ref={measureRef}>
          {postcards.map(({ stagnant = false, alignSelf, content }, i) =>
            stagnant ? (
              <StaticPostcard key={i} className="postcard">
                {content}
              </StaticPostcard>
            ) : (
              <Postcard
                key={i}
                className="postcard"
                url={postcardURL}
                style={{ alignSelf: alignSelf }}
              >
                <PostcardWrapper>
                  {content}
                </PostcardWrapper>
              </Postcard>
            )
          )}
          {/* {postcards.map(({ alignSelf, content }, i) => (
            <Postcard
              key={i}
              className="postcard"
              url={postcardURL}
              style={{ alignSelf: alignSelf }}
            >
              <PostcardWrapper>
                {content}
              </PostcardWrapper>
            </Postcard>
          ))} */}
        </CardsWrapper>
      </Cards>
    </Container>
  )
}

export default Section
