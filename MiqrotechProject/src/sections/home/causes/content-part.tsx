import React from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import { navigate } from "gatsby";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));
const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  title: string[];
  detail: string;
  titleTrigger: boolean;
  detailTrigger: boolean;
};

const ContentPart: React.FC<props> = ({ title, detail, titleTrigger, detailTrigger }) => {

  return (
    <Content>
        <Title>
            <TextAnimation
            textArray={title}
            className="causes-title-1"
            height={useMedia("4.167vw", "4.167vw", "5.755vw", "9.600vw")}
            trigger={titleTrigger}
            />
        </Title>
        <Text>
            <TextAnimation
            textArray={detail}
            className="causes-text-1"
            height={useMedia("13.333vw", "13.333vw", "24.103vw", "37.333vw")}
            trigger={detailTrigger}
            />
        </Text>
        <PrimaryButton
            backgroundColor={colors.black}
            textColor={colors.white}
            text="Learn more"
            width={useMedia("fit-content", "fit-content", "fit-content", "100%")}
            onClick={() => navigate("/miqroaware")}
        />
    </Content>
  );
};

export default ContentPart;

const Title = styled.h2`
  color: ${colors.black};
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    ${text.desktopMHeading}
    margin-bottom: 2.778vw;
    width: 36.111vw;
  }

  ${media.desktop} {
    ${text.desktopMHeading}
    margin-bottom: 2.778vw;
    width: 36.111vw;
  }

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-bottom: 3.597vw;
    width: 50.763vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-bottom: 5.333vw;
    width: 86.667vw;
  }
`;

const Text = styled.p`
  color: ${colors.black};
  display: flex;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    width: 25.694vw;
    margin-bottom: 2.778vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    width: 25.694vw;
    margin-bottom: 2.778vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 44.365vw;
    margin-bottom: 4.796vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    width: 86.667vw;
    margin-bottom: 8vw;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 5;

  ${media.mobile} {
    position: absolute;
    top: 143.2vw;
    left: 6.667vw;
  }
`;