import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import VisibilitySensor from 'react-visibility-sensor'
import anime from 'animejs'

import VideoModal from './VideoModal'

const Book = styled.div`
  position: relative;
  min-height: 800px;
  margin-bottom: 3em;
  transform: rotate(-2deg);
`

const Page = styled.div`
  position: relative;
  height: 100%;
  min-height: 800px;
  padding: 1.5em 4em 1.5em 2.5em;
  border-radius: 0 1em 1em 0;
  background: #f4ebf5;
  background: url(${props => props.url}) no-repeat center center;
  background-size: 100% 100%;
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

  tr {
    transition: background .4s;
    cursor: pointer;

    &:nth-child(2n) {
      background: #c885ff20;
    }

    &:hover {
      background: #c06be030;
    }
  }

  td {
    padding: 0.4em 1em;
    text-align: center;
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

const CoverWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform-origin: left;
`

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #e07360;
  background: url(${props => props.url}) no-repeat center center;
  background-size: 100% 100%;
  border-radius: 0 1em 1em 0;
`

const CoverTitle = styled.h1`
  padding: .75em 0;
  margin-top: 3em;
  font-size: 2.5em;
  font-weight: normal;
  text-align: center;
  color: #5f2a43;
  background: url(${props => props.url}) no-repeat center center;
`

const VSPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 11em;
  height: 1em;
  font-size: 2.5em;
`

const Journal = () => {
  // State and Hooks
  const [openJournal, setOpenJournal] = useState(false)
  const [showScreenshotEntries, setShowScreenshotEntries] = useState(false)
  const [currentURL, setCurrentURL] = useState("")

  // Hook to toggle scrolling when the video player is open
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = currentURL ? "modal_open" : ""
  }, [currentURL])

  // Hook to toggle journal open/close animation
  useEffect(() => {
    let timeline = anime.timeline({
      easing: "easeInOutQuart",
      duration: 500
    })

    timeline
      .add({
        targets: ".cover-wrapper",
        scaleX: openJournal ? -1 : 1
      })
      .add({
        targets: ".cover-wrapper .front",
        opacity: openJournal ? 0 : 1,
        duration: 1
      }, 250)
      .add({
        targets: ".cover-wrapper .back",
        opacity: openJournal ? 1 : 0,
        duration: 1
      }, 250)
  }, [openJournal])

  // GraphQL
  let {
    assetsJson: { conquerors },
    journalImage: { publicURL: journalURL },
    titleImage: { publicURL: titleURL },
    pageImage: { publicURL: pageURL }
  } = useStaticQuery(graphql`
    query {
      # Get data of every "conqueror"
      assetsJson {
        conquerors {
          name
          date(formatString: "MMMM DD, YYYY")
          platform
          videoProof
          url
        }
      }

      journalImage: file(name: { eq: "journal" }) {
        publicURL
      }

      titleImage: file(name: { eq: "title-smear" }) {
        publicURL
      }

      pageImage: file(name: { eq: "page" }) {
        publicURL
      }
    }
  `)

  // Sort conquerors by date of achievement
  conquerors.sort((a, b) => new Date(a.date) - new Date(b.date))
  if (!showScreenshotEntries) {
    conquerors = conquerors.filter(({ videoProof }) => videoProof)
  }

  // Functions
  // Format a placement string depending on rank
  const getPlacement = rank => {
    if (rank >= 10 && rank <= 19) { return `${rank}th` }
    if (rank % 10 === 1) { return `${rank}st` }
    if (rank % 10 === 2) { return `${rank}nd` }
    if (rank % 10 === 3) { return `${rank}rd` }
    return `${rank}th`
  }

  // Get table of conquerors
  const getConquerorTable = () => (
    conquerors.map((c, i) => (
      <tr key={i} onClick={() => c.videoProof ? setCurrentURL(c.url) : window.open(c.url, "_blank")}>
        <td>{getPlacement(i + 1)}</td>
        <td>{c.name}</td>
        <td>{c.date}</td>
        <td>{c.platform}</td>
        <td><Icon className={c.videoProof ? "fas fa-video" : "fas fa-image"}/></td>
      </tr>
    ))
  )

  // TODO: Style journal further
  return (
    <>
      <Book id="journal">
        <VisibilitySensor onChange={(isVisible) => setOpenJournal(isVisible)} active={!openJournal} delayedCall>
          <VSPlaceholder/>
        </VisibilitySensor>
        <Page url={pageURL}>
          <PageTitle>CELESTE CONQUERORS</PageTitle>
          <Table>
            <tbody>
              {getConquerorTable()}
            </tbody>
          </Table>
          <ScreenshotCheckbox>
            <SCText>Show screenshot entries</SCText>
            <input type="checkbox" defaultChecked={showScreenshotEntries} onChange={() => setShowScreenshotEntries(!showScreenshotEntries)}/>
          </ScreenshotCheckbox>
        </Page>
        <CoverWrapper className="cover-wrapper">
          <Cover className="back" url={journalURL}/>
          <Cover className="front" url={journalURL}>
            <CoverTitle url={titleURL}>Madeline</CoverTitle>
          </Cover>
        </CoverWrapper>
      </Book>
      <VideoModal url={currentURL} set={setCurrentURL}/>
    </>
  )
}

export default Journal
