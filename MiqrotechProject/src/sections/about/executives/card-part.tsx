import React from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import { navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));

type props = {
    item: any;
    slug: any;
};

const CardPart: React.FC<props> = ({ item, slug }) => {

  return (
    <Card className="exec" >
      <StyledImg><GatsbyImage loading="lazy" objectFit="cover" alt={item.fullName} image={item.headshot.gatsbyImageData} /></StyledImg>
      <Name>{item.fullName}</Name><Role>{item.title}</Role><HR />
      <PrimaryButton padding text="Read Bio" onClick={() => { navigate(`/about/${slug}`); }} />
    </Card>
  );
};

export default CardPart;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;

  ${media.fullWidth} {
    width: 23.403vw;
    margin-right: 7.917vw;
    margin-bottom: 6.944vw;
  }

  ${media.desktop} {
    width: 23.403vw;
    margin-right: 7.917vw;
    margin-bottom: 6.944vw;
  }

  ${media.tablet} {
    width: 28.144vw;
    margin-right: 9.341vw;
    margin-bottom: 10.778vw;
  }

  ${media.mobile} {
    width: 86.933vw;
    margin-right: 0vw;
    margin-bottom: 26.667vw;
  }
`;

const Name = styled.h3`
  color: ${colors.white};

  ${media.fullWidth} {
    ${text.desktopSHeading}
    margin-bottom: 0.694vw;
  }

  ${media.desktop} {
    ${text.desktopSHeading}
    margin-bottom: 0.694vw;
  }

  ${media.tablet} {
    ${text.tabletXSHeading}
    margin-bottom: 0.958vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 2.667vw;
  }
`;

const StyledImg = styled.div`
  width: 100%;

  ${media.fullWidth} {
    height: 23.403vw;
    margin-bottom: 2.083vw;
  }

  ${media.desktop} {
    height: 23.403vw;
    margin-bottom: 2.083vw;
  }

  ${media.tablet} {
    height: 28.144vw;
    margin-bottom: 3.713vw;
  }

  ${media.mobile} {
    height: 86.667vw;
    margin-bottom: 10.667vw;
  }
`;

const Role = styled.p`
  color: ${colors.keppel100};

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    margin-bottom: 2.778vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    margin-bottom: 2.778vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 1.317vw;
    height: 4.79vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    margin-bottom: 10.667vw;
    height: 7.2vw;
  }
`;

const HR = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.white};
  border: none;
  margin: 0px;

  ${media.fullWidth} {
    margin-bottom: 1.778vw;
  }

  ${media.desktop} {
    margin-bottom: 1.778vw;
  }

  ${media.tablet} {
    margin-bottom: 3.473vw;
  }

  ${media.mobile} {
    margin-bottom: 10.667vw;
  }
`;