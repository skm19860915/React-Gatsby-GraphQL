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
  title: string;
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
            className="challenging-title"
            height={useMedia("5.556vw", "5.556vw", "5.755vw", "12.800vw")}
            trigger={titleTrigger}
            />
        </Title>
        <Text>
            <TextAnimation
            textArray={detail}
            className="challenging-text"
            height={useMedia("10.417vw", "10.417vw", "15.827vw", "32vw")}
            trigger={detailTrigger}
            />
        </Text>
        <PrimaryButton
            backgroundColor={colors.keppel100}
            textColor={colors.black}
            text="About our Team"
            width={useMedia("fit-content", "fit-content", "fit-content", "100%")}
            onClick={() => navigate('/about')}
            hoverColor={colors.keppel60}
        />
    </Content>
  );
};

export default ContentPart;

const Title = styled.h2`
  color: ${colors.culturedWhite100};
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    ${text.desktopXLHeading}
    width: 34.722vw;
    margin-bottom: 2.778vw;
  }

  ${media.desktop} {
    ${text.desktopXLHeading}
    width: 34.722vw;
    margin-bottom: 2.778vw;
  }

  ${media.tablet} {
    ${text.tabletSHeading}
    width: 38.010vw;
    margin-bottom: 2.398vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    width: 84.533vw;
    margin-bottom: 5.333vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite100};
  display: flex;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    width: 24.306vw;
    margin-bottom: 2.778vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    width: 24.306vw;
    margin-bottom: 2.778vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 44.365vw;
    margin-bottom: 4.796vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    width: 84.533vw;
    margin-bottom: 8vw;
  }
`;

const Content = styled.div`
`;