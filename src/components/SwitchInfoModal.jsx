import React from 'react'
import styled from '@emotion/styled'

import InfoModal from './InfoModal'

const Container = styled.div`
  h3 {
    text-align: center;
    padding-bottom: .5em;
  }

  b {
    text-decoration: underline;
  }

  ul {
    padding-left: 1em;
  }
`

const SwitchInfoModal = (props) => (
  <InfoModal {...props} className="switch">
    <Container>
      <h3>Don't have a capture card for the Switch? Listen up!</h3>
      <p>
        While you can easily record and/or stream on every other platform, the Switch has no native streaming capabilities & only allows you to record up to 30 seconds at a time. But fortunately, we can still work with that! There are just a few extra requirements:
      </p>
      <ul>
        <li>
          If you're unable to record your whole run with a capture card or camera, you can instead submit a partial recording made through the Switch's Share button.
        </li>
        <li>
          For this case, the recording must capture the moment of obtaining the golden strawberry. Preferably hold the Share button right after the screen fades to white.
        </li>
        <li>
          Before collecting the berry, <b>open and close the pause menu for at least a second</b>. This is important since this will prove that neither Assist nor Variants Mode were used throughout your run.
        </li>
        <li>
          <b>A second video is required as proof</b>. This video will simply show your Switch playing the recording mentioned above from the Album applet from the HOME menu. This is to verify the run was indeed done on a Switch.
        </li>
      </ul>
      <p>
        With these extra rules in mind, I can verify that the run when the recording was made was a legitimate, golden berry run!
      </p>
    </Container>
  </InfoModal>
)

export default SwitchInfoModal
