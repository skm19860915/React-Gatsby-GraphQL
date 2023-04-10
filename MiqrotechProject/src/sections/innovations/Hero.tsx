import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import addToMailchimp from 'gatsby-plugin-mailchimp'
import loadable from '@loadable/component'

import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

import useMedia from "@hooks/useMedia";

import PrimaryButton from "@components/PrimaryButton";
const Animation = loadable(() => import("@components/Animation"));

type props = {
  loading: boolean;
};

const Hero: React.FC<props> = ({ loading }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("")

  const inputRowRef = useRef(null);
  const successTextRef = useRef(null);

  useEffect(() => {
    if (success) {
      const tl = gsap.timeline();

      tl.to(
        inputRowRef.current,
        {
          duration: 0.8,
          opacity: 0,
        },
        0
      );
      tl.set(inputRowRef.current, {
        display: "none",
      });
      tl.to(successTextRef.current, {
        duration: 0.8,
        opacity: 1,
      });
    }
  }, [success]);

  const onSubmit = (e: any) => {
    e.preventDefault()
    setError("")
    addToMailchimp(email, {}, "https://miqrotech.us5.list-manage.com/subscribe/post?u=2327c39cb10439bcfe1fa5d95&amp;id=107dd7b425")
      .then(data => {
        if (data.result === "success") {
          setSuccess(true)
        } else {
          if (data.msg.includes('already subscribed')) {
            setError(`${email} is already subscribed.`)
          } else if (data.msg.includes('invalid')) {
            setError("Please enter a valid email.")
          } else if (data.msg.includes('too many')) {
            setError("Too many subscribe attempts. Try again later.")
          } else {
            setError(data.msg)
          }
        }
      })
  }

  return (
    <Wrapper>
      <AnimationWrapper>
        <Gradient />
        <Animation followMouse />
      </AnimationWrapper>

      <Content>
        <Title>
          <span>Future</span>
          <span>Innovations</span>
        </Title>
        <Text>{"We are passionately working to develop new solutions. Stay up-to-date on our major breakthroughs by signing up for our newsletter."}</Text>
        <InputRow ref={inputRowRef} onSubmit={onSubmit}>
          <Input
            value={email}
            placeholder="your.email@example.com"
            onChange={(e) => {
              setError('')
              setEmail(e.target.value)
            }}
          />
          <PrimaryButton
            backgroundColor={colors.keppel100}
            hoverColor={colors.keppel60}
            textColor={colors.black}
            text="Sign Up"
            width={useMedia(
              "fit-content",
              "fit-content",
              "fit-content",
              "100%"
            )}
            onClick={onSubmit}
          />
        </InputRow>
        <P ref={successTextRef}>
          Thanks for signing up. Expect great things soon.
        </P>
        {error && <Error>{error}</Error>}
      </Content>
    </Wrapper>
  );
};

export default Hero;

// const Wrapper = styled.section`
//   height: 100vh;

//   ${media.tablet} {
//     height: 141.796vw;
//   }
// `;

const Wrapper = styled.section`
  padding-bottom:40px;
  position:relative;

  ${media.tablet} {
    height: 141.796vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  padding-top: 9.167vw;

  ${media.tablet} {
    padding-top: 24.072vw;
  }

  ${media.mobile} {
    padding-top: 44.8vw;
  }
`;

const AnimationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;

  ${media.tablet} {
    height: 141.796vw;
  }
  ${media.mobile} {
    height: 100vh;
  }
`;

const Title = styled.h1`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${colors.culturedWhite100};

  color: transparent;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  text-align: center;

  span {
    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 0.7)),
      to(rgba(0, 0, 0, 0))
    );
  }

  font-family: Helvetica Neue Medium;
  font-style: normal;
  font-weight: 500;
  line-height: 75%;
  letter-spacing: -0.02em;
  margin-top: 0vw;

  font-size: 14.583vw;
  width: 75.653vw;
  margin-bottom: 2.847vw;

  ${media.tablet} {
    font-size: 17.246vw;
    width: 88.982vw;
    margin-bottom: 6.946vw;
  }

  ${media.mobile} {
    font-size: 19.2vw;
    width: 100%;
    margin-bottom: 11.733vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite60};
  text-align: center;
  display: flex;
  flex-direction: column;

  ${text.desktopXXSHeading}
  width: 65.417vw;
  margin-bottom: 4.792vw;

  ${media.tablet} {
    ${text.tabletXXSHeading}
    width: 57.964vw;
    margin-bottom: 20.497vw;
  }

  ${media.mobile} {
    ${text.mobilePetiteHeading}
    width: 86.4vw;
    margin-bottom: 12.267vw;
  }
`;

const P = styled.p`
  color: ${colors.keppel100};
  opacity: 0;

  ${text.desktopPetiteHeading}

  ${media.tablet} {
    ${text.tabletPetiteHeading}
  }

  ${media.mobile} {
    ${text.mobilePetiteHeading}
    width: 86.4vw;
    text-align: center;
  }
`;

const Error = styled.p`
  color: ${colors.darkOrange100};
  width: 38.85vw;
  text-align: left;

  ${text.desktopBodyCopy1}

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 51.2vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 86.4vw;
    text-align: center;
  }
`;

const Gradient = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(${colors.black}, rgba(0, 0, 0, 0));
  height: 100%;
`;

const InputRow = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 1;

  width: 67.986vw;

  ${media.tablet} {
    width: 85vw;
  }

  ${media.mobile} {
    width: 93.333vw;
    flex-direction: column;
  }
`;

const Input = styled.input`
  display: flex;
  align-items: flex-start;
  border-radius: 0px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid ${colors.white};
  background: transparent;
  color: ${colors.white};

  ::placeholder {
    color: rgba(214, 214, 214, 0.5);
  }

  ${text.desktopBodyCopy1}
  width: 27.778vw;
  height: 2.639vw;
  margin-right: 1.389vw;

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 35vw;
    height: 5vw;
    margin-right: 3vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 100%;
    margin-bottom: 5vw;
    height: 9.333vw;
  }
`;
