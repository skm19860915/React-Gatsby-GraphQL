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
                <StaticImage src={'../../../images/jpg/standFor1.jpg'} alt="factory 1" placeholder="blurred" objectFit="cover"
                 objectPosition="center left" style={{width: '100%', height: '100%'}}/>
            </Img>
        </Img1Wrapper>
        <Img2Wrapper>
            <Img ref={imageRef2}>
                <StaticImage src={'../../../images/jpg/standFor2.jpg'} alt="factory 2" placeholder="blurred" objectFit="cover"
                    objectPosition="center left" style={{width: '100%', height: '100%'}}/>
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
  left: 0vw;

  ${media.fullWidth} {
    width: 51.806vw;
    height: 29.375vw;
    top: 11.458vw;
  }

  ${media.desktop} {
    width: 51.806vw;
    height: 29.375vw;
    top: 11.458vw;
  }

  ${media.tablet} {
    width: 41.557vw;
    height: 32.814vw;
    top: 8.743vw;
  }

  ${media.mobile} {
    width: 92.533vw;
    height: 73.067vw;
    top: 19.467vw;
  }
`
const Img2Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;

  ${media.fullWidth} {
    width: 30.347vw;
    height: 29.375vw;
    left: 26.875vw;
    top: 31.597vw;
  }

  ${media.desktop} {
    width: 30.347vw;
    height: 29.375vw;
    left: 26.875vw;
    top: 31.597vw;
  }

  ${media.tablet} {
    width: 35.689vw;
    height: 28.024vw;
    left: 13.413vw;
    top: 36.527vw;
  }

  ${media.mobile} {
    width: 71.200vw;
    height: 62.400vw;
    left: 29.600vw;
    top: 81.867vw;
  }
`
const Img = styled.div`
  width: 100%;
  height: 0%;
`
const Content = styled.div`
`;