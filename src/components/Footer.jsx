import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  background: #000b;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: .5em;
`

const Icon = styled.i`
  font-size: 1.5em;
  padding: .25em;
  margin: .25em;
`

const Footer = () => {
  return (
    <Container>
      <Icons>
        <Icon className="fab fa-twitter"/>
        <Icon className="fab fa-github"/>
      </Icons>
      <p>A website made by a clueless danny</p>
    </Container>
  )
}

export default Footer
