import React from 'react'
import styled from '@emotion/styled'

import Layout from "../components/Layout"
import Journal from "../components/Journal"
import QnA from '../components/QnA'
import Footer from '../components/Footer'

const Container = styled.div`
  position: relative;
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
  text-shadow: 0 3px #31315c;
`

// TODO: Optimize images with gatsby plugins
// TODO: Work on responsive design
const IndexPage = () => {
  return (
    <Layout>
      <Container>
        {/* IDEA: Animate title like how Celeste does it */}
        <Title>Project Strawberry</Title>
        <Journal/>
        <QnA/>
      </Container>
      <Footer/>
    </Layout>
  )
}

export default IndexPage
