import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import anime from 'animejs'

import { breakpoints, colors } from './design'

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

  @media screen and (${breakpoints.tablet}) {
    padding: 5em 2em;
    &::after {
      content: "(click outside the box to close)";
      position: absolute;
      bottom: 2em;
      font-size: 1em;
      font-style: italic;
      color: ${colors.grey};
      text-shadow: 0 0 4px black;
      opacity: .8;
    }
  }

  @media screen and (${breakpoints.mobile}) {
    padding: 6em 1em;

    &::after {
      font-size: .8em;
    }
  }
`

const Container = styled.div`
  position: relative;
  max-height: 100%;
  max-width: 800px;
  padding: 2em 3em;
  background: #f2dbd8;
  color: #4a453f;
  overflow: scroll;

  * + * {
    margin-top: .4em;
  }

  @media screen and (${breakpoints.mobile}) {
    padding: 1.5em;
  }

  @media screen and (${breakpoints.xsmall}) {
    font-size: .9em;
  }
`

const InfoModal = ({ set, show, className, children }) => {
  // Global vars //
  const overlayClassName = `${className}-modal-overlay`
  const containerClassName = `${className}-modal-container`

  // State //
  const [current, setCurrent] = useState(false)
  const modalNode = useRef()

  // Hooks //
  // Toggle animation for info modal
  useEffect(() => {
    // Generate targets
    const overlayTarget = `.${overlayClassName}`
    const containerTarget = `.${containerClassName}`

    // Remove any current animation instance
    const targets = [overlayTarget, containerTarget]
    anime.remove(targets)

    // Animation for displaying and hiding info modal
    const tl = anime.timeline({
      easing: "spring(1, 100, 50, 0)",
      begin: () => {
        anime.set(overlayTarget, { display: (show || current) ? "flex" : "none" })
      },
      complete: () => {
        anime.set(overlayTarget, { display: show ? "flex" : "none" })
        setCurrent(show)
      }
    })

    tl
    .add({
      targets: overlayTarget,
      opacity: show ? 1 : 0
    })
    .add({
      targets: containerTarget,
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
    <Overlay className={overlayClassName}>
      <Container className={containerClassName} ref={modalNode}>
        {children}
      </Container>
    </Overlay>
  )
}

export default InfoModal
