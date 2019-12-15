import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import anime from 'animejs'
import VisibilitySensor from 'react-visibility-sensor'
import { useMediaQuery } from 'react-responsive';

import { breakpoints, colors } from './design'
import VideoModal from './VideoModal'
import LegendInfoModal from './LegendInfoModal'

const Book = styled.div`
  position: relative;
  height: 800px;
  margin-bottom: 3em;
  transform: rotate(-2deg);

  @media screen and (${breakpoints.mobile}) {
    height: 550px;
    transform: rotate(-1deg);
  }

  @media screen and (${breakpoints.xsmall}) {
    height: 450px;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  padding: 1.5em 4em 1.5em 2.5em;
  border-radius: 0 1em 1em 0;
  background: #f4ebf5;
  background: url(${props => props.url}) no-repeat center center;
  background-size: 100% 100%;
  color: ${colors.purple};

  @media screen and (${breakpoints.mobile}) {
    padding: 1.2em;
  }
`

const PageTitle = styled.h2`
  position: relative;
  padding: 0 0 .5em;
  font-weight: normal;
  color: ${colors.purple2};

  &::after {
    content: "";
    position: absolute;
    top: calc(100% - 2px);
    left: -2.5rem;
    right: -4rem;
    height: 3px;
    background: #c885ff20;
  }

  @media screen and (${breakpoints.mobile}) {
    &::after {
      left: -1rem;
      right: -1rem;
    }
  }

  @media screen and (${breakpoints.xsmall}) {
    font-size: 1.2em;
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

  @media screen and (${breakpoints.mobile}) {
    td {
      padding: .3em .6em;
    }
  }

  @media screen and (${breakpoints.xsmall}) {
    font-size: .9em;
  }
`

const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MedalsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Medal = styled.img`
  height: 1.2em;
`

const Place = styled.span`
  padding: 0 .25em;

  @media screen and (${breakpoints.tablet}) {
    padding: 0 .125em;
  }
`

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (${breakpoints.tablet}) {
    flex-direction: column-reverse;

    & > * {
      padding: .125em 0;
    }
  }
`

const ProofIcon = styled.i`
  padding: 0 .25em;
`

const Total = styled.div`
  flex: 1;
  padding: .5em 0;
  border-top: 3px solid #71335c60;
  font-size: 1.2em;
  text-align: center;

  @media screen and (${breakpoints.xsmall}) {
    font-size: 1em;
  }
`

const Footnote = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media screen and (${breakpoints.xsmall}) {
    font-size: .85em;
    margin-bottom: .75rem;
  }
`

const Span = styled.span`
  color: ${props => props.color};
`

// Checkbox by Jase from https://codepen.io/jasesmith/pen/EeVmWZ
const ScreenshotCheckbox = styled.div`
  text-align: right;

  label {
    padding-right: 0.75em;
    font-style: italic;
    cursor: pointer;
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
    cursor: pointer;
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

  @media screen and (${breakpoints.xsmall}) {
    font-size: 1.75em;
  }
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
  const [showLegendModal, setShowLegendModal] = useState(false)
  const [showScreenshotEntries, setShowScreenshotEntries] = useState(false)
  const [currentURL, setCurrentURL] = useState("")

  // Hooks //
  // Custom hook for responsive design
  const isTablet = useMediaQuery({ query: `(${breakpoints.tablet})` })

  // Toggle scrolling when modal is open (className restricts scrolling)
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
    screenshots: { nodes: screenshotData },
    journalImage: { publicURL: journalURL },
    titleImage: { publicURL: titleURL },
    pageImage: { publicURL: pageURL },
    goldberryImage: { publicURL: goldberryURL },
    silverberryImage: { publicURL: silverberryURL },
    bronzeberryImage: { publicURL: bronzeberryURL },
    keyImage: { publicURL: keyURL },
    moonberryImage: { publicURL: moonberryURL },
    eenoxImage: { publicURL: eenoxURL }
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
          keySkip
          doubleGolden
          memeRun
        }
      }

      # Get all local proof screenshots
      screenshots: allFile(filter: { relativeDirectory: { eq: "screenshots" }}) {
        nodes {
          name
          publicURL
        }
      }

      # Get image URLs
      journalImage: file(name: { eq: "journal" }) {
        publicURL
      }

      titleImage: file(name: { eq: "title-smear" }) {
        publicURL
      }

      pageImage: file(name: { eq: "page" }) {
        publicURL
      }

      goldberryImage: file(name: { eq: "goldberry" }) {
        publicURL
      }

      silverberryImage: file(name: { eq: "silverberry" }) {
        publicURL
      }

      bronzeberryImage: file(name: { eq: "bronzeberry" }) {
        publicURL
      }

      keyImage: file(name: { eq: "key" }) {
        publicURL
      }

      moonberryImage: file(name: { eq: "moonberry" }) {
        publicURL
      }

      eenoxImage: file(name: { eq: "eenox" }) {
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
  // Open screenshot, whether it'd be an online link or a local image
  // NOTE: For the case of local screenshot images, they must be in the src/assets/screenshots/ directory, and have the same name as the "conqueror" in question
  const openScreenshot = (url, name) => {
    // If the url is set to "local", that means it's a local image rather than an online link
    if (url === "local") {
      // Iterate through all the screenshots to find the right one, then replace url with that
      for (const { name: sName, publicURL } of screenshotData) {
        if (name === sName) {
          url = publicURL
          break
        }
      }

      // If url is still "local" (no image file was found), then throw an error alert
      if (url === "local") {
        window.alert("Couldn't locate the image file! Danny probably messed up on something, and he oughta fix it soon...")
        return
      }
    }

    // Open the link in a new tab
    window.open(url, "_blank")
  }

  // Format a placement string depending on rank
  const getPlacement = rank => {
    let placement

    if (rank >= 10 && rank <= 19) {
      placement = <Place>{rank}th</Place>
    } else if (rank % 10 === 1) {
      placement = (
        <>
          {rank === 1 && <Medal src={goldberryURL} alt="First place"/>}
          <Place>{rank}st</Place>
        </>
      )
    } else if (rank % 10 === 2) {
      placement = (
        <>
          {rank === 2 && <Medal src={silverberryURL} alt="Second place"/>}
          <Place>{rank}nd</Place>
        </>
      )
    } else if (rank % 10 === 3) {
      placement = (
        <>
          {rank === 3 && <Medal src={bronzeberryURL} alt="Third place"/>}
          <Place>{rank}rd</Place>
        </>
      )
    } else {
      placement = <Place>{rank}th</Place>
    }

    return <Rank>{placement}</Rank>
  }

  // Get table of conquerors
  const getConquerorTable = () => (
    conquerors.map(({ name, date, platform, videoProof, url, keySkip, doubleGolden, memeRun }, i) => (
      <tr className={videoProof ? "video" : "screenshot"} key={i} onClick={() => videoProof ? setCurrentURL(url) : openScreenshot(url, name)}>
        <td>{getPlacement(i + 1)}</td>
        {isTablet ? (
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
        <td>
          <IconsWrapper>
            <MedalsWrapper>
              {!keySkip && <Medal src={keyURL} alt="No key skip!"/>}
              {doubleGolden && <Medal src={moonberryURL} alt="Double golden!"/>}
              {memeRun && <Medal src={eenoxURL} alt="Meme run...why"/>}
            </MedalsWrapper>
            <ProofIcon className={videoProof ? "fas fa-video" : "fas fa-image"}/>
          </IconsWrapper>
        </td>
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
            <p>To this day, only <b style={{ color: colors.red }}>{conquerors.length}</b> have conquered every strawberry{showScreenshotEntries && "*"}</p>
            {showScreenshotEntries && <p style={{ fontSize: ".6em", fontStyle: "italic", opacity: .8 }}>*(including screenshot entries)</p>}
          </Total>
          <Footnote>
            <Span className="clickable" onClick={() => setShowLegendModal(true)} color={colors.blue}>What do those icons mean?</Span>
            <ScreenshotCheckbox>
              <label htmlFor="show">Show screenshot entries</label>
              <input id="show" type="checkbox" defaultChecked={showScreenshotEntries} onChange={() => setShowScreenshotEntries(!showScreenshotEntries)}/>
            </ScreenshotCheckbox>
          </Footnote>
        </Page>
        <CoverWrapper className="cover-wrapper">
          <Cover className="back" url={journalURL}/>
          <Cover className="front" url={journalURL}>
            <CoverTitle url={titleURL}>Madeline</CoverTitle>
          </Cover>
        </CoverWrapper>
      </Book>
      <VideoModal url={currentURL} set={setCurrentURL}/>
      <LegendInfoModal set={setShowLegendModal} show={showLegendModal} setCurrentURL={setCurrentURL}/>
    </>
  )
}

export default Journal
