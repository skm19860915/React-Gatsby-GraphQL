import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

const BackgroundPart: React.FC = () => {

  return (
    <Background>
        <StaticImage src={'../../../images/png/accentBG.png'} alt="gradient" objectFit="cover" 
            placeholder="blurred" loading="eager" style={{width: '100%', height: '100%'}}/>
    </Background>
  );
};

export default BackgroundPart;

const Background = styled.div`
  position: absolute;
  transform: rotate(32deg) scaleY(-1);

  width: 66.111vw;
  height: 66.111vw;
  bottom: -17vw;
  left: -4vw;

  ${media.tablet} {
    width: 100.838vw;
    height: 100.838vw;
    bottom: -27vw;
    left: -22vw;
  }

  ${media.mobile} {
    width: 160vw;
    height: 160vw;
    bottom: -2vw;
    left: -51vw;
  }
`
