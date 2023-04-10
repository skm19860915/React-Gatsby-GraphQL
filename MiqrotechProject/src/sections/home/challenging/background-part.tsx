import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

type props = {
    imageRef1: any;
    imageRef2: any;
};

const BackgroundPart: React.FC<props> = ({imageRef1, imageRef2}) => {

  return (
    <div>
        <Image1Wrapper>
          <Image1 ref={imageRef1}>
            <StaticImage
              src={"../../../images/jpg/challenge1.jpg"} 
              alt="office space 1"
              placeholder="blurred"
              style={{width: '100%', height: '100%'}}
            />
          </Image1>
        </Image1Wrapper>
        <Image2Wrapper>
          <Image2 ref={imageRef2}>
            <StaticImage
              src={"../../../images/jpg/challenge2.jpg"} 
              alt="office space 2"
              placeholder="blurred"
              style={{width: '100%', height: '100%'}}
            />
          </Image2>
        </Image2Wrapper>
    </div>
  );
};

export default BackgroundPart;

const Image1Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${media.desktop} {
    width: 38.264vw;
    height: 52.5vw;
    top: 8.611vw;
    right: 3.472vw;
  }

  ${media.fullWidth} {
    width: 38.264vw;
    height: 52.5vw;
    top: 8.611vw;
    right: 3.472vw;
  }

  ${media.tablet} {
    width: 39.089vw;
    height: 52.878vw;
    top: 13.309vw;
    right: 5.995vw;
  }

  ${media.mobile} {
    width: 70.667vw;
    height: 95.467vw;
    top: 16vw;
    right: 0vw;
  }
`;

const Image1 = styled.div`
  width: 100%;
  height: 0%;
  object-fit: cover;
`;

const Image2Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${media.fullWidth} {
    width: 33.889vw;
    height: 35.972vw;
    right: 27.083vw;
    top: 41.944vw;
  }

  ${media.desktop} {
    width: 33.889vw;
    height: 35.972vw;
    right: 27.083vw;
    top: 41.944vw;
  }

  ${media.tablet} {
    width: 34.892vw;
    height: 37.05vw;
    right: 21.823vw;
    top: 54.556vw;
  }

  ${media.mobile} {
    width: 61.867vw;
    height: 65.6vw;
    right: unset;
    left: 0vw;
    top: 81.867vw;
  }
`;

const Image2 = styled.div`
  width: 100%;
  height: 0%;
  object-fit: cover;
`;
