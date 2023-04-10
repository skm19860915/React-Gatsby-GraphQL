import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from 'gsap/gsap-core'
import useMedia from '@hooks/useMedia'
import colors from "@styles/colors";
import media from "@styles/media";
import BackgroundPart from "./partnercta/background-part";
import ContentPart from "./partnercta/content-part";

type props = {
  txt1: string
}

const PartnerCTA: React.FC<props> = ({txt1}) => {
  const [triggerTitle, setTriggerTitle] = useState(false)

  const wrapperRef = useRef(null)
  const buttonWrapperRef = useRef(null)
  const imgRef = useRef(null)

  const tlStart = useMedia("top+=100 top", "top+=100 top", "top-=120% top")
  const imgZoomStart = useMedia("top+=100 top", "top+=100 top", "op-=120% top")

  useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: tlStart,
        }
      })
      tl.to(buttonWrapperRef.current, {
        duration: 1,
        opacity: 1
      })
      tl.call(setTriggerTitle, [true], 0)
  
      const imgZoom = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: imgZoomStart,
          end: '+=100%',
          scrub: true
        }
      })
      imgZoom.to(imgRef.current, {
        scale: "1.2"
      })
  
      return () => {
        tl.kill()
        imgZoom.kill()
      }
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      <BackgroundPart bgImageRef={imgRef} />
      <ContentPart title={txt1} titleTrigger={triggerTitle} buttonRef={buttonWrapperRef} />
    </Wrapper>
  );
};

export default PartnerCTA;

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  background-color: ${colors.black};
  position: relative;
  overflow: hidden;
  position: relative;

  ${media.fullWidth} {
    height: 76.8vw;
  }

  ${media.desktop} {
    height: 76.8vw;
  }

  ${media.tablet} {
    height: 61vw;
    padding-bottom: 20.384vw;
  }

  ${media.mobile} {
    height: 195.667vw;
  }
`;
