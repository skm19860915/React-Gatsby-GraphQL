import React from "react";
import styled from "styled-components";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

type props = {
  infos: any;
};

const CardContainerPart: React.FC<props> = ({ infos }) => {

  return (
    <CardContainer>
      {
        infos.map((info, i) => (
          <Card key={i}>
            <FlexColumn>
              <Img src={info.tileImage.file.url} alt={info.title} />
              <Text>0{info.sortNumber}. {info.title}</Text>
            </FlexColumn>
            <P>{info.text.text}</P>
          </Card>
        ))
      }
    </CardContainer>
  );
};

export default CardContainerPart;

const CardContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;

  ${media.fullWidth} {
    flex-wrap: wrap;
  }

  ${media.desktop} {
    flex-wrap: wrap;
  }

  ${media.tablet} {
    flex-direction: column;
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background-color: ${colors.culturedWhite40};
  display: flex;
  border: 1px solid ${colors.black};
  box-sizing: border-box;

  ${media.fullWidth} {
    align-items: center;
    justify-content: space-between;
    margin-right: 3.958vw;
    margin-bottom: 2.778vw;
    width: 42vw;
    height: 15.347vw;
    padding-top: 2.431vw;
    padding-bottom: 2.431vw;
    padding-left: 3.403vw;
    padding-right: 3.403vw;

    :nth-of-type(even) {
      margin-right: 0px;
    }
  }

  ${media.desktop} {
    align-items: center;
    justify-content: space-between;
    margin-right: 3.958vw;
    margin-bottom: 2.778vw;
    width: 42vw;
    height: 15.347vw;
    padding-top: 2.431vw;
    padding-bottom: 2.431vw;
    padding-left: 3.403vw;
    padding-right: 3.403vw;

    :nth-of-type(even) {
      margin-right: 0px;
    }
  }

  ${media.tablet} {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.395vw;
    width: 100%;
    height: 25.988vw;
    padding-top: 4.072vw;
    padding-bottom: 4.072vw;
    padding-left: 5.868vw;
    padding-right: 5.749vw;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 13.067vw;
    padding-left: 8.267vw;
    padding-bottom: 13.067vw;
    padding-right: 8.267vw;
    width: 100%;
    margin-bottom: 10.667vw;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.span`
  color: ${colors.black};
  font-family: Helvetica Neue Medium !important;

  ${media.fullWidth} {
    ${text.desktopBodyCopy2}
    width: 11vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy2}
    width: 11vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy2}
    width: 16.681vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy2}
    width: 100%;
    margin-bottom: 5.333vw;
  }
`;

const P = styled.p`
  color: ${colors.black};

  ${media.fullWidth} {
    ${text.desktopSmallBody}
    width: 22.500vw;
  }

  ${media.desktop} {
    ${text.desktopSmallBody}
    width: 22.500vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    width: 38.084vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    width: 100%;
  }
`;

const Img = styled.img`
  height: auto;

  ${media.fullWidth} {
    width: 5.208vw;
    margin-bottom: 2.083vw;
  }

  ${media.desktop} {
    width: 5.208vw;
    margin-bottom: 2.083vw;
  }

  ${media.tablet} {
    width: 8.862vw;
    margin-bottom: 3.473vw;
  }

  ${media.mobile} {
    width: 19.733vw;
    margin-bottom: 5.333vw;
  }
`