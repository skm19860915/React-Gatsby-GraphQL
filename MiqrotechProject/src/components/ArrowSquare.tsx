import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)
CustomEase.create('button', "0.68, 0, 0.05, 1")

type props = {
  color: string
  mouseEnter: any
}

const ArrowSquare: React.FC<props> = ({ color, mouseEnter}) => {

  const arrowOneRef = useRef(null)
  const arrowTwoRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    gsap.to(arrowOneRef.current, {
      duration: 0.5,
      transform: 'translate(100%)',
      ease: "button"
    })
    gsap.to(arrowTwoRef.current, {
      duration: 0.5,
      transform: 'translate(0%)',
      ease: "button"
    })
  }, [arrowOneRef, arrowTwoRef])

  const handleMouseLeave = useCallback(() => {
    gsap.to(arrowOneRef.current, {
      duration: 0.5,
      transform: 'translate(0%)',
      ease: "button"
    })
    gsap.to(arrowTwoRef.current, {
      duration: 0.5,
      transform: 'translate(-100%)',
      ease: "button"
    })
  }, [arrowOneRef, arrowTwoRef])

  useEffect(() => {
    if (mouseEnter) {
      handleMouseEnter()
    } else {
      handleMouseLeave()
    }
  }, [mouseEnter, handleMouseEnter, handleMouseLeave])

  return (
    <Svg viewBox="0 0 28 28">
      <path ref={arrowOneRef} className="header-button" transform="translate(0)" d="M 12 8 L 17.5 14 L 12 20" fillOpacity="0"  stroke={color}/>
      <path ref={arrowTwoRef} className="header-button" transform="translate(-100)" d="M 12 8 L 17.5 14 L 12 20" fillOpacity="0" stroke={color}/>
      <rect className="header-button" x="1" y="1" width="25" height="26" fillOpacity="0" stroke={color}/>
    </Svg>
  )
}

export default ArrowSquare

const Svg = styled.svg`
  height: auto;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
`

