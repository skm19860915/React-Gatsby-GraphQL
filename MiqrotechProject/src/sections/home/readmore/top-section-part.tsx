import React from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));
const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  title: string;
  titleTrigger: boolean;
};

const TopSectionPart: React.FC<props> = ({ title, titleTrigger }) => {

  return (
    <TopSection>
        <Title>
            <TextAnimation
            textArray={title}
            className="readmore-title"
            height={useMedia("5.556vw", "5.556vw", "5.755vw", "7.467vw")}
            trigger={titleTrigger}
            />
        </Title>
        <a href="/blog">
            <PrimaryButton
            text="See More Articles"
            textColor={colors.culturedWhite}
            hoverColor={colors.black}
            backgroundColor={colors.black}
            padding
            />
        </a>
    </TopSection>
  );
};

export default TopSectionPart;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  a {
    text-decoration: none;
  }
  ${media.fullWidth} {
    padding-top: 2.8vw;
    margin-bottom: 5.6vw;
  }

  ${media.desktop} {
    padding-top: 2.8vw;
    margin-bottom: 5.6vw;
  }

  ${media.tablet} {
    padding-top: 4.796vw;
    margin-bottom: 9.233vw;
  }

  ${media.mobile} {
    flex-direction: column;
    margin-bottom: 21.333vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite100};
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    ${text.desktopXLHeading};
    width: 47.4vw;
  }

  ${media.desktop} {
    ${text.desktopXLHeading};
    width: 47.4vw;
  }

  ${media.tablet} {
    ${text.tabletSHeading};
    width: 46.643vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    width: 66.667vw;
    margin-bottom: 5.333vw;
  }
`;