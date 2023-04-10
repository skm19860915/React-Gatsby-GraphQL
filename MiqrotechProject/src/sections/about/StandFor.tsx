import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import gsap from 'gsap/gsap-core'
import media from '@styles/media'
import colors from '@styles/colors'
import useMedia from '@hooks/useMedia'
import ContentPart from './team/content-part'
import ImageWrapperPart from './standfor/image-wrapper-part'

type props = {
  txt1: string;
  txt2: string;
};

const StandFor: React.FC<props> = ({ txt1, txt2 }) => {
  const wrapperRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)

  const [triggerTitle, setTriggerTitle] = useState(false)
  const [triggerText, setTriggerText] = useState(false)

  const tlStart = useMedia("top-=25% top", "top-=25% top", "top-=80% top", "top-=55% top")

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: wrapperRef.current, start: tlStart }})
    tl.to(img1Ref.current, { duration: 0.8, height: '100%', ease: "circ.inOut" }, 0)
    tl.to(img2Ref.current, { duration: 0.8, height: '100%', ease: "circ.inOut" }, 0.4)
    tl.call(setTriggerTitle, [true], 0)
    tl.call(setTriggerText, [true], 0.2)

    const imgZoom = gsap.timeline({ scrollTrigger: { trigger: wrapperRef.current, start: "top-=25% top", scrub: true }})
    imgZoom.to(img1Ref.current, { scale: '1.2' }, 0)
    imgZoom.to(img2Ref.current, { scale: '1.2' }, 0)

    return () => { tl.kill() }
  }, [wrapperRef, img2Ref, img1Ref, setTriggerTitle, setTriggerText, tlStart])

  return (
    <Wrapper ref={wrapperRef}>
      <ContentPart title={txt1} text={txt2} titleTrigger={triggerTitle} textTrigger={triggerText} />
      <ImageWrapperPart imageRef1={img1Ref} imageRef2={img2Ref} />
    </Wrapper>
  )
}

export default StandFor

const Wrapper = styled.section`
  background-color: ${colors.culturedWhite40};
  position: relative;

  ${media.fullWidth} {
    padding-top: 17.639vw;
    padding-right: 11.319vw;
    padding-left: 62.986vw;
    padding-bottom: 24.583vw;
  }

  ${media.desktop} {
    padding-top: 17.639vw;
    padding-right: 11.319vw;
    padding-left: 62.986vw;
    padding-bottom: 24.583vw;
  }

  ${media.tablet} {
    padding-top: 15.569vw;
    padding-right: 8.862vw;
    padding-left: 58.443vw;
    padding-bottom: 19.401vw;
  }

  ${media.mobile} {
    padding-top: 160.267vw;
    padding-left: 6.667vw;
    padding-bottom: 43.467vw;
  }
`