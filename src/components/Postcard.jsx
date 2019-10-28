import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { animated } from 'react-spring'

const Container = styled(animated.div)`
  position: relative;
  width: 75%;
  padding: 1em;
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

const Wrapper = styled.div`
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

const Postcard = ({ style, children }) => {
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
    <Container style={{ ...style }} url={postcardURL}>
      <Wrapper>
        {children}
      </Wrapper>
    </Container>
  )
}

export default Postcard
