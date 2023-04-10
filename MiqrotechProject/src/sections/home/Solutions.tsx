import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import colors from "@styles/colors";
import media from "@styles/media";
import BackgroundPart from "./solutions/background-part";
import ContentPart from "./solutions/content-part";

type props = {
  txt1: string;
  solutionData: any;
};

const Solutions: React.FC<props> = ({ txt1, solutionData }) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);

  const [triggerTitle, setTriggerTitle] = useState(false);

  useEffect(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top-=60% top",
        },
      });
      
      tl.to(contentRef.current, {
        duration: 0.2,
        width: "100%",
        onComplete: () => {
          setTriggerTitle(true);
        },
      });

      return () => {
        tl.kill();
      };
  }, []);

  return (
    <Wrapper id="solutions-section" ref={wrapperRef}>
      <BackgroundPart />
      <ContentPart contentRef={contentRef} titleTrigger={triggerTitle} title={txt1} contentList={solutionData}/>
    </Wrapper>
  );
};

export default Solutions;

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  background-color: ${colors.black};
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  ${media.fullWidth} {
    padding-left: 11.319vw;
    padding-right: 11.319vw;
    padding-top: 9.653vw;
    padding-bottom: 5.556vw;
  }

  ${media.desktop} {
    padding-left: 11.319vw;
    padding-right: 11.319vw;
    padding-top: 9.653vw;
    padding-bottom: 5.556vw;
  }

  ${media.tablet} {
    padding-left: 5.995vw;
    padding-right: 5.995vw;
    padding-top: 19.185vw;
    padding-bottom: 14.388vw;
  }

  ${media.mobile} {
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-top: 26.667vw;
    padding-bottom: 9.6vw;
  }
`;