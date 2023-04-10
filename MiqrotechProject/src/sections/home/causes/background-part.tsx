import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

type props = {
    bgRef: any;
};

const BackgroundPart: React.FC<props> = ({bgRef}) => {

  return (
    <ImgWrapper>
        <Img ref={bgRef}>
          <StaticImage
            src={"../../../images/jpg/causes.jpg"}
            alt="causes"
            placeholder="blurred"
            objectFit="cover"
            style={{width: '100%', height: '100%'}}
          />
        </Img>
    </ImgWrapper>
  );
};

export default BackgroundPart;

const ImgWrapper = styled.div`
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${media.fullWidth} {
    width: 42.986vw;
    height: 688px;
    right: 3.611vw;
    top: 7.431vw;
  }

  ${media.desktop} {
    width: 42.986vw;
    height: 47.778vw;
    right: 3.611vw;
    top: 7.431vw;
  }

  ${media.tablet} {
    width: 43.165vw;
    height: 52.758vw;
    right: 0vw;
    top: 13.429vw;
  }

  ${media.mobile} {
    width: 86.667vw;
    height: 105.867vw;
    right: 6.667vw;
    top: 29.333vw;
  }
`;

const Img = styled.div`
  width: 100%;
  height: 0%;
  object-fit: cover;
`;

