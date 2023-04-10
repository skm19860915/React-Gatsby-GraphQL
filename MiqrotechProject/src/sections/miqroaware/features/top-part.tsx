import React, { useContext } from "react";
import styled from "styled-components";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import PrimaryButton from "@components/PrimaryButton";
import { OpenFormContext } from "@components/Layout";

const TopPart: React.FC = () => {
    const openForm = useContext(OpenFormContext);

    return (
        <TopSection>
            <Left>
                <Title>mIQroAware&trade;</Title>
                <Text>Reduce Costs. Avoid Downtime. Prevent Leaks.</Text>
                <PrimaryButton
                    backgroundColor={colors.keppel100}
                    hoverColor={colors.keppel60}
                    textColor={colors.jetBlack100}
                    text="Schedule a Demo"
                    onClick={() => openForm(true)}
                />
            </Left>
            <Right>
                <Text>
                    The mIQroAware™ monitoring system is a low cost, high impact
                    solution with a full suite of integrated technologies that work
                    together to provide you with instant, intelligent data on the
                    current condition of your pipeline. By blending sensor, Internet of
                    Things (IoT), Artificial Intelligence (AI), and Analytics
                    technology, this innovative system can detect, analyze, and report
                    on risks in real time. You'll have access to a constant, reliable
                    stream of insights that equip you to optimize operations and prevent
                    disasters.
                </Text>
            </Right>
        </TopSection>
    );
};

export default TopPart;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 8.403vw;

  ${media.tablet} {
    margin-bottom: 19.641vw;
  }

  ${media.mobile} {
    margin-bottom: 32vw;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  color: ${colors.culturedWhite100};

  ${text.desktopXLHeading}
  margin-bottom: 1.389vw;

  ${media.tablet} {
    ${text.tabletMHeading}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 5.333vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite60};

  ${text.desktopBodyCopy1}
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 3.832vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy2}
    margin-bottom: 7.467vw;
  }
`;

const Right = styled.div`
  width: 30.208vw;

  ${media.tablet} {
    width: 35.449vw;
  }

  ${media.mobile} {
    display: none;
  }
`;