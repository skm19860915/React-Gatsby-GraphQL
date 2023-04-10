import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import colors from "@styles/colors";
import media from "@styles/media";
import BackgroundPart from "./insights/background-part";
import ContentPart from "./insights/content-part";
import ToolTipPart from "./insights/tooltip-part";

type props = {
  txt1: string[];
  txt2: string;
}

const Insights: React.FC<props> = ({ txt1, txt2 }) => {
  const bgImageRef = useRef(null)
  const wrapperRef = useRef(null);
  const tooltip1Ref = useRef(null);
  const tooltip2Ref = useRef(null);
  const tooltip3Ref = useRef(null);

  const [triggerTitle, setTriggerTitle] = useState(false);
  const [triggerText, setTriggerText] = useState(false);
  const [triggerToolTip1, setTriggerToolTip1] = useState(false);
  const [triggerToolTip2, setTriggerToolTip2] = useState(false);
  const [triggerToolTip3, setTriggerToolTip3] = useState(false);
  const [showToolTip1, setShowToolTip1] = useState(false);
  const [showToolTip2, setShowToolTip2] = useState(false);
  const [showToolTip3, setShowToolTip3] = useState(false);
  const [timelineToolTip, setTimeLineToolTip] = useState(null);

  useEffect(() => {
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top-=20% top'
      },
      onComplete: () => {
      }
    });

    tlScroll.to(bgImageRef.current, {
      duration: 1,
      height: "100%",
      ease: "circ.inOut",
    }, 0);
    tlScroll.call(setTriggerTitle, [true], 0.2);
    tlScroll.call(setTriggerText, [true], 0.8);
    tlScroll.to(tooltip1Ref.current, {
      opacity: 1,
    }, 0);
    tlScroll.to(tooltip2Ref.current, {
      opacity: 1,
    }, 0);
    tlScroll.to(tooltip3Ref.current, {
      opacity: 1,
    }, 0);
    tlScroll.call(setTriggerToolTip1, [true]);
    tlScroll.call(setTriggerToolTip2, [true], 0.5);
    tlScroll.call(setTriggerToolTip3, [true], 1);

    const toolTipTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    toolTipTl.call(setShowToolTip1, [true], 0);
    toolTipTl.call(setShowToolTip1, [false], 2);
    toolTipTl.call(setShowToolTip2, [true], 4);
    toolTipTl.call(setShowToolTip2, [false], 6);
    toolTipTl.call(setShowToolTip3, [true], 8);
    toolTipTl.call(setShowToolTip3, [false], 10);
    setTimeLineToolTip(toolTipTl);

    return () => {
      tlScroll.kill();
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Bottom id="hero-bottom">
        <BackgroundPart bgRef={bgImageRef} />
        <ContentPart titleText={txt1} detailText={txt2} titleTrigger={triggerTitle} detailTrigger={triggerText} />
        <ToolTipPart tooltipRef1={tooltip1Ref} tooltipRef2={tooltip2Ref} tooltipRef3={tooltip3Ref}
        tooltipTrigger1={triggerToolTip1} tooltipTrigger2={triggerToolTip2} tooltipTrigger3={triggerToolTip3}
        tooltipShow1={showToolTip1} tooltipShow2={showToolTip2} tooltipShow3={showToolTip3} tooltipTimeLine={timelineToolTip} />
      </Bottom>
    </Wrapper>
  );
};

export default Insights;

const Wrapper = styled.section`
  position: relative;
  // background-color: ${colors.black};
  width: 100vw;
`;

const Bottom = styled.div`
  position: relative;
  height: 74.861vw;

  ${media.tablet} {
    height: 101.916vw;
  }

  ${media.mobile} {
    height: 413.867vw;
  }
`
