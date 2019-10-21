import React from 'react'
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

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <Title>Hello Celeste</Title>
        <Journal/>
        <Section>
          <Header>What exactly is this list?</Header>
          <Paragraph>
            Celeste is a challenging game about climbing a mountain, but one of, if not, the biggest challenge it offers is collecting all 202 strawberries. While getting the regular 175 strawberries can be enduring on its own, the rest are something else. And with the release of Chapter 9: Farewell, the game introduced the hardest berry to be collected: Farewell's golden strawberry. And this alone is most completionists' final hurdle to getting every berry. This list serves as a record for all those players who endured and achieved collected all of the strawberries.
          </Paragraph>
        </Section>
        <Section>
          <Header>I want to be part of this list!</Header>
          <Paragraph>
            Well first of all, you're gonna need to collect all 202 berries, & I wish you the best of luck on that journey. But on the flipside that you did get all of them as you're reading this, congrats! Seriously, that's not an easy thing to do, but you pulled through and accomplished what very few have managed to do.
          </Paragraph>
          <Paragraph>
            The only thing needed from you is proof of you collecting Farewell's golden berry in the form of a video. This video will show you obtain the berry from start to finish, with no Assist or Variants mode. If you're not able to record your whole run, you can also submit a picture or screenshot of your stats showing you collected every berry, but due to how this can be exploited, you'll be listed under a "screenshot" category. Players under this category will have their entries hidden by default on the list.
          </Paragraph>
          <Paragraph>
            Once you have that, send me a message on Reddit, Twitter, or through GitHub Issues with a link to your proof, and I'll add you on there once I take a look at it! (Please send me a link to your proof uploaded on a service like YouTube, Imgur, or Reddit)
          </Paragraph>
        </Section>
        <Section>
          <Header>This is really hard...</Header>
          <Paragraph>
            Yeah...I wonder sugarcoat it, this <em>is</em> a really difficult challenge. There's a reason why I made this site, & it's to commemorate those who went above and beyond to complete Celeste to its entirety. It takes a lot of patience & effort to go so far.
          </Paragraph>
          <Paragraph>
            But if you believe you can, then I will too. You're more capable than you think. In the words of Madeline at the base of the mountain:
          </Paragraph>
          {/* Add GIF of the "You can do this" quote */}
        </Section>
      </Container>
    </Layout>
  )
}

export default IndexPage
