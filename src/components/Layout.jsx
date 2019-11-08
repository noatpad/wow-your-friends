import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import styled from "@emotion/styled"

import "./global.css"

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const HeaderBG = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  mask-image: linear-gradient(to top, transparent, #31315c);
  filter: blur(4px);
`

const Layout = ({ children }) => {
  // GraphQL //
  const { site, bgImage: { publicURL: imageURL }} = useStaticQuery(graphql`
    query {
      # Get site title
      site {
        siteMetadata {
          title
        }
      }

      # Get header background image URL
      bgImage: file(name: { eq: "header-bg" }) {
        publicURL
      }
    }
  `)

  return (
    <>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <script src="https://kit.fontawesome.com/a35b219d74.js" crossorigin="anonymous"></script>
      </Helmet>
      <Container>
        <HeaderBG src={imageURL} alt="An ethereal, golden background image"/>
        {children}
      </Container>
    </>
  )
}

export default Layout
