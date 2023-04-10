import React, { useContext } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import { OpenFormContext } from "@components/Layout";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));
const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  titleText: string[];
  detailText: string;
  titleTrigger: boolean;
  detailTrigger: boolean;
};

const ContentPart: React.FC<props> = ({ titleText, detailText, titleTrigger, detailTrigger }) => {
  const openForm = useContext(OpenFormContext);

  return (
    <Content>
        <Title>
            <TextAnimation
                textArray={titleText || []}
                height={useMedia("4.167vw", "4.167vw", "5.749vw", "12.8vw")}
                className="hero-title-2"
                trigger={titleTrigger}
            />
        </Title>
        <Text>
            <TextAnimation
                textArray={detailText}
                height={useMedia("12.639vw", "15vw", "17.246vw", "70.667vw")}
                className="hero-text"
                trigger={detailTrigger}
            />
        </Text>
        <PrimaryButton
            backgroundColor={colors.keppel100}
            hoverColor={colors.keppel60}
            text="Request a Demo"
            textColor={colors.black}
            width={useMedia("fit-content", "fit-content", "fit-content", "100%")}
            onClick={() => openForm(true)}
        />
    </Content>
  );
};

export default ContentPart;

const Content = styled.div`
  position: absolute;
  z-index: 5;
  opacity: 1;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), ${colors.black} 90%);
  box-sizing: border-box;

  width: 55.556vw;
  height: 45.069vw;
  left: 0vw;
  top: 16.597vw;
  padding-top: 7.708vw;
  padding-left: 11.458vw;
  padding-right: 2.986vw;

  ${media.tablet} {
    left: 0;
    top: 20.838vw;
    width: 56.527vw;
    height: 66.946vw;
    padding-left: 5.749vw;
    padding-right: 5.749vw;
    background-image: none;
    background-color: ${colors.black};
  }

  ${media.mobile} {
    left: 6.667vw;
    top: 32vw;
    width: 86.667vw;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    background-image: none;
    background-color: ${colors.black};
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite60};
  margin: 0px;
  display: flex;
  flex-direction: column;

  ${text.desktopMHeading}
  width: 48.111vw;
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletSHeading}
    width: 80.501vw;
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    width: 100%;
    margin-bottom: 8vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite60};
  display: flex;

  ${text.desktopBodyCopy1}
  width: 30.694vw;
  margin-bottom: 3.125vw;

  ${media.tablet} {
    ${text.tabletSmallBody}
    width: 44.365vw;
    margin-bottom: 5vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 100%;
    margin-bottom: 5vw;
  }
`;
