import React, { useRef, useContext } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import { OpenFormContext } from "@components/Layout";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));

type props = {
  title: string[];
};

const ContentPart: React.FC<props> = ({ title }) => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  const openForm = useContext(OpenFormContext);

  return (
    <Content ref={contentRef}>
        <TitleXL ref={titleRef}>{title}</TitleXL>
        <PrimaryButton
          text="Request a Demo"
          textColor={colors.black}
          backgroundColor={colors.keppel100}
          hoverColor={colors.keppel60}
          onClick={() => openForm(true)}
          width={useMedia("fit-content", "fit-content", "fit-content", "100%")}
        />
    </Content>
  );
};

export default ContentPart;

const Content = styled.div`
  position: absolute;
  z-index: 5;

  top: 14.236vw;
  left: 42.708vw;

  ${media.tablet} {
    left: 5.995vw;
    top: 25.54vw;
  }

  ${media.mobile} {
    left: 3.667vw;
    top: 57vw;
  }
`;

const TitleXL = styled.h1`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;

  ${text.desktopXLHeading}
  margin-bottom: 3.472vw;
  width: 54.861vw;

  ${media.tablet} {
    ${text.tabletXLHeading}
    margin-bottom: 5.995vw;
    width: 88.01vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 13.333vw;
    width: 91.4vw;
  }
`;