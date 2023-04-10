import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useDrag } from "react-use-gesture";
import { ScreenContext } from "@components/Layout";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import accentBG from "@png/accentBG.png";
import { ReactComponent as chevronSVG } from "@svg/chevron.svg"
import { GatsbyImage } from "gatsby-plugin-image";

type props = {
  causeData: any;
  styleData: any[];
};

const HowItWorks: React.FC<props> = ({causeData, styleData}) => {

  const [i, setCurrentCause] = useState(0);

  const causeRef = useRef<HTMLDivElement>(null);
  const screen = useContext(ScreenContext)
  const handleChangeCause = (index: number) => {
    if (index === i) return;
    gsap.to(causeRef.current, {
      y: "-20%",
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setCurrentCause(index);
        gsap.fromTo(
          causeRef.current,
          { y: "20%" },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
        );
      },
    });
  };

  const bind = useDrag((state) => {
    if (!screen.mobile) {
      if (state.direction[0] < 0) {
        if (i < 5) {
          handleChangeCause(i + 1);
        }
      }
      if (state.direction[0] > 0) {
        if (i > 0) {
          handleChangeCause(i - 1);
        }
      }
    }
  });

  const causeHeadings = causeData.map((cause, j) => (
    <CauseLink key={j} onClick={() => { handleChangeCause(j); }} active={j === i}>{cause.title}</CauseLink>
  ));

  const handlePrevCause = () => handleChangeCause(Math.max(i - 1, 0))
  const handleNextCause = () => handleChangeCause(Math.min(i + 1, 5))

  return (
    <Wrapper {...bind()}>
      <Accent src={accentBG} alt="gradient"/>
      <HeadingSmall>Monitors all the leading causes of pipeline failure</HeadingSmall>
      <CauseLinks offset={styleData.mobileLinkOffsets[i]}>
        {causeHeadings}
        <LinkLine
          lineWidth= { screen.mobile ? styleData.mobileWidths[i] : screen.tablet ? styleData.tabletWidths[i] : styleData.desktopWidths[i] }
          linePos= { screen.mobile ? styleData.mobilePositions[i] : screen.tablet ? styleData.tabletPositions[i] : styleData.desktopPositions[i] }
        />
      </CauseLinks>
      <CurrentCause ref={causeRef}>
        <TextWrapper>
          <Subheading>{causeData[i].description2.description2}</Subheading>
          <Text>{causeData[i].description.description}</Text>
        </TextWrapper>
        <ImgWrapper>
          <GatsbyImage alt={causeData[i].title} image={causeData[i].photo2.gatsbyImageData} imgStyle={{width: '100%', height: '100%'}} />
        </ImgWrapper>
      </CurrentCause>
      <TouchButtons>
        <TouchPrevious onClick={handlePrevCause} disabled={i === 0} />
        <TouchNext onClick={handleNextCause} disabled={i === 5}/>
      </TouchButtons>
    </Wrapper>
  );
};

export default HowItWorks;

const Wrapper = styled.section`
  padding: 6.6vw 9.6vw 15.9vw 13vw;
  position: relative;
  ${media.tablet} {
    padding: 10.8vw 0 17.2vw 6vw;
  }
  ${media.mobile} {
    padding: 23.5vw 6.7vw 41.6vw;
  }
`;

const Accent = styled.img`
  position: absolute;
  width: 62.5vw;
  height: auto;
  top: 6.7vw;
  left: -14.5vw;
  transform: rotate(135deg);
  opacity: 0.4;

  ${media.tablet} {
    width: 108vw;
    top: -24.7vw;
    left: -44.5vw;
  }
`;

const HeadingSmall = styled.h1`
  ${text.desktopSHeading}
  color: ${colors.culturedWhite100};
  width: 40vw;
  margin-bottom: 3vw;
  ${media.tablet} {
    ${text.tabletSHeading}
    width: 80%;
    margin-bottom: 6vw;
  }
  ${media.mobile} {
    ${text.mobileXSHeading}
    width: 100%;
    margin-bottom: 10.7vw;
  }
`;

const CauseLinks = styled.div<{ offset: string }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.jetBlack20};
  margin-bottom: 5.6vw;
  position: relative;
  ${media.tablet} {
    width: 94%;
  }
  ${media.mobile} {
    width: 250vw;
    transition: transform 300ms ease-out;
    transform: translateX(${(props) => props.offset});
  }
`;

const CauseLink = styled.p<{ active: boolean }>`
  ${text.desktopBodyCopy1}
  color: ${(props) => props.active ? colors.darkOrange100 : colors.culturedWhite100};
  padding-bottom: 0.7vw;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color 300ms ease-out;
  position: relative;

  ${media.tablet} {
    ${text.tabletSmallBody}
  }
  ${media.mobile} {
    ${text.mobileBodyCopy1}/* &::after {
      content: "";
      position: absolute;
      background: ${colors.darkOrange100};
      height: 2px;
      width: ${(props) => (props.active ? "100%" : "0")};
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      transition: width 300ms ease-out;
    } */
  }
`;

const CurrentCause = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.mobile} {
    flex-direction: column-reverse;
  }
`;

const TextWrapper = styled.div`
  width: 32.7%;
  ${media.tablet} {
    width: 41.4%;
  }
  ${media.mobile} {
    width: 100%;
  }
`;

const Subheading = styled.h1`
  ${text.desktopXXSHeading}
  color: ${colors.culturedWhite100};
  margin-bottom: 2.1vw;
  ${media.tablet} {
    ${text.tabletXXSHeading}
    margin-bottom: 3.6vw;
  }
  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-bottom: 8vw;
  }
`;

const Text = styled.p`
  ${text.desktopBodyCopy1}
  color: ${colors.culturedWhite100};
  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }
  ${media.mobile} {
    ${text.mobileSmallBody}
  }
`;

const ImgWrapper = styled.div`
  width: 60%;
  height: auto;
  ${media.tablet} {
    width: 48.6%;
    height: 50.4vw;
    object-fit: cover;
  }
  ${media.mobile} {
    width: 100%;
    margin-bottom: 10.7vw;
  }
`;

const LinkLine = styled.div<{ lineWidth: string; linePos: string }>`
  width: ${(props) => props.lineWidth};
  height: 2px;
  background: ${colors.darkOrange100};
  position: absolute;
  bottom: -1px;
  left: ${(props) => props.linePos};
  transition: 300ms ease-out;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const TouchButtons = styled.div`
  display: none;
  position: absolute;
  justify-content: space-between;

  ${media.mobile} {
    display: flex;
    top: 95vw;
    left: 2.5vw;
    width: 95vw;
    height: 17vw;
  }
`
const TouchNext = styled(chevronSVG)<{ disabled: boolean }>`
  background: rgba(5, 5, 5, 0.2);
  border: 1px solid ${colors.white};
  box-sizing: border-box;
  opacity: ${props => props.disabled ? '0' : '1'};
  transition: opacity 200ms ease;
  path {
    stroke: ${colors.white};
  }
  ${media.tablet} {
    height: 8vw;
    width: 8vw;
    padding-top: 0.5vw;
  }
  ${media.mobile} {
    height: 17vw;
    width: 17vw;
    padding-top: 1vw;

  }
`
const TouchPrevious = styled(TouchNext)`
  transform: rotate(180deg);
`

