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
    text: string;
    titleTrigger: boolean;
    textTrigger: boolean;
};

const ContentPart: React.FC<props> = ({ title, titleTrigger, text, textTrigger }) => {
    const titleHeight = useMedia("4.861vw", "4.861vw", "7.186vw", "16vw");
    const textHeight = useMedia("14.444vw", "14.444vw", "20.120vw", "42.933vw");
    const buttonClick = () => { window.open("https://www.linkedin.com/jobs/search/?f_C=10604931&geoId=92000000", "_blank") };
    const buttonWidth = useMedia("fit-content", "fit-content", "fit-content", "100%"); 
    
    return (
        <Content>
            <Title><TextAnimation textArray={title} className="about-team" height={titleHeight} trigger={titleTrigger}/></Title>
            <P><TextAnimation textArray={text} className="about-team-text" height={textHeight} trigger={textTrigger}/></P>
            <PrimaryButton text="View Open Positions" backgroundColor={colors.black} textColor={colors.white} onClick={buttonClick} width={buttonWidth}/>
        </Content>
    );
};

export default ContentPart;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  a {
    text-decoration: none;
  }
  ${media.fullWidth} {
    width: 25.764vw;
  }

  ${media.desktop} {
    width: 25.764vw;
  }

  ${media.tablet} {
    width: 35.569vw;
  }

  ${media.mobile} {
    width: 86.933vw;
  }
`;

const Title = styled.h2`
  width: 100%;
  color: ${colors.black};
  display: flex;
  flex-direction: column;

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
`;

const P = styled.p`
  color: ${colors.black};
  width: 100%;
  display: flex;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    margin-bottom: 3.333vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    margin-bottom: 3.333vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 4.790vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 10.667vw;
  }
`;