import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'
import colors from '@styles/colors'
import media from '@styles/media'
import text from '@styles/text'
import BackgroundPart from './hero/background-part'
import ImageWrapperPart from './hero/image-wrapper-part'

type props = {
  txt1: string[];
};

const Hero: React.FC<props> = ({ txt1 }) => {

  const wrapperRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)

  useEffect(() => {  
    const imgZoom = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        scrub: true,
        start: "top top"
      }
    })
    imgZoom.to(img1Ref.current, {
      scale: "1.1"
    }, 0)
    imgZoom.to(img2Ref.current, {
      scale: "1.1"
    }, 0)

    return () => {
      imgZoom.kill()
    }
  }, [img1Ref, img2Ref, wrapperRef])

  return (
    <Wrapper ref={wrapperRef} id="about-hero">
      <Top>
        <BackgroundPart />
        <Title>{txt1}</Title>
        <ImageWrapperPart imageRef1={img1Ref} imageRef2={img2Ref} />
      </Top>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.section`
  background-color: ${colors.white};
  min-height: 100vh;
  height: 66.667vw;

  ${media.tablet} {
    min-height: unset;
    height: 113.772vw;
  }

  ${media.mobile} {
    min-height: unset;
    height: 250vw;
  }
`

const Top = styled.div`
  background-color: ${colors.black};
  position: relative;
  box-sizing: border-box;
  
  padding-top: 11.806vw;
  padding-left: 11.319vw;
  padding-bottom: 23.472vw;
  height: 50.722vw;

  ${media.tablet} {
    padding-top: 27.545vw;
    padding-left: 5.988vw;
    padding-bottom: 48.383vw;
    height: 88.623vw;
  }
  
  ${media.mobile} {
    padding-top: 42.133vw;
    padding-left: 6.667vw;
    padding-bottom: 141.333vw;
    height: 197.333vw;
  }
`

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  color: ${colors.white};
  margin: 0px;
  white-space: pre-wrap;

  ${media.fullWidth} {
    ${text.desktopLHeading}
    width: 39.861vw;
  }

  ${media.desktop} {
    ${text.desktopLHeading}
    width: 39.861vw;
  }

  ${media.tablet} {
    ${text.tabletLHeading}
    width: 50vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    width: 86.667vw;
  }
`
