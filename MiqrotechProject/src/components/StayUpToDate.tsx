import React, { useContext, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ScreenContext } from "@components/Layout";
import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";
import gsap from "gsap";
import { ReactComponent as ChevronSVG } from "@svg/chevron.svg";
import stayUpToDate from "@png/stayUpToDate.png";
import stayUpToDateT from "@png/stayUpToDateT.png";
import stayUpToDateM from "@png/stayUpToDateM.png";
import addToMailchimp from "gatsby-plugin-mailchimp";

const StayUpToDate: React.FC<{}> = () => {
  const screen = useContext(ScreenContext)
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("")
  const [listener, setListener] = useState(false)

  const checkEvent = (e: any) => {
    if (e.key === 'Enter' && email) {
      onSubmit(e)
    } else {
      return
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', checkEvent)

    return () => {
      window.removeEventListener('keypress', checkEvent)
    }
  }, [])

  useEffect(() => {
    if (success) {
      const tl = gsap.timeline();

      tl.to(".blog_input", {
        duration: 2,
        onStart: () => setEmail("Thanks for Subscribing"),
      });
      tl.to(".blog_thanks", {
        duration: 0.1,
        onComplete: () => setEmail(""),
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
        } else if (data.msg.includes('too many')) {
          setError("Too many subscribe attempts. Try again later.")
        } else {
          setError(data.msg)
        }
      }
    });
  }

  return (
    <Wrapper>
      <StayUpToDateBG
        src={screen.mobile ? stayUpToDateM : screen.tablet ? stayUpToDateT : stayUpToDate}
        alt="gradient"
      />
      <Title>Stay up to date.</Title>
      <CardText>
        {"Join our email list to receive updates on mIQrotech announcements and industry advancements."}
      </CardText>
      <InputContainer onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => {
            setError('')
            setEmail(e.target.value)
          }}
        />
        <Chevron onClick={onSubmit} color={email ? colors.keppel100 : colors.white}/>
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default StayUpToDate;

const Chevron = styled(ChevronSVG)<{color: string}>`
  width: 2vw;
  height: 2vw;

  path {
    stroke: ${props => props.color};
  }
  ${media.tablet} {
    width: 3.4vw;
    height: 3.4vw;
  }
  ${media.mobile} {
    width: 7.5vw;
    height: 7.5vw;
  }
`;

const InputContainer = styled.form`
  width: fit-content;
  height: 2.4vw;
  position: relative;

  ${Chevron} {
    position: absolute;
    bottom: 0.2vw;
    left: 13vw;
  }

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    background: ${colors.white};
    transform: scaleX(1);
    transform-origin: right;
    opacity: 1;
    transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
  }
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    background: ${colors.keppel100};
    transform: scaleX(0);
    transform-origin: left;
    opacity: 0;
    transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
  }

  :hover {
    :after {
      transform: scaleX(1);
      opacity: 1;
      transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
    }
    :before {
      transform: scaleX(0);
      opacity: 0;
      transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
    }
  }
  ${media.tablet} {
    height: 4.1vw;
    width: 25.3vw;
    ${Chevron} {
      position: absolute;
      bottom: 0.2vw;
      left: 22vw;
    }
  }
  ${media.mobile} {
    height: 9.1vw;
    width: 86.4vw;
    ${Chevron} {
      position: absolute;
      bottom: 0.2vw;
      left: 90%;
    }
  }
`;

const StayUpToDateBG = styled.img`
  width: 81.6vw;
  height: 38.1vw;
  position: absolute;
  z-index: 0;
  right: 0;
  top: 0;

  ${media.tablet} {
    width: 100vw;
    height: 59.9vw;
  }
  ${media.mobile} {
    width: 100vw;
    height: auto;
  }
`;

const CardText = styled.div`
  ${text.desktopBodyCopy1};

  ${media.tablet} {
    ${text.tabletBodySmall};
  }
  ${media.mobile} {
    ${text.mobileBodySmall};
  }
  ${media.fullWidth} {
  }
`;

const Error = styled(CardText)`
  color: ${colors.darkOrange100} !important;
  margin-top: 1vw;
`

const Title = styled.h3`
  ${text.desktopSHeading};
  margin-bottom: 2.1vw;

  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 38.1vw;
  width: 100%;
  border-left: 2.1vw solid ${colors.keppel100};
  background: ${colors.black};
  box-sizing: border-box;
  padding: 8.3vw 0 11.9vw 11.3vw;
  ${text.desktopSmallBody};
  font-size: 0.9vw;
  ${Title} {
    ${text.desktopXLHeading};
    font-size: 5.6vw;
    color: ${colors.culturedWhite100};
    line-height: 100%;
    margin-bottom: 1.4vw;
  }

  ${CardText} {
    ${text.desktopBodySmall};
    font-size: 1vw;
    color: ${colors.culturedWhite100};
    margin-bottom: 4.2vw;
    width: 26.5vw;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    height: 2.4vw;
    border: none;
    appearance: none;
    outline: none;
    border-radius: 0px;
    background: transparent;
    ${text.desktopBodySmall};
    color: ${colors.culturedWhite100};

    position: relative;
    width: 14.7vw;
    padding: 0;
    margin: 0;
  }

  ${media.tablet} {
    height: 59.9vw;
    padding: 14.4vw 15vw 14.7vw 13.4vw;
    border-left: 3.6vw solid ${colors.keppel100};

    ${Title} {
      ${text.tabletXLHeading};
      margin-bottom: 2.4vw;
      width: fit-content;
    }
    ${CardText} {
      ${text.tabletSmallBody};
      width: 38.8vw;
      font-weight: 400;
      margin-bottom: 7.2vw;
    }
    input {
      ${text.tabletSmallBody};
      height: 4.1vw;
      width: 25.3vw;
      padding: 0;
      border-radius: 0px;
    }
  }
  ${media.mobile} {
    height: 141.3vw;
    border: none;
    padding: 13.9vw 6.7vw 34.9vw 6.7vw;
    ${Title} {
      ${text.mobileLHeading};

      color: ${colors.culturedWhite100};
      width: 80vw;
      margin-bottom: 8vw;
    }
    :after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 1.3vw;
      height: 133.3vw;
      background: ${colors.keppel100};
    }

    ${CardText} {
      ${text.mobileSmallBody};
      color: ${colors.culturedWhite100};
      margin-bottom: 13.3vw;
      width: 85vw;
    }
    input {
      ${text.mobileSmallBody};
      height: 9.1vw;
      width: 80%;
      padding: 0;
      border-radius: 0px;
    }
  }
`;
