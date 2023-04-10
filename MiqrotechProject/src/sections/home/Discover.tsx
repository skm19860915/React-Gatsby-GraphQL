import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import addToMailchimp from "gatsby-plugin-mailchimp";
import loadable from '@loadable/component'

import colors from "@styles/colors";
import media from "@styles/media";
import text from "@styles/text";

import DiscoverBG from "@jpg/discoverBG.jpg";

import useMedia from "@hooks/useMedia";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));
const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  txt1: string[];
};

const Discover: React.FC<props> = ({ txt1 }) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const inputRowRef = useRef(null);
  const successRef = useRef(null);

  const [triggerTitle, setTriggerTitle] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("")

  const tlStart = useMedia("top-=30%", "top-=30%", "top-=80%", "top-=60%");


  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: tlStart,
      },
    });

    tl.to(
      titleRef.current,
      {
        opacity: 1,
        duration: 0.1,
      },
      0
    );
    tl.call(setTriggerTitle, [true], 0);
    tl.to(
      inputRowRef.current,
      {
        duration: 0.5,
        opacity: 1,
      },
      0.5
    );

    return () => {
      tl.kill();
    };
    
  }, []);

  useEffect(() => {
    if (success) {
      const tl = gsap.timeline();

      tl.fromTo(inputRowRef.current, {
        display: 'flex'
      }, {
        duration: 0.5,
        opacity: 0,
      });

      tl.fromTo(successRef.current, {
        display: 'flex'
      }, {
        duration: 0.5,
        opacity: 1,
      });

      return () => {
        tl.kill();
      };
    }
  }, [success]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    addToMailchimp(
      email,
      {},
      "https://miqrotech.us5.list-manage.com/subscribe/post?u=2327c39cb10439bcfe1fa5d95&amp;id=107dd7b425"
    ).then((data) => {
      if (data.result === "success") {
        setSuccess(true);
        setError("")
        // window.open("/whitepaper.pdf", "_blank");
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
    <Wrapper ref={wrapperRef}>
      <Content ref={contentRef}>
        <Title ref={titleRef}>
          <TextAnimation
            textArray={txt1 || []}
            className="discover-title"
            height={useMedia("5.556vw", "5.556vw", "8.383vw", "12.800vw")}
            trigger={triggerTitle}
          />
        </Title>
        <InputRow ref={inputRowRef}>
          <Input
            type="text"
            value={email}
            placeholder="Enter Email Address"
            onChange={(e) => {
              setError('')
              setEmail(e.target.value)
            }}
          />
          <PrimaryButton
            type="submit"
            backgroundColor={colors.keppel100}
            hoverColor={colors.keppel60}
            textColor={colors.black}
            text="Get Exclusive Insights"
            width={useMedia(
              "fit-content",
              "fit-content",
              "fit-content",
              "100%"
            )}
            onClick={onSubmit}
          />
        </InputRow>
        {error && <Error>{error}</Error>}
        <Success ref={successRef}>
          Thanks, you'll hear from us soon!
        </Success>
      </Content>
    </Wrapper>
  );
};

export default Discover;

const Wrapper = styled.section`
  background-color: ${colors.culturedWhite40};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${media.fullWidth} {
    height: 69.931vw;
    width: 100vw;
  }

  ${media.desktop} {
    height: 69.931vw;
    width: 100vw;
  }

  ${media.tablet} {
    height: 100vh;
    width: 100vw;
  }

  ${media.mobile} {
    width: 100vw;
    height: 195.733vw;
  }
`;

const Content = styled.div`
  background-image: url(${DiscoverBG});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100vw;
  height: 69.931vw;

  ${media.tablet} {
    height: 100vh;
  }

  ${media.mobile} {
    height: 195.733vw;
  }
`;

const Title = styled.h2`
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  position: absolute;
  opacity: 0;

  ${text.desktopXLHeading}
  width: 67.986vw;
  left: 16.042vw;
  top: 17.5vw;

  ${media.tablet} {
    ${text.tabletLHeading}
    width: 86vw;
    left: 6.108vw;
    top: 23.952vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    width: 86.667vw;
    top: 39.733vw;
    left: 6.667vw;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;
  opacity: 0;

  width: 67.986vw;
  left: 16.042vw;
  top: 39.861vw;

  ${media.tablet} {
    width: 86vw;
    top: 69.82vw;
    left: 6.108vw;
  }

  ${media.mobile} {
    flex-direction: column;
    width: 86.667vw;
    top: 123.2vw;
    left: 6.667vw;
  }
`;

const Input = styled.input`
  display: flex;
  align-items: flex-start;
  border-radius: 0px;
  outline: none;
  border: none;
  border-radius: 0px;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.white};
  background: transparent;
  color: ${colors.white};

  ::placeholder {
    color: ${colors.white};
  }

  ${text.desktopBodyCopy1}
  width: 27.778vw;
  height: 2.639vw;
  margin-right: 1.389vw;
  padding-bottom: 1vw;

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 59vw;
    height: 5vw;
    margin-right: 1.078vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 100%;
    height: unset;
    margin-right: unset;
    margin-bottom: 5vw;
  }
`;

const Success = styled.p`
  color: ${colors.white};
  position: absolute;
  opacity: 0;
  display: none;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    top: 39.861vw;
    left: 16.042vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    top: 39.861vw;
    left: 16.042vw;
  }

  ${media.tablet} {
    ${text.tabletPetiteHeading}
    top: 69.820vw;
    left: 6.108vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    top: 123.200vw;
    left: 6.667vw;
    width: 63.2vw;
  }
`;

const Error = styled(Success)`
  color: ${colors.culturedWhite100};
  opacity: 1;
  display: block;

  top: 45.861vw;

  ${media.tablet} {
    top: 78.82vw;
  }

  ${media.mobile} {
    top: 154.2vw;
    width: 88vw;
  }
`

