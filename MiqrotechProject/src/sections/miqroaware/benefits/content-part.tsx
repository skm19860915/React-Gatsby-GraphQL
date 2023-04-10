import React from "react";
import styled from "styled-components";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

type props = {
  benefit: any;
};

const MaximizeSVG = () => {
  return (
    <SVG className="svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="arrow" style={{ transformOrigin: "6px 3px" }}>
        <path d="M20 4H28V12" stroke={colors.culturedWhite100} strokeWidth="1.33333"/>
        <path d="M27.666 4L18.666 13" stroke={colors.culturedWhite100} strokeWidth="1.33333"/>
      </g>
      <g className="arrow" style={{ transformOrigin: "6px 3px" }}>
        <path d="M12 28H4V20" stroke={colors.culturedWhite100} strokeWidth="1.33333"/>
        <path d="M4 27.6667L13 18.6667" stroke={colors.culturedWhite100} strokeWidth="1.33333"/>
      </g>
    </SVG>
  );
};

const ContentPart: React.FC<props> = ({ benefit }) => {
  const svgPath = benefit.svgImage.file.url;
  const titleArr = benefit.title.split(' ');
  const textArr = benefit.description.description.split('\n\n');

  return (
    <>
      <Img className="image" src={svgPath} alt={titleArr[0]} />
      <Content className="content">
        <ItemTitle className="title">{titleArr[0]}{"\n"}{titleArr[1]}</ItemTitle>
        <Text className="text">{textArr[0]}</Text>
        <Text className="text secondary">{textArr[1]}</Text>
        <Text className="text secondary">{textArr[2] == null ? '' : textArr[2]}</Text>
      </Content>
      <MaximizeSVG />
    </>
  );
};

export default ContentPart;

const Img = styled.img`
  position: absolute;

  width: 10.764vw;
  height: 10.764vw;
  top: 4.514vw;
  left: 2.778vw;

  ${media.tablet} {
    width: 18.563vw;
    height: 18.563vw;
    top: 8.503vw;
    left: 4.79vw;
  }

  ${media.mobile} {
    width: 41.333vw;
    height: 41.333vw;
    top: 17.333vw;
    left: 10.667vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;

  left: 2.778vw;
  top: 19.167vw;
  width: 16.944vw;

  ${media.tablet} {
    left: 4.79vw;
    top: 33.054vw;
    width: 29.22vw;
  }

  ${media.mobile} {
    left: 10.667vw;
    top: 73.6vw;
    width: 69.6vw;
  }
`;

const ItemTitle = styled.h4`
  color: ${colors.culturedWhite100};
  white-space: pre-wrap;

  ${text.desktopXSHeading}
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletXSHeading}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-bottom: 5.333vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite100};

  &.secondary {
    display: none;
    opacity: 0;
  }

  ${text.desktopBodyCopy2}
  margin-bottom: 1.389vw;

  ${media.tablet} {
    ${text.tabletBodyCopy2}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    margin-bottom: 5.333vw;
    opacity: 0;
  }
`;

const SVG = styled.svg`
  position: absolute;
  height: auto;
  cursor: pointer;

  left: 2.778vw;
  bottom: 2.778vw;
  width: 2.222vw;

  ${media.tablet} {
    width: 3.832vw;
    bottom: 7.186vw;
    left: 4.79vw;
  }

  ${media.mobile} {
    width: 8.533vw;
    bottom: 16vw;
    left: 10.667vw;
  }
`;