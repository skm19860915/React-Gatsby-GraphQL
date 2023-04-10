import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import gsap from 'gsap/gsap-core'
import loadable from '@loadable/component'
import colors from '@styles/colors'
import text from '@styles/text'

import { ReactComponent as MiqroTechSVG } from '@svg/MIQrotech.svg'

const PrimaryButton = loadable(() => import('@components/PrimaryButton'))
const StyledLink = loadable(() => import('./StyledLink'))

type props = {
  backgroundTrigger: string
  openForm: any
  data: any
  startingTextColor: string
  startingBackgroundColor?: string
  startingButtonColor?: string
  startingButtonBorderColor?: string
}

const Header: React.FC<props> = ({
  backgroundTrigger, 
  openForm, 
  data, 
  startingTextColor, 
  startingBackgroundColor, 
  startingButtonColor,
  startingButtonBorderColor
}) => {
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0)
  const [activeLink, setActiveLink] = useState(null)
  const [currentSubLink, setCurrentSubLink] = useState(0)
  const [backgroundTriggered, setBackgroundTriggered] = useState(false)
  const [open, setOpen] = useState(false)
  const [expandTl, setExpandTl] = useState(gsap.timeline())
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('')
  const [buttonBorderColor, setButtonBorderColor] = useState('')

  const wrapperRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (wrapperRef.current) {
      const blackBackground = gsap.timeline({
        scrollTrigger: {
          trigger: backgroundTrigger,
          start: `top top`,
          end: "+=1",
          scrub: true,
          onLeave: () => {
            setBackgroundTriggered(true)
          },
          onEnterBack: () => {
            setBackgroundTriggered(false)
          }
        }
      })
      blackBackground.fromTo(wrapperRef.current, {
        backgroundColor: open ? colors.black : startingBackgroundColor || 'transparent'
      }, {
        duration: 1,
        backgroundColor: colors.black
      }, 0)
  
      let logoPaths = document.getElementById('header-logo').children
      blackBackground.to(logoPaths, {
        duration: 1,
        fill: colors.white
      }, 0)

      return () => {
        blackBackground.kill()
      }
    }
  }, [])

  useEffect(() => {
    if (wrapperRef.current) {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: setActiveLink,
        onCompleteParams: [null]
      })
      tl.fromTo(wrapperRef.current, {
        backgroundColor: (backgroundTriggered || open) ? colors.black : startingBackgroundColor || 'transparent'
      }, {
        duration: 0.5,
        backgroundColor: colors.black
      }, 0)
  
      let logoPaths = document.getElementById('header-logo').children
      tl.to(logoPaths, {
        duration: 0.5,
        fill: colors.white
      }, 0)
  
      tl.fromTo(bottomRef.current, {
        height: '0vw',
      }, {
        duration: 0.5,
        ease: "circ.inOut",
        opacity: 1,
        height: '19.514vw',
      }, 0)

      setExpandTl(tl)

      return () => {
        tl.kill()
        expandTl.kill()
      }
    }
    
  }, [backgroundTriggered])

  useEffect(() => {
    if (open) {
      expandTl.pause()
      expandTl.play()
    } else {
      expandTl.pause()
      expandTl.reverse()
    }
  }, [open])

  useEffect(() => {
    if (startingButtonBorderColor) {
      setButtonBorderColor(startingButtonBorderColor)
    } else {
      setButtonBorderColor(colors.keppel100)
    }

    if (startingButtonColor) {
      setButtonBackgroundColor(startingButtonColor)
    } else {
      setButtonBackgroundColor(colors.keppel100)
    }
    
  }, [backgroundTriggered, open, startingTextColor, startingButtonColor])

  const onMouseEnterLink = useCallback((index) => {
    setOpen(true)
    setCurrentLinkIndex(index)
    setActiveLink(index)
  }, [ setCurrentLinkIndex, setActiveLink])

  const onMouseEnterSubLink = useCallback((index) => {
    setCurrentSubLink(index)
  }, [setCurrentSubLink])

  const links = useMemo(() => data.map((item, index) => {
    return (
      <StyledLink
        key={index}
        text={item.name}
        onMouseEnter={() => onMouseEnterLink(index)}
        active={index === activeLink}
        setActive={setActiveLink}
        startingTextColor={(backgroundTriggered || open) ? colors.white : startingTextColor ? startingTextColor : colors.white}
      />
    )
  }), [data, activeLink, startingTextColor, open, backgroundTriggered])

  const subLinks = useMemo(() => data[currentLinkIndex].subLinks.map((item, index) => {
    return (
      <SubLink $active={index === currentSubLink} key={index} onClick={() => navigate(item.slug)} onMouseEnter={() => onMouseEnterSubLink(index)}>
        {item.name}
      </SubLink>
    )
  }), [data, currentLinkIndex, currentSubLink])

  return (
    <Wrapper id="header" ref={wrapperRef} onMouseLeave={() => setOpen(false)} backgroundColor={startingBackgroundColor}>
      <Top>
        <Logo 
          id="header-logo" 
          $color={startingTextColor}
          onClick={() => {
            openForm(false)
            navigate('/')
          }}
        />
        <Links>
          <LeftLinks>
            {links}
          </LeftLinks>
          <RightLinks>
            {/* <SignIn className="header-color-change" $color={startingTextColor} to="https://www.miqroaware.com">Sign In</SignIn> */}
            <PrimaryButton
              text="Contact Us +1(832)770-7040"
              textColor={colors.black}
              borderColor={buttonBorderColor}
              backgroundColor={buttonBackgroundColor}
              padding={'.69vw 1.38vw'}
              onClick={() => openForm(true)}
            />
          </RightLinks>
        </Links>
      </Top>
      <Bottom ref={bottomRef}>
        <HR/>
        <BottomContent>
          <Left>
            {subLinks}
          </Left>
          <VR/>
          <Right>
            <Text>
              {data[currentLinkIndex].subLinks[currentSubLink].text}
            </Text>
          </Right>
        </BottomContent>
      </Bottom>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.header<{backgroundColor?: string}>`
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  transition: 500ms;
  background-color: ${props => colors.black};
  padding: 0 3.472vw;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.250vw;
`

const Logo = styled(MiqroTechSVG)<{$color?: string}>`
  height: auto;
  cursor: pointer;

  path {
    fill: ${props => props.$color};
  }

  width: 10.333vw; 
`

const Links = styled.div`
  display: flex;
`

const LeftLinks = styled.div`
  display: flex;
  margin-right: 3.167vw;
`

const RightLinks = styled.div`
  display: flex;
  margin-right: 12px;
`

const SignIn = styled.a<{$color?: string}>`
  ${text.desktopBodyCopy2}
  text-decoration: none;
  color: ${props => props.$color || colors.white};
  display: flex;
  align-items: center;
  margin-right: 2.778vw;
  transition: 500ms;

  :hover {
    color: ${colors.keppel100};
  }
`

const Bottom = styled.div`
  height: 0vw;
  opacity: 0;
  display: block;
  overflow: hidden;
`

const HR = styled.hr`
  width: 100%;
  background-color: ${colors.jetBlack20};
  height: 1px;
  margin: 0px;
  border: none;
`

const BottomContent = styled.div`
  width: 100%;
  padding-top: 2.986vw;
  padding-bottom: 3.958vw;
  display: flex;
  justify-content: center;
`

const Left = styled.div`
  padding-top: 2.083vw;
  width: 22.500vw;
  display: flex;
  flex-direction: column;
`

const Right = styled.div`
  padding-top: 2.083vw;
  width: 22.500vw;
`

const VR = styled.div`
  height: 12.569vw;
  width: 1px;
  border: none;
  background-color: ${colors.jetBlack20};
  margin-right: 8.264vw;
  // margin-left: 8.264vw;
`

const SubLink = styled.a<{$active: boolean}>`
  ${text.desktopPetiteHeading}
  color: ${props => props.$active ? colors.keppel100 : colors.white};
  margin-bottom: 2.083vw;
  text-decoration: none;
  cursor: pointer;
`

const Text = styled.p`
  ${text.desktopSmallBody}
  color: ${colors.culturedWhite60};
  width: 100%;
`
