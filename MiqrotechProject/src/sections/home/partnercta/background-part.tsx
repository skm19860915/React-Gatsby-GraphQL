import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import media from "@styles/media";

type props = {
    bgImageRef: any;
};

const BackgroundPart: React.FC<props> = ({bgImageRef}) => {

  return (
    <ImageWrapper>
        <Image ref={bgImageRef}>
            <StaticImage
                src={"../../../images/jpg/doublePipes.jpg"}
                alt="pipeline"
                placeholder="blurred"
                style={{width: '100%', height: '100%'}}
            />
        </Image>
    </ImageWrapper>
  );
};

export default BackgroundPart;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  overflow: hidden;

  ${media.fullWidth} {
    width: 69.3vw;
    height: 59.8vw;
    top: 7.8vw;
  }

  ${media.desktop} {
    width: 69.3vw;
    height: 59.8vw;
    top: 7.8vw;
  }

  ${media.tablet} {
    width: 64.029vw;
    height: 58.993vw;
    top: 0vw;
  }

  ${media.mobile} {
    top: 0vw;
    width: 100vw;
    height: 106.133vw;
  }
`

const Image = styled.div`
  width: 100%;
  height: 100%;
`;


