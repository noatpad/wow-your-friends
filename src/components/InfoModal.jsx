import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import anime from 'animejs'

const Overlay = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 4em;
  background: #0009;
  z-index: 10;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  max-width: 800px;
  padding: 2em 3em;
  background: #f2dbd8;
  color: #4a453f;
  overflow: scroll;

  * + * {
    margin-top: .4em;
  }

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

const InfoModal = ({ show, set }) => {
  // State //
  const [current, setCurrent] = useState(false)
  const modalNode = useRef()

  // Hooks //
  // Toggle animation for info modal
  useEffect(() => {
    // Remove any current animation instance
    const targets = ".info-overlay, .info-container"
    anime.remove(targets)

    // Animation for displaying and hiding info modal
    const tl = anime.timeline({
      easing: "spring(1, 100, 50, 0)",
      begin: () => {
        anime.set(".info-overlay", { display: (show || current) ? "flex" : "none" })
      },
      complete: () => {
        anime.set(".info-overlay", { display: show ? "flex" : "none" })
        setCurrent(show)
      }
    })

    tl
    .add({
      targets: ".info-overlay",
      opacity: show ? 1 : 0
    })
    .add({
      targets: ".info-container",
      translateX: show ? "0%" : "100%"
    }, 0)
  }, [show])

  // One-time hook to set up mouse click handler
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  // Functions //
  // Handle click outside of modalNode element
  const handleOutsideClick = e => {
    if (modalNode.current.contains(e.target)) { return }
    setCurrent(true)
    set(false)
  }

  // Info taken from https://www.reddit.com/r/celestegame/comments/dvgf79/wip_a_website_commemorating_all_the_players_who/f7cx4aq/?context=3
  return (
    <Overlay className="info-overlay">
      <Container className="info-container" ref={modalNode}>
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
    </Overlay>
  )
}

export default InfoModal
