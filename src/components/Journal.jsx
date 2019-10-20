import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

const Book = styled.div`
  position: relative;
  min-height: 800px;
  transform: rotate(-2deg);
`;

const Page = styled.div`
  position: relative;
  height: 100%;
  min-height: 800px;
  padding: 1.5em 4em 1.5em 2.5em;
  border-radius: 0 1em 1em 0;
  background: #f4ebf5;
  color: #675883;
`;

const PageTitle = styled.h2`
  position: relative;
  padding: 0 0 0.5em;
  font-weight: normal;
  color: #5b4683;

  &::after {
    content: "";
    position: absolute;
    top: calc(100% - 2px);
    left: -2.5rem;
    right: -4rem;
    height: 3px;
    background: #c885ff20;
  }
`;

const Table = styled.table`
  width: 100%;

  td {
    padding: 0.5em 1em;
    text-align: center;
  }

  tr:nth-child(2n) {
    background: #c885ff20;
  }
`;

const Cover = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #e07360;
  justify-content: center;
  border-radius: 0 1em 1em 0;
`;

const Title = styled.h1`
  padding-top: 4em;
  font-size: 2.5em;
  font-weight: normal;
  text-align: center;
  color: #71335c;
`;

const Journal = () => {
  const { assetsJson: { conquerors }} = useStaticQuery(graphql`
    {
      assetsJson {
        conquerors {
          name
          date(formatString: "MMMM DD, YYYY")
          platform
          videoProof
          url
        }
      }
    }
  `);

  conquerors.sort((a, b) => new Date(a.date) - new Date(b.date));

  const getPlacement = (place) => {
    if (place >= 10 && place <= 19) { return `${place}th` }
    if (place % 10 === 1) { return `${place}st` }
    if (place % 10 === 2) { return `${place}nd` }
    if (place % 10 === 3) { return `${place}rd` }
    return `${place}th`
  }

  return (
    <Book>
      <Page>
        <PageTitle>CELESTE CONQUERORS</PageTitle>
        <Table>
          <tbody>
            {conquerors.map((c, i) => (
              <tr key={i}>
                <td>{getPlacement(i + 1)}</td>
                <td>{c.name}</td>
                <td>{c.date}</td>
                <td>{c.platform}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Cover>
          <Title>Madeline</Title>
        </Cover>
      </Page>
    </Book>
  )
};

export default Journal;
