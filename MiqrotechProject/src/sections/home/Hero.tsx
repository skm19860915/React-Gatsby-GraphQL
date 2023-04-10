import React, { useRef } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import colors from "@styles/colors";
import media from "@styles/media";
import BackgroundPart from "./hero/background-part";
import ContentPart from "./hero/content-part";

const Animation = loadable(() => import("@components/Animation"));

type props = {
  txt1: string[];
  heroData: any;
};

const Hero: React.FC<props> = ({ txt1, heroData }) => {
  const wrapperRef = useRef(null);

  return (
    <Wrapper ref={wrapperRef}>
      <AnimationWrapper>
        <Animation />
        <Gradient />
        <Gradient2/>
      </AnimationWrapper>
      <Top>
        <BackgroundPart imgData={heroData} />
        <ContentPart title={txt1} />
      </Top>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  position: relative;
  width: 100vw;
`;

const AnimationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vw;
`

const Top = styled.div`
  position: relative;
  height: 54.722vw;

  ${media.tablet} {
    height: 142.994vw;
  }

  ${media.mobile} {
    height: 216.533vw;
  }
`
const Gradient = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(${colors.black}, rgba(0, 0, 0, 0));
  height: 50%;

  ${media.tablet} {
    height: 40%;
  }
`;

const Gradient2 = styled(Gradient)`
  bottom: 0;
  top: unset;
  height: 50%;
  background: linear-gradient(rgba(0, 0, 0, 0), ${colors.black});
`
