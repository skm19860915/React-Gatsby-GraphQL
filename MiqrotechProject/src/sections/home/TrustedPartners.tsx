import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { StaticImage } from 'gatsby-plugin-image'
import loadable from '@loadable/component'

import useMedia from "@hooks/useMedia";

import colors from "@styles/colors";
import media from "@styles/media";
import text from "@styles/text";

import AccentBG from "@png/accentBG.png";

const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  loading: boolean;
};

const TrustedPartners: React.FC<props> = ({ loading }) => {
  const [triggerTitle, setTriggerTitle] = useState(false);

  const wrapperRef = useRef(null);
  const tlStart = useMedia("top-=500 top", "top-=500 top", "top-=160% top");

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: tlStart,
        },
      });

      tl.call(setTriggerTitle, [true], 0);
      tl.to(
        ".home-partner_logos",
        {
          stagger: 0.2,
          duration: 0.8,
          opacity: 1,
        },
        0
      );

      return () => {
        tl.kill();
      };
    }
  }, [loading]);

  const textArray = useMedia(
    [() => "Trusted partners", () => "and customers"],
    [() => "Trusted partners", () => "and customers"],
    [() => "Trusted partners", () => "and customers"],
    [() => "Trusted", () => "partners and", () => "customers"]
  );

  return (
    <Wrapper ref={wrapperRef}>
      <BGImage>
        <Circle src={AccentBG} alt="gradient"/>
      </BGImage>

      <Title>
        <TextAnimation
          textArray={textArray || []}
          height={useMedia("5.556vw", "5.556vw", "7.194vw", "12.800vw")}
          className="partners-title"
          trigger={triggerTitle}
        />
      </Title>

      <PartnersContainer>
        <Chevron className="home-partner_logos">
          <StaticImage
            src={"../../images/png/chevron.png"}
            alt="chevron"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </Chevron>
        <PlugAndPlay className="home-partner_logos">
          <StaticImage
            src={"../../images/png/plugAndPlay.png"} 
            alt="plug and play"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </PlugAndPlay>
        <Republic className="home-partner_logos">
          <StaticImage
            src={"../../images/png/republic.png"} 
            alt="republic"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </Republic>
        <Ocean className="home-partner_logos">
          <StaticImage
            src={"../../images/png/ocean.png"} 
            alt="ocean"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </Ocean>
        <Cathexis className="home-partner_logos">
          <StaticImage
            src={"../../images/png/cathexis.png"} 
            alt="cathexis"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </Cathexis>
        <Blank/>
        <Shadaysha className="home-partner_logos">
          <StaticImage
            src={"../../images/png/shadaysha.png"} 
            alt="shadaysha"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </Shadaysha>
        <Page className="home-partner_logos">
          <StaticImage
            src={"../../images/png/pageIcon.png"} 
            alt="page"
            placeholder="blurred"
            objectFit="contain"
            style={{width: '100%', height: '100%'}}
          />
        </Page>
      </PartnersContainer>
    </Wrapper>
  );
};

export default TrustedPartners;

const Wrapper = styled.section`
  width: 100%;
  background-color: ${colors.black};
  position: relative;
  box-sizing: border-box;
  position: relative;

  padding-left: 19.2vw;
  padding-top: 9.2vw;
  padding-right: 21.5vw;
  padding-bottom: 18.5vw;

  ${media.tablet} {
    padding-left: 13.7vw;
    padding-top: 6.2vw;
    padding-right: 23.3vw;
    padding-bottom: 6.2vw;
  }

  ${media.mobile} {
    padding-left: 6.7vw;
    padding-right: 6.7vw;
    padding-top: 34.7vw;
    padding-bottom: 28.3vw;
  }
`;

const LogoStyles = styled.div`
  width: 15vw;
  height: 10vw;
  margin-right: 5vw;
  opacity: 0;

  ${media.tablet} {
    width: 17vw;
    margin-bottom: 0vw;
    margin-right: 6vw;
    margin-bottom: 6vw;
  }

  ${media.mobile} {
    width: 35vw;
    margin-bottom: 0;
    margin-right: 8vw;
    margin-bottom: 8vw;
  }
`

const Blank = styled(LogoStyles)`
  ${media.mobile} {
    display: none;
  }
`

const Chevron = styled(LogoStyles)`
`;

const PlugAndPlay = styled(LogoStyles)`
`;

const Shadaysha = styled(LogoStyles)`
`;

const Cathexis = styled(LogoStyles)`
`;

const Page = styled(LogoStyles)`
  width: 8vw;

  ${media.mobile} {
    width: 15vw;
  }
`;

const Republic = styled(LogoStyles)`
`;

const Ocean = styled(LogoStyles)`
`;

const Circle = styled.img`
  transform: rotate(-37deg) scaleX(-1);

  opacity: 0.3;
  width: 100%;
  height: 100%;
`;

const BGImage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;

  width: 82.2vw;
  height: 82.2vw;

  ${media.tablet} {
    width: 63.3vw;
    height: 63.3vw;
    right: -30vw;
  }

  ${media.mobile} {
    width: 100vw;
    height: 100vw;
    right: -30vw;
    top: 5vw;
  }
`;

const PartnersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  width: 60.7vw;
  margin-left: 9.4vw;

  img {
    margin-bottom: 7vw;
  }

  ${media.tablet} {
    width: 70vw;
    img {
      margin-bottom: 10vw;
    }
  }

  ${media.mobile} {
    width: 86.9vw;
    margin-left: 0vw;

    img {
      margin-bottom: 18.7vw;
    }
  }
`;

const Title = styled.h3`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;

  ${text.desktopXLHeading};
  margin-bottom: 8.8vw;

  ${media.tablet} {
    ${text.tabletMHeading}
    margin-bottom: 11.6vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 16.8vw;
  }
`;
