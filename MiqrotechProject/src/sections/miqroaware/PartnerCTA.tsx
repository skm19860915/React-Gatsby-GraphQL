import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'

import PrimaryButton from '@components/PrimaryButton'
import TextAnimation from '@components/TextAnimation'
import { OpenFormContext } from '@components/Layout'

import useMedia from '@hooks/useMedia'

import media from '@styles/media'
import text from '@styles/text'
import colors from '@styles/colors'

import BGJPG from '@jpg/finalCTA.jpg'

type props = {
  loading: boolean,
  txt1: string[]
}

const PartnerCTA: React.FC<props> = ({txt1}) => {
  const [titleTrigger, setTitleTrigger] = useState(false)

  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)

  const openForm = useContext(OpenFormContext)

  const tlStart = useMedia('top-=10%', 'top-=10%', 'top-=20%', 'top-=50%')

  useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current, 
          start: tlStart
        }
      })
  
      tl.call(setTitleTrigger, [true], 0)
      tl.to(buttonRef.current, {
        duration: 0.8,
        opacity: 1
      }, 1)
  
      return () => {
        tl.kill()
      }
    
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      <BG src={BGJPG} alt="background"/>
      <Content>
        <Title>
          <TextAnimation
            textArray={txt1 || []}
            className={'finalcta-title'}
            height={useMedia('4.167vw', '4.167vw', '5.749vw', '9.6vw')}
            trigger={titleTrigger}
          />
        </Title>
        <ButtonContainer>
          <PrimaryButton
            text="Schedule a Meeting"
            backgroundColor={colors.keppel100}
            hoverColor={colors.keppel60}
            textColor={colors.black}
            onClick={() => openForm(true)}
          />
        </ButtonContainer>
      </Content>
    </Wrapper>
  )
}

export default PartnerCTA

const Wrapper = styled.section`
  box-sizing: border-box;
  position: relative;

  height: 66.181vw;
  padding-top: 5.903vw;
  padding-bottom: 5.486vw;
  
  ${media.tablet} {
    padding-top: 4.311vw;
    height: 98.802vw;
  }

  ${media.mobile} {
    padding-top: 11.2vw;
    height: 195.2vw;
  }
`

const BG = styled.img`
  object-fit: cover;
  right: 0;
  position: absolute;

  width: 81.042vw;
  height: 54.792vw;
  top: 5.903vw;
  
  ${media.tablet} {
    width: 86.108vw;
    height: 66.467vw;
    top: 4.311vw;
    object-position: left;
  }

  ${media.mobile} {
    width: 93.067vw;
    height: 148vw;
    object-position: 65%;
    top: 11.2vw;
  }
`

const Content = styled.div`
  box-sizing: border-box;
  background-color: ${colors.black};
  z-index: 2;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  
  padding-top: 5vw;
  padding-left: 11.389vw;
  bottom: 5.486vw;
  height: 32.083vw;
  width: 55.347vw;

  ${media.tablet} {
    width: 78.802vw;
    height: 55.329vw;
    padding-top: 8.623vw;
    padding-left: 5.988vw;
    bottom: 0;
  }

  ${media.mobile} {
    width: 93.067vw;
    height: 95.333vw;
    padding-top: 19.2vw;
    padding-left: 6.667vw;
    bottom: 0;
  }
`

const Title = styled.h2`
  color: ${colors.culturedWhite100};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  
  ${text.desktopMHeading}
  width: 40.625vw;
  margin-bottom: 5.556vw;

  ${media.tablet} {
    ${text.tabletSHeading}
    width: 54.97vw;
    margin-bottom: 4.79vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    width: 100%;
    margin-bottom: 10.667vw;
  }
`

const ButtonContainer = styled.div`

`

