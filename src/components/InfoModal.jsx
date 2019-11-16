import React, { useState, useEffect } from 'react'
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
  height: 100%;
  width: 100%;
  max-width: 800px;
  background: #f2dbd8;
`

const InfoModal = ({ show, set }) => {
  // State //
  const [current, setCurrent] = useState(false)

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

  // Simulate modal close by "immediately moving to an open state first"
  const closeModal = () => {
    setCurrent(true)
    set(false)
  }

  return (
    <Overlay className="info-overlay" onClick={closeModal}>
      <Container className="info-container">
        Hi there
      </Container>
    </Overlay>
  )
}

export default InfoModal
