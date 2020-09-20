import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import { colors, breakpoints } from './design';

const Span = styled.span`
  color: ${props => props.color ? props.color : 'inherit'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

const Container = styled.div`
  padding: 0 2em;
  margin: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (${breakpoints.tablet}) {
    padding: 0;
  }

  @media screen and (${breakpoints.large}) {
    margin: 3em 2em;
  }

  @media screen and (${breakpoints.mid}) {
    margin: 3em 0;
  }
`

const Notebook = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(600px + 5em);
  width: 100%;
  max-width: 800px;
  margin-top: 5em;
  transform: rotate(-1deg);
  background: #f7ece0;
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;
  color: #4a453f;
`

const Ticket = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 380px;
  transform: translateY(-4em) rotate(3deg);
  background: #ffda8f;
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;

  &::before {
    content: '';
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: calc(300 / 800 * 100%);
  }

  &::after {
    content: '';
    display: table;
    clear: both;
  }
`

const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: .5em 3em 2em;
  border-top: 2px solid #71333360;
  margin-top: -2em;
  overflow: scroll;

  @media screen and (${breakpoints.tablet}) {
    padding: .5em 2em 2em;
  }

  @media screen and (${breakpoints.mobile}) {
    padding: .5em 1em 2em;
  }
`

const Table = styled.div`
  width: 100%;
  padding-bottom: 1em;
  table-layout: fixed;
  border-spacing: 12px 9px;

  .date {
    width: 25%;
    opacity: .8;
    text-align: right;
    font-size: .9em;
  }

  .event {
    width: 75%;
  }

  .message {
    width: 100%;
    font-size: .75em;
    font-style: italic;
    color: #9c717d;
    text-align: center;
  }
`

const milestoneHistory = [
  {
    date: 'Sep 9, 2019',
    milestone: <p>Celeste: Farewell was released!</p>,
    message: <p>The journey to 202 begins...</p>
  },
  {
    date: 'Sep 12, 2019',
    milestone: <p>The <Span color={colors.orange}>first</Span> ever 202 was achieved!</p>
  },
  {
    date: 'Oct 16, 2019',
    milestone: <p><Span color={colors.orange} bold>10</Span> players have achieved 202!</p>,
    message: <p>We got a streak going!</p>
  },
  {
    date: 'Oct 19, 2019',
    milestone: <p>The first 202 on console and on PS4 was acheived!</p>
  },
  {
    date: 'Nov 11, 2019',
    milestone: <p><Span color={colors.purple}>Wow Your Friends</Span> launched!</p>
  },
  {
    date: 'Dec 14, 2019',
    milestone: <p>The first 202 on Mac was achieved!</p>
  },
  {
    date: 'Dec 25, 2019',
    milestone: <p>3 players achieved 202 on the same day!</p>,
    message: <p>Now that's a Christmas miracle if I ever saw one.</p>
  },
  {
    date: 'Dec 28, 2020',
    milestone: <p>The first 202 on Switch was achieved!</p>
  },
  {
    date: 'Jan 25, 2020',
    milestone: <p><Span color={colors.orange} bold>25</Span> players have achieved 202!</p>,
    message: <p>Such perseverance in those first months...</p>
  },
  {
    date: 'Jan 30, 2020',
    milestone: <p>The first 202 on Xbox One was achieved!</p>
  },
  {
    date: 'May 1, 2020',
    milestone: <p><Span color={colors.orange} bold>50</Span> players have achieved 202!</p>,
    message: <p>Half to a hundred, keep it up!</p>
  },
  {
    date: 'Jun 23, 2020',
    milestone: <p>The first 202 on Linux was achieved!</p>
  },
  {
    date: 'Aug 4, 2020',
    milestone: <p><Span color={colors.orange} bold>75</Span> players have achieved 202!</p>
  },
  {
    date: 'Sep 5, 2020',
    milestone: <p>4 players collected Farewell's golden on the same day, 3 of them achieving 202!</p>
  },
  {
    date: 'Sep 9, 2020',
    milestone: <p>Farewell's 1st anniversary!</p>,
    message: <p>A whole year since this all began...</p>
  },
  {
    date: 'Sep 16, 2020',
    milestone: <p><Span color={colors.yelloworange} bold>100</Span> players have achieved 202!</p>,
    message: <p>What a wild rush of determination to behold.<br/>Y'all are amazing, & I commend you for your efforts~</p>
  }
]

const Milestones = () => {
  const {
    notebookImage: { publicURL: notebookURL },
    ticketImage: { publicURL: ticketURL }
  } = useStaticQuery(graphql`
    query {
      notebookImage: file(name: {eq: "notebook" }) {
        publicURL
      }

      ticketImage: file(name: {eq: "ticket"}) {
        publicURL
      }
    }
  `)

  return (
    <Container>
      <Notebook image={notebookURL}>
        <Ticket image={ticketURL}>
          <h2>Milestones</h2>
        </Ticket>
        <History>
          <Table>
            {milestoneHistory.map(({ date, milestone, message }, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td className='date'>{date}</td>
                  <td className='event'>{milestone}</td>
                </tr>
                {message && (
                  <tr>
                    <td className='message' colSpan={2}>{message}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </Table>
        </History>
      </Notebook>
    </Container>
  )
};

export default Milestones;
