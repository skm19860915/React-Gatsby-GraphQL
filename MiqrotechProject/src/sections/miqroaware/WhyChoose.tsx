import React, { useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'

import media from '@styles/media'
import text from '@styles/text'
import colors from '@styles/colors'

import TextAnimation from '@components/TextAnimation'

import useMedia from '@hooks/useMedia'

type props = {
  loading: boolean,
  txt1: string
}

const WhyChoose: React.FC<props> = ({txt1}) => {
  const [titleTrigger, setTitleTrigger] = useState(false)

  const wrapperRef = useRef(null)

  const tlStart = useMedia("top-=30%", "top-=30%", "top-=30%", "top-=30%")

  useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: tlStart
        }
      })
  
      tl.to('.whychoose-item', {
        duration: 0.5,
        stagger: 0.3,
        opacity: 1
      }, 0)
      tl.call(setTitleTrigger, [true], 0)

      return () => {
        tl.kill()
      }
    
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      <Left>
        <Title>
          <TextAnimation
            textArray={txt1}
            className="whychoose-title"
            height={useMedia('4.861vw', '4.861vw', '8.383vw', '12.8vw')}
            trigger={titleTrigger}
          />
        </Title>
      </Left>
      <Right>
        <Item className="whychoose-item">
          <Number>01</Number>
          <Content>
            <SubTitle>Ease of use system</SubTitle>
            <Text>From non-invasive installation to user-friendly custom analytics dashboarding, pipeline monitoring has never been simpler.</Text>
          </Content>
        </Item>
        <Item className="whychoose-item">
          <Number>02</Number>
          <Content>
            <SubTitle>Smarter solution</SubTitle>
            <Text>Our system blends Internet of Things (IoT), sensor, and Artificial Intelligence (AI) technology to monitor the 7 most important parameters of your pipeline health at a rate of up to 42 times per second, with instant advanced analytics reporting. By maximizing your information, you can optimize operations.</Text>
          </Content>
        </Item>
        <Item className="whychoose-item">
          <Number>03</Number>
          <Content>
            <SubTitle>Exceptional service</SubTitle>
            <Text>We take pride in our customer support team. Our service engineers are accessible and ready to work with you to find the optimal solution for your pipeline. Your success is our primary goal.</Text>
          </Content>
        </Item>
      </Right>
    </Wrapper>
  )
}

export default WhyChoose

const Wrapper = styled.section`
  display: flex;

  padding-top: 12.083vw;
  padding-left: 3.472vw;

  ${media.tablet} {
    flex-direction: column;
    padding-top: 9.94vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
  }

  ${media.mobile} {
    flex-direction: column;
    padding-top: 46.667vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.culturedWhite100};

  width: 38.056vw;
  padding-top: 2.083vw;
  margin-right: 8.958vw;

  ${media.tablet} {
    width: 100%;
    padding-top: 3.593vw;
    margin-right: 0;
    margin-bottom: 14.012vw;
  }

  ${media.mobile} {
    width: 100%;
    padding-top: 8vw…
    margin-right: 0;
    margin-bottom: 48.8vw;
  }
`

const Title = styled.h2`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;

  ${text.desktopLHeading}

  ${media.tablet} {
    ${text.tabletLHeading}
  }

  ${media.mobile} {
    ${text.mobileSHeading}
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 41.667vw;

  ${media.tablet} {
    width: 100%;
  }

  ${media.mobile} {
    width: 100%;
  }
`

const Item = styled.div`
  border-top: 1px solid ${colors.white};
  width: 100%;
  display: flex;
  align-items: flex-start;
  opacity: 0;

  padding-top: 2.083vw;
  padding-bottom: 5.208vw;

  ${media.tablet} {
    padding-top: 3.593vw;
    padding-bottom: 5.988vw;
  }
  
  ${media.mobile} {
    padding-top: 8vw;
    padding-bottom: 16vw;
  }
`

const Number = styled.span`
  color: ${colors.darkOrange100};
  transform: rotate(90deg);

  ${text.desktopXSHeading}
  margin-right: 1.944vw;

  ${media.tablet} {
    ${text.tabletXSHeading}
    margin-right: 3.353vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-right: 14.667vw;
  }
`

const SubTitle = styled.h3`
  color: ${colors.culturedWhite60};

  ${text.desktopXXSHeading}
  margin-right: 4.306vw;
  width: 10.417vw;

  ${media.tablet} {
    ${text.tabletXXSHeading}
    margin-right: 19.88vw;
    width: 17.964vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-right: 0;
    margin-bottom: 8vw;
    width: 40vw;
  }
`

const Text = styled.p`
  color: ${colors.culturedWhite60};

  ${text.desktopBodyCopy1}
  width: 22.5vw;

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 39.281vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 100%;
  }
`

const Content = styled.div`
  display: flex;
  
  ${media.mobile} {
    flex-direction: column;
    algin-items: flex-start;
    width: 63.467vw…
  }
`