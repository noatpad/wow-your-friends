import React from 'react'
import styled from '@emotion/styled'
import { animated, useTrail } from 'react-spring'
import ReactPlayer from 'react-player'

const Container = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #0007;
  z-index: 10;
`

const PlayerWrapper = styled(animated.div)`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 4em;
  background: #5b4683;

  &::before {
    display: block;
    content: "";
    width: 100%;
    padding-top: calc((9 / 16) * 100%);
  }

  > .video {
    position: absolute;
    top: 0;
    left: 0;
  }
`
// TODO: Optimize and improve video player
// TODO: Add fallback when video player is unable to load a video
// TODO: Disable body scrolling when modal is open
const VideoModal = ({ url, set }) => {
  const openModal = url ? true : false

  // TODO: Use react-spring's onRest() to avoid the usage of `percent`
  const [containerTrail, wrapperTrail] = useTrail(2, {
    percent: openModal ? 1 : 0,
    opacity: openModal ? 1 : 0,
    transform: `translateX(${openModal ? 0 : 100}%)`
  })

  return (
    <Container onClick={() => set("")} style={{
      display: containerTrail.percent.interpolate(p => p > 0 ? 'flex' : 'none'),
      opacity: containerTrail.opacity
    }}>
      <PlayerWrapper style={{ transform: wrapperTrail.transform }}>
        <ReactPlayer className="video" url={url} playing controls height="100%" width="100%"/>
      </PlayerWrapper>
    </Container>
  )
}

export default VideoModal
