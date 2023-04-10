import React from "react";
import styled from "styled-components";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

type props = {
    contents: any;
};

const TopPart: React.FC<props> = ({ contents }) => {

  return (
    <Wrapper>
      <TopSection>
        <Title>Board of directors</Title>
        <HR />
      </TopSection>
      <CardContainer>{contents}</CardContainer>
    </Wrapper>
  );
};

export default TopPart;

const Wrapper = styled.section`
  background-color: ${colors.black};
  border-left-style: solid;
  border-color: ${colors.keppel100};

  ${media.fullWidth} {
    border-width: 2.083vw;
    padding-top: 4.583vw;
    padding-left: 9.236vw;
    padding-right: 11.319vw;
    padding-bottom: 8.681vw;
  }

  ${media.desktop} {
    border-width: 2.083vw;
    padding-top: 4.583vw;
    padding-left: 9.236vw;
    padding-right: 11.319vw;
    padding-bottom: 8.681vw;
  }

  ${media.tablet} {
    border-width: 3.593vw;
    padding-top: 5.15vw;
    padding-left: 2.395vw;
    padding-right: 5.988vw;
    padding-bottom: 14.731vw;
  }

  ${media.mobile} {
    border-width: 1.333vw;
    padding-top: 13.067vw;
    padding-left: 5.333vw;
    padding-bottom: 26.133vw;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.fullWidth} {
    margin-bottom: 7.708vw;
  }

  ${media.desktop} {
    margin-bottom: 7.708vw;
  }

  ${media.tablet} {
    margin-bottom: 8.503vw;
  }

  ${media.mobile} {
    margin-bottom: 22.667vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite60};

  ${media.fullWidth} {
    ${text.desktopLHeading}
  }

  ${media.desktop} {
    ${text.desktopLHeading}
  }

  ${media.tablet} {
    ${text.tabletMHeading}
  }

  ${media.mobile} {
    ${text.mobileSHeading}
  }
`;

const HR = styled.hr`
  background-color: ${colors.culturedWhite60};
  border: none;
  height: 1px;
  margin: 0px;

  ${media.fullWidth} {
    width: 36.597vw;
  }

  ${media.desktop} {
    width: 36.597vw;
  }

  ${media.tablet} {
    width: 28.144vw;
  }

  ${media.mobile} {
    display: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.fullWidth} {
    padding-left: 7.847vw;
  }

  ${media.desktop} {
    padding-left: 7.847vw;
  }

  ${media.tablet} {
    padding-left: 7.425vw;
  }

  ${media.mobile} {
    flex-direction: column;
    padding-left: 23.467vw;
  }
`;