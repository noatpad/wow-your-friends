import React from 'react'
import styled from '@emotion/styled'

import Layout from "../components/Layout"
import Title from "../components/Title"
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

// TODO: Optimize images with gatsby plugins
// TODO: Work on responsive design
const IndexPage = () => (
  <Layout>
    <Container>
      <Title/>
      <Journal/>
      <QnA/>
    </Container>
    <Footer/>
  </Layout>
)

export default IndexPage
