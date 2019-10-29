import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { animated, useSpring, interpolate } from 'react-spring'
import ReactPlayer from 'react-player'

const Overlay = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #0009;
  z-index: 10;
`

const PlayerWrapper = styled(animated.div)`
  position: relative;
  width: 100%;
  max-width: 960px;
  padding: 1em;
  margin: 0 4em;
  background: #bac1d6;

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
    padding: 1em;
  }
`

const PlayerDecor = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 3em;
  border-radius: 0 0 1.5em 1.5em;
  background: #bac1d6;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20%;
    background: #808ca9;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 2.5em;
    bottom: 0;
    right: 2.5em;
    border-left: .75em solid #808ca9;
    border-right: .75em solid #808ca9;
  }
`

const FullFlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 2em;

  * {
    text-shadow: black 0 1px;
  }

  * + * {
    margin-top: 0.25em;
  }
`

const ErrorHeader = styled.h3`
  font-size: 1.4em;
`

const LoadingDot = styled(animated.p)`
  font-size: 3.5em;
`

const VideoModal = ({ url, set }) => {
  const [videoURL, setVideoURL] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(videoURL && !ReactPlayer.canPlay(videoURL))
  }, [videoURL])

  const containerSpring = useSpring({
    percent: url ? 1 : 0,
  })

  const playerSpring = useSpring({
    transform: `translateX(${url ? 0 : 100}%)`,
    onRest: () => setVideoURL(url)
  })

  const loadingDotSpring = useSpring({
    from: { x: 450, percent: 1 },
    to: async next => {
      while (!videoURL && !error) {
        await next({ x: -450, percent: 0 })
        await next({ x: 450, percent: 1 })
      }
    },
    config: { mass: 1, tension: 200, friction: 26, clamp: true },
    reset: true
  })

  const videoPlayer = () => {
    if (error === false && videoURL) {
      return <ReactPlayer className="video" url={videoURL} playing controls height="100%" width="100%"/>
    } else if (error) {
      return (
        <FullFlexCenter>
          <ErrorHeader>Well that's a problem...</ErrorHeader>
          <p>Looks like I can't play the video from here. But you can still access it through this <a href={videoURL} target="_blank" rel="noopener noreferrer">link</a>!</p>
        </FullFlexCenter>
      )
    } else {
      return (
        <FullFlexCenter>
          <LoadingDot style={{
            transform: interpolate([loadingDotSpring.x, loadingDotSpring.percent.interpolate([0, .5, 1], ["1, 1", "2.8, 0.5", "1, 1"])], (x, s) => `translateX(${x}%) scale(${s})`)
          }}>•</LoadingDot>
        </FullFlexCenter>
      )
    }
  }

  return (
    <Overlay onClick={() => set("")} style={{
      display: containerSpring.percent.interpolate(p => p > 0 ? 'flex' : 'none'),
      opacity: containerSpring.percent
    }}>
      <PlayerWrapper style={{ transform: playerSpring.transform }}>
        {videoPlayer()}
        <PlayerDecor/>
      </PlayerWrapper>
    </Overlay>
  )
}

export default VideoModal
