import React, { useContext } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import loadable from '@loadable/component'
import { OpenFormContext } from "@components/Layout";

import media from "@styles/media";
import colors from "@styles/colors";
import text from "@styles/text";

import useMedia from "@hooks/useMedia";

import { ReactComponent as MiqroTechSVG } from "@svg/MIQrotech.svg";
import { ReactComponent as TwitterSVG } from "@svg/twitter.svg";
import { ReactComponent as LinkedInSVG } from "@svg/linkedIn.svg";
import { ReactComponent as FaceBookSVG } from "@svg/facebook.svg";
import { ReactComponent as InstagramSVG } from "@svg/instagram.svg";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));

const Footer = () => {
  const openForm = useContext(OpenFormContext);

  return (
    <Wrapper>
      <LeftColumn>
        <Logo onClick={() => navigate('/')}/>
        <Copyright $marginBottom={useMedia("1.389vw", "1.389vw", "2.398vw")}>
          ©2021 mIQrotech | All Rights Reserved
        </Copyright>

        <Socials>
          <Twitter onClick={() => navigate('/')}/>
          <FaceBook onClick={() => navigate('/')} />
          <Instagram onClick={() => navigate('/')} />
          <LinkedIn onClick={() => navigate('/')} />
        </Socials>

        <Row>
          <NonStyledLink href="/privacy-policy">
            <SmallText marginRight={useMedia("1.389vw", "1.389vw", "3.597vw")}>
              Privacy Policy
            </SmallText>
          </NonStyledLink>
          <NonStyledLink href="/terms-of-use">
            <SmallText>Terms of Use</SmallText>
          </NonStyledLink>
        </Row>
    
        <SmallText $marginBottom={useMedia("1.389vw", "1.389vw", "2.398vw")}>
          Tampa, Florida, United&nbsp;States&nbsp;of&nbsp;America
        </SmallText>
        <SmallText>
          Press and Media Inquiries:
        </SmallText>
        <SmallLink href="mailto:press@miqrotech.com">
          press@mIQrotech.com
        </SmallLink>
        <SmallText>+1(832)770-7040</SmallText>
      </LeftColumn>

      <RightContainer>
        <ColumnContainer>
          <Column>
            <SmallText>Solutions</SmallText>
            <StyledLink href="/miqroaware">
              <P>mIQroAware</P>
            </StyledLink>
            <StyledLink href="/future-innovations">
              <P>
                Future <br />
                Innovations
              </P>
            </StyledLink>
          </Column>
          <Column>
            <SmallText>Company</SmallText>
            <StyledLink href="/about">
              <P>About</P>
            </StyledLink>
            <StyledLink
              href="https://www.linkedin.com/jobs/search/?f_C=10604931&geoId=92000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <P>Careers</P>
            </StyledLink>
            <StyledLink href="/blog" id="news-link">
              <P>News</P>
            </StyledLink>
          </Column>
        </ColumnContainer>
        <ButtonContainer>
          <PrimaryButton
            backgroundColor={colors.keppel100}
            textColor={colors.black}
            hoverColor={colors.keppel60}
            text={useMedia("Schedule a Meeting", "Schedule a Meeting", "Schedule a Meeting", "Contact Us")}
            width={useMedia(
              "fit-content",
              "fit-content",
              "fit-content",
              "100%"
            )}
            onClick={() => openForm(true)}
          />
        </ButtonContainer>
      </RightContainer>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  background: ${colors.black};
  opacity: 1;

  ${media.fullWidth} {
    height: 36vw;
    padding: 3.4vw 3.5vw 3.3vw 3.5vw;
  }

  ${media.desktop} {
    height: 36vw;
    padding: 3.4vw 3.5vw 3.3vw 3.5vw;
  }

  ${media.tablet} {
    height: 62.11vw;
    padding-top: 5.875vw;
    padding-bottom: 5.635vw;
    padding-left: 5.995vw;
    padding-right: 0vw;
  }

  ${media.mobile} {
    flex-direction: column;
    padding: 0vw;
  }
`;

const Logo = styled(MiqroTechSVG)`
  height: auto;
  cursor: pointer;
  width: 8.3vw;
  margin-bottom: 1.528vw;

  ${media.tablet} {
    width: 14.269vw;
    margin-bottom: 2.038vw;
  }

  ${media.mobile} {
    width: 31.733vw;
    margin-bottom: 5.333vw;
  }
`;

const P = styled.p`
  ${text.desktopBodyCopy2};

  ${media.tablet} {
    ${text.tabletBodyCopy2}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy2}
  }
`;

const StyledLink = styled.a<{ $marginBottom?: string }>`
  text-decoration: none;
  color: ${colors.white};
  display: flex;
  align-items: center;

  margin-bottom: ${(props) => props.$marginBottom || "0vw"};

  ${P} {
    font-family: Helvetica Neue Medium;
  }
`;

const SmallText = styled.p<{ $marginBottom?: string; marginRight?: string }>`
  text-decoration: none;
  ${text.desktopSmallBody};
  color: ${colors.jetBlack20};
  margin-bottom: ${(props) =>
    props.$marginBottom ? props.$marginBottom : "0vw"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0vw")};

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: ${(props) =>
      props.$marginBottom ? props.$marginBottom : "0vw"};
    margin-right: ${(props) => (props.marginRight ? props.marginRight : "0vw")};
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 5.333vw;
    width: 35.2vw;
  }
`;

const SmallLink = styled.a<{ $marginBottom?: string; marginRight?: string }>`
  text-decoration: none;
  ${text.desktopSmallBody};
  color: ${colors.jetBlack20};
  margin-bottom: ${(props) =>
    props.$marginBottom ? props.$marginBottom : "0vw"};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "0vw")};

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-bottom: ${(props) =>
      props.$marginBottom ? props.$marginBottom : "0vw"};
    margin-right: ${(props) => (props.marginRight ? props.marginRight : "0vw")};
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 5.333vw;
    width: 35.2vw;
  }
`;

const Copyright = styled(SmallText)`
  ${media.mobile} {
    position: absolute;
    top: 12vw;
    width: 33.533vw;
    left: 52.8vw;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  ${StyledLink} {
    margin-top: 1.8vw;
  }

  ${media.tablet} {
    width: 23.981vw;
  }

  ${media.mobile} {
    order: 2;
    background-color: ${colors.black};
    width: 100vw;
    height: auto;
    padding-top: 12vw;
    padding-left: 6.667vw;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 11.733vw;
  }
`;

const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  ${StyledLink}, a {
    text-decoration: none;
    color: ${colors.culturedWhite100};
    margin-bottom: 2.2vw;
  }

  ${SmallText} {
    margin-bottom: 2.2vw;
  }

  ${media.tablet} {
    ${StyledLink} {
      margin-bottom: 3.597vw;
    }

    ${SmallText} {
      margin-bottom: 3.597vw;
    }

    #news-link {
      position: absolute;
      top: 6.1vw;
      left: 11vw;
    }
  }

  ${media.mobile} {
    ${StyledLink} {
      margin-bottom: 8vw;
    }

    ${SmallText} {
      margin-bottom: 8vw;
    }

    
  }
`;

const Row = styled.div`
  display: flex;
  align-item: center;
  margin-bottom: 1.389vw;

  ${media.tablet} {
    margin-bottom: 4.796vw;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 46.4vw;
    left: 52.8vw;
  }
`;

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 8vw;
  margin-bottom: 6.639vw;

  ${media.tablet} {
    width: 15vw;
    margin-bottom: 5.748vw;
  }

  ${media.mobile} {
    width: 30.667vw;
    margin-bottom: 5vw;
  }
`;



const Twitter = styled(TwitterSVG)`
  height: auto;
  width: 1.1vw;

  ${media.tablet} {
    width: 1.679vw;
  }

  ${media.mobile} {
    width: 3.733vw;
  }
`;

const LinkedIn = styled(LinkedInSVG)`
  height: auto;
  width: 1vw;

  ${media.tablet} {
    width: 1.679vw;
  }

  ${media.mobile} {
    width: 3.733vw;
  }
`;

const FaceBook = styled(FaceBookSVG)`
  height: auto;
  width: 1vw;

  ${media.tablet} {
    width: 1.679vw;
  }

  ${media.mobile} {
    width: 3.733vw;
  }
`;

const Instagram = styled(InstagramSVG)`
  height: auto;
  width: 1vw;

  ${media.tablet} {
    width: 1.679vw;
  }

  ${media.mobile} {
    width: 3.733vw;
  }
`;

const RightContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 61.6vw;
  height: 29.3vw;
  background: ${colors.jetBlack100};
  display: flex;
  padding: 3.6vw 0 0 7.8vw;
  ${Column}:nth-child(1) {
    margin-right: 9.6vw;
  }
  ${Column}:nth-child(2) {
    margin-right: 11.5vw;
  }

  ${media.tablet} {
    height: 50.6vw;
    width: 64.029vw;

    ${Column}:nth-child(2) {
      margin-right: 8.153vw;
    }
  }

  ${media.mobile} {
    order: 1;
    width: 100vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-top: 12vw;
    height: 121vw;
    flex-direction: column;
    padding-bottom: 17.333vw;

    ${Column}:nth-child(1) {
      margin-right: 14vw;
    }
    ${Column}:nth-child(2) {
      margin-right: 0vw;
    }
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.tablet} {
    width: 63%;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  ${media.mobile} {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;

  top: 48px;
  right: 50px;

  ${media.tablet} {
    top: 5.389vw;
    right: 1.916vw;
  }

  ${media.mobile} {
    top: initial;
    bottom: 12vw;
    width: 86%;
    right: 7%;
  }
`;

const NonStyledLink = styled.a`
  text-decoration: none;
`;
