import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'
import { OpenFormContext } from '@components/Layout'
import loadable from '@loadable/component'
import { StaticImage } from 'gatsby-plugin-image'

import media from '@styles/media'
import colors from '@styles/colors'
import text from '@styles/text'

import useMedia from '@hooks/useMedia'

const PrimaryButton = loadable(() => import('@components/PrimaryButton'))
const TextAnimation = loadable(() => import('@components/TextAnimation'))

type props = {
  txt1: string[];
};

const PartnerCTA: React.FC<props> = ({ txt1 }) => {
  const [triggerTitle, setTriggerTitle] = useState(false)

  const wrapperRef = useRef(null)
  const imgRef = useRef(null)
  const buttonRef = useRef(null)

  const openForm = useContext(OpenFormContext)

  const tlStart = useMedia("top-=50% top", "top-=50% top", "top-=80% top", "top-=50% top")

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: tlStart
      }
    })
    tl.to(imgRef.current, {
      duration: 0.8,
      height: '100%',
      ease: "circ.inOut"
    }, 0)
    tl.to(buttonRef.current, {
      opacity: 1,
      duration: 0.8
    }, 1)
    tl.call(setTriggerTitle, [true], 0.6)

    const imgZoom = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        scrub: true,
        start: "top top"
      }
    })
    imgZoom.to(imgRef.current, {
      scale: '1.2',
      duration: 2
    }, 0)

    return () => {
      tl.kill()
      imgZoom.kill()
    }
    
  }, [imgRef, buttonRef, wrapperRef, setTriggerTitle])

  return (
    <Wrapper ref={wrapperRef}>
      <Title>
        <TextAnimation
          textArray={txt1 || []}
          height={useMedia('4.167vw', '4.167vw', '5.749vw', '9.600vw')}
          className="about-partnercta"
          trigger={triggerTitle}
        />
      </Title>
      <ButtonWrapper ref={buttonRef}>
        <PrimaryButton
          text="Schedule a Demo"
          backgroundColor={colors.white}
          textColor={colors.black}
          width={useMedia('fit-content', 'fit-content', 'fit-content', '100%')}
          onClick={() => openForm(true)}
        />
      </ButtonWrapper>
      <ImgWrapper>
        <Img ref={imgRef} >
          <StaticImage
            src={'../../images/jpg/aboutPartnerCTA.jpg'} 
            alt="team meeting"
            objectFit="cover"
            placeholder="blurred"
            style={{width: '100%', height: '100%'}}
          />
        </Img>
      </ImgWrapper>
    </Wrapper>
  )
}

export default PartnerCTA

const Wrapper = styled.section`
  background-color: ${colors.black};
  position: relative;

  padding-top: 19.375vw;
  padding-left: 50.139vw;
  padding-bottom: 24.583vw;

  ${media.tablet} {
    padding-top: 14.491vw;
    padding-left: 43.898vw;
    padding-bottom: 15.090vw;
    margin-bottom: 15vw;
  }

  ${media.mobile} {
    padding-top: 130.133vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 37.333vw;
  }
`

const Title = styled.h2`
  position: relative;
  z-index: 2;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.fullWidth} {
    ${text.desktopMHeading}
    margin-bottom: 4.167vw;
  }

  ${media.desktop} {
    ${text.desktopMHeading}
    margin-bottom: 4.167vw;
  }

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-bottom: 8vw;
  }
`

const ImgWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  left: 0vw;

  ${media.fullWidth} {
    width: 61.389vw;
    height: 49.097vw;
    top: 8.611vw;
  }

  ${media.desktop} {
    width: 61.389vw;
    height: 49.097vw;
    top: 8.611vw;
  }

  ${media.tablet} {
    width: 56.527vw;
    height: 59.042vw;
    top: 3.593vw;
  }

  ${media.mobile} {
    width: 100vw;
    height: 98.400vw;
    top: 16vw;
  }
`

const Img = styled.div`
  width: 100%;
  height: 0%;
`

const ButtonWrapper = styled.div`
  position: relative;
  z-index: 2;
  opacity: 0;
`