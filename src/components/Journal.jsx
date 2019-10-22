import React, { useState, useLayoutEffect, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { useSpring, animated } from 'react-spring'
import { useScrollPosition } from './useScrollPosition'

const Book = styled.div`
  position: relative;
  min-height: 800px;
  padding-bottom: 3em;
  transform: rotate(-2deg);
`

const Page = styled.div`
  position: relative;
  height: 100%;
  min-height: 800px;
  padding: 1.5em 4em 1.5em 2.5em;
  border-radius: 0 1em 1em 0;
  background: #f4ebf5;
  color: #675883;
`

const PageTitle = styled.h2`
  position: relative;
  padding: 0 0 .5em;
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
`

const Table = styled.table`
  width: 100%;
  padding-bottom: .75em;
  border-collapse: collapse;
  border-bottom: 3px solid #71335c60;

  td {
    padding: 0.4em 1em;
    text-align: center;
  }

  tr:nth-child(2n) {
    background: #c885ff20;
  }
`

const Icon = styled.i`
  font-size: 1em;
`

const ScreenshotCheckbox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 4rem 4rem 0;
`

const SCText = styled.p`
  padding-right: 0.75em;
  font-style: italic;
`

const Cover = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #e07360;
  justify-content: center;
  border-radius: 0 1em 1em 0;
  transform-origin: left;
  transform: ${props => `${props.scale}`};
`

const Title = styled.h1`
  padding-top: 4em;
  font-size: 2.5em;
  font-weight: normal;
  text-align: center;
  color: #71335c;
`


const Journal = () => {
  // State and Hooks
  const journalRef = useRef()
  const [journalPos, setJournalPos] = useState(0)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [openJournal, setOpenJournal] = useState(false)
  const [showScreenshotEntries, setShowScreenshotEntries] = useState(false)

  // Hook helper for determining opening journal
  const openJournalHelper = () => {
    setOpenJournal(journalPos / windowHeight < 0.4)
  }

  // Custom hook for determining position of journal relative to the viewport
  useScrollPosition(({ currPos: { y }}) => {
    setJournalPos(y)
    openJournalHelper()
  }, [journalPos], journalRef)

  // Hook for determining window height
  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      openJournalHelper()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowHeight])

  // GraphQL
  let { assetsJson: { conquerors }} = useStaticQuery(graphql`
    # Get data of every "conqueror"
    query {
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
  `)

  // React Spring
  const { transform } = useSpring({
    transform: `scaleX(${openJournal ? -1 : 1})`,
    config: { mass: 1, tension: 195, friction: 28 }
  })

  // Functions
  // Format a placement string depending on rank
  const getPlacement = rank => {
    if (rank >= 10 && rank <= 19) { return `${rank}th` }
    if (rank % 10 === 1) { return `${rank}st` }
    if (rank % 10 === 2) { return `${rank}nd` }
    if (rank % 10 === 3) { return `${rank}rd` }
    return `${rank}th`
  }

  const getProofIcon = video => {
    const className = video ? "fas fa-video" : "fas fa-image"
    return <Icon className={className}/>
  }

  // JSX
  // Sort conquerors by date of achievement
  conquerors.sort((a, b) => new Date(a.date) - new Date(b.date))
  if (showScreenshotEntries) {
    conquerors = conquerors.filter(({ videoProof }) => videoProof)
  }

  return (
    <Book id="journal" ref={journalRef}>
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
                <td>{getProofIcon(c.videoProof)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ScreenshotCheckbox>
          <SCText>Show screenshot entries</SCText>
          <input type="checkbox" defaultChecked={showScreenshotEntries} onChange={() => setShowScreenshotEntries(!showScreenshotEntries)}/>
        </ScreenshotCheckbox>
        <Cover style={{transform}}>
          <Title>Madeline</Title>
        </Cover>
      </Page>
    </Book>
  )
}

export default Journal
