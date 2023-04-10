import React from "react";
import styled from "styled-components";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

import { ReactComponent as LinkedinSVG } from "@svg/linkedIn.svg";

type props = {
    item: any;
};

const CardPart: React.FC<props> = ({ item }) => {

  return (
    <Card className="director">
        <Name>{item.fullName}</Name>
        <P>{item.bio.bio}</P>
        {item.linkedin && (<a href={item.linkedin} target="_blank no-referer"><Linkedin /></a>)}
    </Card>
  );
};

export default CardPart;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.fullWidth} {
    width: 20.347vw;
    margin-right: 3.125vw;
    margin-bottom: 4.861vw;

    :nth-of-type(3n) {
      margin-right: 0px;
    }
  }

  ${media.desktop} {
    width: 20.347vw;
    margin-right: 3.125vw;
    margin-bottom: 4.861vw;

    :nth-of-type(3n) {
      margin-right: 0px;
    }
  }

  ${media.tablet} {
    width: 35.09vw;
    margin-right: 10.18vw;
    margin-bottom: 11.976vw;

    :nth-of-type(2n) {
      margin-right: 0px;
    }
  }

  ${media.mobile} {
    width: 63.733vw;
    margin-bottom: 16vw;
  }
`;

const Name = styled.h3`
  color: ${colors.culturedWhite60};

  ${media.fullWidth} {
    ${text.desktopXSHeading}
    margin-bottom: 1.389vw;
  }

  ${media.desktop} {
    ${text.desktopXSHeading}
    margin-bottom: 1.389vw;
  }

  ${media.tablet} {
    ${text.tabletXSHeading}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-bottom: 5.333vw;
  }
`;

const P = styled.p`
  color: ${colors.culturedWhite60};
  font-weight: normal;

  ${media.fullWidth} {
    ${text.desktopSmallBody}
    margin-bottom: 1.389vw;
  }

  ${media.desktop} {
    ${text.desktopSmallBody}
    margin-bottom: 1.389vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 5.333vw;
  }
`;

const Linkedin = styled(LinkedinSVG)`
  height: auto;

  ${media.fullWidth} {
    width: 1.667vw;
  }

  ${media.desktop} {
    width: 1.667vw;
  }

  ${media.tablet} {
    width: 2.874vw;
  }

  ${media.mobile} {
    width: 6.4vw;
  }
`;