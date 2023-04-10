import React, {useEffect, useState, useRef, useCallback} from 'react'
import gsap from 'gsap/gsap-core'
import styled from 'styled-components'
import {Link} from 'gatsby'
import loadable from '@loadable/component'

import colors from '@styles/colors'
import text from '@styles/text'
import media from '@styles/media'

const ArrowSquare = loadable(() => import('@components/ArrowSquare'))

type props = {
  text: string
  data: any
  open: boolean
  setOpen: any
  index: number
}

const MenuItem: React.FC<props> = ({text, data, open, setOpen, index}) => {

  const lineRef = useRef(null)
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (open) {
      const tl = gsap.timeline()
      tl.to(contentRef.current, {
        duration: 0.5,
        height: 'auto'
      }, 0)
      tl.to(lineRef.current, {
        duration: 0.5,
        opacity: 0
      }, 0)
      tl.fromTo(contentRef.current, {
        display: 'flex'
      }, {
        duration: 0.5,
        opacity: 1
      })
      
      return () => {
        tl.kill()
      }
    } else {
      const tl = gsap.timeline()
      tl.to(contentRef.current, {
        duration: 0.5,
        opacity: 0
      }, 0)
      tl.to(contentRef.current, {
        duration: 0.5,
        height: '0vw',
        onComplete: () => {
          gsap.set(contentRef.current, {
            display: 'none'
          })
        }
      }, 0.5)
      tl.to(lineRef.current, {
        duration: 0.5,
        opacity: 1
      }, 0.5)
      return () => {
        tl.kill()
      }
    }
  }, [open])

  const subItems =  data.map((item, index) => {
    const [mouseEnter, setMouseEnter] = useState(false)

    return (
      <SubItem to={item.slug} key={index}  onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
        <Title>{item.name}</Title>
        <Text>{item.text}</Text>
        <ArrowContainer>
          <ArrowSquare
            mouseEnter={mouseEnter}
            color={colors.keppel100}
          />
        </ArrowContainer>
      </SubItem>
    )
  })

  const handleOnClick = useCallback(() => {
    if (open) {
      setOpen(-1)
    } else {
      setOpen(index)
    }
  }, [setOpen, index, open])

  return (
    <Wrapper onClick={handleOnClick}>
      <Top>
        <ItemSpan>{text}</ItemSpan>
        <SVG width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="4.5" x2="9" y2="4.5" strokeWidth="2" stroke={colors.white}/>
          <line ref={lineRef} x1="4.5" y1="0" x2="4.5" y2="9" strokeWidth="2" stroke={colors.white}/>
        </SVG>
      </Top>
      <Content ref={contentRef}>
        {subItems}
      </Content>
    </Wrapper>
  )
}

export default MenuItem

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-bottom: 1px solid ${colors.jetBlack20};
  margin-bottom: 9.592vw;

  ${media.mobile} {
    margin-bottom: 13.333vw;
  }
`

const ItemSpan = styled.span`
  ${text.tabletXSHeading}
  color: ${colors.white};

  ${media.mobile} {
    ${text.mobileXXSHeading}
  }
`

const SVG = styled.svg`
  height: auto;
  width: 1.8vw;

  ${media.mobile} {
    width: 3.5vw;
  }
`

const Top = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 8.034vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3.717vw;

  ${media.mobile} {
    padding-bottom: 10.400vw;
    height: 17.867vw;
  }
`

const Content = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 0vw;
  opacity: 0;
  display: none;
  flex-direction: column;
  padding-left: 7.554vw;

  ${media.mobile} {
    padding-left: 0vw;
  }
`

const SubItem = styled(Link)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6.235vw;
  text-decoration: none;
  position: relative;

  ${media.mobile} {
    flex-direction: column;
    margin-bottom: 13.333vw;
  }
`

const Title = styled.span`
  ${text.tabletPetiteHeading}
  color: ${colors.culturedWhite20};
  width: 23.381vw;

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: auto;
    margin-bottom: 5.333vw;
  }
`

const Text = styled.p`
  ${text.tabletSmallBody};
  color: ${colors.culturedWhite20};
  width: 43.046vw;

  ${media.mobile} {
    ${text.mobileSmallBody}
    font-size: 3.200vw;
    width: 76.267vw;
  }
`

const ArrowContainer = styled.div`
  width: 3.357vw;

  ${media.mobile} {
    position: absolute;
    right: 0;
    top: 0;
    width: 7.467vw;
  }
`
