import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";

import text from "@styles/text";
import colors from "@styles/colors";

type props = {
  text: string;
  onMouseEnter?: any;
  active: any;
  startingTextColor?: string;
};

const StyledLink: React.FC<props> = ({
  text,
  onMouseEnter,
  active,
  startingTextColor,
}) => {
  const hrRef = useRef(null);
  const lineRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    onMouseEnter();

    gsap.to(hrRef.current, {
      duration: 0.5,
      width: "100%",
      ease: "circ.inOut",
    });
  }, [onMouseEnter, hrRef])

  useEffect(() => {
    if (active) {
      gsap.to(hrRef.current, {
        duration: 0.5,
        width: "100%",
        ease: "circ.inOut",
      });
      gsap.to(lineRef.current, {
        duration: 0.5,
        opacity: 0,
        ease: "circ.inOut",
      });
    } else {
      gsap.to(hrRef.current, {
        duration: 0.5,
        width: "0%",
        ease: "circ.inOut",
      });
      gsap.to(lineRef.current, {
        duration: 0.5,
        opacity: 1,
        ease: "circ.inOut",
      });
    }
  }, [active, hrRef, lineRef]);

  return (
    <Wrapper onMouseEnter={handleMouseEnter} onClick={handleMouseEnter}>
      <Top
        $startingTextColor={startingTextColor}
        className="header-color-change"
      >
        {text}
        <SVG
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="4.5"
            x2="9"
            y2="4.5"
            strokeWidth="2"
            stroke={startingTextColor || colors.white}
            className="header-color-change"
          />
          <line
            ref={lineRef}
            x1="4.5"
            y1="0"
            x2="4.5"
            y2="9"
            strokeWidth="2"
            stroke={startingTextColor || colors.white}
            className="header-color-change"
          />
        </SVG>
      </Top>
      <HR ref={hrRef} />
    </Wrapper>
  );
};

export default StyledLink;

const Wrapper = styled.span`
  ${text.desktopBodyCopy2}
  text-decoration: none;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-left: 2.431vw;
  margin-right: 0.694vw;
`;

const Top = styled.span<{ $startingTextColor?: string }>`
  display: flex;
  align-items: center;
  color: ${(props) => props.$startingTextColor};
`;

const HR = styled.hr`
  width: 0%;
  background-color: ${colors.keppel100};
  height: 1px;
  border: none;
  margin: 0vw;
`;

const SVG = styled.svg`
  height: auto;
  width: 0.625vw;
  margin-left: 0.5vw;
`;
