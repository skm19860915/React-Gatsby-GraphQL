import React from "react";
import styled from "styled-components";
import media from "@styles/media";
import colors from "@styles/colors";
import text from "@styles/text";
import { GatsbyImage } from "gatsby-plugin-image";

type props = {
  tileWrapperRef: any;
  tileData: any;
};

const TileWrapperPart: React.FC<props> = ({tileWrapperRef, tileData}) => {

  return (
    <TileWrapper ref={tileWrapperRef}>
      <TileImg><GatsbyImage alt={tileData.title} image={tileData.photo.gatsbyImageData} imgStyle={{width: '100%', height: '66%'}} /></TileImg>
      <TileSpan><TileNumber>0{tileData.sortNumber}</TileNumber><TileTitle>{tileData.title}</TileTitle></TileSpan>
      <TileText>{tileData.description.description}</TileText>
    </TileWrapper>
  );
};

export default TileWrapperPart;

const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;

  ${media.fullWidth} {
    width: 21.667vw;
    margin-right: 4.167vw;
  }

  ${media.desktop} {
    width: 21.667vw;
    margin-right: 4.167vw;
  }

  ${media.tablet} {
    width: 33.573vw;
    margin-right: 5.995vw;
  }

  ${media.mobile} {
    width: 74.933vw;
    margin-right: 11.733vw;
  }
`;

const TileImg = styled.div`
  object-fit: cover;
  object-position: 50% 50%;
  width: 21.7vw;
  height: 13.3vw;
  margin-bottom: 2.083vw;

  ${media.tablet} {
    width: 33.573vw;
    height: 25.06vw;
    margin-bottom: 3.597vw;
  }

  ${media.mobile} {
    width: 74.933vw;
    height: 55.733vw;
    margin-bottom: 8vw;
  }
`;

const TileSpan = styled.span`
  width: 100%;
  border-top: 1px solid ${colors.jetBlack100};
  border-bottom: 1px solid ${colors.jetBlack100};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.fullWidth} {
    height: 3.333vw;
    margin-bottom: 1.389vw;
  }

  ${media.desktop} {
    height: 3.333vw;
    margin-bottom: 1.389vw;
  }

  ${media.tablet} {
    height: 5.755vw;
    margin-bottom: 2.398vw;
  }

  ${media.mobile} {
    height: 13.333vw;
    margin-bottom: 5.333vw;
  }
`;

const TileNumber = styled.span`
  background-color: ${colors.black};
  color: ${colors.culturedWhite60};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: normal;
  line-height: 100%;
  letter-spacing: -0.04em;

  ${media.fullWidth} {
    width: 2.083vw;
    height: 1.944vw;
    font-size: 1.25vw;
  }

  ${media.desktop} {
    width: 2.083vw;
    height: 1.944vw;
    font-size: 1.25vw;
  }

  ${media.tablet} {
    width: 3.597vw;
    height: 3.357vw;
    font-size: 2.158vw;
  }

  ${media.mobile} {
    width: 8vw;
    height: 7.467vw;
    font-size: 4.8vw;
  }
`;

const TileTitle = styled.h3`
  color: ${colors.black};

  ${text.desktopXXSHeading}
  font-family: Helvetica Neue;

  ${media.tablet} {
    ${text.tabletPetiteHeading}
    font-family: Helvetica Neue;
  }

  ${media.mobile} {
    ${text.mobilePetiteHeading}
    font-family: Helvetica Neue;
  }
`;

const TileText = styled.p`
  color: ${colors.black};

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
  }
`;


