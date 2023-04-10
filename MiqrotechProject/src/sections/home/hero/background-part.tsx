import React, { useRef } from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import media from "@styles/media";

type props = {
  imgData: any;
};

const BackgroundPart: React.FC<props> = ({ imgData }) => {
  const bgImageRef = useRef(null);

  return (
    <BackgroundImgContainer>
      <BackgroundImg ref={bgImageRef}>
        <GatsbyImage alt={imgData.title} image={imgData.gatsbyImageData} imgStyle={{width: '100%', height: '100%'}} />
      </BackgroundImg>
    </BackgroundImgContainer>
  );
};

export default BackgroundPart;

const BackgroundImgContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 52.5%;
  top: 0;
  left: 0;
  
  ${media.tablet} {
    width: 100%;
    height: 92.336vw;
    top: unset;
    bottom: 0;
  }

  ${media.mobile} {
    width: 100%;
    height: 60%;
    top: unset;
    bottom: 0;
  }
`;

const BackgroundImg = styled.div`
  object-fit: cover;
  object-position: top center;
  width: 100%;
  height: 100%;

  ${media.tablet} {
    object-position: center center;
  }
`;


