import React, { useRef, useEffect, useState, useContext, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScreenContext} from "@components/Layout";

import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

import useMedia from '@hooks/useMedia'

type props = {
  startingX: number;
  startingY: number;
  startingCX: number;
  startingCY: number;
  xOffset: number;
  yOffset: number;
  location: string;
  locationText: string;
  type: string;
  trigger: boolean;
};

const LocationSVGR: React.FC<props> = ({
  startingX,
  startingY,
  startingCX,
  startingCY,
  xOffset,
  yOffset,
  location,
  locationText,
  trigger,
  type,
}) => {
  const [x2, setX2] = useState(startingX);
  const [y2, setY2] = useState(startingY);
  const [cx, setCx] = useState(startingCX);
  const [cy, setCy] = useState(startingCY);
  const [line1, setLine1] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 });
  const [line2, setLine2] = useState({ x1: 0, y1: 0 });
  const [viewBox, setViewBox] = useState("0 0 0 0");
  const [translate, setTranslate] = useState("");
  const [distance, setDistance] = useState(0);
  const [rectLength, setRectLength] = useState(0);
  const [rectD, setRectD] = useState(`M 0 60 L 246 60 L 246 130 L 0 130 z`);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const rectRef = useRef(null);
  const contentRef = useRef(null);

  const screen = useContext(ScreenContext);

  const findDistance = useCallback(() => {
    let x = (x2 - line2.x1) ** 2;
    let y = (y2 - line2.y1) ** 2;

    let d = Math.sqrt(x + y);

    setDistance(d);
  }, [])

  useEffect(() => {
    setX2(startingX + xOffset / 4);
    setY2(startingY + yOffset / 4);
    setCx(startingCX + xOffset / 4);
    setCy(startingCY + yOffset / 4);
  }, [xOffset, yOffset]);

  useEffect(() => {
    if (screen.mobile) {
      setViewBox("0 0 325 90");
      setTranslate("translate(0, 0)");
      setRectD(`M 0 0 L 325 0 L 325 90 L 0 90 z`);
    } else {
      switch (location) {
        case "ohio":
          setLine1({ x1: 71.4943, x2: 96, y1: 90, y2: 90 });
          setLine2({ x1: 71.4943, y1: 90.0807 });
          setViewBox("0 0 342 335");
          setTranslate("translate(95.5, 0.5)");
          break;

        case "california":
          setLine1({ x1: 123.186, x2: 123, y1: 155, y2: 130 });
          setLine2({ x1: 123.186, y1: 154.536 });
          setViewBox("0 0 258 224");
          setTranslate("translate(0.5, 0.5)");
          break;

        case "texas":
          setLine1({ x1: 270.591, x2: 245.591, y1: 210, y2: 210 });
          setLine2({ x1: 269.591, y1: 210.713 });
          setViewBox("0 0 397 246");
          setTranslate("translate(0.5, 115.5)");
          break;

        case "florida":
          setLine1({ x1: 222, x2: 222, y1: 155, y2: 130 });
          setLine2({ x1: 222, y1: 155 });
          setViewBox("0 0 346 230");
          setTranslate("translate(99.5, 0.5)");
          break;
      }

      findDistance();
    }
    setRectLength(rectRef.current.getTotalLength());
  }, [screen.mobile]);

  useEffect(() => {
    if (trigger) {
      const tl = gsap.timeline();
      tl.to(line2Ref.current, {
        duration: 0.4,
        strokeDashoffset: "0",
      });
      tl.to(line1Ref.current, {
        duration: 0.2,
        strokeDashoffset: "0",
      });
      tl.to(rectRef.current, {
        duration: 1,
        strokeDasharray: `${rectLength} 0`,
      });
      tl.to(contentRef.current, {
        duration: 0.5,
        opacity: 1,
      });
      return () => {
        tl.kill();
      };
    }
  }, [trigger]);

  return (
    <SVG viewBox={viewBox} fill="none">
      {!screen.mobile && (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r="15.5"
            fill={colors.keppel100}
            fillOpacity="0.2"
          />
          <circle cx={cx} cy={cy} r="15" stroke={colors.keppel100} />
        </g>
      )}
      {!screen.mobile && (
        <line
          ref={line2Ref}
          x2={line2.x1}
          y2={line2.y1}
          x1={x2}
          y1={y2}
          stroke={colors.keppel100}
          strokeDasharray={distance}
          strokeDashoffset={distance}
        />
      )}
      {!screen.mobile && (
        <line
          ref={line1Ref}
          x1={line1.x1}
          x2={line1.x2}
          y1={line1.y1}
          y2={line1.y2}
          stroke={colors.keppel100}
          strokeDasharray={"25"}
          strokeDashoffset={"25"}
        />
      )}
      <g transform={translate}>
        <path
          ref={rectRef}
          strokeDasharray={`0 ${rectLength}`}
          stroke={colors.keppel100}
          strokeWidth={1}
          d={rectD}
          fill={colors.black}
          fillOpacity="0.8"
        />
        <g ref={contentRef} opacity="0">
          {/* <rect
            x="27.5"
            y={useMedia("67", "67", "67", "85.5")}
            width={useMedia("191", "191", "191", "270")}
            height="1"
            fill={colors.jetBlack60}
          /> */}
          {/* <path fillRule="evenodd" transform={useMedia("translate(-95)", "translate(-95)", "translate(-95)", "translate(-15, 5)")} clipRule="evenodd" d="M311.195 23.3333H304.805V22H312.805H313.472V22.6667V30.6667H312.139V24.2755L303.943 32.4714L303 31.5286L311.195 23.3333Z" fill={colors.culturedWhite100}/> */}
          <Text1 x="20" y={useMedia(90, 90, 90, 45)}>
            {locationText}
          </Text1>
          <Text2 x="20" y={useMedia(105, 105, 115, 70)}>
            {type}
          </Text2>
          {/* <Address x="27.5" y={useMedia("95", "95", "95", "115")}>
            {address1}
          </Address>
          <Address x="27.5" y={useMedia("110", "110", "110", "140")}>
            {address2}
          </Address> */}
        </g>
      </g>
    </SVG>
  );
};

export default LocationSVGR;

const SVG = styled.svg<{ width: string }>`
  width: 100%;
  height: 100%;
`;

const Text1 = styled.text`
  fill: ${colors.culturedWhite80};

  ${text.desktopSmallBody}
  font-size: 14px;
  
  ${media.tablet} {
    font-size: 20px;
  }

  ${media.mobile} {
    font-size: 22px;
  }
`;

const Text2 = styled.text`
fill: ${colors.keppel100};

  ${text.desktopSmallBody}
  font-size: 12px;
  
  ${media.tablet} {
    font-size: 18px;
  }

  ${media.mobile} {
    font-size: 18px;
  }
`;
