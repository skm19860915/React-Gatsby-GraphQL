import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import useMedia from "@hooks/useMedia";
import media from "@styles/media";
import colors from "@styles/colors";
import TopSectionPart from "./readmore/top-section-part";
import StorySectionPart from "./readmore/story-section-part";

type Props = {
  storyData: any;
  txt1: string;
};

const ReadMore: React.FC<Props> = ({ storyData, txt1 }) => {
  const [triggerTitle, setTriggerTitle] = useState(false);
  const wrapperRef = useRef(null);
  const hrRef = useRef(null);
  const tl2Start = useMedia("top-=30% top", "top-=30% top", "top-=200% top", "top-=90% top");

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: tl2Start
      },
    });
    tl.to(hrRef.current, {
      width: "100%",
    });
    tl.call(setTriggerTitle, [true], 0.1);

    tl.to(
      ".featured_story0",
      {
        duration: 1.5,
        opacity: 1,
      },
      0.2
    );
    tl.to(
      ".featured_story1",
      {
        duration: 1.5,
        opacity: 1,
      },
      0.4
    );
    tl.to(
      ".featured_story2",
      {
        duration: 1.5,
        opacity: 1,
      },
      0.6
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <HR ref={hrRef} />
      <TopSectionPart title={txt1} titleTrigger={triggerTitle} />
      <StorySectionPart storyInfos={storyData} />
    </Wrapper>
  );
};

export default ReadMore;

const Wrapper = styled.section`
  background-color: ${colors.black};
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${media.fullWidth} {
    padding-top: 9.653vw;
    padding-bottom: 7.083vw;
    padding-left: 11.319vw;
    padding-right: 11.319vw;
  }

  ${media.desktop} {
    padding-top: 9.653vw;
    padding-bottom: 7.083vw;
    padding-left: 11.319vw;
    padding-right: 11.319vw;
  }

  ${media.tablet} {
    padding-top: 14.628vw;
    padding-left: 5.995vw;
    padding-right: 5.995vw;
    padding-bottom: 14.388vw;
  }

  ${media.mobile} {
    padding-top: 11.2vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 21.333vw;
  }
`;

const HR = styled.hr`
  width: 40%;
  height: 1px;
  background: ${colors.culturedWhite60};
  margin: 0px;
  border: none;

  ${media.mobile} {
    margin-bottom: 8vw;
  }
`;
