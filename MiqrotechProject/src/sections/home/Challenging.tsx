import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import useMedia from "@hooks/useMedia";

import colors from "@styles/colors";
import media from "@styles/media";

import ContentPart from "./challenging/content-part";
import BackgroundPart from "./challenging/background-part";

type props = {
  txt1: string;
  txt2: string;
};

const Challenging: React.FC<props> = ({ txt1, txt2 }) => {

  const [titleTrigger, setTitleTrigger] = useState(false);
  const [textTrigger, setTextTrigger] = useState(false);

  const wrapperRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  const tlStart = useMedia("top-=200 top", "top-=200 top", "top-=110% top", "");
  const imgZoomStart = useMedia("top-=200 top", "top-=200 top", "top-=80% top");

  useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: tlStart,
        },
      });
      tl.to(
        image1Ref.current,
        {
          duration: 0.8,
          height: "100%",
          ease: "circ.inOut",
        },
        0
      );
      tl.to(
        image2Ref.current,
        {
          duration: 1,
          height: "100%",
          ease: "circ.inOut",
        },
        0.5
      );
      tl.call(setTitleTrigger, [true], 0.5);
      tl.call(setTextTrigger, [true], 0.7);

      const imgZoom = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: imgZoomStart,
          scrub: true,
        },
      });
      imgZoom.to(
        image1Ref.current,
        {
          scale: "1.2",
        },
        0
      );
      imgZoom.to(
        image2Ref.current,
        {
          scale: "1.2",
        },
        0
      );

      return () => {
        tl.kill();
        imgZoom.kill();
      };
    
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <ContentPart title={txt1} detail={txt2} titleTrigger={titleTrigger} detailTrigger={textTrigger} />
      <BackgroundPart imageRef1={image1Ref} imageRef2={image2Ref} />
    </Wrapper>
  );
};

export default Challenging;

const Wrapper = styled.section`
  width: 100%;
  background-color: ${colors.black};
  position: relative;
  box-sizing: border-box;

  ${media.fullWidth} {
    padding-top: 13.264vw;
    padding-left: 11.319vw;
    padding-bottom: 51.111vw;
  }

  ${media.desktop} {
    padding-top: 13.264vw;
    padding-left: 11.319vw;
    padding-bottom: 51.111vw;
  }

  ${media.tablet} {
    padding-top: 17.266vw;
    padding-left: 5.995vw;
    padding-bottom: 39.688vw;
  }

  ${media.mobile} {
    padding-top: 164.8vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 21.333vw;
  }
`;
