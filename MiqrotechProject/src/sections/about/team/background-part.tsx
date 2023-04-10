import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

type props = {
    imageRef: any;
};

const BackgroundPart: React.FC<props> = ({ imageRef }) => {

  return (
    <ImageWrapper>
        <Img ref={imageRef}>
            <StaticImage src={'../../../images/jpg/team.jpg'} alt="mIQrotech team" placeholder="blurred" objectFit="cover" style={{width: '100%', height: '100%'}}/>
        </Img>
    </ImageWrapper>
  );
};

export default BackgroundPart;

const ImageWrapper = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${media.fullWidth} {
    top: 11.042vw;
    right: 7.639vw;
    width: 48.333vw;
    height: 36.458vw;
  }

  ${media.desktop} {
    top: 11.042vw;
    right: 7.639vw;
    width: 48.333vw;
    height: 36.458vw;
  }

  ${media.tablet} {
    top: 15.808vw;
    right: 5.749vw;
    width: 47.665vw;
    height: 44.91vw;
  }

  ${media.mobile} {
    width: 86.667vw;
    height: 98.933vw;
    top: 27.467vw;
    right: 6.667vw;
  }
`;

const Img = styled.div`
  width: 100%;
  height: 0%;
`;

