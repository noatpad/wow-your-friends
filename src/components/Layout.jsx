import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "@emotion/styled";

import "./global.css"

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #31315c;
`

const Layout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query {
       site {
         siteMetadata {
           title
         }
       }
    }
  `);

  return (
    <>
      <Helmet
        title={site.siteMetadata.title}
      />
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;
