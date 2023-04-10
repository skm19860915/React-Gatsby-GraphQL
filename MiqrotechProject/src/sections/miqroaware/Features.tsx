import React from "react";
import styled from "styled-components";
import media from "@styles/media";
import colors from "@styles/colors";
import TopPart from "./features/top-part";
import FeatureDataPart from "./features/feature-data-part";

type props = {
  featureData: any;
};

const Features: React.FC<props> = ({ featureData }) => {
  
  return (
    <Wrapper>
      <HR /><TopPart />
      <FeatureDataPart featureList={featureData} />
    </Wrapper>
  );
};

export default Features;

const Wrapper = styled.section`
  padding-top: 5.833vw;
  padding-left: 3.472vw;
  padding-right: 3.472vw;
  padding-bottom: 11.736vw;

  ${media.tablet} {
    padding-top: 10.06vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
    padding-bottom: 14.611vw;
  }

  ${media.mobile} {
    padding-top: 21.6vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
  }
`;

const HR = styled.hr`
  height: 1px;
  background-color: ${colors.culturedWhite60};
  width: 100%;
  border: none;
  margin-bottom: 3.819vw;

  ${media.tablet} {
    margin-bottom: 6.587vw;
  }

  ${media.mobile} {
    margin-bottom: 14.667vw;
  }
`;