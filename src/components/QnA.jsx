import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { breakpoints, colors } from './design'
import Section from './Section'
import InfoModal from './InfoModal'

const Container = styled.div`
  margin: 4em 0;

  @media screen and (${breakpoints.mobile}) {
    margin: 3em 0;
  }
`

const Span = styled.span`
  color: ${props => props.color};
`

const Artwork = styled.img`
  height: 4em;
  margin-top: .5em;

  @media screen and (${breakpoints.mobile}) {
    height: 3em;
  }
`

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`

const Icon = styled.i`
  padding: .25em .5em 0;
  font-size: 2.5em;
  color: ${props => props.color};

  @media screen and (${breakpoints.xsmall}) {
    font-size: 2em;
  }
`

const GIF = styled.img`
  width: 100%;
`

const QnA = () => {
  // State //
  const [showInfoModal, setShowInfoModal] = useState(false)

  // Hooks //
  // Toggle scrolling when modal is open (className restricts scrolling)
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = showInfoModal ? "modal_open" : ""
  }, [showInfoModal])

  // GraphQL //
  const {
    goldenberry: { publicURL: goldberryURL },
    gifImage: { publicURL: GifURL }
  } = useStaticQuery(graphql`
    query {
      # Golden strawberry artwork
      goldenberry: file(name: { eq: "golden-strawberry" }) {
        publicURL
      }

      # Get URL of "You can do this" GIF
      gifImage: file(name: { eq: "you-can-do-this" }) {
        publicURL
      }
    }
  `)

  // Postcard section content //
  // About section content
  const aboutCards = {
    className: "about",
    header: "What exactly is this list?",
    postcards: [
      {
        rotateOffset: -2,
        alignSelf: "flex-start",
        content: (
          <p><Span color={colors.skyblue2}>Celeste</Span> is a challenging game about climbing a mountain & overcoming the obstacles in your journey. One of, if not, the biggest challenge it offers is collecting every strawberry.</p>
        )
      },
      {
        rotateOffset: 3,
        clockwise: false,
        alignSelf: "flex-end",
        content: (<>
          <p>And with the release of <Span color={colors.periwinkle}>Chapter 9: Farewell</Span>, the game introduced the hardest berry to be collected: Farewell's <Span color={colors.yelloworange}>golden strawberry</Span>.</p>
          <Artwork src={goldberryURL} alt="Golden strawberry artwork"/>
        </>)
      },
      {
        rotateOffset: -4,
        content: (<>
          <p>This alone is most completionists' final hurdle to completing such a challenge, & it's quite the achievement for those who do.</p>
          <p>This list serves as a record for all those players who persevered and gathered all of the strawberries.</p>
        </>)
      },
    ]
  }

  // Participation section content
  const participateCards = {
    className: "participate",
    header: "I want to be a part of this list!",
    postcards: [
      {
        rotateOffset: 3,
        clockwise: false,
        content: (<>
          <p>Well first of all, you're gonna need to collect all 202 berries, & I wish you the best of luck on that journey.</p>
          <p>But on the flipside that you did get all of them as you're reading this, congrats!</p>
          <p>Seriously, that ain't easy.</p>
        </>)
      },
      {
        rotateOffset: -4,
        alignSelf: "flex-start",
        content: (<>
          <p>The only thing needed from you is proof of you collecting Farewell's <Span color={colors.yelloworange}>golden strawberry</Span> in the form of a video. This video must show the whole run from start to finish, with no Assist or Variants mode.</p>
          <p><em>Can't record your whole run because you play on a Nintendo Switch?</em></p>
          <p><Span className="clickable" onClick={() => setShowInfoModal(true)} color={colors.blue}>There's an alternative!</Span></p>
        </>)
      },
      {
        rotateOffset: 4,
        clockwise: false,
        alignSelf: "flex-end",
        content: (<>
          <p>If you're not able to record your run, you can also submit a screenshot of your stats showing you collected every berry, but due to how this can be exploited, you'll be listed under a <Span color={colors.purple}>"screenshot"</Span> category.</p>
          <p>Players under this category will have their entries hidden by default on the list.</p>
        </>)
      },
      {
        rotateOffset: -5,
        content: (<>
          <p>Once you have that, upload your proof to a public space like <Span color={colors.red}>YouTube</Span>.</p>
          <p>Then send me a message on <Span color={colors.reddit}><a href="https://www.reddit.com/message/compose/?to=TammyDanny&subject=I%20got%20the%20golden%20berry!" target="_blank" rel="noopener noreferrer" style={{ color: "inherit"}}>Reddit</a></Span>, <Span color={colors.twitter}><a href="https://twitter.com/aCluelessDanny" target="_blank" rel="noopener noreferrer" style={{ color: "inherit"}}>Twitter</a></Span>, or through <Span color={colors.github}><a href="https://github.com/aCluelessDanny/wow-your-friends/issues" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>GitHub Issues</a></Span> with a link to your proof & a celebratory message!</p>
          <p>I'll add you on there once I take a look at it!</p>
          <FlexCenter>
            <a href="https://www.reddit.com/message/compose/?to=TammyDanny&subject=I%20got%20the%20golden%20berry!" target="_blank" rel="noopener noreferrer" aria-label="Compose a reddit private message to /u/TammyDanny"><Icon className="fab fa-reddit" color={colors.reddit}/></a>
            <a href="https://twitter.com/aCluelessDanny" target="_blank" rel="noopener noreferrer" aria-label="Visit @aCluelessDanny on Twitter"><Icon className="fab fa-twitter" color={colors.twitter}/></a>
            <a href="https://github.com/aCluelessDanny/wow-your-friends/issues" target="_blank" rel="noopener noreferrer" aria-label="Visit the Issues section of the repository in GitHub"><Icon className="fab fa-github" color={colors.github}/></a>
          </FlexCenter>
        </>)
      }
    ]
  }

  // "This is really hard" section content
  const encouragementCards = {
    className: "encouragement",
    header: "This is really hard...",
    postcards: [
      {
        rotateOffset: -4,
        content: (<>
          <p>Yeah...I won't sugarcoat it, this <em>is</em> a really difficult challenge.</p>
          <p>There's a reason why so few have managed to overcome it, & it's because of that difficulty that I wanted to commemorate those players. It takes a lot of patience & effort to go so far.</p>
        </>)
      },
      {
        rotateOffset: 4,
        clockwise: false,
        content: (<>
          <p>But if you believe you can, then I will too. <Span color={colors.marmalade}>You're more capable than you think.</Span></p>
          <p>In the words of Madeline at the base of the mountain:</p>
        </>)
      },
      {
        stagnant: true,
        content: (
          <GIF src={GifURL} alt="You can do this"/>
        )
      }
    ]
  }

  // Special Thanks section content
  const thankYouCards = {
    className: "thanks",
    header: "Special thanks",
    postcards: [
      {
        rotateOffset: 4,
        clockwise: false,
        content: (
          <ul>
            <li><Span color={colors.reddit}>/u/DJTom3</Span> for maintaining a record of this list <a href="https://www.reddit.com/r/celestegame/comments/dinrkb/with_their_amazing_achievement_of_getting_the/" target="_blank" rel="noopener noreferrer">here</a> and <a href="https://www.reddit.com/r/celestegame/comments/dut721/in_the_wake_of_the_last_few_farewell_golden/" target="_blank" rel="noopener noreferrer">here</a>, as it was my primary source of information.</li>
            <li>The <Span color={colors.skyblue2}>Celeste dev team</Span> for creating a fantastic game to play through.</li>
            <li>All the players on this list for going above and beyond to complete such a task.</li>
          </ul>
        )
      }
    ]
  }

  return (
    <Container>
      <Section {...aboutCards}/>
      <Section {...participateCards}/>
      <Section {...encouragementCards}/>
      <Section {...thankYouCards}/>
      <InfoModal show={showInfoModal} set={setShowInfoModal}/>
    </Container>
  )
}

export default QnA
