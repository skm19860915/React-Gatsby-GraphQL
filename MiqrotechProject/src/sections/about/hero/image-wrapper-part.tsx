import React from "react";
import styled from "styled-components";
import media from "@styles/media";
import { StaticImage } from "gatsby-plugin-image";

type props = {
  imageRef1: any;
  imageRef2: any;
};

const ImageWrapperPart: React.FC<props> = ({ imageRef1, imageRef2 }) => {

  return (
    <Content>
        <Img1Wrapper>
          <Img ref={imageRef1}>
            <StaticImage src={'../../../images/jpg/aboutImg1.jpg'} alt="pipes" objectFit="cover" placeholder="blurred"
              loading="eager" style={{width: '100%', height: '100%'}}/>
          </Img>
        </Img1Wrapper>
        <Img2Wrapper>
          <Img ref={imageRef2}>
            <StaticImage src={'../../../images/jpg/aboutImg2.jpg'} alt="office space" objectFit="cover" placeholder="blurred"
              loading="eager" style={{width: '100%', height: '100%'}}/>
          </Img>
        </Img2Wrapper>
    </Content>
  );
};

export default ImageWrapperPart;

const Img1Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;

  ${media.fullWidth} {
    width: 45.417vw;
    height: 37.986vw;
    right: 3.403vw;
    top: 15.833vw;
  }

  ${media.desktop} {
    width: 45.417vw;
    height: 37.986vw;
    right: 3.403vw;
    top: 15.833vw;
  }

  ${media.tablet} {
    width: 49.102vw;
    height: 59.042vw;
    right: 0vw;
    top: 55.449vw;
  }

  ${media.mobile} {
    width: 69.333vw;
    height: 94.667vw;
    right: 0vw;
    top: 77vw;
  }
`

const Img2Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;

  width: 35.486vw;
  height: 24.375vw;
  right: 40.139vw;
  top: 36.319vw;

  ${media.tablet} {
    width: 57.964vw;
    height: 42.036vw;
    right: 21.078vw;
    top: 84.431vw;
  }

  ${media.mobile} {
    width: 68.267vw;
    height: 71.467vw;
    right: 25.067vw;
    top: 150vw;
  }
`

const Img = styled.div`
  width: 100%;
  height: 100%;
`

const Content = styled.div`
`;