import React from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";
import colors from "@styles/colors";
import text from "@styles/text";
import CardContainerPart from "./values/card-container-part";

const Animation = loadable(() => import("@components/Animation"));
type props = {
  valueData: any;
};

const Values: React.FC<props> = ({ valueData }) => {

  return (
    <Wrapper>
      <ValuesBG >
        <StaticImage
          src={'../../images/png/values.png'} 
          alt="Value"
          placeholder="blurred"
          style={{width: '100%', height: '100%'}}
        />
      </ValuesBG>
      <Title>Our core values</Title>
      <CardContainerPart infos={valueData} />
      <AnimationWrapper>
        <Gradient2 />
        <Animation />
      </AnimationWrapper>
    </Wrapper>
  );
};

export default Values;

const Wrapper = styled.section`
  background-color: ${colors.culturedWhite40};
  position: relative;

  ${media.fullWidth} {
    padding-top: 20.278vw;
    padding-left: 3.542vw;
    padding-right: 6.458vw;
    padding-bottom: 22vw;
  }

  ${media.desktop} {
    padding-top: 20.278vw;
    padding-left: 3.542vw;
    padding-right: 6.458vw;
    padding-bottom: 22vw;
  }

  ${media.tablet} {
    padding-top: 36.407vw;
    padding-left: 13.413vw;
    padding-right: 13.413vw;
    padding-bottom: 12.695vw;
  }

  ${media.mobile} {
    padding-top: 65.6vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 64.267vw;
  }
`;

const ValuesBG = styled.div`
  position: absolute;

  ${media.fullWidth} {
    top: 5.528vw;
    left: -2vw;
    width: 67.361vw;
    height: 15.889vw;
  }

  ${media.desktop} {
    top: 5.528vw;
    left: -2vw;
    width: 67.361vw;
    height: 15.889vw;
  }

  ${media.tablet} {
    top: 8vw;
    left: 0vw;
    width: 94.168vw;
    height: 23.198vw;
  }

  ${media.mobile} {
    top: 8vw;
    left: 0vw;
    width: 94.168vw;
    height: 23.198vw;
  }
`;

const Title = styled.h2`
  position: absolute;
  z-index: 2;
  color: ${colors.black};

  ${media.fullWidth} {
    ${text.desktopXLHeading};
    top: 10.556vw;
    left: 11.389vw;
  }

  ${media.desktop} {
    ${text.desktopXLHeading};
    top: 10.556vw;
    left: 11.389vw;
  }

  ${media.tablet} {
    ${text.tabletXLHeading}
    top: 15.808vw;
    left: 13.054vw;
  }

  ${media.mobile} {
    ${text.mobileMHeading}
    top: 19.733vw;
    left: 6.667vw;
  }
`;

const AnimationWrapper = styled.div`
  position: absolute;
  z-index: 0;
  width: 100vw;
  left: 0;

  ${media.fullWidth} {
    top: 65.792vw;
    height: 53.681vw;
  }

  ${media.desktop} {
    top: 65.792vw;
    height: 53.681vw;
  }

  ${media.tablet} {
    top: 190.792vw;
    height: 53.681vw;
  }

  ${media.mobile} {
    bottom: 0
    height: 160vw;
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

