import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'
import VisibilitySensor from 'react-visibility-sensor'
import { useMediaQuery } from 'react-responsive';

import VideoModal from './VideoModal'

const Book = styled.div`
  position: relative;
  height: 800px;
  margin-bottom: 3em;
  transform: rotate(-2deg);
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
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

const TableWrapper = styled.div`
  width: 100%;
  padding: .75em 0;
  overflow: scroll;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    transition: background .3s;
    cursor: pointer;

    &:nth-child(2n) {
      background: #c885ff20;
    }

    &.screenshot {
      background: #9764c040;
      color: #7e6f9d;
      font-style: italic;
    }

    &:hover {
      background: #c06be060;
    }

    &.screenshot:hover {
      background: #754a9760;
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

const Total = styled.div`
  flex: 1;
  padding: .5em 0;
  border-top: 3px solid #71335c60;
  font-size: 1.2em;
  text-align: center;
`

// Checkbox by Jase from https://codepen.io/jasesmith/pen/EeVmWZ
const ScreenshotCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;

  span {
    padding-right: 0.75em;
    font-style: italic;
  }

  input {
    position: relative;
    appearance: none;
    font-size: inherit;
    width: 1em;
    margin: 0;
    color: inherit;
    outline: none;
    font-family: 'Font Awesome 5 Pro';
    transition: 300ms;

    &::after {
      content: '\f0c8';
      display: inline-block;
      text-align: center;
      width: 1em;
    }

    &:checked::after {
      content: '\f14a';
      font-weight: 900;
    }
    &:active {
      transform: scale(.8);
    }
  }
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
  // State //
  const [openJournal, setOpenJournal] = useState(false)
  const [showScreenshotEntries, setShowScreenshotEntries] = useState(false)
  const [currentURL, setCurrentURL] = useState("")

  // Hooks //
  // Custom hook for responsive design
  const isNarrow = useMediaQuery({ query: "(max-width: 800px)" })

  // Toggle scrolling when the video player is open (className restricts scrolling)
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = currentURL ? "modal_open" : ""
  }, [currentURL])

  // Toggle journal open/close animation
  useEffect(() => {
    const tl = anime.timeline({
      duration: 500,
      easing: "easeInOutQuart"
    })

    tl
    .add({
      targets: ".cover-wrapper",
      scaleX: openJournal ? -1 : 1
    })
    .add({
      targets: ".cover-wrapper .front",
      duration: 1,
      opacity: openJournal ? 0 : 1
    }, 250)
    .add({
      targets: ".cover-wrapper .back",
      duration: 1,
      opacity: openJournal ? 1 : 0
    }, 250)
  }, [openJournal])

  // GraphQL //
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
          date(formatString: "MMM DD, YYYY")
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

  // Functions //
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
    conquerors.map(({ name, date, platform, videoProof, url }, i) => (
      <tr className={videoProof ? "video" : "screenshot"} key={i} onClick={() => videoProof ? setCurrentURL(url) : window.open(url, "_blank")}>
        <td>{getPlacement(i + 1)}</td>
        {isNarrow ? (
          <td>
            <p>{name} - <em>{platform}</em></p>
            <p>{date}</p>
          </td>
        ) : (
          <>
            <td>{name}</td>
            <td>{date}</td>
            <td>{platform}</td>
          </>
        )}
        <td><Icon className={videoProof ? "fas fa-video" : "fas fa-image"}/></td>
      </tr>
    ))
  )

  return (
    <>
      <Book id="journal">
        <VisibilitySensor onChange={(isVisible) => setOpenJournal(isVisible)} active={!openJournal} delayedCall>
          <VSPlaceholder/>
        </VisibilitySensor>
        <Page url={pageURL}>
          <PageTitle>CELESTE CONQUERORS</PageTitle>
          <TableWrapper>
            <Table>
              <tbody>
                {getConquerorTable()}
              </tbody>
            </Table>
          </TableWrapper>
          <Total>
            {/* TODO: Add styling to number total */}
            <p>To this day, only <b>{conquerors.length}</b> have conquered every strawberry{showScreenshotEntries && "*"}</p>
            {showScreenshotEntries && <p style={{ fontSize: ".6em", fontStyle: "italic" }}>*(including screenshot entries)</p>}
          </Total>
          <ScreenshotCheckbox>
            <span>Show screenshot entries</span>
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
