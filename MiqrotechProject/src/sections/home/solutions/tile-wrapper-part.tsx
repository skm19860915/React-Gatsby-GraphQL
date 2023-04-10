import React from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

const TextAnimation = loadable(() => import("@components/TextAnimation"));
type props = {
    tileTrigger: boolean;
    title: string;
    titleHeight: any;
    detail: string;
    detailHeight: any;
};

const TileWrapperPart: React.FC<props> = ({ tileTrigger, title, titleHeight, detail, detailHeight }) => {

  return (
    <TileWrapper>
      <TileTitle>
        <TextAnimation textArray={[() => title]} height={titleHeight} trigger={tileTrigger} className="tile-title" />
      </TileTitle>
      <TileText>
        <TextAnimation textArray={[() => detail]} height={detailHeight} trigger={tileTrigger} className="tile-text" />
      </TileText>
    </TileWrapper>
  );
};

export default TileWrapperPart;

const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    margin-right: 6.806vw;
    margin-bottom: 3.472vw;
    width: 16.667vw;
  }

  ${media.desktop} {
    margin-right: 6.806vw;
    margin-bottom: 3.472vw;
    width: 16.667vw;
  }

  ${media.tablet} {
    margin-right: 8.633vw;
    margin-bottom: 7.194vw;
    width: 25.18vw;
  }

  ${media.mobile} {
    margin-right: 0vw;
    margin-bottom: 14.667vw;
    width: 63.467vw;
  }
`;

const TileTitle = styled.h3`
  color: ${colors.keppel100};
  display: flex;

  ${media.fullWidth} {
    ${text.desktopPetiteHeading}
    margin-bottom: 2.222vw;
  }

  ${media.desktop} {
    ${text.desktopPetiteHeading}
    margin-bottom: 2.222vw;
  }

  ${media.tablet} {
    ${text.tabletPetiteHeading}
    margin-bottom: 3.837vw;
  }

  ${media.mobile} {
    ${text.mobilePetiteHeading}
    margin-bottom: 8.533vw;
  }
`;

const TileText = styled.p`
  color: ${colors.culturedWhite60};
  display: flex;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`;




