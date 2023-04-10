import React, { useState, useRef, useContext, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScreenContext } from "@components/Layout";
import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";
import useMedia from "@hooks/useMedia";
import ContentPart from "./benefits/content-part";

type props = {
  benefitData: any;
};

const Benefits: React.FC<props> = ({ benefitData }) => {
  const [activeRef, setActiveRef] = useState(null);
  const screen = useContext(ScreenContext);

  const item1Ref = useRef(null);
  const item2Ref = useRef(null);
  const item3Ref = useRef(null);
  const item4Ref = useRef(null);

  const expandItemWidth = useMedia("69.514vw", "69.514vw", "87.904vw", "86.667vw");
  const expandItemHeight = useMedia("44.444vw", "44.444vw", "76.647vw", "262.667vw");
  const expandContentLeft = useMedia("31.389vw", "31.389vw", "37.365vw", "10.667vw");
  const expandContentTop = useMedia("5.417vw", "5.417vw", "9.102vw", "73.6vw");
  const expandContentWidth = useMedia("24.722vw", "24.722vw", "42.635vw", "69.6vw");
  const expandTitleFontSize = useMedia("4.167vw", "4.167vw", "5.749vw", "9.6vw");
  const expandImgWidth = useMedia("19.444vw", "19.444vw", "18.563vw", "41.333vw");
  const expandSvgLeft = useMedia("2.778vw", "2.778vw", "4.79vw", "10.667vw");
  const expandSvgBottom = useMedia("2.778vw", "2.778vw", "7.186vw", "16vw");

  const handleExpand = useCallback((ref: any) => {
    const content = ref.current.getElementsByClassName("content");
    const title = ref.current.getElementsByClassName("title");
    const text = ref.current.getElementsByClassName("text");
    const image = ref.current.getElementsByClassName("image");
    const arrows = ref.current.getElementsByClassName("arrow");
    const svg = ref.current.getElementsByClassName("svg");

    gsap.to(svg, {
      duration: 0.5,
      left: expandSvgLeft,
      bottom: expandSvgBottom,
    });

    gsap.to(ref.current, {
      duration: 0.5,
      left: "0vw",
      top: "0vw",
      width: expandItemWidth,
      height: expandItemHeight,
      zIndex: 2,
    });

    gsap.to(content, {
      duration: 0.5,
      left: expandContentLeft,
      top: expandContentTop,
      width: expandContentWidth,
    });

    gsap.to(title, {
      duration: 0.5,
      fontSize: expandTitleFontSize,
    });

    gsap.fromTo(
      text,
      {
        display: "flex",
      },
      {
        duration: 0.5,
        opacity: 1,
      }
    );

    gsap.to(image, {
      duration: 0.5,
      width: expandImgWidth,
      height: expandImgWidth,
      opacity: 1,
    });

    gsap.to(arrows, {
      duration: 0.5,
      rotate: 180,
    });
  }, [expandContentLeft, expandContentTop, expandContentWidth, expandItemHeight, expandItemWidth, expandImgWidth, expandTitleFontSize, expandSvgBottom, expandSvgLeft])

  const shrinkItemWidth = useMedia("22.500vw", "22.500vw", "28.144vw", "86.667vw");
  const shrinkItemHeight = useMedia("14.167vw", "14.167vw", "33.174vw", "33.333vw");
  const shrinkItemFontSize = useMedia("2.500vw", "2.500vw", "2.874vw", "6.4vw");
  const shrinkItemCorner = useMedia("2.778vw", "2.778vw", "4.79vw", "10.667vw");
  const shrinkSvgBottom = useMedia("2.778vw", "2.778vw", "7.186vw", "14.133vw");
  const shrinkSvgLeft = useMedia("2.778vw", "2.778vw", "4.79vw", "70.133vw");

  const handleShrink = useCallback((ref: any, left: string, top: string) => {
    const text = ref.current.getElementsByClassName("text");
    const image = ref.current.getElementsByClassName("image");
    const title = ref.current.getElementsByClassName("title");
    const content = ref.current.getElementsByClassName("content");
    const arrows = ref.current.getElementsByClassName("arrow");
    const svg = ref.current.getElementsByClassName("svg");

    if (screen.mobile) return;

    gsap.to(ref.current, {
      duration: 0.5,
      height: shrinkItemHeight,
      width: shrinkItemWidth,
      top,
      left,
    });

    gsap.to(image, {
      duration: 0.2,
      opacity: 0,
    });

    gsap.to(svg, {
      duration: 0.5,
      bottom: shrinkSvgBottom,
      left: shrinkSvgLeft,
    });

    gsap.to(title, {
      duration: 0.5,
      fontSize: shrinkItemFontSize,
    });

    gsap.to(text, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        gsap.set(text, {
          display: "none",
        });
      },
    });

    gsap.to(arrows, {
      duration: 0.5,
      rotate: 0,
    });

    gsap.to(content, {
      duration: 0.5,
      top: shrinkItemCorner,
      left: shrinkItemCorner,
    });
  }, [screen, shrinkItemCorner, shrinkItemFontSize, shrinkItemHeight, shrinkItemWidth, shrinkSvgBottom, shrinkSvgLeft])

  const normalItemWidth = useMedia("22.500vw", "22.500vw", "42.994vw", "86.667vw");
  const normalItemHeight = useMedia("44.444vw", "44.444vw", "76.647vw", "133.333vw");
  const normalImgWidth = useMedia("10.764vw", "10.764vw", "18.563vw", "41.333vw");
  const normalImgTop = useMedia("4.514vw", "4.514vw", "8.503vw", "17.333vw");
  const normalImgLeft = useMedia("2.778vw", "2.778vw", "4.79vw", "10.667vw");
  const normalContentWidth = useMedia("16.944vw", "16.944vw", "29.22vw", "69.6vw");
  const normalContentLeft = useMedia("2.778vw", "2.778vw", "4.79vw", "10.667vw");
  const normalContentTop = useMedia("19.167vw", "19.167vw", "33.054vw", "73.6vw");
  const normalTitleFontSize = useMedia("2.500vw", "2.500vw", "4.317vw", "9.600vw");
  const normalTextOpacity = useMedia(1, 1, 1, 0);
  const normalSvgBottom = useMedia("2.778vw", "2.778vw", "7.186vw", "16vw");
  const normalSvgLeft = useMedia("2.778vw", "2.778vw", "4.79vw", "10.667vw");

  const handleNormal = useCallback((ref: any, left: string, top: string) => {
    const text = ref.current.getElementsByClassName("text");
    const image = ref.current.getElementsByClassName("image");
    const title = ref.current.getElementsByClassName("title");
    const arrows = ref.current.getElementsByClassName("arrow");
    const content = ref.current.getElementsByClassName("content");
    const secondary = ref.current.getElementsByClassName("secondary");
    const svg = ref.current.getElementsByClassName("svg");

    gsap.to(svg, {
      duration: 0.5,
      bottom: normalSvgBottom,
      left: normalSvgLeft,
    });

    gsap.to(ref.current, {
      duration: 0.5,
      width: normalItemWidth,
      height: normalItemHeight,
      left,
      top,
    });

    gsap.to(arrows, {
      duration: 0.5,
      rotate: 0,
    });

    gsap.to(image, {
      duration: 0.5,
      width: normalImgWidth,
      height: normalImgWidth,
      top: normalImgTop,
      left: normalImgLeft,
      opacity: 1,
    });

    gsap.to(content, {
      duration: 0.5,
      left: normalContentLeft,
      top: normalContentTop,
      width: normalContentWidth,
    });

    gsap.to(title, {
      duration: 0.5,
      fontSize: normalTitleFontSize,
    });

    gsap.fromTo(
      text,
      {
        display: "flex",
      },
      {
        duration: 0.2,
        opacity: normalTextOpacity,
      }
    );

    gsap.to(secondary, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        gsap.set(secondary, {
          display: "none",
        });
      },
    });
  }, [normalContentLeft, normalContentTop, normalImgLeft, normalImgTop, normalImgWidth, normalItemHeight, normalItemHeight, normalItemWidth, normalSvgBottom, normalSvgLeft, normalTextOpacity, normalTitleFontSize])

  const item2NormalTop = useMedia("0vw", "0vw", "0vw", "0vw");
  const item2NormalLeft = useMedia("23.472vw", "23.472vw", "44.91vw", "0vw");
  const item3NormalTop = useMedia("0vw", "0vw", "80.24vw", "0vw");
  const item3NormalLeft = useMedia("46.944vw", "46.944vw", "0vw", "0vw");
  const item4NormalTop = useMedia("0vw", "0vw", "80.24vw", "0vw");
  const item4NormalLeft = useMedia("70.417vw", "70.417vw", "44.91vw", "0vw");

  const item2ShrinkTop = useMedia("0vw", "0vw", "80.24vw", "0vw");
  const item2ShrinkLeft = useMedia("70.556vw", "70.556vw", "0vw", "0vw");
  const item3ShrinkTop = useMedia("15.208vw", "15.208vw", "80.24vw", "0vw");
  const item3ShrinkLeft = useMedia("70.556vw", "70.556vw", "29.94vw", "0vw");
  const item4ShrinkTop = useMedia("30.417vw", "30.417vw", "80.24vw", "0vw");
  const item4ShrinkLeft = useMedia("70.556vw", "70.556vw", "59.88vw", "0vw");

  const deps = [
    activeRef, 
    item1Ref, 
    item2Ref, 
    item3Ref, 
    item4Ref, 
    item2NormalLeft, 
    item2NormalTop, 
    item3NormalLeft, 
    item3NormalTop, 
    item4NormalLeft, 
    item4NormalTop,
    item2ShrinkLeft,
    item2ShrinkTop,
    item3ShrinkLeft,
    item3ShrinkTop,
    item4ShrinkLeft,
    item4ShrinkTop
  ]

  const handleClick1 = useCallback(() => {
    if (activeRef && activeRef === item1Ref) {
      setActiveRef(null);
      handleNormal(item1Ref, "0vw", "0vw");
      handleNormal(item2Ref, item2NormalLeft, item2NormalTop);
      handleNormal(item3Ref, item3NormalLeft, item3NormalTop);
      handleNormal(item4Ref, item4NormalLeft, item4NormalTop);
    } else {
      setActiveRef(item1Ref);
      handleExpand(item1Ref);
      handleShrink(item2Ref, item2ShrinkLeft, item2ShrinkTop);
      handleShrink(item3Ref, item3ShrinkLeft, item3ShrinkTop);
      handleShrink(item4Ref, item4ShrinkLeft, item4ShrinkTop);
    }
  }, deps)

  const handleClick2 = useCallback(() => {
    if (activeRef && activeRef === item2Ref) {
      setActiveRef(null);
      handleNormal(item1Ref, "0vw", "0vw");
      handleNormal(item2Ref, item2NormalLeft, item2NormalTop);
      handleNormal(item3Ref, item3NormalLeft, item3NormalTop);
      handleNormal(item4Ref, item4NormalLeft, item4NormalTop);
    } else {
      setActiveRef(item2Ref);
      handleExpand(item2Ref);
      handleShrink(item1Ref, item2ShrinkLeft, item2ShrinkTop);
      handleShrink(item3Ref, item3ShrinkLeft, item3ShrinkTop);
      handleShrink(item4Ref, item4ShrinkLeft, item4ShrinkTop);
    }
  }, deps)

  const handleClick3 = useCallback(() => {
    if (activeRef && activeRef === item3Ref) {
      setActiveRef(null);
      handleNormal(item1Ref, "0vw", "0vw");
      handleNormal(item2Ref, item2NormalLeft, item2NormalTop);
      handleNormal(item3Ref, item3NormalLeft, item3NormalTop);
      handleNormal(item4Ref, item4NormalLeft, item4NormalTop);
    } else {
      setActiveRef(item3Ref);
      handleExpand(item3Ref);
      handleShrink(item1Ref, item2ShrinkLeft, item2ShrinkTop);
      handleShrink(item2Ref, item3ShrinkLeft, item3ShrinkTop);
      handleShrink(item4Ref, item4ShrinkLeft, item4ShrinkTop);
    }
  }, deps)

  const handleClick4 = useCallback(() => {
    if (activeRef && activeRef === item4Ref) {
      setActiveRef(null);
      handleNormal(item1Ref, "0vw", "0vw");
      handleNormal(item2Ref, item2NormalLeft, item2NormalTop);
      handleNormal(item3Ref, item3NormalLeft, item3NormalTop);
      handleNormal(item4Ref, item4NormalLeft, item4NormalTop);
    } else {
      setActiveRef(item4Ref);
      handleExpand(item4Ref);
      handleShrink(item1Ref, item2ShrinkLeft, item2ShrinkTop);
      handleShrink(item2Ref, item3ShrinkLeft, item3ShrinkTop);
      handleShrink(item3Ref, item4ShrinkLeft, item4ShrinkTop);
    }
  }, deps)

  return (
    <Wrapper>
      <BG>Benefits+</BG>
      <Title>Benefits+</Title>
      <ItemWrapper>
        <Item1 ref={item1Ref} onClick={handleClick1}>
          <ContentPart benefit={benefitData[0]} />
        </Item1>
        <Item2 ref={item2Ref} onClick={handleClick2}>
          <ContentPart benefit={benefitData[1]} />
        </Item2>
        <Item3 ref={item3Ref} onClick={handleClick3}>
          <ContentPart benefit={benefitData[2]} />
        </Item3>
        <Item4 ref={item4Ref} onClick={handleClick4}>
          <ContentPart benefit={benefitData[3]} />
        </Item4>
      </ItemWrapper>
    </Wrapper>
  );
};

export default Benefits;

const Wrapper = styled.section`
  position: relative;
  padding-top: 8.333vw;
  padding-left: 3.472vw;
  padding-right: 3.472vw;
  padding-bottom: 8.611vw;

  ${media.tablet} {
    padding-top: 14.371vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
    padding-bottom: 12.096vw;
  }

  ${media.mobile} {
    padding-top: 34.133vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 27.733vw;
  }
`;

const Title = styled.h2`
  position: relative;
  z-index: 1;
  color: ${colors.culturedWhite100};

  ${text.desktopXLHeading}
  margin-bottom: 2.778vw;

  ${media.tablet} {
    ${text.tabletXLHeading}
    margin-bottom: 4.79vw;
  }

  ${media.mobile} {
    ${text.mobileXLHeading}
    margin-bottom: 8.533vw;
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-left:-10px;
  height: 44.444vw;

  ${media.tablet} {
    height: 156.886vw;
    margin-left:0px;
  }

  ${media.mobile} {
    // height: 565.333vw;
    height: auto;
    margin-left:0px;
  }
`;

const Item = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors.jetBlack20};
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${colors.black};

  width: 22.5vw;
  height: 44.444vw;
  padding-top: 4.514vw;
  padding-left: 2.778vw;
  padding-right: 2.778vw;

  ${media.tablet} {
    width: 42.994vw;
    height: 76.647vw;
    padding-top: 8.623vw;
    padding-left: 4.79vw;
    padding-right: 4.79vw;
  }

  ${media.mobile} {
    position: relative;
    width: 86.667vw;
    height: 133.333vw;
    margin-bottom: 10vw;
  }
`;

const Item1 = styled(Item)`
  left: 0vw;
  top: 0vw;
`;

const Item2 = styled(Item)`
  top: 0vw;
  left: 23.472vw;

  ${media.tablet} {
    left: 44.91vw;
  }

  ${media.mobile} {
    left: 0vw;
    top: 0vw;
  }
`;

const Item3 = styled(Item)`
  top: 0vw;
  left: 46.944vw;

  ${media.tablet} {
    top: 80.24vw;
    left: 0vw;
  }

  ${media.mobile} {
    left: 0vw;
    top: 0vw;
  }
`;

const Item4 = styled(Item)`
  top: 0vw;
  left: 70.417vw;

  ${media.tablet} {
    top: 80.24vw;
    left: 44.91vw;
  }

  ${media.mobile} {
    left: 0vw;
    top: 0vw;
  }
`;

const BG = styled.span`
  position: absolute;

  font-family: Helvetica Neue Medium;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.04em;
  color: ${colors.jetBlack100};
  z-index: 0;
  opacity: 0.75;

  font-size: 22.222vw;
  width: 90.625vw;
  height: 22.222vw;
  left: -2.431vw;
  top: 0vw;

  ${media.tablet} {
    top: 9.581vw;
    font-size: 24.551vw;
    width: 100.24vw;
    height: 24.551vw;
    left: -1.078vw;
  }

  ${media.mobile} {
    top: 21.333vw;
    font-size: 26.667vw;
    width: 108.8vw;
    height: 26.667vw;
    left: -5.067vw;
  }
`;
