import React from 'react'
import styled from '@emotion/styled'

import Layout from "../components/Layout"
import Journal from "../components/Journal"
import PostcardSections from '../components/PostcardSections'
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

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <Title>Project Strawberry</Title>
        <Journal/>
        {/* <PostcardSections/> */}
      </Container>
      <Footer/>
    </Layout>
  )
}

export default IndexPage
