import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

type props = {
    bgRef: any;
};

const BackgroundPart: React.FC<props> = ({bgRef}) => {

  return (
    <BackgroundImgContainer2>
        <BackgroundImg ref={bgRef}>
            <StaticImage
                src={"../../../images/jpg/heroBG2-min.jpg"}
                alt="piplines 2"
                placeholder="blurred"
                objectFit="cover"
                style={{width: '100%', height: '100%'}}
            />
        </BackgroundImg>
    </BackgroundImgContainer2>
  );
};

export default BackgroundPart;

const BackgroundImgContainer2 = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 53.75vw;
  width: 50.347vw;
  right: 0;
  top: 12.639vw;

  ${media.tablet} {
    width: 54.97vw;
    height: 72.814vw;
    top: unset;
    bottom: 11.138vw;
  }

  ${media.mobile} {
    width: 100%;
    height: 186.667vw;
    top: unset;
    bottom: 0;
  }
`;

const BackgroundImg = styled.div`
  object-fit: cover;
  object-position: top center;
  width: 100%;
  height: 0%;

  ${media.tablet} {
    object-position: center center;
  }
`;
