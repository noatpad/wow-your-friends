import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { colors } from './design'
import InfoModal from './InfoModal'

const Header = styled.h3`
  text-align: center;
  padding-bottom: .5em;
`

const Legend = styled.table`
  td {
    vertical-align: top;

    &.icon {
      text-align: center;
    }
  }

  p::before {
    content: "= ";
  }
`

const ProofIcon = styled.i`
  height: 1.5em;
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
    keyImage: { publicURL: keyURL },
    moonberryImage: { publicURL: moonberryURL },
    eenoxImage: { publicURL: eenoxURL }
  } = useStaticQuery(graphql`
    query {
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

  return (
    <InfoModal {...rest} className="legend">
      <Header>Legend</Header>
      <Legend>
        <tbody>
          <tr>
            <td><span style={{ borderBottom: "2px dashed", fontStyle: "italic" }}>abc</span></td>
            <td><p>Hover over the text to see reasoning for non-verification</p></td>
          </tr>
          <tr>
            <td className="icon"><ProofIcon className="fas fa-video"/></td>
            <td><p>Video proof</p></td>
          </tr>
          <tr>
            <td className="icon"><ProofIcon className="fas fa-image"/></td>
            <td><p>Screenshot proof</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={keyURL} alt="No key skip"/></td>
            <td><p>No key skip (complete Power Source without skipping)</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={moonberryURL} alt="Double golden"/></td>
            <td><p>Double golden (collect the moonberry on the same run)</p></td>
          </tr>
          <tr>
            <td className="icon"><Medal src={eenoxURL} alt="Meme run"/></td>
            <td><p>Meme run <em>(Eenox, <span className="clickable" style={{ color: colors.blue }} onClick={() => setCurrentURL("https://www.youtube.com/watch?v=O6GHZ3Sd410")}>why</span>)</em></p></td>
          </tr>
        </tbody>
      </Legend>
      <PS>
        <p>
          Some icons (primarily the double golden one) may not be reflected in the run referenced in their entry.
          <br/>
          This may be fixed in the future.
        </p>
      </PS>
    </InfoModal>
  )
}

export default LegendInfoModal
