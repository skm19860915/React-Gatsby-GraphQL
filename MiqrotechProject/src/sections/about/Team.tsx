import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import media from "@styles/media";
import colors from "@styles/colors";
import useMedia from "@hooks/useMedia";
import ContentPart from "./team/content-part";
import BackgroundPart from "./team/background-part";

type props = {
  txt1: string;
  txt2: string;
};

const Team: React.FC<props> = ({ txt1, txt2 }) => {
  const [triggerTitle, setTriggerTitle] = useState(false);
  const [triggerText, setTriggerText] = useState(false);

  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  const tlStart = useMedia("top-=40% top", "top-=40% top", "top-=80% top", "top-=40% top");

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: tlStart,
      },
    });
    tl.to(imgRef.current, {
      duration: 0.8,
      height: "100%",
      ease: "circ.inOut",
    });
    tl.call(setTriggerTitle, [true], 0);
    tl.call(setTriggerText, [true], 0.2);

    const imgZoom = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top-=40% top",
        scrub: true,
      },
    });
    imgZoom.to(imgRef.current, {
      scale: "1.2",
    });

    return () => {
      tl.kill();
    };
    
  }, [imgRef, wrapperRef, tlStart, setTriggerTitle, setTriggerText]);

  return (
    <Wrapper ref={wrapperRef}>
      <ContentPart title={txt1} titleTrigger={triggerTitle} text={txt2} textTrigger={triggerText} />
      <BlackBlock />
      <BackgroundPart imageRef={imgRef} />
    </Wrapper>
  );
};

export default Team;

const Wrapper = styled.section`
  background-color: ${colors.culturedWhite40};
  position: relative;

  ${media.fullWidth} {
    padding-top: 12.431vw;
    padding-left: 11.319vw;
    padding-bottom: 12.292vw;
  }

  ${media.desktop} {
    padding-top: 12.431vw;
    padding-left: 11.319vw;
    padding-bottom: 12.292vw;
  }

  ${media.tablet} {
    padding-top: 16.168vw;
    padding-left: 5.988vw;
    padding-bottom: 19.88vw;
  }

  ${media.mobile} {
    padding-top: 133.067vw;
    padding-left: 6.667vw;
    padding-bottom: 47.733vw;
  }
`;

const BlackBlock = styled.div`
  background-color: ${colors.black};
  position: absolute;
  top: 0vw;
  right: 0vw;

  ${media.fullWidth} {
    width: 26.181vw;
    height: 37.361vw;
  }

  ${media.desktop} {
    width: 26.181vw;
    height: 37.361vw;
  }

  ${media.tablet} {
    width: 26.707vw;
    height: 40.24vw;
  }

  ${media.mobile} {
    width: 47.2vw;
    height: 81.333vw;
  }
`;