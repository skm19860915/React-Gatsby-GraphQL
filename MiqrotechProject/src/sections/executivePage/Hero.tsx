import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { navigate } from "gatsby";

import useMedia from "@hooks/useMedia";

import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";

import PrimaryButton from "@components/PrimaryButton";
import TextAnimation from "@components/TextAnimation";

import { ReactComponent as LinkedinSVG } from "@svg/linkedIn.svg";

type props = {
  executive: any;
};

const Hero: React.FC<props> = ({ executive }) => {
  const imgRef = useRef(null);

  const [triggerName, setTriggerName] = useState(false);
  const [triggerRole, setTriggerRole] = useState(false);

  const imgHeight = useMedia('34.514vw', '34.514vw', '40vw', '72vw')

  useEffect(() => {
      const tl = gsap.timeline();
      tl.to(imgRef.current, {
        duration: 0.8,
        height: imgHeight,
        ease: "circ.inOut",
      });
      tl.call(setTriggerName, [true], 0);
      tl.call(setTriggerRole, [true], 0.2);
    
  }, []);

  return (
    <Wrapper>
      <ButtonContainer>
        <PrimaryButton
          text="Back"
          padding="0vw"
          left
          onClick={() => {
            navigate(-1);
          }}
        />
      </ButtonContainer>
      <ImgWrapper ref={imgRef}>
        <StyledImg src={executive.headshot.file.url} alt={executive.fullName}/>
      </ImgWrapper>
      <Content>
        {executive.linkedin && (
          <A href={executive.linkedin} target="_blank no-referer">
            <Linkedin />
          </A>
        )}
        <Title>
          <TextAnimation
            textArray={[() => executive.fullName]}
            className="bio-name"
            height={useMedia("3.333vw", "3.333vw", "5.749vw", "6.667vw")}
            trigger={triggerName}
          />
        </Title>
        <Role>
          <TextAnimation
            textArray={[() => executive.title]}
            className="bio-role"
            height={useMedia("1.181vw", "1.181vw", "3.114vw", "5.600vw")}
            trigger={triggerRole}
          />
        </Role>
        <HR />
        <Text>{executive.bio.bio}</Text>
      </Content>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;

  ${media.fullWidth} {
    padding-top: 14.167vw;
    padding-left: 11.319vw;
    padding-bottom: 5.972vw;
    padding-right: 6.597vw;
  }

  ${media.desktop} {
    padding-top: 14.167vw;
    padding-left: 11.319vw;
    padding-bottom: 5.972vw;
    padding-right: 6.597vw;
  }

  ${media.tablet} {
    flex-direction: column;
    padding-top: 24.072vw;
    padding-left: 13.413vw;
    padding-right: 13.413vw;
    padding-bottom: 10.06vw;
  }

  ${media.mobile} {
    flex-direction: column;
    padding-top: 46.933vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 11.467vw;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 0vw;
  width: 34.375vw;

  ${media.tablet} {
    width: 100%;
  }

  ${media.mobile} {
    width: 100%;
  }
`;

const StyledImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;

  ${media.tablet} {
    background-color: ${colors.culturedWhite20};
    object-position: 50%;
    object-fit: contain;
  }

  ${media.mobile} {
    object-position: top center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;

  ${media.fullWidth} {
    width: 42.847vw;
    padding-bottom: 2.014vw;
    padding-top: 2.014vw;
  }

  ${media.desktop} {
    width: 42.847vw;
    padding-bottom: 2.014vw;
    padding-top: 2.014vw;
  }

  ${media.tablet} {
    width: 100%;
    padding-top: 8.144vw;
  }

  ${media.mobile} {
    width: 100%;
    padding-top: 8vw;
  }
`;

const Title = styled.h1`
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.fullWidth} {
    ${text.desktopSHeading}
    margin-bottom: 0.694vw;
  }

  ${media.desktop} {
    ${text.desktopSHeading}
    margin-bottom: 0.694vw;
  }

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-bottom: 1.198vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-bottom: 2.667vw;
  }
`;

const Role = styled.p`
  color: ${colors.keppel100};
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    margin-bottom: 2.778vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    margin-bottom: 2.778vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 5.333vw;
  }
`;

const HR = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.white};
  border: none;
  outline: none;
  margin-top: 0vw;

  ${media.fullWidth} {
    margin-bottom: 2.083vw;
  }

  ${media.desktop} {
    margin-bottom: 2.083vw;
  }

  ${media.tablet} {
    margin-bottom: 7.305vw;
  }

  ${media.mobile} {
    margin-bottom: 10.667vw;
  }
`;

const Text = styled.p`
  width: 100%;
  color: ${colors.white};
  display: flex;
  flex-directon: column;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`;

const ButtonContainer = styled.div`
  position: absolute;

  ${media.fullWidth} {
    top: 9.583vw;
    left: 11.319vw;
  }

  ${media.desktop} {
    top: 9.583vw;
    left: 11.319vw;
  }

  ${media.tablet} {
    top: 16.168vw;
    left: 5.988vw;
  }

  ${media.mobile} {
    top: 28.533vw;
    left: 6.667vw;
  }
`;

const Linkedin = styled(LinkedinSVG)`
  height: auto;

  ${media.fullWidth} {
    width: 1.667vw;
  }

  ${media.desktop} {
    width: 1.667vw;
  }

  ${media.tablet} {
    width: 2.874vw;
  }

  ${media.mobile} {
    width: 6.4vw;
  }
`;

const A = styled.a`
  position: absolute;
  z-index: 3;
  cursor: pointer;
  right: 0;

  ${media.fullWidth} {
    top: 2.014vw;
  }

  ${media.desktop} {
    top: 2.014vw;
  }

  ${media.tablet} {
    top: 8.144vw;
  }

  ${media.mobile} {
    top: 8vw;
  }
`;
