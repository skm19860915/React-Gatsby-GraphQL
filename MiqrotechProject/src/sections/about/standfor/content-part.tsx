import React from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
    title: string;
    text: string;
    titleTrigger: boolean;
    textTrigger: boolean;
};

const ContentPart: React.FC<props> = ({ title, titleTrigger, text, textTrigger }) => {
    const titleHeight = useMedia("4.861vw", "4.861vw", "7.186vw", "16vw");
    const textHeight = useMedia("10.417vw", "10.417vw", "17.605vw", "42.933vw");
    
    return (
        <Content>
            <Title><TextAnimation textArray={title} className="about-standfor-title" height={titleHeight} trigger={titleTrigger}/></Title>
            <Text><TextAnimation textArray={text} className="about-standfor-text" height={textHeight} trigger={textTrigger}/></Text>
        </Content>
    );
};

export default ContentPart;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    width: 25.694vw;
  }

  ${media.desktop} {
    width: 25.694vw;
  }

  ${media.tablet} {
    width: 32.695vw;
  }

  ${media.mobile} {
    width: 72.800vw;
  }
`
const Title = styled.h2`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${colors.black};

  ${media.fullWidth} {
    ${text.desktopLHeading}
    margin-bottom: 2.083vw;
  }

  ${media.desktop} {
    ${text.desktopLHeading}
    margin-bottom: 2.083vw;
  }

  ${media.tablet} {
    ${text.tabletMHeading}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileMHeading}
    margin-bottom: 5.333vw;
  }
`
const Text = styled.span`
  color: ${colors.black};
  display: flex;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    margin-bottom: 4.167vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    margin-bottom: 4.167vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
  }
`

