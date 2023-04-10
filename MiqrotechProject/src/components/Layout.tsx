import React, { createContext, useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import { useLocation } from "@reach/router"
import colors from '@styles/colors'
import { desktop, tablet, mobile } from "@styles/media";
import gsap from "gsap/gsap-core"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { CustomEase } from "gsap/CustomEase"
import { SplitText } from 'gsap/SplitText'
import { CSSPlugin } from 'gsap/CSSPlugin'
import 'normalize.css'
import '@fonts/fonts.css'
import '@styles/cookiebanner.css'

gsap.registerPlugin(
  ScrollTrigger,
  CustomEase,
  SplitText,
  ScrollToPlugin,
  CSSPlugin
)

import Loader from '@components/Loader'
const Footer = loadable(() => import('@components/Footer'))
const Form = loadable(() => import('@components/Form'))

export const OpenFormContext = createContext(null)
export const ScreenContext = createContext(null)

type props = {
  children: any
}

const Layout: React.FC<props> = ({ children }) => {
  const isBrowser = typeof window !== "undefined";

  const [mobileBool, setMobile] = useState(false)
  const [tabletBool, setTablet] = useState(false)
  const [desktopBool, setDesktop] = useState(false)
  const [fullWidthBool, setFullWidth] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/miqroaware/') {
      // setLoading(true)
    }
  }, [location])

  useEffect(() => {    
    if (isBrowser) {
    
      const setScreenSize = () => {
        setMobile(window.innerWidth <= mobile)
        setTablet(window.innerWidth > mobile && window.innerWidth <= tablet)
        setDesktop(window.innerWidth > tablet && window.innerWidth <= desktop)
        setFullWidth(window.innerWidth > desktop)
      }
      setScreenSize()

      window.addEventListener('resize', setScreenSize, { passive: true })

      return () => window.removeEventListener("resize", setScreenSize);
    }
  }, [isBrowser]);
  
  return (
    <OpenFormContext.Provider value={setFormOpen}>
      <ScreenContext.Provider value={{fullWidth: fullWidthBool, desktop: desktopBool, tablet: tabletBool, mobile: mobileBool}}>
        <Main className="smooth-scroll">
          {children}
        </Main>
        {loading && <Loader loading={loading} setLoading={setLoading}/>}
        <Footer/>
        <Form open={formOpen} openForm={setFormOpen}/>
      </ScreenContext.Provider>
    </OpenFormContext.Provider>
  )
}

export default Layout;

const Main = styled.main`
  width: 100%;
  overflow-x: hidden !important;
  overflow: hidden !important;
  background: ${colors.black};
`;
