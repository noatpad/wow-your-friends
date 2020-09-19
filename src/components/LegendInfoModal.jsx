import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { colors } from './design'
import InfoModal from './InfoModal'

const Header = styled.h3`
  text-align: center;
`

const Legend = styled.table`
  border-spacing: 8px 3px;

  td {
    vertical-align: middle;

    &.icon {
      text-align: center;
    }

    &.details {
      font-size: .9em;
      opacity: .8;
    }
  }

  td + td {
    margin-left: 8px;
  }
`

const Medal = styled.img`
  height: 1.5em;
`

const PS = styled.div`
  display: flex;
  text-align: center;
  font-size: .7em;
  font-style: italic;
  color: ${colors.purple};

  p {
    flex-grow: 1;
    width: 0;
  }
`

const LegendInfoModal = ({ setCurrentURL, ...rest }) => {
  let {
    videoImage: { publicURL: videoURL },
    screenshotImage: { publicURL: screenshotURL },
    keyImage: { publicURL: keyURL },
    moonberryImage: { publicURL: moonberryURL },
    eenoxImage: { publicURL: eenoxURL },
    ghostberryImage: { publicURL: ghostberryURL }
  } = useStaticQuery(graphql`
    query {
      videoImage: file(name: { eq: "video" }) {
        publicURL
      }

      screenshotImage: file(name: { eq: "screenshot" }) {
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

      ghostberryImage: file(name: { eq: "ghostberry" }) {
        publicURL
      }
    }
  `)

  return (
    <InfoModal {...rest} className="legend">
      <Header>Legend</Header>
      <div style={{ textAlign: 'center' }}>
        <p><b>Non-202</b>: Obtained Farewell golden berry, but has not collected every berry</p>
        <p><b>Unverified</b>: Entries with doubtful evidence (hover over name for reasoning)</p>
      </div>
      <hr style={{ margin: '.4em 0', borderTop: '1px solid', opacity: .5 }}/>
      <Legend>
        <tbody>
          <tr>
            <td className="icon"><Medal src={videoURL} alt="Video proof"/></td>
            <td><p>Video</p></td>
            <td className="details"><p>Contains video proof</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={screenshotURL} alt="Screenshot proof"/></td>
            <td><p>Screenshot</p></td>
            <td className="details"><p>Contains screenshot proof</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={ghostberryURL} alt="Pre-202"/></td>
            <td><p>Pre-202</p></td>
            <td className="details"><p>Referenced run was not the last berry, but obtained 202 at the mentioned date</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={moonberryURL} alt="Double golden"/></td>
            <td><p>Double golden</p></td>
            <td className="details"><p>Collect the moonberry on the same run</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={keyURL} alt="No key skip"/></td>
            <td><p>No key skip</p></td>
            <td className="details"><p>Complete Power Source without skipping</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={eenoxURL} alt="Meme run"/></td>
            <td><p>Meme run</p></td>
            <td className="details"><p><em>"Eenox, <span className="clickable" style={{ color: colors.blue }} onClick={() => setCurrentURL("https://www.youtube.com/watch?v=O6GHZ3Sd410")}>why?</span>"</em></p></td>
          </tr>
        </tbody>
      </Legend>
      <PS>
        <p>
          <b>Note</b>: Some icons (primarily the double golden one) may not be reflected in the run referenced in their entry.
        </p>
      </PS>
    </InfoModal>
  )
}

export default LegendInfoModal
