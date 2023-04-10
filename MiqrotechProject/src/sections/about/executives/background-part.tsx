import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";

type props = {
  wrapperRef: any;
  txt: string[];
  titleTrigger: boolean;
  execs: any;
};

const TextAnimation = loadable(() => import("@components/TextAnimation"));

const BackgroundPart: React.FC<props> = ({ wrapperRef, txt, titleTrigger, execs }) => {
  const textHeight = useMedia("4.861vw", "4.861vw", "8.383vw", "12.800vw");

  return (
    <Wrapper ref={wrapperRef} id="executives">
      <Accent>
        <StaticImage src={'../../../images/png/accentBG.png'} alt="gradient" placeholder="blurred" style={{width: '100%', height: '100%'}} />
      </Accent>
      <Title>
        <TextAnimation textArray={txt || []} trigger={titleTrigger} className="about-executives" height={textHeight} />
      </Title>
      <CardContainer>{execs}</CardContainer>
    </Wrapper>
  );
};

export default BackgroundPart;

const Wrapper = styled.section`
  background-color: ${colors.black};
  position: relative;

  ${media.fullWidth} {
    padding-top: 12.5vw;
    padding-left: 11.319vw;
    padding-bottom: 11.875vw;
  }

  ${media.desktop} {
    padding-top: 12.5vw;
    padding-left: 11.319vw;
    padding-bottom: 11.875vw;
  }

  ${media.tablet} {
    padding-top: 15.449vw;
    padding-left: 13.533vw;
    padding-bottom: 12.455vw;
  }

  ${media.mobile} {
    padding-top: 29.067vw;
    padding-left: 6.667vw;
    padding-bottom: 45.867vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    ${text.desktopLHeading}
    width: 66.736vw;
    margin-bottom: 6.944vw;
  }

  ${media.desktop} {
    ${text.desktopLHeading}
    width: 66.736vw;
    margin-bottom: 6.944vw;
  }

  ${media.tablet} {
    ${text.tabletLHeading}
    width: 66.736vw;
    margin-bottom: 13.054vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    width: 86.667vw;
    margin-bottom: 21.333vw;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;

  ${media.fullWidth} {
    padding-left: 15.694vw;
  }

  ${media.desktop} {
    padding-left: 15.694vw;
  }

  ${media.tablet} {
    padding-left: 0vw;
  }

  ${media.mobile} {
    flex-direction: column;
    padding-left: 0vw;
  }
`;

const Accent = styled.div`
  position: absolute;

  ${media.fullWidth} {
    transform: rotate(-67deg) scale(1, -1);
    width: 61.181vw;
    height: 61.181vw;
    top: -12vw;
    right: -8vw;
  }

  ${media.desktop} {
    transform: rotate(-67deg) scale(1, -1);
    width: 61.181vw;
    height: 61.181vw;
    top: -12vw;
    right: -8vw;
  }

  ${media.tablet} {
    transform: rotate(-25deg) scale(1, -1);
    width: 84.91vw;
    height: 84.91vw;
    top: -12vw;
    right: -23vw;
  }
`;
