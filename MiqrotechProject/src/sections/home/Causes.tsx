import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useDrag } from "react-use-gesture";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import { ScreenContext } from "@components/Layout";
import media from "@styles/media";
import colors from "@styles/colors";
import ContentPart from "./causes/content-part";
import BackgroundPart from "./causes/background-part";
import CarouselPart from "./causes/carousel-part";

const Animation = loadable(() => import("@components/Animation"));

type props = {
  txt1: string[];
  txt2: string;
  txt3: string;
  causeData: any;
};

const Causes: React.FC<props> = ({ txt1, txt2, txt3, causeData }) => {

  const [index, setIndex] = useState(0);
  const [triggerTitle1, setTriggerTitle1] = useState(false);
  const [triggerText1, setTriggerText1] = useState(false);
  const [triggerTitle2, setTriggerTitle2] = useState(false);

  const wrapperRef = useRef(null);
  const tileContainerRef = useRef(null);
  const imgRef = useRef(null);
  const carouselRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const screen = useContext(ScreenContext);
  const tileRefs = causeData.map(item => useRef(null));
  console.log("================")
  let start1 = useMedia("top-=300 top", "top-=300 top", "top-=60% top", "");
  let start2 = useMedia("top-=200 top", "top-=200 top", "top-=100% top", "");
  useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: start1,
      },
    });
    tl.to(imgRef.current, {
      duration: 1,
      height: "100%",
      ease: "circ.inOut",
    });
    tl.call(setTriggerTitle1, [true], 0.8);
    tl.call(setTriggerText1, [true], 1.2);

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: carouselRef.current,
        start: start2,
      },
    });

    tl2.to(buttonContainerRef.current, {
      opacity: 1,
      duration: 1,
    });
    tl2.call(setTriggerTitle2, [true], 0);

    {
      tileRefs.map((ref, i) =>
      (
        tl2.to(
          ref.current,
          {
            duration: 1,
            opacity: 1,
          },
          1 + i * 0.2
        )
      ))
    }

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top-=200 top",
        scrub: true,
      },
    });
    tl3.to(imgRef.current, {
      scale: "1.5",
    });

    return () => {
      tl.kill();
      tl2.kill();
      tl3.kill();
    };

  }, []);

  let value = useMedia("-25.834", "-25.834", "-39.568", "-86.666");
  let cutOff = useMedia(2, 2, 3, 4);

  const handleNext = () => {
    let newIndex = index;

    if (screen.desktop || screen.fullWidth) {
      newIndex = cutOff
    }
    else if (index < cutOff) {
      newIndex = index + 1;
    }

    setIndex(newIndex);
    let left = newIndex * value;
    let leftString = `${left}vw`;

    gsap.to(tileContainerRef.current, {
      duration: 1,
      left: leftString,
    });

  }

  const handlePrev = () => {
    let newIndex = index

    if (screen.desktop || screen.fullWidth) {
      newIndex = 0
    }
    else if (index > 0) {
      newIndex = index - 1;
    }

    setIndex(newIndex);
    let left = newIndex * value;
    let leftString = `${left}vw`;

    gsap.to(tileContainerRef.current, {
      duration: 1,
      left: leftString,
    });

  }

  const bind = useDrag(
    (state) => {
      if (!screen.mobile) {
        if (state.direction[0] < 0) {
          handleNext();
        }
        if (state.direction[0] > 0) {
          handlePrev();
        }
      }
    },
    { threshold: useMedia(10, 10, 50, 8) }
  );

  return (
    <Wrapper ref={wrapperRef}>
      <ContentPart title={txt1} detail={txt2} titleTrigger={triggerTitle1} detailTrigger={triggerText1} />
      <Gradient1 />
      <BackgroundPart bgRef={imgRef} />
      <AnimationWrapper>
        <Gradient2 />
        <Animation />
      </AnimationWrapper>
      <CarouselPart contentRef={carouselRef} title={txt3} titleTrigger={triggerTitle2} containerRef1={buttonContainerRef}
        prevEvent={handlePrev} nextEvent={handleNext} i={index} offSet={cutOff} containerRef2={tileContainerRef}
        bindData={bind} carouselInfos={causeData} tileRefs={tileRefs} />
    </Wrapper>
  );
};

export default Causes;

const Wrapper = styled.section`
  width: 100%;
  background-color: ${colors.culturedWhite40};
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${media.fullWidth} {
    padding-left: 11.389vw;
    padding-top: 13.472vw;
    padding-bottom: 11.389vw;
  }

  ${media.desktop} {
    padding-left: 11.389vw;
    padding-top: 13.472vw;
    padding-bottom: 11.389vw;
  }

  ${media.tablet} {
    padding-left: 5.995vw;
    padding-top: 13.669vw;
    padding-bottom: 13.549vw;
  }

  ${media.mobile} {
    padding-left: 6.667vw;
    padding-top: 6.667vw;
    padding-bottom: 26.667vw;
    height: 500vw;
  }
`;

const AnimationWrapper = styled.div`
  position: absolute;
  z-index: 0;
  width: 100vw;
  left: 0;

  ${media.fullWidth} {
    top: 44.792vw;
    height: 53.681vw;
  }

  ${media.desktop} {
    top: 44.792vw;
    height: 53.681vw;
  }

  ${media.tablet} {
    top: 66.792vw;
    height: 53.681vw;
  }
`;

const Gradient1 = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  background: linear-gradient(
    180deg,
    ${colors.culturedWhite100} 32.77%,
    rgba(248, 248, 248, 0) 95.59%
  );

  width: 35.833vw;
  height: 45.278vw;

  ${media.tablet} {
    width: 34.173vw;
    height: 53.357vw;
  }

  ${media.mobile} {
    width: 70.4vw;
    height: 118.667vw;
  }
`;

const Gradient2 = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(
    ${colors.culturedWhite40},
    rgba(224, 224, 224, 0.8),
    ${colors.culturedWhite40}
  );
  height: 100%;
`;