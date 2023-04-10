import React, { useState } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import TileWrapperPart from "./tile-wrapper-part";

const ArrowSquare = loadable(() => import("@components/ArrowSquare"));
const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  contentRef: any;
  title: string;
  titleTrigger: boolean;
  containerRef1: any;
  prevEvent: any;
  nextEvent: any;
  i: number;
  offSet: number;
  containerRef2: any;
  bindData: any;
  tileRefs: any[];
  carouselInfos: any;
};

const CarouselPart: React.FC<props> = 
({ contentRef, title, titleTrigger, containerRef1, prevEvent, nextEvent, i, offSet, containerRef2, 
    bindData, tileRefs, carouselInfos }) => {
    const [enter1, setEnter1] = useState(false);
    const [enter2, setEnter2] = useState(false);

    return (
        <Content ref={contentRef}>
            <Title>
              <TextAnimation textArray={title || []} className="causes-title-2"
                height={useMedia("4.861vw", "4.861vw", "5.755vw", "9.600vw")} trigger={titleTrigger}/>
            </Title>
            <ButtonContainer ref={containerRef1}>
              <ArrowContainer1 onClick={prevEvent} onMouseEnter={() => setEnter1(true)} onMouseLeave={() => setEnter1(false)}>
                <ArrowSquare mouseEnter={enter1} color={i > 0 ? colors.black : "rgba(5, 5, 5, 0.3)"}/>
              </ArrowContainer1>
              <ArrowContainer2 onClick={nextEvent} onMouseEnter={() => setEnter2(true)} onMouseLeave={() => setEnter2(false)}>
                <ArrowSquare mouseEnter={enter2} color={i < offSet ? colors.black : "rgba(5, 5, 5, 0.3)"}/>
              </ArrowContainer2>
            </ButtonContainer>
            <TileContainer ref={containerRef2} {...bindData}>
              { carouselInfos.map((info, i) => ( <TileWrapperPart key={i} tileWrapperRef={tileRefs[i]} tileData={info} /> )) }
            </TileContainer>
        </Content>
    );
};

export default CarouselPart;

const Title = styled.h2`
  color: ${colors.black};
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;

  ${text.desktopLHeading}
  margin-top: 34.722vw;
  margin-bottom: 6.25vw;
  width: 60.028vw;

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-top: 23.621vw;
    margin-bottom: 4.916vw;
    width: 72.787vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-top: 0vw;
    margin-bottom: 13.333vw;
    width: 86.667vw;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 5;

  ${media.mobile} {
    position: absolute;
    top: 275vw;
    left: 6.667vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  opacity: 0;
  width: 6.9vw;
  right: 3.5vw;
  bottom: 38vw;

  ${media.tablet} {
    width: 11.871vw;
    right: 5.995vw;
    bottom: 62.659vw;
  }

  ${media.mobile} {
    display: none;
  }
`;

const ArrowContainerStyles = `

  ${media.fullWidth} {
    width: 2.8vw;
    height: 2.8vw;
  }

  ${media.desktop} {
    width: 2.8vw;
    height: 2.8vw;
  }

  ${media.tablet} {
    width: 4.8vw;
    height: 4.8vw;
  }
`;

const ArrowContainer1 = styled.div`
  ${ArrowContainerStyles}
  transform: rotate(180deg);
`;

const ArrowContainer2 = styled.div`
  ${ArrowContainerStyles}
`;

const TileContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  ${media.mobile} {
    width: 93.333vw;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;