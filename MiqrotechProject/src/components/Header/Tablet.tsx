import React, { useState, useRef, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import gsap from 'gsap/gsap-core'
import {ScreenContext} from '@components/Layout'
import loadable from '@loadable/component'
import colors from '@styles/colors'
import text from '@styles/text'
import media from '@styles/media'

import {ReactComponent as LogoSVG} from '@svg/MIQrotech.svg'
import TwitterSVG from '@svg/twitter.svg'
import FacebookSVG from '@svg/facebook.svg'
import InstagramSVG from '@svg/instagram.svg'
import LinkedInSVG from '@svg/linkedIn.svg'

const MenuItem = loadable(() => import('./MenuItem'))
const PrimaryButton = loadable(() => import('@components/PrimaryButton'))

type props = {
  backgroundTrigger: string
  openForm: any
  data: any
  startingTextColor: string
  startingBackgroundColor?: string
  triggerOffset: string
}

const Tablet: React.FC<props> = ({
  backgroundTrigger, 
  openForm, 
  data, 
  startingTextColor, 
  startingBackgroundColor,
  triggerOffset
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [backgroundTriggered, setBackgroundTriggered] = useState(false)

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  const screen = useContext(ScreenContext)

  useEffect(() => {
      
    const blackBackground = gsap.timeline({
      scrollTrigger: {
        trigger: backgroundTrigger,
        start: `top${triggerOffset} top`,
        end: "+=5",
        scrub: true,
        onLeave: () => {
          if(!menuOpen) {
            setBackgroundTriggered(true)
          }
        },
        onEnterBack: () => {
          if(!menuOpen) {
            setBackgroundTriggered(false)
          }
        }
      }
    })
    blackBackground.to(wrapperRef.current, {
      duration: 1,
      backgroundColor: colors.black
    }, 0)

    let logoPaths = document.getElementById('header-logo-mobile').children
    blackBackground.to(logoPaths, {
      duration: 0.5,
      fill: colors.white
    })

    blackBackground.to('.header-color-change', {
      duration: 0.5,
      color: colors.white,
      stroke: colors.white
    })

    return () => {
      blackBackground.kill()
    }
      
    
  }, [])

  useEffect(() => {
    if (menuOpen) {
      gsap.to(wrapperRef.current, {
        duration: 0.5,
        minHeight: '100vh',
        height: 'auto',
        background: colors.black, 
        overflowY: 'auto',
      })

      gsap.to(contentRef.current, {
        duration: 0.5,
        opacity: 1
      })

      let logoPaths = document.getElementById('header-logo-mobile').children
      gsap.to(logoPaths, {
        duration: 0.5,
        fill: colors.white
      })

      gsap.to('.header-color-change', {
        duration: 0.5,
        color: colors.white,
        stroke: colors.white
      })
    } else {
      gsap.to(wrapperRef.current, {
        duration: 1, 
        minHeight: '0vw',
        height: screen.mobile ? "26.400vw" : "11.789vw",
        background: backgroundTriggered ? colors.black : startingBackgroundColor ? startingBackgroundColor : 'transparent',
        overflowY: 'hidden'
      })

      gsap.to(contentRef.current, {
        duration: 0.5,
        opacity: 0
      })

      let logoPaths = document.getElementById('header-logo-mobile').children
      gsap.to(logoPaths, {
        duration: 0.5,
        fill: backgroundTriggered ? colors.white : startingTextColor
      })

      gsap.to('.header-color-change', {
        duration: 0.5,
        color: backgroundTriggered ? colors.white : startingTextColor,
        stroke: backgroundTriggered ? colors.white : startingTextColor
      })
    }
  }, [menuOpen, screen.mobile])

  const menuItems = useMemo(() => data.map((item, index) => {
    return (
      <MenuItem 
        key={index}
        index={index}
        text={item.name}
        data={item.subLinks}
        open={activeMenu === index}
        setOpen={setActiveMenu}
      />  
    )
  }), [data, activeMenu])

  return (
    <Wrapper id="header" ref={wrapperRef} backgroundColor={startingBackgroundColor}>
      <HeaderTop>
        <Logo onClick={() => navigate('/')} id="header-logo-mobile" $color={startingTextColor} alt="mIQrotech logo"/>
        <MenuSpan 
          active={menuOpen}
          text="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          color={startingTextColor}
        />
      </HeaderTop>
      <Content ref={contentRef}>
        <Menu>
          {menuItems}
        </Menu> 
        <Bottom>
          <Left>
            <SmallLinkRow>
              <SmallLink href="/privacy-policy">Privacy Policy</SmallLink>
              <SmallLink href="/terms-of-use">Terms of Use</SmallLink>
            </SmallLinkRow>
            <Link href="mailto:info@miqrotech.com">info@mIQrotech.com</Link>
            <Link href="mailto:invest@miqrotech.com">invest@mIQrotech.com</Link>
            {/* <Text>+1(832)269-6639</Text> */}
            <Text>Tampa, Florida, United States of America</Text>
            <Text display={!screen.mobile ? 'none' : 'flex'}>&copy;2021 mIQrotech | All Rights Reserved</Text>
          </Left>
          <Right>
            <RightTop>
              {/* <SignIn to="https://www.miqroaware.com">Sign In</SignIn> */}
              <PrimaryButton
                text="Contact Us +1(832)770-7040"
                textColor={colors.black}
                backgroundColor={colors.keppel100}
                hoverColor={colors.keppel60}
                onClick={() => {
                  openForm(true)
                  setMenuOpen(false)
                }}
              />
            </RightTop>
            <Text display={screen.mobile ? 'none' : 'flex'}>&copy;2021 mIQrotech | All Rights Reserved</Text>
            <SocialLinksContainer>
              <SocialLink onClick={() => navigate('/')} src={TwitterSVG} alt="twitter"/>
              <SocialLink onClick={() => navigate('/')} src={InstagramSVG} alt="instagram"/>
              <SocialLink onClick={() => navigate('/')} src={FacebookSVG} alt="facebook"/>
              <SocialLink onClick={() => navigate('/')} src={LinkedInSVG} alt="linkedin"/>
            </SocialLinksContainer>
          </Right>
        </Bottom>
      </Content>
    </Wrapper>
  )
}

export default Tablet

const Wrapper = styled.header<{backgroundColor?: string}>`
  background-color: ${props => props.backgroundColor || 'unset'};
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  ${media.tablet} {
    height: 11.791vw;
    padding-top: 3.597vw;
    padding-right: 5.995vw;
    padding-left: 5.995vw;
    padding-bottom: 3.597vw;
  }

  ${media.mobile} {
    height: 26.400vw;
    padding-top: 8.800vw;
    padding-right: 6.667vw;
    padding-left: 6.667vw;
    padding-bottom: 3.597vw;
  }
`

const HeaderTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled(LogoSVG)<{$color?: string}>`
  height: auto;
  width: 14.269vw;

  path {
    fill: ${props => props.$color || 'unset'};
  }

  ${media.mobile} {
    width: 26.400vw;
  }
`

const Menu = styled.div`
  width: 100;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 9.353vw;

  ${media.mobile} {
    margin-top: 16.267vw;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
`

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;

  ${media.mobile} {
    flex-direction: column;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35.971vw;

  ${media.mobile} {
    width: 100%;
    order: 2;
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 35.971vw;

  ${media.mobile} {
    width: 100%;
    order: 1;
    align-items: flex-start;
    margin-bottom: 7.200vw;
  }
`

const SmallLink = styled.a`
  ${text.tabletSmallBody}
  color: ${colors.jetBlack20};
  margin-right: 1.953vw;
  text-decoration: none;

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-right: 5.333vw;
  }
`

const SmallLinkRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.597vw;

  ${media.mobile} {
    margin-bottom: 5.333vw;
  }
`

const Text = styled.p<{display?: string}>`
  ${text.tabletSmallBody}
  display: ${props => props.display || 'flex'};
  color: ${colors.jetBlack20};
  margin-bottom: 01.199vw;

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 2.667vw;
  }
`

const Link = styled.a<{display?: string}>`
  text-decoration: none;
  ${text.tabletSmallBody}
  display: ${props => props.display || 'flex'};
  color: ${colors.jetBlack20};
  margin-bottom: 01.199vw;

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 2.667vw;
  }
`

const RightTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4.796vw;

  ${media.mobile} {
    margin-bottom: 10.667vw;
  }
`

const SignIn = styled.a`
  ${text.tabletBodyCopy2}
  color: ${colors.white};
  text-decoration: none;
  margin-right: 4.796vw;

  :hover {
    color: ${colors.keppel100};
  }

  ${media.mobile} {
    ${text.mobileBodyCopy2}
    order: 2;
    margin-right: 0vw;
    margin-left: 10.667vw;
  }
`

const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
`

const SocialLink = styled.img`
  text-decoration: none;
  height: 1.679vw;
  margin-right: 1.855vw;
  width: 1.679vw;
  cursor: pointer;

  ${media.mobile} {
    height: 3.733vw;
    width: 3.733vw;
    margin-right: 5.067vw;
  }
`

const MenuSpan: React.FC<{active: boolean, text: string, onClick: any, color: string}> = ({active, text, onClick, color}) => {

  const hrRef = useRef(null)
  const lineRef = useRef(null)

  const handleMouseEnter = () => {

    gsap.to(hrRef.current, {
      duration: 0.5,
      width: '100%',
      ease: "circ.inOut"
    })
    gsap.to(lineRef.current, {
      duration: 0.5,
      opacity: 0
    })
  }

  const handleMouseLeave = () => {
    if (!active) {
      gsap.to(hrRef.current, {
        duration: 0.5,
        width: '0%',
        ease: "circ.inOut"
      })
      gsap.to(lineRef.current, {
        duration: 0.5,
        opacity: 1
      })
    }
  }

  useEffect(() => {
    if (active) {
      handleMouseEnter()
    } else if (!active) {
      handleMouseLeave()
    }
  }, [active])

  return (
    <MenuSpanWrapper onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Top className="header-color-change" $color={color}>
        {text}
        <SVG width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line className="header-color-change" x1="0" y1="4.5" x2="9" y2="4.5" strokeWidth="2" stroke={color || colors.white}/>
          <line className="header-color-change" ref={lineRef} x1="4.5" y1="0" x2="4.5" y2="9" strokeWidth="2" stroke={color || colors.white}/>
        </SVG>
      </Top>
      <HR ref={hrRef}/>
    </MenuSpanWrapper>
  )
}

const MenuSpanWrapper = styled.div`
  ${text.tabletBodyCopy1}
  text-decoration: none;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`

const Top = styled.span<{$color?: string}>`
  display: flex;
  align-items: center;
  color: ${props => props.$color || 'unset'}
`

const HR = styled.hr`
  width: 0%;
  background-color: ${colors.keppel100};
  height: 1px;
  border: none;
  margin: 0vw;
`

const SVG = styled.svg`
  height: auto;
  width: 1vw;
  margin-left: 0.8vw;

  ${media.mobile} {
    width: 2vw;
    margin-left: 1vw;
  }
`
