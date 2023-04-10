import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'
import loadable from '@loadable/component'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import media from '@styles/media'
import colors from '@styles/colors'
import text from '@styles/text'

import useMedia from '@hooks/useMedia'

import TedXPNG from '@png/Tedx.png'

const TextAnimation = loadable(() => import('@components/TextAnimation'))

type props = {
  txt1: string[];
};

const TedX: React.FC<props> = ({ txt1 }) => {

  const [triggerTitle, setTriggerTitle] = useState(false)

  const wrapperRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top-=50% top"
      }
    })
    tl.to(videoRef.current, {
      opacity: 1,
      duration: 1
    }, 1)
    tl.call(setTriggerTitle, [true], 0)

    return () => {
      tl.kill()
    }

  }, [setTriggerTitle, wrapperRef, videoRef])

  return (
    <Wrapper ref={wrapperRef} id="tedx-section">
      <Title>
        <TextAnimation
          textArray={txt1 || []}
          height={useMedia('4.861vw', '4.861vw', '5.749vw', '9.600vw')}
          className="tedx-title"
          trigger={triggerTitle}
        />
      </Title>
      <P>Watch our Founder and CEO, Meade Lewis share the vision for mIQrotech in his TEDx presentation:</P>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <LiteYouTubeEmbed
          id="rinfPOZyXgY"
          title="Meade Lewis TEDx"
          poster="maxresdefault"
        />
      </div>
      <Img src={TedXPNG} alt="tedx logo" />
    </Wrapper>
  )
}

export default TedX

const Wrapper = styled.section`
  background-color: ${colors.white};
  position: relative;

  padding-top: 45vw;
  padding-left: 11.250vw;
  padding-right: 11.250vw;
  padding-bottom: 10.139vw;

  ${media.tablet} {
    padding-top: 75.641vw;
    padding-left: 5.509vw;
    padding-right: 5.509vw;
    padding-bottom: 22.874vw;
  }

  ${media.mobile} {
    padding-top: 60.009vw;
    padding-left: 5.841vw;
    padding-right: 5.841vw;
    padding-bottom: 38.084vw;
  }
`

const Title = styled.h2`
  display: flex;
  flex-direction: column;
  color: ${colors.black};
  position: absolute;

  ${text.desktopLHeading}
  top: 5.486vw;
  left: 19.167vw;
  width: 65.972vw;

  ${media.tablet} {
    ${text.tabletSHeading}
    top: 30.090vw;
    left: 21.078vw;
    width: 68.150vw;
  }
  
  ${media.mobile} {
    ${text.mobileXXSHeading}
    top: -2.028vw;
    left: 5.841vw;
    width: 92.133vw;
  }
`

const Img = styled.img`
  position: absolute;
  z-index: 0;

  top: 38vw;
  left: 3.194vw;
  height: 31.250vw;
  width: 9.097vw;

  ${media.tablet} {
    top: 65.639vw;
    left: -0.806vw;
    height: 35.25vw;
    width: 12.097vw;
  }

  ${media.mobile} {
    left: -0.5vw;
    width: 19.200vw;
    height: 65.333vw;
    top: 60vw;
  }
`

const P = styled.p`
  color: ${colors.black};
  width: 100%;
  text-align: center;

  ${media.fullWidth} {
    ${text.desktopPetiteHeading}
    margin-bottom: 2.083vw;
  }

  ${media.desktop} {
    ${text.desktopPetiteHeading}
    margin-bottom: 2.083vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    margin-bottom: 2vw;
  }
  
  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 5vw;
    text-align: left;
    font-size: 4.533vw;
  }
`
