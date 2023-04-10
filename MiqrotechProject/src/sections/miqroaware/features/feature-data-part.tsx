import React from "react";
import styled from "styled-components";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

type props = {
    featureList: any;
};

const FeatureDataPart: React.FC<props> = ({ featureList }) => {

    return (
        <Row>
            {
                featureList.map((feature, i) => (
                    <Column key={i}>
                    <Square />
                    <Title>{feature.title}</Title>
                        {
                            feature.description.description.split('\n\n').map((text, j) => ( <Text key={j}>{text}</Text> ))
                        }
                    </Column>
                ))
            }
        </Row>
    );
};

export default FeatureDataPart;

const Row = styled.div`
  display: flex;

  ${media.tablet} {
    flex-wrap: wrap;
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  :last-of-type {
    margin-right: 0vw;
  }

  width: 21.042vw;
  margin-right: 10.278vw;

  ${media.tablet} {
    width: 36.287vw;
    margin-right: 8.503vw;
    margin-bottom: 2.156vw;

    :nth-of-type(2n) {
      margin-right: 0vw;
    }
  }

  ${media.mobile} {
    width: 80.8vw;
    margin-right: 0vw;
    margin-bottom: 26.667vw;

    :last-of-type {
      margin-bottom: 0vw;
    }
  }
`;

const Title = styled.h3`
  color: ${colors.culturedWhite60};

  ${text.desktopSHeading}
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 8vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite20};

  ${text.desktopBodyCopy2}
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 8vw;
    width: 66.133vw;
  }
`;

const Square = styled.div`
  background-color: ${colors.darkOrange100};

  width: 1.389vw;
  height: 1.389vw;
  margin-bottom: 1.389vw;

  ${media.tablet} {
    width: 2.395vw;
    height: 2.395vw;
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    width: 5.333vw;
    height: 5.333vw;
    margin-bottom: 5.333vw;
  }
`;
