import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import gsap from "gsap";

import { OpenFormContext } from "@components/Layout";

import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";

import TextAnimation from "@components/TextAnimation";
import PrimaryButton from "@components/PrimaryButton";

import useMedia from "@hooks/useMedia";

import MapJPG from "@jpg/map.jpg";
import ui1 from "@png/ui1.png";
import ui2 from "@png/ui2.png";
import ui3 from "@png/ui3.png";
import ui4 from "@png/ui4.png";
import ui5 from "@png/ui5.png";
import ui6 from "@png/ui6.png";
import ui7 from "@png/ui7.png";

const Radial: React.FC = () => {
  return (
    <Svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.4994 21.2653C42.4994 32.6528 33.268 41.8842 21.8806 41.8842C10.4931 41.8842 1.26172 32.6528 1.26172 21.2653C1.26172 9.87785 10.4931 0.646484 21.8806 0.646484C33.268 0.646484 42.4994 9.87785 42.4994 21.2653Z"
        fill="#FF8800"
        fillOpacity="0.3"
        stroke="#FFB866"
      />
      <path
        d="M21.8817 31.8244C27.7135 31.8244 32.4411 27.0968 32.4411 21.265C32.4411 15.4332 27.7135 10.7056 21.8817 10.7056C16.0499 10.7056 11.3223 15.4332 11.3223 21.265C11.3223 27.0968 16.0499 31.8244 21.8817 31.8244Z"
        fill="#FF8800"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  position: absolute;
  height: auto;

  left: 17.4vw;
  top: 18.2vw;
  width: 2.917vw;

  ${media.tablet} {
    width: 3.832vw;
    left: 33.03vw;
    top: 24vw;
  }

  ${media.mobile} {
    width: 8.533vw;
    left: 93.03vw;
    top: 53vw;
  }
`;

type props = {
  loading: boolean;
  txt1: string;
  txt2: string;
  txt3: string;
};

const Insights: React.FC<props> = ({ txt1, txt2, txt3 }) => {
  const [titleTrigger, setTitleTrigger] = useState(false);
  const [subTitleTrigger, setSubTitleTrigger] = useState(false)
  const [textTrigger, setTextTrigger] = useState(false);

  const wrapperRef = useRef(null);
  const ui6Ref = useRef(null);
  const ui7Ref = useRef(null);

  const openForm = useContext(OpenFormContext);

  const tlStart = useMedia("top-=80% top", "top-=80% top", "top-=50% top", "top-=50% top");

  useEffect(() => {
      const initTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: tlStart,
        },
      });

      initTl.to(
        ".ui",
        {
          duration: 0.5,
          opacity: 1,
          stagger: 0.3,
        },
        0
      );
      initTl.call(setSubTitleTrigger, [true], 0);
      initTl.call(setTitleTrigger, [true], 0.5);
      initTl.call(setTextTrigger, [true], 1);

      return () => {
        initTl.kill();
      };
    
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Left>
        <Map src={MapJPG} alt="map"/>
        <Radial alt="gradient" />
        <UI1 className="ui" src={ui1} alt="ui1"/>
        <UI2 className="ui" src={ui2}  alt="ui2"/>
        <UI3 className="ui" src={ui3} alt="ui3" />
        <UI4 className="ui" src={ui4} alt="ui4" />
        <UI5 className="ui" src={ui5} alt="ui5" />
        <UI6 className="ui" ref={ui6Ref} src={ui6}  alt="ui6"/>
        <UI7 className="ui" ref={ui7Ref} src={ui7}  alt="ui7"/>
      </Left>
      <Right>
        <SubTitle>
          <TextAnimation
            textArray={txt1}
            height={useMedia("1.25vw", "1.25vw", "1.916vw", "4.267vw")}
            className="insights-subtitle"
            trigger={subTitleTrigger}
          />
        </SubTitle>
        <Title>
          <TextAnimation
            textArray={txt2}
            height={useMedia("4.167vw", "4.167vw", "7.186vw", "9.6vw")}
            className="insights-title"
            trigger={titleTrigger}
          />
        </Title>
        <Text>
          <TextAnimation
            textArray={txt3}
            className="insights-text"
            trigger={textTrigger}
            height={useMedia("10.486vw", "10.486vw", "12.575vw", "26.667vw")}
          />
        </Text>
        <PrimaryButton
          backgroundColor={colors.keppel100}
          hoverColor={colors.keppel60}
          textColor={colors.jetBlack100}
          text="Request a Demo"
          onClick={() => openForm(true)}
        />
      </Right>
    </Wrapper>
  );
};

export default Insights;

const Wrapper = styled.section`
  display: flex;
  position: relative;

  padding-top: 7.292vw;
  height: 62.083vw;

  ${media.tablet} {
    height: 112.814vw;
    padding-top: 0vw;
  }

  ${media.mobile} {
    flex-direction: column;
    height: 277.333vw;
    padding-top: 12.8vw;
  }
`;

const Left = styled.div`
  position: relative;

  width: 47.986vw;
  margin-right: 10.417vw;

  ${media.tablet} {
    position: absolute;
    top: 35.689vw;
    right: 0vw;
    margin-right: 0vw;
  }

  ${media.mobile} {
    position: relative;
    width: 100%;
    margin-right: 0vw;
    order: 2;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 7.986vw;

  ${media.tablet} {
    position: absolute;
    top: 0vw;
    left: 0vw;
    padding-top: 7.784vw;
    padding-left: 5.988vw;
  }

  ${media.mobile} {
    position: relative;
    margin-bottom: 20.533vw;
    width: 100%;
    order: 1;
    padding-left: 6.667vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite100};
  display: flex;
  flex-direction: column;

  ${text.desktopMHeading}
  width: 36.042vw;
  margin-bottom: 1.389vw;

  ${media.tablet} {
    ${text.tabletMHeading}
    width: 58.084vw;
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    width: 100%;
    margin-bottom: 5.333vw;
  }
`;

const Map = styled.img`
  border-radius: 10px;
  position: absolute;
  top: 0;

  width: 55vw;
  height: 44.583vw;
  left: -7.014vw;

  ${media.tablet} {
    width: 72.335vw;
    height: 58.683vw;
    left: unset;
    right: -25.389vw;
  }

  ${media.mobile} {
    width: 604px;
    height: 130.667vw;
    left: 21.333vw;
  }
`;

const SmallUI = styled.img`
  position: absolute;
  opacity: 0;

  height: 3.681vw;
  width: 10.486vw;
  box-shadow: 0px 1.042vw 2.083vw rgba(0, 0, 0, 0.6);
  top: 2.569vw;
  border-radius: 7.23256px;

  ${media.tablet} {
    width: 13.772vw;
    height: 4.79vw;
    box-shadow: 0px 1.359vw 2.718vw rgba(0, 0, 0, 0.6);
    border-radius: 0.204vw;
  }

  ${media.mobile} {
    width: 30.667vw;
    height: 10.667vw;
    box-shadow: 0px 3.026vw 6.052vw rgba(0, 0, 0, 0.6);
    border-radius: 0.454vw;
  }
`;

const UI1 = styled(SmallUI)`
  left: -5.069vw;

  ${media.tablet} {
    left: -0.069vw;
  }

  ${media.mobile} {
    left: 18.933vw;
  }
`;

const UI2 = styled(SmallUI)`
  left: 6.197vw;

  ${media.tablet} {
    left: 15.197vw;
  }

  ${media.mobile} {
    left: 51.92vw;
  }
`;

const UI3 = styled(SmallUI)`
  left: 17.462vw;

  ${media.tablet} {
    left: 30.462vw;
  }

  ${media.mobile} {
    left: 84.907vw;
  }
`;

const UI4 = styled(SmallUI)`
  left: 28.729vw;

  ${media.tablet} {
    left: 45.729vw;
  }

  ${media.mobile} {
    display: none;
  }
`;

const UI5 = styled(SmallUI)`
  left: 39.995vw;

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

const UI6 = styled.img`
  position: absolute;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.6);
  opacity: 0;

  top: 15.556vw;
  left: 30.764vw;
  width: 20.694vw;
  height: 24.514vw;

  ${media.tablet} {
    width: 27.186vw;
    height: 32.216vw;
    top: 13.054vw;
    left: -6.347vw;
  }

  ${media.mobile} {
    width: 60.533vw;
    height: 71.733vw;
    top: 29.067vw;
    left: 7.2vw;
  }
`;

const UI7 = styled.img`
  position: absolute;
  opacity: 0;

  left: 3.056vw;
  top: 40.972vw;
  width: 23.681vw;
  height: 7.222vw;

  ${media.tablet} {
    width: 31.138vw;
    height: 9.461vw;
    left: 16.407vw;
    top: 53.653vw;
  }

  ${media.mobile} {
    width: 69.333vw;
    height: 21.067vw;
    left: 50vw;
    top: 119.467vw;
  }
`;

const SubTitle = styled.span`
  color: ${colors.darkOrange100};
  display: flex;

  ${text.desktopBodyCopy1}
  margin-bottom: 1.389vw;

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    margin-bottom: 2.395vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy2}
    margin-bottom: 5.333vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite100};
  display: flex;
  flex-direction: column;

  ${text.desktopBodyCopy1}
  margin-bottom: 2.778vw;
  width: 21.042vw;

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: 3.593vw;
    width: 36.287vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 8vw;
    width: 80.8vw;
  }
`;
