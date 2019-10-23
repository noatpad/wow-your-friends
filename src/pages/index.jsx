import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import Layout from "../components/Layout"
import Journal from "../components/Journal"

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 2em 4em;
  margin: 0 auto;
`

const Title = styled.h1`
  margin: 3em 0;
  font-size: 4em;
  font-weight: normal;
  text-align: center;
`

const Section = styled.div`
  margin: 4em 0;
`

const Header = styled.h2`
  padding: 0.25em 0;
`

const Paragraph = styled.p`
  & + & {
    padding-top: 0.25em;
  }
`

const YouCanDoThis = styled.img`
  height: 100%;
  width: 100%;
  padding: 4em;
`

const IndexPage = () => {
  let { file: { publicURL: GifURL }} = useStaticQuery(graphql`
    query {
      # Get URL of "You can do this" GIF
      file(name: {eq: "you-can-do-this"}) {
        publicURL
      }
    }
  `)

  return (
    <Layout>
      <Container>
        <Title>Hello Celeste</Title>
        <Journal/>
        <Section>
          <Header>What exactly is this list?</Header>
          <Paragraph>
            Celeste is a challenging game about climbing a mountain & overcoming the obstacles in your journey. One of, if not, the biggest challenge it offers is collecting every strawberry, which is a hefty task. And with the release of Chapter 9: Farewell, the game introduced the hardest berry to be collected: Farewell's golden strawberry. This alone is most completionists' final hurdle to completing such a challenge, & it's quite the achievement for those who do. This list serves as a record for all those players who endured and gathered all of the strawberries.
          </Paragraph>
        </Section>
        <Section>
          <Header>I want to be a part of this list!</Header>
          <Paragraph>
            Well first of all, you're gonna need to collect all 202 berries, & I wish you the best of luck on that journey. But on the flipside that you did get all of them as you're reading this, congrats! Seriously, that's not an easy thing to do, but you pulled through and accomplished what very few have managed to do.
          </Paragraph>
          <Paragraph>
            The only thing needed from you is proof of you collecting Farewell's golden berry in the form of a video. This video will show you obtain the berry from start to finish, with no Assist or Variants mode. If you're not able to record your whole run, you can also submit a picture or screenshot of your stats showing you collected every berry, but due to how this can be exploited, you'll be listed under a "screenshot" category. Players under this category will have their entries hidden by default on the list.
          </Paragraph>
          <Paragraph>
            Once you have that, send me a message on Reddit, Twitter, or through GitHub Issues with a link to your proof, and I'll add you on there once I take a look at it!
          </Paragraph>
        </Section>
        <Section>
          <Header>This is really hard...</Header>
          <Paragraph>
            Yeah...I won't sugarcoat it, this <em>is</em> a really difficult challenge. There's a reason why I made this site, & it's to commemorate those who went above and beyond to complete Celeste to its entirety. It takes a lot of patience & effort to go so far.
          </Paragraph>
          <Paragraph>
            But if you believe you can, then I will too. You're more capable than you think. In the words of Madeline at the base of the mountain:
          </Paragraph>
          <YouCanDoThis src={GifURL} alt="You can do this"/>
        </Section>
      </Container>
    </Layout>
  )
}

export default IndexPage
