import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { animated, useSpring, useTrail, interpolate } from 'react-spring'
import useMeasure from 'use-measure'

import Postcard from './Postcard'

const Container = styled.div``

const SectionContainer = styled.div`
  margin: 4em 0;
`

const SectionHeader = styled(animated.div)`
  display: inline-flex;
  align-items: center;
  padding-right: 1em;
  cursor: pointer;
`

const Icon = styled(animated.i)`
  font-size: 1.8em;
  margin-right: 0.25rem;
`

const Header = styled(animated.h2)`
  padding: 0.25em 0;
`
const Cards = styled(animated.div)`
  height: 0;
  overflow: hidden;
`

const PostcardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3em;
`

const GIF = styled(animated.img)`
  width: 90%;
`

// TODO: Optimize to not re-render because of useMeasure()
// TODO: When at the bottom of the page, make closing sections smoother
// Section sub-component
const Section = ({ header, postcards }) => {
  // State
  const [showSection, setShowSection] = useState(false)

  // useMeasure() hook to animate 'auto'
  const measureRef = useRef()
  const { height: cardsHeight } = useMeasure(measureRef)

  // Spring for header animations
  const [headerSpring, setHeaderSpring] = useSpring(() => ({ x: 0 }))

  // Spring for toggling sections
  const openSpring = useSpring({
    height: showSection ? cardsHeight : 0,
    rotate: showSection ? 90 : 0,
    delay: showSection ? 0 : 130 + (postcards.length * 65)
  })

  // Trail spring for postcards upon toggling sections
  const trail = useTrail(postcards.length, {
    percent: showSection ? 1 : 0,
    margin: showSection ? 1.5 : -1,
    y: showSection ? 0 : -100,
    rotateOffset: showSection ? 5 : 0
  })

  return (
    <SectionContainer>
      <SectionHeader
        onClick={() => setShowSection(!showSection)}
        onMouseEnter={() => setHeaderSpring({ x: 20 })}
        onMouseLeave={() => setHeaderSpring({ x: 0 })}
        style={{ paddingLeft: headerSpring.x }}
      >
        <Icon className="fas fa-fw fa-angle-right" style={{ transform: openSpring.rotate.interpolate(r => `rotate(${r}deg)`) }}/>
        <Header style={{ paddingLeft: headerSpring.x.interpolate(x => x / 2) }}>{header}</Header>
      </SectionHeader>
      <Cards style={{ height: openSpring.height }}>
        <PostcardWrapper ref={measureRef}>
          {trail.map(({ percent, margin, ...rest }, i) => {
            const PostcardContent = postcards[i]
            return <PostcardContent key={i} uniqueStyle={{ ...rest }} style={{
              margin: margin.interpolate(mh => `${mh}em 0`),
              opacity: percent
            }}/>
          })}
        </PostcardWrapper>
      </Cards>
    </SectionContainer>
  )
}

// Main component
const PostcardSections = () => {
  // GraphQL
  const { gifImage: { publicURL: GifURL }} = useStaticQuery(graphql`
    query {
      # Get URL of "You can do this" GIF
      gifImage: file(name: {eq: "you-can-do-this"}) {
        publicURL
      }
    }
  `)

  // Postcard section content
  // TODO: Add images where applicable
  // About section content
  const aboutCards = {
    header: "What exactly is this list?",
    postcards: [
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${-2 + r}deg)`),
          alignSelf: "start"
        }}>
          <p>Celeste is a challenging game about climbing a mountain & overcoming the obstacles in your journey. One of, if not, the biggest challenge it offers is collecting every strawberry.</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${3 - r}deg)`),
          alignSelf: "end"
        }}>
          <p>And with the release of Chapter 9: Farewell, the game introduced the hardest berry to be collected: Farewell's golden strawberry.</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${-4 + r}deg)`)
        }}>
          <p>This alone is most completionists' final hurdle to completing such a challenge, & it's quite the achievement for those who do. This list serves as a record for all those players who endured and gathered all of the strawberries.</p>
        </Postcard>
      )
    ]
  }

  // Participation section content
  const participateCards = {
    header: "I want to be a part of this list!",
    postcards: [
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${3 - r}deg)`),
        }}>
          <p>Well first of all, you're gonna need to collect all 202 berries, & I wish you the best of luck on that journey.</p>
          <p>But on the flipside that you did get all of them as you're reading this, congrats!</p>
          <p>Seriously, that ain't easy.</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${-4 + r}deg)`),
          alignSelf: "start"
        }}>
          <p>The only thing needed from you is proof of you collecting Farewell's golden strawberry in the form of a video. This video must show the whole run from start to finish, with no Assist or Variants mode.</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${4 - r}deg)`),
          alignSelf: "end"
        }}>
          <p>If you're not able to record your whole run, you can also submit a screenshot of your stats showing you collected every berry, but due to how this can be exploited, you'll be listed under a "screenshot" category.</p>
          <p>Players under this category will have their entries hidden by default on the list.</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${-5 + r}deg)`)
        }}>
          <p>Once you have that, send me a message on Reddit, Twitter, or through GitHub Issues with a link to your proof & a celebratory message!</p>
          <p>I'll add you on there once I take a look at it!</p>
        </Postcard>
      )
    ]
  }

  // "This is really hard" section content
  const encouragementCards = {
    header: "This is really hard...",
    postcards: [
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${-4 + r}deg)`)
        }}>
          <p>Yeah...I won't sugarcoat it, this <em>is</em> a really difficult challenge.</p>
          <p>There's a reason why so few have managed to overcome it, & it's because of that difficulty that I wanted to commemorate those players. It takes a lot of patience & effort to go so far.</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${4 - r}deg)`)
        }}>
          <p>But if you believe you can, then I will too. You're more capable than you think.</p>
          <p>In the words of Madeline at the base of the mountain:</p>
        </Postcard>
      ),
      ({ style, uniqueStyle: { y }}) => (
        <GIF src={GifURL} alt="You can do this" style={{
          ...style,
          transform: y.interpolate(y => `translateY(${y}%)`)
        }}/>
      )
    ]
  }

  // Special Thanks section content
  const thankYouCards = {
    header: "Special thanks",
    postcards: [
      ({ style, uniqueStyle: { y, rotateOffset }}) => (
        <Postcard style={{
          ...style,
          transform: interpolate([y, rotateOffset], (y, r) => `translateY(${y}%) rotate(${4 - r}deg)`)
        }}>
          <ul>
            <li>/u/DJTom3 for maintaining a record of this list <a href="https://twitter.com/aCluelessDanny/status/1188295050637262848" target="_blank" rel="noopener noreferrer">here</a>, as it was my primary source for that information.</li>
            <li>The Celeste dev team for creating a fantastic game to play through.</li>
            <li>All the players on this list for going above and beyond to complete such a task.</li>
          </ul>
        </Postcard>
      )
    ]
  }

  return (
    <Container>
      <Section {...aboutCards}/>
      <Section {...participateCards}/>
      <Section {...encouragementCards}/>
      <Section {...thankYouCards}/>
    </Container>
  )
}

export default PostcardSections
