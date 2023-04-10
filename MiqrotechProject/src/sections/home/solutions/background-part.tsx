import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

const BackgroundPart: React.FC = () => {

  return (
    <Background>
        <StaticImage
            src={"../../../images/png/accentBG.png"}
            alt="gradient"
            placeholder="blurred"
            style={{width: '100%', height: '100%'}}
        />
    </Background>
  );
};

export default BackgroundPart;

const Background = styled.div`
  position: absolute;
  transform: rotate(152deg);
  opacity: 0.4;

  ${media.fullWidth} {
    width: 96vw;
    height: 96vw;
    right: -30.556vw;
    top: -6.736vw;
  }

  ${media.desktop} {
    width: 96vw;
    height: 96vw;
    right: -30.556vw;
    top: -6.736vw;
  }

  ${media.tablet} {
    width: 114.628vw;
    height: 114.628vw;
    top: 33.189vw;
    left: 20.283vw;
  }

  ${media.mobile} {
    width: 250vw;
    height: 250vw;
    top: 101.189vw;
    left: -49.717vw;
  }
`;


