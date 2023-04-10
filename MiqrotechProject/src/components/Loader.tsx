import React, { useEffect, useRef, useState, useMemo } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import * as animationData from "@json/loader.json";
import gsap from "gsap";

import colors from "@styles/colors";

type props = {
  loading: any;
  setLoading: any
};

const Loader: React.FC<props> = ({ loading, setLoading }) => {

  const lineRef = useRef(null);
  const wrapperRef = useRef(null);

  const hideWrapper = () => {
    gsap.to(wrapperRef.current, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        setLoading(false)
        gsap.set(wrapperRef.current, {
          display: "none",
        });
      },
    });
  }

  useEffect(() => {
    
    gsap.to(lineRef.current, {
      duration: 0.5,
      strokeDashoffset: 0,
      onComplete: () => {
        hideWrapper()
      }
    });
    
  }, []);

  const options = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      perserveAspectRatio: "xMidYMid slice",
    },
  }), [])

  return (
    <Wrapper ref={wrapperRef}>
      <Lottie
        options={options}
        width={300}
        height={180}
      />
      <Svg viewBox="0 0 100 1">
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          stroke={colors.jetBlack20}
          strokeWidth={1}
        />
        <line
          ref={lineRef}
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          stroke={colors.white}
          strokeWidth={1}
          strokeDashoffset="100"
          strokeDasharray="100"
        />
      </Svg>
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: ${colors.black};
`;

const Svg = styled.svg`
  height: auto;
  z-index: 1;
  position: relative;
  width: 150px;
`;
