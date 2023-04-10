import React, { useEffect, useRef, useState, useContext, useMemo, useCallback } from "react";
import styled from "styled-components";
import { ScreenContext } from "@components/Layout";
import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";
import { ReactComponent as ChevronSVG } from "@svg/chevron.svg";
import { LinkedinShareButton, RedditShareButton } from "react-share";
import linkedin from "@svg/linkedinBlog.svg";
import facebook from "@svg/facebookBlog.svg";
import twitter from "@svg/twitterBlog.svg";
import reddit from "@svg/redditBlog.svg";
import tumblr from "@svg/tumblrBlog.svg";
import ArrowSquare from "@components/ArrowSquare";
import { ReactComponent as ArrowSVG } from "@svg/arrowUpRight.svg";
import addToMailchimp from "gatsby-plugin-mailchimp";

type props = {
  blog: any;
  cardData: any;
  url: string;
  allPossibleTags: any;
};

const Hero: React.FC<props> = ({
  blog,
  cardData,
  url,
  allPossibleTags,
}) => {
  const [enter1, setEnter1] = useState(false);
  const [enter2, setEnter2] = useState(false);
  const [activeStart, setActiveStart] = useState(false);
  const [activeEnd, setActiveEnd] = useState(false);
  const [email, setEmail] = useState("");
  const screen = useContext(ScreenContext)
  const [cardPosition, setCardPosition] = useState(11.3);
  const step = useRef(1);
  const pos = useRef(11.3);
  const [success, setSuccess] = useState(false);
  const [error, setError] =  useState('')

  const buttonContainerRef = useRef(null);

  const { body, date, mediaFile, moreTags, tag, title, mainBlogImage } = blog;

  const tags = useMemo(() => moreTags.map((tag: { tagName: string }) => {
    return tag.tagName;
  }), [moreTags])

  const getDate = (inputDate: any) => {
    const newDate = inputDate.split("-");

    const myNewDate = new Date(
      Date.UTC(newDate[0], newDate[1] - 1, newDate[2])
    );
    const printedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(myNewDate);

    return printedDate;
  };

  const getTagColors = useCallback((tag: string) => {
    const currentTags = allPossibleTags;

    switch (tag) {
      case currentTags[0]:
        return `#0075A2`;
      case currentTags[1]:
        return colors.keppel100;
      case currentTags[2]:
        return colors.darkOrange100;
      default:
        return "#436436";
    }
  }, [allPossibleTags]);

  const socials = useMemo(() => [
    { name: "linkedin", img: linkedin },
    { name: "facebook", img: facebook },
    { name: "twitter", img: twitter },
    { name: "reddit", img: reddit },
    { name: "tumblr", img: tumblr },
  ], [])

  const allSocials = useMemo(() => socials.map((social, i) => {
    const icon = (
      <img src={social.img} alt={`link to miqrotech ${social.name} page`} />
    );

    switch (social.name) {
      case "linkedin":
        return (
          <a
            key={i}
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${blog.summary}&source=${url}`}
            target="_blank"
            rel="noreferrer"
          >
            {icon}
          </a>
        );

      case "facebook":
        return (
          <a
            key={i}
            href={`https://www.facebook.com/dialog/share?app_id=325391045994031&display=popup&href=${url}&redirect_uri=${url}&quote=${blog.description}`}
            target="_blank"
            rel="noreferrer"
          >
            {icon}
          </a>
        );

      case "twitter":
        return (
          <a
            key={i}
            href={`https://twitter.com/intent/tweet?url=${url}&text=${blog.description}`}
            target="_blank"
            rel="noreferrer"
          >
            {icon}
          </a>
        );

      case "reddit":
        return (
          <RedditShareButton url={url} key={i} title={title}>
            {icon}
          </RedditShareButton>
        );

      default:
        return (
          <a
            key={i}
            href={`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${title}&posttype=photo&content=${mainBlogImage.file.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {icon}
          </a>
        );
    }
  }), [socials])

  const allTags = useMemo(() => tags.map((tag, i) => {
    const color = getTagColors(tag);

    return (
      <Tag key={i}>
        <span>{tag}</span>
        <TagBG bGColor={color} />
      </Tag>
    );
  }), [tags])

  useEffect(() => {
    screen.mobile ? setCardPosition(6.7) : setCardPosition(11.3);
  }, [screen.mobile]);

  const allCards = useMemo(() => cardData.map((card, i) => {
    const allCardTags = card.cardTags.map((tag, i) => {
      const color = getTagColors(tag);

      return (
        <Tag key={`card-tag${i}`}>
          <span>{tag}</span>
          <TagBG bGColor={color} />
        </Tag>
      );
    })

    return (
      <Card key={`card-${card.title}-${i}`} href={`/blog/${card.link}`}>
        <CardTop>
          <CardImage src={card.cardImage.url} alt={card.title || "card image"} />
        </CardTop>
        <CardBottom>
          <DateDisplay>{getDate(card.date)}</DateDisplay>
          <Title>{card.cardTitle}</Title>
          <Tags>{allCardTags}</Tags>
          <Arrow />
          <DarkBG />
        </CardBottom>
      </Card>
    );
  }), [cardData])

  const handleNext = () => {
    //this value should be length of array - 1
    if (step.current < allCards.length - 1 || screen.mobile && step.current < allCards.length) {
      pos.current -= screen.mobile ? 90.7 : screen.tablet ? 44.9 : 31.3;
      setCardPosition(pos.current);
      step.current = step.current + 1;
    }
  };

  const handlePrev = () => {
    if (step.current > 1) {
      pos.current += screen.mobile ? 90.7 : screen.tablet ? 44.9 : 31.3;
      setCardPosition(pos.current);
      step.current = step.current - 1;
    }
  };

  useEffect(() => {
    if (step.current === 1) {
      setActiveStart(false);
    } else {
      setActiveStart(true);
    }
    if (!screen.mobile && step.current === allCards.length - 1) {
      setActiveEnd(false);
    } else {
      setActiveEnd(true);
    }

    if (screen.mobile && step.current === allCards.length) {
      setActiveEnd(false)
    } else {
      setActiveEnd(true)
    }
  }, [cardPosition]);

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
        setError('')
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
    });
  };

  return (
    <Wrapper id="blog-hero">
      <Ticker>
        <MobileRow>
          <a href="/">Home</a> <Chevron />
          <a href="/blog">News</a> <Chevron />
        </MobileRow>

        <span>{title}</span>
      </Ticker>
      <DateDisplay>{getDate(date)}</DateDisplay>
      <Title>{title}</Title>
      <TabletWrapper>
        <Tags>{allTags}</Tags>
        {screen.tablet || (screen.mobile && <SocialLinks>{allSocials}</SocialLinks>)}
      </TabletWrapper>
      <MainImage src={mainBlogImage.file.url} alt={title} />
      <Content>
        {!screen.tablet && !screen.mobile && (
          <LeftColumn>
            <EmailList onSubmit={onSubmit}>
              <EmailTitle>
                Stay up to date on mIQrotech’s latest news. No spam period.{" "}
              </EmailTitle>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setError('')
                  setEmail(e.target.value)
                }}
              />
              <Chevron onClick={onSubmit} />
            </EmailList>
            {error && <Error>{error}</Error>}
            <SocialLinks>{allSocials}</SocialLinks>
          </LeftColumn>
        )}
        <RightColumn>
          <BlogContent
            dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
          ></BlogContent>
          {mediaFile?.file?.fileName && (
            <EmbeddedVideo src={mediaFile.file.url} controls autoPlay={false} />
          )}
        </RightColumn>
      </Content>
      <Related>
        <Title2>Related Reads</Title2>
        <ButtonContainer ref={buttonContainerRef}>
          <ArrowContainer1
            onClick={handlePrev}
            onMouseEnter={() => setEnter1(true)}
            onMouseLeave={() => setEnter1(false)}
            active={activeStart}
          >
            <ArrowSquare mouseEnter={enter1} color={"rgba(5, 5, 5, 0.3)"} />
          </ArrowContainer1>
          <ArrowContainer2
            onClick={handleNext}
            onMouseEnter={() => setEnter2(true)}
            onMouseLeave={() => setEnter2(false)}
            active={activeEnd}
          >
            <ArrowSquare mouseEnter={enter2} color={"rgba(5, 5, 5, 0.3)"} />
          </ArrowContainer2>
        </ButtonContainer>
      </Related>
      <RelatedContent>
        <Inner cardPosition={cardPosition}>{allCards}</Inner>
      </RelatedContent>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  position: relative;

  background: ${colors.culturedWhite100};

  padding: 6.9vw 11.3vw 12.5vw 11.3vw;

  ${media.tablet} {
    flex-direction: column;
    padding: 14.3vw 6vw 9.6vw 6vw;
  }

  ${media.mobile} {
    flex-direction: column;
    padding: 32vw 6.7vw 21.3vw 6.7vw;
  }
`;

const Chevron = styled(ChevronSVG)`
  width: 1.9vw;
  height: 1.9vw;

  path {
    stroke: ${colors.jetBlack20};
  }
`;

const Ticker = styled.div`
  ${text.desktopBreadCrumb};
  display: flex;
  /* align-items: center; */
  height: 2.2vw;
  margin-bottom: 4.3vw;
  width: 100%;
  color: ${colors.jetBlack20};

  border-bottom: 1px solid ${colors.culturedWhite20};
  ${Chevron} {
    width: 1.4vw;
    height: 1.4vw;
    margin-left: 1vw;
    margin-right: 1vw;
  }
  a {
    text-decoration: none;
    color: ${colors.jetBlack20};
  }

  ${media.tablet} {
    height: 3.7vw;
    font-size: 1.4vw;
    ${Chevron} {
      width: 2.2vw;
      height: 2.2vw;
      margin-left: 1vw;
      margin-right: 1vw;
    }
  }
  ${media.mobile} {
    height: 16vw;
    font-size: 3.2vw;
    flex-direction: column;
    span {
      width: 80.3vw;
    }
    ${Chevron} {
      width: 5vw;
      height: 5vw;
      margin-left: 1vw;
      margin-right: 1vw;
    }
    margin-bottom: 10.7vw;
  }
`;
const DateDisplay = styled.p`
  ${text.desktopSmallBody};
  color: ${colors.jetBlack20};
  margin-bottom: 0.7vw;
  ${media.tablet} {
    font-size: 1.7vw;
  }
  ${media.mobile} {
    ${text.mobileSmallBody};
    margin-bottom: 2.7vw;
  }
`;

const Title = styled.h1`
  ${text.desktopSHeading};
  margin-bottom: 2.1vw;
  ${media.tablet} {
    ${text.tabletSHeading};
    margin-bottom: 3.6vw;
  }
  ${media.mobile} {
    ${text.mobileXXSHeading};
    margin-bottom: 8vw;
  }
  ${media.fullWidth} {
  }
`;

const Tag = styled.div`
  ${text.desktopTagText};
  color: ${colors.jetBlack20};
  position: relative;
  padding: 0.1vw 0.7vw;
  margin-right: 1vw;
  text-decoration: none;

  span {
    position: relative;
    z-index: 1;
  }
  ${media.tablet} {
    ${text.tabletTagText};
    margin-right: 1.8vw;
    padding: 0.4vw 1.2vw;
  }
  ${media.mobile} {
    font-size: 2.7vw;
    margin-right: 4vw;
    padding: 0.8vw 2.7vw;
  }
  ${media.fullWidth} {
  }
`;

const TagBG = styled.div<{ bGColor: string }>`
  ${text.desktopTagText};
  background: ${(props) => props.bGColor};
  opacity: 0.3;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-decoration: none;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const Tags = styled.div`
  display: flex;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const MainImage = styled.img`
  height: 27.8vw;
  width: 77.4vw;
  margin: 4.2vw 0;
  object-fit: cover;
  ${media.tablet} {
    width: 87.9vw;
    height: 47.9vw;
    object-fit: cover;
  }
  ${media.mobile} {
    width: 100vw;
    height: 106.7vw;
    object-position: center center;
    margin: 11.7vw 0 11.7vw -6.7vw;
  }
  ${media.fullWidth} {
  }
`;

const Content = styled.div`
  display: flex;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const LeftColumn = styled.div`
  width: 14.7vw;
  margin-right: 8.9vw;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.1vw;
  img {
    width: 2.1vw;
    height: 2.1vw;
  }
  ${media.tablet} {
    margin: 0;
    width: 25.1vw;

    img {
      width: 3.6vw;
      height: 3.6vw;
    }
  }
  ${media.mobile} {
    width: 56vw;
    img {
      width: 8vw;
      height: 8vw;
      margin-top: 5vw;
    }
  }
  ${media.fullWidth} {
  }
`;

const EmailList = styled.form`
  ${text.desktopSmallBody};
  position: relative;
  ${Chevron} {
    position: absolute;
    top: 4.3vw;
    width: 1vw;
    height: 1vw;
    right: 0;
  }
  input {
    border: none;
    appearance: none;
    border-radius: 0px;
    outline: none;
    background: transparent;
    height: 1.9vw;
    position: relative;
    width: 100%;
  }
  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    background: ${colors.black};
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
  ${media.hover} {
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
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const EmailTitle = styled.p`
  color: ${colors.jetBlack20};
`;

const RightColumn = styled.div`
  width: 53.8vw;
  ${media.tablet} {
    width: 100%;
  }
  ${media.mobile} {
    width: 100%;
  }
`;

const Error = styled.p`
  ${text.desktopSmallBody};
  color: ${colors.darkOrange100};
  padding-top: 0.347vw;
`

const BlogContent = styled.div`
  a {
    color: ${colors.keppel100};
    text-decoration: underline;
  }
  p {
    ${text.desktopBodyCopy1};
    margin-bottom: 1.7vw;
  }

  ul {
    ${text.desktopBodyCopy1};
    margin-bottom: 1.7vw;
  }
  ol {
    ${text.desktopBodyCopy1};
    margin-bottom: 1.7vw;
  }

  pre {
    ${text.desktopBodyCopy1};
    margin-bottom: 1.7vw;
  }

  blockquote {
    position: relative;
    ${text.desktopBodyCopy1};
    width: 60%;
    font-style: italic;
    quotes: "“" "”" "'" "'";
    ::before {
      content: open-quote;

      ${text.desktopMHeading};
      font-size: 10vw;
      position: absolute;

      left: -1.5vw;
      top: -5.5vw;
    }

    margin: 8vw 0 4vw 3vw;
  }

  figure {
    margin-left: 0;
    blockquote {
      position: relative;
      ${text.desktopBodyCopy1};
      width: 60%;
      font-style: italic;
      quotes: "“" "”" "“" "”";

      margin: 8vw 0 1.5vw 3vw;
    }

    blockquote::before {
      content: open-quote;

      ${text.desktopMHeading};
      font-size: 10vw;
      position: absolute;

      left: -1.5vw;
      top: -5.5vw;
    }
    figcaption {
      ${text.desktopBodyCopy1};
      margin-left: 3vw;
    }
  }

  h1 {
    ${text.desktopXSHeading};
    margin-bottom: 1.5vw;
    margin-top: 4vw;
  }

  h2 {
    ${text.desktopXXSHeading};
    margin-bottom: 1.5vw;
    margin-top: 4vw;
  }

  h3 {
    ${text.desktopPetiteHeading};
    margin-bottom: 1.5vw;
    margin-top: 4vw;
  }

  img {
    width: 100%;
    height: auto;
    margin: 2.7vw 0;
  }
  hr {
    margin: 3vw auto;
    width: 80%;
  }

  table {
    ${text.desktopBodyCopy1};

    border-collapse: collapse;
    margin-bottom: 2vw;
    thead {
      border-collapse: separate;
      border-bottom: 2px solid black;
    }

    th {
      ${text.desktopPetiteHeading};
      font-size: 1.4vw;
      padding: 0.5vw 1vw 0.5vw 0.5vw;
      padding-right: 1vw;
      text-align: left;
      border-collapse: separate;
      /* :nth-child(even) {
        background-color: ${colors.white};
      } */
    }
    tr {
      margin-right: 1vw;
      border-collapse: separate;
      border-bottom: 1px solid black;
    }

    td {
      padding-right: 1vw;
      text-align: left;
      padding: 0.5vw 1vw 0.5vw 0.5vw;
      :nth-child(even) {
        background-color: ${colors.white};
      }
    }
  }

  ${media.tablet} {
    p {
      ${text.tabletBodyCopy1};
      margin-bottom: 7.2vw;
    }

    ul {
      ${text.tabletBodyCopy1};
      margin-bottom: 7.2vw;
    }
    ol {
      ${text.tabletBodyCopy1};
      margin-bottom: 7.2vw;
    }

    pre {
      ${text.tabletBodyCopy1};
      margin-bottom: 7.2vw;
    }

    blockquote {
      position: relative;
      ${text.tabletBodyCopy1};

      margin: 12vw 0 4vw 6vw;
    }

    figure {
      blockquote {
        position: relative;
        ${text.tabletBodyCopy1};
        width: 60%;
        font-style: italic;
        quotes: "“" "”" "“" "”";

        margin: 16vw 0 3vw 6vw;
      }

      blockquote::before {
        content: open-quote;

        ${text.desktopMHeading};
        font-size: 10vw;
        position: absolute;

        left: -1.5vw;
        top: -5.5vw;
      }
      figcaption {
        ${text.tabletBodyCopy1};
        margin-left: 6vw;
      }
    }

    h1 {
      ${text.tabletXSHeading};
      margin-bottom: 1.5vw;
      margin-top: 4vw;
    }

    h2 {
      ${text.tabletXXSHeading};
      margin-bottom: 1.5vw;
      margin-top: 4vw;
    }

    h3 {
      ${text.tabletPetiteHeading};
      margin-bottom: 1.5vw;
      margin-top: 4vw;
    }

    img {
      width: 100%;
      height: auto;
      margin: 6vw 0;
    }
    hr {
      margin: 3vw auto;
      width: 80%;
    }

    table {
      ${text.tabletBodyCopy1};
      margin-bottom: 2vw;

      th {
        ${text.tabletPetiteHeading};
        font-size: 2vw;
        padding: 1vw 2vw 1vw 2vw;
      }
      tr {
        margin-right: 1vw;
      }

      td {
        text-align: left;
        padding: 1vw 2vw 1vw 2vw;
      }
    }
  }
  ${media.mobile} {
    p {
      ${text.mobileBodyCopy1};
      margin-bottom: 10.7vw;
    }

    ul {
      ${text.mobileBodyCopy1};
      margin-bottom: 10.7vw;
    }
    ol {
      ${text.mobileBodyCopy1};
      margin-bottom: 10.7vw;
    }

    pre {
      ${text.mobileBodyCopy1};
      margin-bottom: 10.7vw;
    }

    blockquote {
      position: relative;
      ${text.mobileBodyCopy1};
      width: 80%;
      :before {
        font-size: 20vw;
        top: -10vw;
        left: -3vw;
      }
      margin: 18vw 0 4vw 6vw;
    }

    figure {
      blockquote {
        ${text.mobileBodyCopy1};
        width: 80%;

        margin: 18vw 0 4vw 6vw;
      }

      blockquote::before {
        content: open-quote;
        ${text.mobileMHeading};
        font-size: 20vw;
        position: absolute;
        left: -3vw;
        top: -10vw;
      }
      figcaption {
        ${text.mobileBodyCopy1};
        margin-left: 6vw;
      }
    }

    h1 {
      ${text.mobileXSHeading};
      margin-bottom: 3vw;
      margin-top: 10.7vw;
    }

    h2 {
      ${text.mobileXXSHeading};
      margin-bottom: 3vw;
      margin-top: 10.7vw;
    }

    h3 {
      ${text.mobilePetiteHeading};
      margin-bottom: 3vw;
      margin-top: 10.7vw;
    }

    img {
      width: 100vw;
      height: 106.7vw;
      margin: 10.7vw 0 0 -6.7vw;
      object-position: center center;
      object-fit: cover;
    }
    hr {
      margin: 3vw auto;
      width: 80%;
    }

    table {
      ${text.mobileSmallBody};
      margin-bottom: 3vw;

      th {
        ${text.mobilePetiteHeading};
        font-size: 4vw;
        padding: 1vw 2vw 1vw 2vw;
      }
      tr {
        margin-right: 1vw;
      }

      td {
        text-align: left;
        padding: 1vw 2vw 1vw 2vw;
      }
    }
  }
`;

const EmbeddedVideo = styled.video`
  width: 100%;
  height: auto;
  margin: 4.2vw 0;
  ${media.tablet} {
    margin: 7.2vw 0;
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const Related = styled.div`
  display: flex;
  margin-top: 11.1vw;
  position: relative;
  align-items: center;

  ${media.tablet} {
  }
  ${media.mobile} {
    justify-content: space-between;
  }
  ${media.fullWidth} {
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 4.9vw;
  height: 1.9vw;

  ${media.tablet} {
    width: 11.9vw;
    height: auto;
    margin-left: 5vw;
  }

  ${media.mobile} {
    /* display: none; */
    width: 20vw;
    height: 7.5vw;
  }
`;

const ArrowContainerStyles = `
 cursor: pointer;
 width: 1.9vw;
 height: 1.9vw;

  ${media.tablet} {
    width: 4.8vw;
    height: 4.8vw;
  }
  ${media.mobile} {
    width: 7.5vw;
    height: 7.5vw;
  }
`;

const ArrowContainer1 = styled.div<{ active: boolean }>`
  ${ArrowContainerStyles}
  opacity: ${(props) => (props.active ? 1 : 0.2)};
  transform: rotate(180deg);
`;

const ArrowContainer2 = styled.div<{ active: boolean }>`
  ${ArrowContainerStyles}
  opacity: ${(props) => (props.active ? 1 : 0.2)};
`;
const Title2 = styled.h2`
  ${text.desktopSHeading}
  color: ${colors.black};
  position: relative;
  width: fit-content;
  margin-right: 2.1vw;
  line-height: 100%;

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-bottom: 2vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
  }
`;

const RelatedContent = styled.div`
  margin-top: 2.1vw;
  position: relative;
  margin-left: -11.3vw;
  width: 100vw;
  height: 30.6vw;
  ${media.tablet} {
    height: 49.6vw;
  }
  ${media.mobile} {
    overflow: scroll;
    height: 110.4vw;
    margin-left: -6.3vw;
    margin-top: 10.6vw;
  }
`;

const CardTop = styled.div`
  width: 30.3vw;
  height: 18.1vw;
  overflow: hidden;
  position: relative;
  ${media.tablet} {
    width: 43.1vw;
    height: 24.1vw;
  }
  ${media.mobile} {
    width: 86.7vw;
    height: 53.6vw;
  }
`;

const Inner = styled.div<{ cardPosition: number }>`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  position: absolute;
  left: ${(props) => props.cardPosition}vw;
  width: fit-content;
  transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
`;

const DarkBG = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
  background: ${colors.jetBlack100};
  top: 0;
  left: 0;
  z-index: 0;
`;

const CardBottom = styled.div`
  height: auto;
  width: 100%;
  padding: 1.4vw;
  position: relative;
  box-sizing: border-box;
  ${media.tablet} {
    padding: 2.4vw 4.8vw 6vw 2.4vw;
  }
  ${media.mobile} {
    height: 56.8vw;
    padding: 5vw;
  }
`;

const CardImage = styled.img`
  width: 30.3vw;
  height: 18.1vw;
  margin-bottom: 0;
  object-fit: cover;
  transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
  transform-origin: 50% 50%;
  ${media.tablet} {
    width: 43.1vw;
    height: 24.1vw;
  }
  ${media.mobile} {
    width: 86.7vw;
    height: 53.6vw;
  }
`;

const Arrow = styled(ArrowSVG)`
  width: 1.4vw;
  height: 1.4vw;
  position: absolute;
  top: 1.4vw;
  right: 1.4vw;
  z-index: 1;
`;

const Card = styled.a`
  width: 30.3vw;
  height: 30.6vw;
  margin-right: 1vw;
  cursor: pointer;
  text-decoration: none;
  background: #fefefe;

  ${Title} {
    ${text.desktopPetiteHeading};
    color: ${colors.jetBlack100};
    margin: 0.7vw 0 1vw;
    -webkit-line-clamp: 3;
    z-index: 1;
    transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
    position: relative;
  }
  ${DateDisplay} {
    position: relative;
    z-index: 1;
  }
  ${Tag} {
    position: relative;
    z-index: 1;
  }

  ${media.hover} {
    :hover {
      ${DarkBG} {
        transform: scaleX(1);
        transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      }
      ${CardImage} {
        transform: scale(1.05);
      }
      ${Title} {
        color: ${colors.white};
        transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      }
      ${Arrow} {
        path {
          stroke: ${colors.white};
          transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
        }
      }
      ${DateDisplay} {
        color: ${colors.white};
        transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      }
      ${TagBG} {
        opacity: 1;
        transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      }
      ${Tag} {
        color: white;
        transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      }
    }
  }
  ${media.tablet} {
    width: 43.1vw;
    height: 49.6vw;

    margin-bottom: 4.8vw;

    margin-right: 1.8vw;
    ${Title} {
      ${text.tabletPetiteHeading};
      margin: 1.2vw 0 2.4vw;
    }
    ${Arrow} {
      display: none;
    }
  }
  ${media.mobile} {
    margin-right: 4vw;
    ${Title} {
      ${text.mobilePetiteHeading};
      margin: 2.7vw 0 5.3vw;
    }
    width: 86.7vw;
    height: 110.4vw;
  }
    ${Arrow} {
      display: none;
    }
  }

`;

const MobileRow = styled.div`
  display: flex;
`;

const TabletWrapper = styled.div`
  ${media.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ${media.mobile} {
    flex-direction: column;
  }
  ${media.fullWidth} {
  }
`;
