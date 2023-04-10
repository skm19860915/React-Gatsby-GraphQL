import React, { useContext } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import { OpenFormContext } from "@components/Layout";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));
const TextAnimation = loadable(() => import('@components/TextAnimation'));

type props = {
  title: string;
  titleTrigger: boolean;
  buttonRef: any;
};

const ContentPart: React.FC<props> = ({ title, titleTrigger, buttonRef }) => {
  const openForm = useContext(OpenFormContext);

  return (
    <Content>
        <Title>
            <TextAnimation
                textArray={title}
                height={useMedia('5.556vw', '5.556vw', '4.317vw', '7.467vw')}
                className="partner-cta-title"
                trigger={titleTrigger}
            />
        </Title>
        <ButtonWrapper ref={buttonRef}>
            <PrimaryButton
                text="Partner with our Team"
                textColor={colors.black}
                backgroundColor={colors.keppel100}
                hoverColor={colors.keppel60}
                width={useMedia('fit-content', 'fit-content', 'fit-content', '100%')}
                onClick={() => openForm(true)}
            />
        </ButtonWrapper>
    </Content>
  );
};

export default ContentPart;

const Title = styled.h2`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    ${text.desktopXLHeading}
    margin-bottom: 3.8vw;
  }

  ${media.desktop} {
    ${text.desktopXLHeading}
    margin-bottom: 3.8vw;
  }

  ${media.tablet} {
    ${text.tabletXSHeading}
    margin-bottom: 4.317vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-bottom: 10.667vw;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${colors.black};

  ${media.fullWidth} {
    width: 65.1vw;
    height: 40.2vw;
    padding: 5.3vw 3.5vw 10.4vw 7.8vw;
  }

  ${media.desktop} {
    width: 65.1vw;
    height: 40.2vw;
    padding: 5.3vw 3.5vw 10.4vw 7.8vw;
  }

  ${media.tablet} {
    width: 56.595vw;
    height: 37.050vw;
    padding-top: 6.475vw;
    padding-left: 7.554vw;
    padding-bottom: 6.355vw;
    padding-right: 5.995vw;
    bottom: unset;
    top: 21.942vw;
  }

  ${media.mobile} {
    top: 106vw;
    width: 100%;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-top: 13.333vw;
  }
`;

const ButtonWrapper = styled.div`
  opacity: 0;
`