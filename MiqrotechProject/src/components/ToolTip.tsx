import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'

import colors from '@styles/colors'
import media from '@styles/media'

type Props = {
  title: string
  line1: string
  line2: string
  trigger: boolean
  dir?: string
  show: boolean
  parentTimeline: any
}

const ToolTip: React.FC<Props> = ({ title, line1, line2, trigger, dir, show, parentTimeline }) => {
  const symbolRef = useRef(null)
  const calloutRef = useRef(null)
  const lineRef = useRef(null)
  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)
  const circle3Ref = useRef(null)

  const [timeline, setTimeline] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.pause()
    tl.fromTo(symbolRef.current, {
      opacity: 1
    }, {
      duration: 0.3,
      opacity: 0
    }, 0)
    tl.fromTo(calloutRef.current, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.8
    }, 0)
    tl.fromTo(lineRef.current, {
      strokeDashoffset: '150'
    }, {
      duration: 0.2,
      strokeDashoffset: '0'
    }, 0)

    setTimeline(tl)

    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (trigger) {
      const tl = gsap.timeline()
      tl.to(circle1Ref.current, {
        duration: 0.3,
        fillOpacity: 0.2
      })
      tl.to(circle2Ref.current, {
        duration: 0.3,
        fillOpacity: 0.2
      })
      tl.to(circle3Ref.current, {
        duration: 0.3, 
        opacity: 1
      })

      return () => {
        tl.kill()
      }
    }
  }, [trigger])

  useEffect(() => {
    if (show) {
      handleMouseEnter()
    } else {
      handleMouseLeave()
    }
  }, [show])

  const handleMouseEnter = useCallback((e?: any) => {
    if (timeline) {
      timeline.play()
    }
    if (e && parentTimeline) {
      parentTimeline.pause()
    }
  }, [timeline, parentTimeline])

  const handleMouseLeave = useCallback((e?: any) => {
    if (timeline) {
      timeline.reverse()
    }
    if (e && parentTimeline) {
      parentTimeline.pause()
    }
  }, [parentTimeline, timeline])

  const handleClick = (e) => {
    if (open) {
      handleMouseLeave(e)
    } else {
      handleMouseEnter(e)
    }
    setOpen(!open)
  }

  const determineLine = useCallback((dir: string): string => {

    switch (dir) {
      case "up":
        return "M150 5H0"

      case "down":
        return "M0 5H150"

      case "left":
        return "M150 5H0"

      case "right":
        return "M0 5H150"
    }
  }, [])

  const lineD = useMemo(() => determineLine(dir), [dir])

  return (
    <Container>
      <Circle onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect ref={circle1Ref} width="75" height="75" rx="37.5" fill={colors.keppel20} fillOpacity="0"/>
        <rect ref={circle2Ref} x="9" y="9" width="57" height="57" rx="28.5" fill={colors.keppel60} fillOpacity="0"/>
        <G ref={circle3Ref}>
          <rect x="18.5" y="18.5" width="38" height="38" rx="19" fill={colors.keppel100} stroke={colors.white}/>
          <path ref={symbolRef} d="M37.5 30V45" stroke={colors.white} strokeWidth="1.5"/>
          <path d="M45 37.5L30 37.5" stroke={colors.white} strokeWidth="1.5"/>
        </G>
      </Circle>
      <Callout dir={dir} ref={calloutRef} width="246" height="90" viewBox="0 0 246 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0.5" width="246" height="89" rx="1.5" fill={colors.black} fillOpacity="0" stroke={colors.white}/>
        <Title x="20" y="30" fill={colors.white}>{title}</Title>
        <Text x="20" y="50" fill={colors.white}>{line1}</Text>
        <Text x="20" y="70" fill={colors.white}>{line2}</Text>
      </Callout>
      <Line dir={dir} viewBox="0 0 150 10">
        <path ref={lineRef} strokeOpacity="1" d={lineD} strokeDasharray="150" strokeDashoffset="150" stroke={colors.white} strokeWidth="2"/>
      </Line>
    </Container>
  )
}

export default ToolTip

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Circle = styled.svg`
  height: auto;
  opacity: 1;

  ${media.fullWidth} {
    width: 5.208vw;
  }

  ${media.desktop} {
    width: 5.208vw;
  }

  ${media.tablet} {
    width: 8.993vw;
  }

  ${media.mobile} {
    width: 20vw;
  }
`

const CalloutUp = `

  ${media.tablet} {
    left: -10vw;
    top: -14.7vw;
  }

  ${media.mobile} {
    left: -34vw;
    top: -42.3vw;
  }
`

const CalloutDown = `

  ${media.tablet} {
    left: -10vw;
    top: 12.7vw;
  }

  ${media.mobile} {
    left: -54vw;
    top: 31.7vw;
  }
`

const CalloutLeft = `
  left: -23.681vw;
  top: -4.5%;

  ${media.tablet} {
    left: -35.6vw;
  }

  ${media.mobile} {
    left: -53vw;
  }
`

const CalloutRight = `
  left: 11.875vw;
  top: -4.5%;

  ${media.tablet} {
    left: 14.875vw;
  }

  ${media.mobile} {
    left: -53vw;
  }
`

const Callout = styled.svg<{dir?: string}>`
  height: auto;
  position: absolute;
  top: -4.5%;
  opacity: 0;

  ${props => {
    switch(props.dir) {
      case "up":
        return CalloutUp

      case "down":
        return CalloutDown

      case "left":
        return CalloutLeft

      case "right":
        return CalloutRight
    }
  }}

  width: 17.083vw;
  
  ${media.tablet} {
    width: 30vw;
  }

  ${media.mobile} {
    width: 84vw;
  }
`

const Title = styled.text`
  font-family: Helvetica Neue;
  font-weight: 500;

  ${media.fullWidth} {
    font-size: 0.8vw;
  }

  ${media.desktop} {
    font-size: 0.972vw;
  }

  ${media.tablet} {
    font-size: 15px;
  }

  ${media.mobile} {
    font-size: 14px;
  }
`

const Text = styled.text`
  font-family: Helvetica Neue;
  font-weight: 300;

  ${media.fullWidth} {
    font-size: 0.6vw;
  }

  ${media.desktop} {
    font-size: 0.972vw;
  }

  ${media.tablet} {
    font-size: 13px;
  }

  ${media.mobile} {
    font-size: 14px;
  }
`

const G = styled.g`
  opacity: 0;
`

const lineUp = `
  transform: rotate(90deg);

  ${media.tablet} {
    width: 5.988vw;
    left: 1.39vw;
    bottom: 9.539vw;
  }

  ${media.mobile} {
    width: 16.533vw;
    left: 1.5vw;
    top: -4vw;
  }
`

const lineDown = `
  transform: rotate(90deg);

  ${media.tablet} {
    width: 5.988vw;
    left: 1.43vw;
    bottom: -1.0vw;
  }

  ${media.mobile} {
    width: 16.533vw;
    left: 1.5vw;
    top: 23vw;
  }
`

const lineLeft = `
  width: 7.917vw;
  left: -6.597vw;
  
  ${media.tablet} {
    left: -5.597vw;
  }

  ${media.mobile} {
    width: 8.1vw;
    left: -3vw;
  }
`

const lineRight = `
  width: 7.917vw;
  left: 3.958vw;

  ${media.tablet} {
    left: 6.8vw;
  }

  ${media.mobile} {
    width: 8.1vw;
    left: -3vw;
  }
`

const Line = styled.svg<{dir?: string}>`
  position: absolute;
  opacity: 1;

  ${props => {
    switch(props.dir) {
      case "up":
        return lineUp

      case "down":
        return lineDown

      case "left":
        return lineLeft

      case "right":
        return lineRight
    }
  }}
`
