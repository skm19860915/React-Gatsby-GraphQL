import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { OpenFormContext } from "@components/Layout";
import { StaticImage } from "gatsby-plugin-image";
import loadable from '@loadable/component'

import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";

import useMedia from "@hooks/useMedia";

const TextAnimation = loadable(() => import("@components/TextAnimation"));
const PrimaryButton = loadable(() => import("@components/PrimaryButton"));

type props = {
  txt1: string[];
  txt2: string;
  tlEnd:any;
  tlStart:any;
};

const Learn: React.FC<props> = ({ txt1, txt2, tlStart, tlEnd }) => {
  const BGRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputRowRef = useRef(null);
  const successTextRef = useRef(null);
  const contentRef = useRef(null);
  const openForm = useContext(OpenFormContext);
  const [titleTrigger, setTitleTrigger] = useState(false);
  const [textTrigger, setTextTrigger] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: tlStart,
          end: tlEnd,
        },
      });

      scrollTl.to(
        contentRef.current,
        {
          duration: 1,
          opacity: 1,
        },
        0
      );
      scrollTl.call(setTitleTrigger, [true], 1);
      scrollTl.call(setTextTrigger, [true], 2);
      scrollTl.to(
        inputRowRef.current,
        {
          duration: 0.8,
          opacity: 1,
        },
        2.2
      );

      return () => {
        scrollTl.kill();
      };
    
  }, []);

  const handleSubmit = () => {
    openForm(true);
  };

  useEffect(() => {
    if (success) {
      gsap.to(inputRowRef.current, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          gsap.set(inputRowRef.current, {
            display: "none",
          });
        },
      });

      gsap.fromTo(
        successTextRef.current,
        {
          display: "flex",
        },
        {
          duration: 1,
          opacity: 1,
          delay: 1.5,
        }
      );
    }
  }, [success]);

  return (
    <Wrapper ref={wrapperRef}>
      <BG ref={BGRef}>
        <StaticImage
          src={"../../images/jpg/LearnBG.jpg"} 
          alt="pipeline with mountains"
          placeholder="blurred"
          objectFit="cover"
          quality={80}
          loading="lazy"
          style={{width: '100%', height: '100%'}}
        />
      </BG>
      <Content ref={contentRef}>
        <Title>
          <TextAnimation
            textArray={txt1 || []}
            className="learn-title"
            height={useMedia("4.861vw", "4.861vw", "8.383vw", "12.8vw")}
            trigger={titleTrigger}
          />
        </Title>
        <Text>
          <TextAnimation
            textArray={txt2}
            className="learn-text"
            height={useMedia("3.75vw", "3.75vw", "6.707vw", "22.4vw")}
            trigger={textTrigger}
          />
        </Text>
        <InputRow ref={inputRowRef}>
          <PrimaryButton
            text="Schedule a consultation"
            backgroundColor={colors.keppel100}
            hoverColor={colors.keppel60}
            textColor={colors.jetBlack100}
            onClick={handleSubmit}
            width={useMedia("fit-content", "fit-content", "fit-content", "100%")}
          />
        </InputRow>
        <SuccessText ref={successTextRef}>
          Thanks, check your email inbox for access to the case study
        </SuccessText>
      </Content>
    </Wrapper>
  );
};

export default Learn;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  position: relative;

  height: 60.875vw;
  padding-top: 21.528vw;

  ${media.tablet} {
    height: 123.114vw;
    padding-top: 0vw;
  }

  ${media.mobile} {
    padding-top: 0vw;
    height: 216.533vw;
  }
`;

const BG = styled.div`
  object-fit: cover;

  width: 100vw;
  height: 58.611vw;

  ${media.tablet} {
    height: 123.114vw;
  }

  ${media.mobile} {
    height: 216.533vw;
  }
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.white};
  z-index: 2;
  opacity: 0;

  padding-top: 2.778vw;
  width: 47.903vw;
  height: 31.528vw;
  top: 34.167vw;
  left: 11.25vw;

  ${media.tablet} {
    width: 87.904vw;
    padding-top: 4.79vw;
    height: 54.371vw;
    top: 31.856vw;
    left: 5.988vw;
  }

  ${media.mobile} {
    width: 86.4vw;
    height: 141.867vw;
    padding-top: 10.667vw;
    top: 49.6vw;
    left: 6.667vw;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  color: ${colors.white};

  ${text.desktopLHeading}
  margin-bottom: 2.083vw;

  ${media.tablet} {
    ${text.tabletLHeading}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 8vw;
  }
`;

const Text = styled.p`
  display: flex;
  flex-direction: column;
  color: ${colors.white};

  ${text.desktopXXSHeading}
  margin-bottom: 4.167vw;
  width: 33.125vw;

  ${media.tablet} {
    ${text.tabletXXSHeading}
    margin-bottom: 7.186vw;
    width: 57.126vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-bottom: 13.333vw;
    width: 100%;
  }
`;

const SuccessText = styled(Text)`
  width: auto;
  opacity: 0;
  display: none;

  ${text.desktopBodyCopy1}

  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  opacity: 0;

  ${media.mobile} {
    flex-direction: column;
  }
`;


