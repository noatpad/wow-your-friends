import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import anime from 'animejs'
import ReactPlayer from 'react-player'

const Overlay = styled.div`
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

const PlayerWrapper = styled.div`
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

const LoadingDot = styled.p`
  font-size: 3.5em;
`

const VideoModal = ({ url, set }) => {
  const [videoURL, setVideoURL] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(videoURL && !ReactPlayer.canPlay(videoURL))
  }, [videoURL])

  useEffect(() => {
    const targets = ".overlay, .player"
    anime.remove(targets)

    let loadingDotAnim = anime({
      targets: ".loading-dot",
      easing: "easeInOutCirc",
      duration: 1000,
      loop: true,
      autoplay: false,
      translateX: [
        { value: ["400%", "-400%"] },
        { value: "400%" }
      ],
      scale: [
        { value: ["1, 1", "2.8, 0.5"] },
        { value: "1, 1" },
        { value: "2, 0.5" },
        { value: "1, 1" }
      ]
    })

    let tl = anime.timeline({
      easing: "spring(1, 100, 50, 0)",
      begin: () => {
        anime.set(".overlay", { display: "flex" })
        loadingDotAnim.restart()
      },
      complete: () => {
        anime.set(".overlay", { display: url ? "flex" : "none" })
        setVideoURL(url)
        if (!url) { loadingDotAnim.pause() }
      }
    })

    tl
      .add({
        targets: ".overlay",
        opacity: url ? 1 : 0
      })
      .add({
        targets: ".player",
        translateX: url ? "0%" : "100%"
      }, 0)
  }, [url])

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
          <LoadingDot className="loading-dot">•</LoadingDot>
        </FullFlexCenter>
      )
    }
  }

  return (
    <Overlay className="overlay" onClick={() => set("")}>
      <PlayerWrapper className="player">
        {videoPlayer()}
        <PlayerDecor/>
      </PlayerWrapper>
    </Overlay>
  )
}

export default VideoModal
