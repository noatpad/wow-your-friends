import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { animated, useSpring, useTrail } from 'react-spring'
import useMeasure from 'use-measure'

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
`

const Postcard = styled(animated.div)`
  padding: 1em;
  margin: 1em;
  background: #eeddd2;
  color: #4a453f;
  text-align: center;
`

const YouCanDoThis = styled.img`
  width: 90%;
`

// TODO: Optimize to not re-render because of useMeasure()
const Section = ({ header, postcards }) => {
  const [showSection, setShowSection] = useState(false)

  const measureRef = useRef()
  const { height: cardsHeight } = useMeasure(measureRef)

  const [headerSpring, setHeaderSpring] = useSpring(() => ({ x: 0 }))

  const openSpring = useSpring({
    height: showSection ? cardsHeight : 0,
    rotate: showSection ? 90 : 0,
    delay: showSection ? 0 : 50
  })

  const trail = useTrail(postcards.length, {
    percent: showSection ? 1 : 0,
    y: showSection ? 0 : -100,
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
        <animated.div ref={measureRef}>
          {trail.map(({ y, percent }, i) => {
            const postcardContent = postcards[i]
            return <Postcard key={i} style={{
              display: percent.interpolate(p => p > 0 ? 'inherit' : 'none'),
              transform: y.interpolate(y => `translateY(${y}%)`),
              margin: percent.interpolate(mh => `${mh}em 1em`),
              opacity: percent,
              pointerEvents: percent.interpolate(p => p < 1 ? 'none' : 'all')
            }}>{postcardContent}</Postcard>
          })}
        </animated.div>
      </Cards>
    </SectionContainer>
  )
}

const PostcardSections = () => {
  // Gatsby
  let { file: { publicURL: GifURL }} = useStaticQuery(graphql`
    query {
      # Get URL of "You can do this" GIF
      file(name: {eq: "you-can-do-this"}) {
        publicURL
      }
    }
  `)

  // Postcard section content
  const aboutCards = {
    header: "What exactly is this list?",
    postcards: [
      (<p>
        Celeste is a challenging game about climbing a mountain & overcoming the obstacles in your journey. One of, if not, the biggest challenge it offers is collecting every strawberry, which is a hefty task. And with the release of Chapter 9: Farewell, the game introduced the hardest berry to be collected: Farewell's golden strawberry.
      </p>),
      (<p>
        This alone is most completionists' final hurdle to completing such a challenge, & it's quite the achievement for those who do. This list serves as a record for all those players who endured and gathered all of the strawberries.
      </p>)
    ]
  }

  const participateCards = {
    header: "I want to be a part of this list!",
    postcards: [
      (<p>
        Well first of all, you're gonna need to collect all 202 berries, & I wish you the best of luck on that journey. But on the flipside that you did get all of them as you're reading this, congrats! Seriously, that's not an easy thing to do, but you pulled through and accomplished what very few have managed to do.
      </p>),
      (<p>
        The only thing needed from you is proof of you collecting Farewell's golden berry in the form of a video. This video will show you obtain the berry from start to finish, with no Assist or Variants mode. If you're not able to record your whole run, you can also submit a picture or screenshot of your stats showing you collected every berry, but due to how this can be exploited, you'll be listed under a "screenshot" category. Players under this category will have their entries hidden by default on the list.
      </p>),
      (<p>
        Once you have that, send me a message on Reddit, Twitter, or through GitHub Issues with a link to your proof, and I'll add you on there once I take a look at it!
      </p>)
    ]
  }

  const encouragementCards = {
    header: "This is really hard...",
    postcards: [
      (<p>
        Yeah...I won't sugarcoat it, this <em>is</em> a really difficult challenge. There's a reason why I made this site, & it's to commemorate those who went above and beyond to complete Celeste to its entirety. It takes a lot of patience & effort to go so far.
      </p>),
      (<p>
        But if you believe you can, then I will too. You're more capable than you think. In the words of Madeline at the base of the mountain:
      </p>),
      (<YouCanDoThis src={GifURL} alt="You can do this"/>)
    ]
  }

  return (
    <Container>
      <Section {...aboutCards}/>
      <Section {...participateCards}/>
      <Section {...encouragementCards}/>
    </Container>
  )
}

export default PostcardSections
