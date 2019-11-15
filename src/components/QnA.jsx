import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import Section from './Section'

const GIF = styled.img`
  width: 90%;
`

const QnA = () => {
  // GraphQL //
  const { gifImage: { publicURL: GifURL }} = useStaticQuery(graphql`
    query {
      # Get URL of "You can do this" GIF
      gifImage: file(name: {eq: "you-can-do-this"}) {
        publicURL
      }
    }
  `)

  // Postcard section content //
  // TODO: Add images where applicable
  // About section content
  const aboutCards = {
    className: "about",
    header: "What exactly is this list?",
    postcards: [
      {
        rotateOffset: -2,
        alignSelf: "flex-start",
        content: (
          <p>Celeste is a challenging game about climbing a mountain & overcoming the obstacles in your journey. One of, if not, the biggest challenge it offers is collecting every strawberry.</p>
        )
      },
      {
        rotateOffset: 3,
        clockwise: false,
        alignSelf: "flex-end",
        content: (
          <p>And with the release of Chapter 9: Farewell, the game introduced the hardest berry to be collected: Farewell's golden strawberry.</p>
        )
      },
      {
        rotateOffset: -4,
        content: (
          <p>This alone is most completionists' final hurdle to completing such a challenge, & it's quite the achievement for those who do. This list serves as a record for all those players who endured and gathered all of the strawberries.</p>
        )
      },
    ]
  }

  // Participation section content
  // TODO: Add extra card for Switch users described here: https://www.reddit.com/r/celestegame/comments/dvgf79/wip_a_website_commemorating_all_the_players_who/f7cx4aq/?context=3
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
        content: (
          <p>The only thing needed from you is proof of you collecting Farewell's golden strawberry in the form of a video. This video must show the whole run from start to finish, with no Assist or Variants mode.</p>
        )
      },
      {
        rotateOffset: 4,
        clockwise: false,
        alignSelf: "flex-end",
        content: (<>
          <p>If you're not able to record your whole run, you can also submit a screenshot of your stats showing you collected every berry, but due to how this can be exploited, you'll be listed under a "screenshot" category.</p>
          <p>Players under this category will have their entries hidden by default on the list.</p>
        </>)
      },
      {
        rotateOffset: -5,
        content: (<>
          <p>Once you have that, send me a message on Reddit, Twitter, or through GitHub Issues with a link to your proof & a celebratory message!</p>
          <p>I'll add you on there once I take a look at it!</p>
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
          <p>But if you believe you can, then I will too. You're more capable than you think.</p>
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
            <li>/u/DJTom3 for maintaining a record of this list <a href="https://www.reddit.com/r/celestegame/comments/dinrkb/with_their_amazing_achievement_of_getting_the/" target="_blank" rel="noopener noreferrer">here</a> and <a href="https://www.reddit.com/r/celestegame/comments/dut721/in_the_wake_of_the_last_few_farewell_golden/" target="_blank" rel="noopener noreferrer">here</a>, as it was my primary source of information.</li>
            <li>The Celeste dev team for creating a fantastic game to play through.</li>
            <li>All the players on this list for going above and beyond to complete such a task.</li>
          </ul>
        )
      }
    ]
  }

  return (
    <>
      <Section {...aboutCards}/>
      <Section {...participateCards}/>
      <Section {...encouragementCards}/>
      <Section {...thankYouCards}/>
    </>
  )
}

export default QnA
