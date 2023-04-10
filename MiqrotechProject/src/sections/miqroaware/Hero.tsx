import React, { useState, useRef, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { ScreenContext } from '@components/Layout'
import gsap from 'gsap/gsap-core'
import media from '@styles/media'
import text from '@styles/text'
import colors from '@styles/colors'
import TextAnimation from '@components/TextAnimation'
import BoxPNG from '@png/box-min.png'
import useMedia from '@hooks/useMedia'
import boxImages from "@sections/miqroaware/BoxImages";

type props = {
  title1TextArray: string[];
  subTitle2TextArray: string;
  title2TextArray: string;
  subTitle3TextArray: string;
  title3TextArray: string[];
};

const Hero: React.FC<props> = ({ title1TextArray, subTitle2TextArray, title2TextArray, subTitle3TextArray, title3TextArray }) => {
  var imageArray = Object.keys(boxImages).map(key => boxImages[key]);
  const preload = useMemo(() => { return imageArray }, []);

  const screen = useContext(ScreenContext)

  const [title2Trigger, setTitle2Trigger] = useState(false)
  const [title3Trigger, setTitle3Trigger] = useState(false)
  const [subTitle1Trigger, setSubTitle1Trigger] = useState(false)
  const [subTitle2Trigger, setSubTitle2Trigger] = useState(false)
  const loading = useRef(true)

  const tl1 = useRef(null)
  const tl2 = useRef(null)
  const animation1Played = useRef(false)
  const animation2Played = useRef(false)
  const animation = useRef(false)
  const lastTouch = useRef({ clientY: 0 })

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const content2Ref = useRef(null)
  const content3Ref = useRef(null)
  const subTitleRef = useRef(null)
  const boxRef = useRef(null)
  const background1Ref = useRef(null)
  const background2Ref = useRef(null)
  const background3Ref = useRef(null)

  const background1Width = useMedia("0vw", '0vw', '100%', '100%')
  const background1Height = useMedia('100%', '100%', '0vw', '0vw')
  const background2Width = useMedia('100%', '100%', '0vw', '')
  const background2Height = useMedia('0vw', '0vw', '100%', '')
  const imgObjPos = useMedia('unset', 'unset', 'unset', '8%')

  const stopScroll = () => {
    gsap.set("#___gatsby", {
      height: "101vh",
      overflow: "hidden",
    });
  }

  const startScroll = () => {
    gsap.set("#___gatsby", {
      height: "unset",
      overflow: "unset",
    });
  }

  const wheelEvent = (e) => {

    if (e.deltaY > 0) {
      if (!animation1Played.current && !animation.current) {
        tl1.current.play();
      } else if (!animation2Played.current && !animation.current) {
        tl2.current.play();
      } else if (
        animation1Played.current &&
        animation2Played.current &&
        !animation.current
      ) {
        startScroll();
        removeWheelEvent();
        addScrollTopEvent();
      }
    }
    if (e.deltaY < 0) {
      if (animation2Played.current && !animation.current) {
        animation.current = true;
        stopScroll();
        tl2.current.reverse(0);
      } else if (animation1Played.current && !animation.current) {
        animation.current = true;
        tl1.current.reverse(0);
      }
    }
  }

  const touchEndEvent = (e) => {
    let currentTouch = e.changedTouches[0].clientY;

    if (currentTouch < lastTouch.current) {
      if (!animation1Played.current && !animation.current) {
        tl1.current.play();
      } else if (!animation2Played.current && !animation.current) {
        tl2.current.play();
      } else if (
        animation1Played.current &&
        animation2Played.current &&
        !animation.current
      ) {
        startScroll();
        removeWheelEvent();
        addScrollTopEvent();
      }
    }
    if (currentTouch > lastTouch.current) {
      if (animation2Played.current && !animation.current) {
        animation.current = true;
        stopScroll();
        tl2.current.reverse(0);
      } else if (animation1Played.current && !animation.current) {

        animation.current = true;
        tl1.current.reverse(0);
      }
    }
  }

  const touchStartEvent = (e) => {
    lastTouch.current = e.touches[0].clientY;
  }

  const addWheelEvent = () => {
    window.addEventListener('wheel', wheelEvent)
    window.addEventListener('touchstart', touchStartEvent)
    window.addEventListener('touchend', touchEndEvent)
    window.removeEventListener('scroll', scrollTopEvent)
  }

  const removeWheelEvent = () => {
    window.removeEventListener("wheel", wheelEvent);
    window.removeEventListener("touchstart", touchStartEvent);
    window.removeEventListener("touchend", touchEndEvent);
  }

  const scrollTopEvent = (e) => {
    if (window.scrollY === 0) {
      stopScroll();
      addWheelEvent();
    }
  }

  const addScrollTopEvent = () => {
    window.addEventListener("scroll", scrollTopEvent);
  }

  useEffect(() => {

    if (!screen.mobile && background1Width && background1Height && background2Height && background2Width) {
      stopScroll()

      let scroll1Tl
      let scroll2Tl

      if (!tl1.current) {
        scroll1Tl = gsap.timeline({
          paused: true,
          onStart: () => {
            animation.current = true
          },
          onComplete: () => {
            animation.current = false
            animation1Played.current = true
          },
          onReverseComplete: () => {
            animation.current = false
            animation1Played.current = false
          }
        })

        scroll1Tl.to(background1Ref.current, {
          duration: 1.5,
          width: background1Width,
          height: background1Height,
          ease: "circ.inOut"
        }, 0)
        scroll1Tl.to(background2Ref.current, {
          duration: 1.5,
          width: background2Width,
          height: background2Height,
          ease: "circ.inOut"
        }, 0)
        scroll1Tl.to(background3Ref.current, {
          duration: 1.5,
          height: background2Height,
          width: background2Width,
          ease: "circ.inOut"
        }, 0)
        scroll1Tl.to(boxRef.current, {
          duration: 0.5,
          opacity: 0,
        }, 0.7)
        scroll1Tl.to(contentRef.current, {
          duration: 1.5,
          opacity: 0
        }, 0)
        scroll1Tl.call(setSubTitle1Trigger, [true], 0.4)
        scroll1Tl.call(setTitle2Trigger, [true], 0.4)
        tl1.current = scroll1Tl
      }

      if (!tl2.current) {
        scroll2Tl = gsap.timeline({
          paused: true,
          onStart: () => {
            animation.current = true
          },
          onComplete: () => {
            animation2Played.current = true
            animation.current = false
          },
          onReverseComplete: () => {
            animation.current = false
            animation2Played.current = false
          }
        })
        scroll2Tl.fromTo(content2Ref.current, {
          opacity: 1
        }, {
          duration: 1,
          opacity: 0
        }, 0)

        scroll2Tl.to('.sequence', {
          duration: 2,
          objectPosition: imgObjPos,
        }, 1)
        scroll2Tl.fromTo('.sequence', {
          visibility: 'visible'
        }, {
          stagger: 0.033,
          duration: 0.1,
          visibility: 'hidden'
        }, 1)
        scroll2Tl.fromTo(content3Ref.current, {
          opacity: 0
        }, {
          duration: 1,
          opacity: 1
        }, 2)

        scroll2Tl.call(setSubTitle2Trigger, [true], 2.5)
        scroll2Tl.call(setTitle3Trigger, [true], 2.5)
        tl2.current = scroll2Tl
      }

      addWheelEvent()
      return () => {
        if (tl1.current) {
          tl1.current.kill()
        }
        if (tl2.current) {
          tl2.current.kill()
        }
        removeWheelEvent()
        startScroll()
        window.removeEventListener('scroll', scrollTopEvent)
      }

    } else {
      setSubTitle1Trigger(true)
      setTitle2Trigger(true)
      setSubTitle2Trigger(true)
      setTitle3Trigger(true)
      gsap.set(content3Ref.current, {
        opacity: 1
      })
    }

  }, [screen, background1Width, background1Height, background2Height, background2Width]);

  const imageTags = useMemo(() => preload.map((item, index, arr) => {
    return (
      <Img
        className={index !== arr.length - 1 ? "sequence" : "last"}
        zIndex={arr.length - index}
        src={item}
        key={index}
        alt={`image sequence ${index}`}
      />
    );
  }), [preload]);

  return (
    <Wrapper ref={wrapperRef} id="miqroaware-hero">
      <Box
        ref={boxRef}
        src={BoxPNG}
        loading="eager"
        alt="box"
      />

      {!screen.mobile && imageTags}
      <Background1 ref={background1Ref}>
        <Content ref={contentRef}>
          <SubTitle1 ref={subTitleRef}>mIQroAware&trade;</SubTitle1>
          <HR />
          <Title1>{title1TextArray}</Title1>
          <Text>One comprehensive system to detect and report on every major risk for pipelines.</Text>
        </Content>
      </Background1>
      <Background2 ref={background2Ref} />
      <Background3 ref={background3Ref} />

      <Content2 ref={content2Ref}>
        {screen.mobile && <img src={boxImages[1]} alt="box image 1" />}
        <SubTitle2>
          <TextAnimation
            textArray={subTitle2TextArray}
            className="miqroaware-hero-sub-1"
            height={useMedia("1.667vw", "1.667vw", "2.9vw", "6.4vw")}
            trigger={subTitle1Trigger}
          />
        </SubTitle2>
        <Title2>
          <TextAnimation
            textArray={title2TextArray}
            className="miqroaware-hero-title2"
            trigger={title2Trigger}
            height={useMedia("4.167vw", "4.167vw", "7.186vw", "9.6vw")}
          />
        </Title2>
      </Content2>

      <Content3 ref={content3Ref}>
        {screen.mobile && <img className="last" src={boxImages[boxImages.length - 1]} alt="box image 2" />}
        <SubTitle3>
          <TextAnimation
            textArray={subTitle3TextArray}
            className="miqroaware-hero-sub-2"
            height={useMedia("1.667vw", "1.667vw", "2.9vw", "6.4vw")}
            trigger={subTitle2Trigger}
            justifyContent={"flex-end"}
          />
        </SubTitle3>
        <Title3>
          <TextAnimation
            textArray={title3TextArray || []}
            className="miqroaware-hero-title3"
            trigger={title3Trigger}
            height={useMedia("4.167vw", "4.167vw", "7.186vw", "9.6vw")}
            justifyContent={"flex-end"}
          />
        </Title3>
      </Content3>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  background-color: ${colors.black};
  position: relative;
  width: 100vw;
  min-height: 100vh;
  height: 54.722vw;

  ${media.tablet} {
    min-height: unset;
    height: 142.994vw;
  }

  ${media.mobile} {
    min-height: unset;
    height: auto;
    // overflow: hidden;
  }
`;

const Img = styled.img<{ zIndex: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => props.zIndex};

  ${media.tablet} {
    bottom: 0;
    left: 0;
    top: unset;
    object-position: center center;
    object-fit: cover;
    height: 76.713vw;
  }

  ${media.mobile} {
    bottom: 0;
    left: 0;
    top: unset;
    height: 93vw;
    object-position: 75%;

    &.last {
      object-position: 8%;
    }
  }
`;

const Background1 = styled.div`
  position: absolute;
  background-color: ${colors.culturedWhite20};
  left: 0;
  top: 0;
  z-index: 70;

  height: 100%;
  width: 55.208vw;

  ${media.tablet} {
    height: 92.934vw;
    width: 100vw;
  }

  ${media.mobile} {
    position: relative;
    width: 100vw;
    height: 157.333vw;
  }
`;

const Background2 = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 70;
  background-color: ${colors.culturedWhite20};

  width: 100%;
  height: 7.708vw;

  ${media.tablet} {
    height: 142.994vw;
    bottom: 0vw;
    top: unset;
    left: 0vw;
    width: 5.988vw;
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

const Background3 = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 70;
  background-color: ${colors.culturedWhite20};
  width: 100%;
  height: 3.403vw;

  ${media.tablet} {
    height: 142.994vw;
    bottom: 0vw;
    right: 0vw;
    left: unset;
    width: 5.988vw;
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

const Box = styled.img`
  position: absolute;
  z-index: 80;
  left: 0;
  top: 0;

  object-fit: cover;
  width: 100vw;
  min-height: 100vh;
  height: 54.722vw;

  ${media.tablet} {
    width: 100vw;
    object-position: center center;
    object-fit: cover;
    height: 76.713vw;
    min-height: unset;
    top: unset;
    bottom: 0;
  }

  ${media.mobile} {
    bottom: unset;
    left: 0vw;
    top: 125vw;
    height: 93vw;
    min-height: unset;
    object-position: 75%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-top: 8.944vw;
  padding-left: 3.472vw;
  padding-right: 5.694vw;

  ${media.tablet} {
    padding-top: 18.084vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
  }

  ${media.mobile} {
    padding-top: 30.267vw;
    padding-left: 6.667vw;
    padding-right: 5.667vw;
  }
`;

const SubTitle1 = styled.h2`
  color: ${colors.black};
  opacity: 1;

  ${text.desktopXXSHeading}

  ${media.tablet} {
    ${text.tabletXXSHeading}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`;

const HR = styled.hr`
  background-color: ${colors.black};
  height: 1px;
  border: none;
  outline: none;
  width: 100%;

  margin-top: 1.389vw;
  margin-bottom: 1.389vw;

  ${media.tablet} {
    margin-top: 2.395vw;
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    margin-top: 4.533vw;
    margin-bottom: 4.333vw;
  }
`;

const Title1 = styled.h1`
  color: ${colors.black};
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;

  ${text.desktopLHeading}
  width: 43.611vw;
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletLHeading}
    width: 75.21vw;
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    width: 100.333vw;
    margin-bottom: 5vw;
  }
`;

const Text = styled.p`
  color: ${colors.black};
  display: flex;
  flex-direction: column;

  ${text.desktopBodyCopy1}
  width: 22.500vw;

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 38.802vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 100%;
  }
`;

const Content2 = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 69;

  width: 38.194vw;
  left: 11.458vw;
  top: 16.458vw;

  ${media.tablet} {
    width: 65.868vw;
    left: 13.413vw;
    top: 20vw;
  }

  ${media.mobile} {
    height: 145.533vw;
    position: relative;
    width: 100vw;
    top: -32.1vw;
    left: unset;

    img {
      width: 100vw;
      object-fit: cover;
      height: 93vw;
      object-position: 75%;
    }
  }
`;

const Title2 = styled.h2`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;

  ${text.desktopMHeading}

  ${media.tablet} {
    ${text.tabletMHeading}
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-left: 5.6vw;
  }
`;

const SubTitle2 = styled.h3`
  color: ${colors.darkOrange100};
  display: flex;
  flex-direction: column;

  ${text.desktopPetiteHeading}
  margin-bottom: 1.389vw;

  ${media.tablet} {
    ${text.tabletPetiteHeading}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobilePetiteHeading}
    margin-bottom: 5.333vw;
    margin-left: 5.6vw;
  }
`;

const Content3 = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: 0;
  z-index: 69;

  width: 39.167vw;
  right: 11.319vw;
  top: 16.458vw;

  ${media.tablet} {
    width: 67.545vw;
    top: 22.395vw;
    right: 13.413vw;
  }

  ${media.mobile} {
    position: static;
    width: 100vw;
    position: static;

    img {
      width: 100vw;
      object-fit: cover;
      height: 93vw;
      object-position: 75%;

      &.last {
        object-position: 8%;
        transform: scale(1.3);
      }
    }
  }
`;

const SubTitle3 = styled.h3`
  color: ${colors.darkOrange100};
  text-align: right;
  display: flex;
  width: 100%;
  flex-direction: column;

  ${text.desktopPetiteHeading}
  margin-bottom: 1.389vw;

  ${media.tablet} {
    ${text.tabletPetiteHeading}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobilePetiteHeading}
    margin-bottom: 5.333vw;
    margin-right: 6.667vw;
    position: relative;
    z-index: 2;
  }
`;

const Title3 = styled.h2`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100%;
  color: ${colors.culturedWhite60};

  ${text.desktopMHeading}

  ${media.tablet} {
    ${text.tabletMHeading}
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-right: 6.667vw;
    position: relative;
    z-index: 2;
  }
`;
