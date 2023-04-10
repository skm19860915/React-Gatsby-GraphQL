import React from "react";
import styled from "styled-components";

import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";

const TitleSection: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Title>Terms of use</Title>
        <Date>Last updated: 8/27/21</Date>
      </Content>
    </Wrapper>
  );
};

export default TitleSection;

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  ${media.fullWidth} {
    padding-top: 13.472vw;
    padding-left: 3.472vw;
    padding-right: 3.472vw;
  }

  ${media.desktop} {
    padding-top: 13.472vw;
    padding-left: 3.472vw;
    padding-right: 3.472vw;
  }

  ${media.tablet} {
    padding-top: 12.814vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
  }

  ${media.mobile} {
    padding-top: 29.867vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${colors.jetBlack20};
  align-items: flex-end;
  justify-content: space-between;
  position: relative;

  ${media.fullWidth} {
    padding-bottom: 2.569vw;
  }

  ${media.desktop} {
    padding-bottom: 2.569vw;
  }

  ${media.tablet} {
    padding-bottom: 4.072vw;
  }

  ${media.mobile} {
    padding-bottom: 9.067vw;
  }
`;

const Title = styled.h1`
  color: ${colors.culturedWhite60};
  margin: 0vw;

  ${media.fullWidth} {
    ${text.desktopXXLHeading}
    width: 33.056vw;
  }

  ${media.desktop} {
    ${text.desktopXXLHeading}
    width: 33.056vw;
  }

  ${media.tablet} {
    ${text.tabletLHeading}
    width: 45.006vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    width: 62.667vw;
  }
`;

const Date = styled.p`
  color: ${colors.culturedWhite60};
  text-align: right;

  ${media.fullWidth} {
    ${text.desktopPetiteHeading}
    font-family: Helvetica Neue;
    font-weight: normal;
  }

  ${media.desktop} {
    ${text.desktopPetiteHeading}
    font-family: Helvetica Neue;
    font-weight: normal;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    position: absolute;
    bottom: 9.067vw;
    right: 0;
  }
`;
