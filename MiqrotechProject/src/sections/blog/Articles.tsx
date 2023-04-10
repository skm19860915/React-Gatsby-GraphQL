import React, { useEffect, useRef, useState, useContext, useMemo, useCallback } from "react";
import styled from "styled-components";
import { ScreenContext } from "@components/Layout";
import gsap from "gsap";
import addToMailchimp from "gatsby-plugin-mailchimp";
import loadable from '@loadable/component'

import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";

import { ReactComponent as ChevronSVG } from "@svg/chevron.svg";
import { ReactComponent as ArrowSVG } from "@svg/arrowUpRight.svg";
import { ReactComponent as OpenFilterSVG } from "@svg/openFilter.svg";

const ArrowSquare = loadable(() => import("@components/ArrowSquare"))

type props = {
  loading: boolean;
  allCards: any;
  allTags: string[];
};

const Hero: React.FC<props> = ({ loading, allCards, allTags }) => {
  const [enter1, setEnter1] = useState(false);
  const [enter2, setEnter2] = useState(false);
  const lastActivePage = useRef(0);
  const [activePage, setActivePage] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All +");
  const [filterState, setFilterState] = useState(0);
  const [initialArticles, setInitialArticles] = useState([]);
  const [renderedPage, setRenderedPage] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTotalPages, setActiveTotalPages] = useState(0);
  const screen = useContext(ScreenContext)
  const currentfilterBy = useRef(false);
  const buttonContainerRef = useRef(null);
  const endingNum = useRef(0);
  const lastPage = useRef(0);
  const [pageNums, setPageNums] = useState([]);
  const [email, setEmail] = useState("");
  const pagination = useRef(0);
  const testSetup = [[], [], [], [], []];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("")

  useEffect(() => {

    allCards.forEach((card) => {
      allTags.slice(1).forEach((tag, i, arr) => {
        if (card.cardTags.includes(arr[i])) {
          testSetup[i + 1].push(card);
        }
      });

      testSetup[0].push(card);
    });

    let allPaginatedArticles = [];
    testSetup.forEach((page, i) => {
      let page1 = page.splice(0, screen.mobile ? 7 : screen.tablet ? 9 : 10);
      let paginatedArticles = [];
      paginatedArticles.push(page1);
      let j;
      let k;
      let temporary;
      let chunk = screen.mobile ? 7 : screen.tablet ? 10 : 12;

      for (j = 0, k = page.length; j < k; j += chunk) {
        temporary = page.slice(j, j + chunk);
        paginatedArticles.push(temporary);
      }
      allPaginatedArticles.push(paginatedArticles);
    });

    setInitialArticles(allPaginatedArticles);
  }, [allCards, screen.tablet, screen.mobile, allTags]);

  useEffect(() => {
    pagination.current = 0;

    if (initialArticles.length > 0) {
      renderCards(initialArticles[0][0]);
      renderNumbers(initialArticles[0], 0);
    }
  }, [initialArticles]);

  useEffect(() => {
    if (initialArticles.length > 0) {
      renderCards(
        initialArticles[filterState][currentfilterBy.current ? 0 : activePage]
      );
      renderNumbers(
        initialArticles[filterState],
        currentfilterBy.current ? 0 : lastActivePage.current
      );
      currentfilterBy.current = false;
    }
  }, [activePage, filterState]);

  const getTagColors = useCallback((tag: string) => {
    const currentTags = allTags.slice(1);

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
  }, [allTags])

  const getDate = useCallback((inputDate: any) => {
    const newDate = inputDate.split("-");

    const myNewDate = new Date(
      Date.UTC(newDate[0], newDate[1] - 1, newDate[2])
    );
    const printedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(myNewDate);

    return printedDate;
  }, [])

  const allButtons = useMemo(() => allTags.map((button, i) => {
    return (
      <FilterButton
        active={filterState === i}
        key={`filter-button${i}`}
        onClick={() => {
          currentfilterBy.current = true;
          setFilterState(i);
          handleNumberChange(0);
        }}
      >
        <div></div>
        <ButtonText>{`${button} +`}</ButtonText>
      </FilterButton>
    );
  }), [allTags, filterState, currentfilterBy])

  const handleTagFilter = useCallback((
    tagNameString: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const tagState = allTags.indexOf(
      allTags.filter((btn) => btn.includes(tagNameString))[0]
    );

    setFilterState(tagState);
    handleNumberChange(0);
  }, [allTags])

  const renderCards = useCallback((cardPageArray) => {
    const allArticleCards = cardPageArray.map((card: any, index, arr) => {
      const { cardImage, cardTags, cardTitle, date, link } = card;

      const allCardTags = cardTags.map((tag, i) => {
        const color = getTagColors(tag);

        return (
          <Tag
            key={i}
            onClick={(e) => {
              currentfilterBy.current = true;
              handleTagFilter(tag, e);
            }}
          >
            <span>{tag}</span>
            <TagBG bGColor={color} />
          </Tag>
        );
      });

      if (activePage === 0 && index === 0) {
        return (
          <FeatureCard
            key={`card-${cardTitle}-${index}`}
            href={`/blog/${link}`}
          >
            <CardTop>
              <CardImage src={cardImage.url} alt={cardTitle} />
            </CardTop>
            <CardBottom>
              <DateDisplay>{getDate(date)}</DateDisplay>
              <Title>{cardTitle}</Title>
              <Tags>{allCardTags}</Tags>
              <Arrow />
              <DarkBG />
            </CardBottom>
          </FeatureCard>
        );
      } else {
        return (
          <Card key={`card-${cardTitle}-${index}`} href={`/blog/${link}`}>
            <CardTop>
              <CardImage src={cardImage.url} alt={cardTitle} />
            </CardTop>
            <CardBottom>
              <DateDisplay>{getDate(date)}</DateDisplay>
              <Title>{cardTitle}</Title>
              <Tags>{allCardTags}</Tags>
              <Arrow />
              <DarkBG />
            </CardBottom>
          </Card>
        );
      }
    });
    setRenderedPage(allArticleCards);
  }, [])

  const handleNumberChange = useCallback((page) => {
    window.scrollTo(0, 0);
    lastPage.current = lastActivePage.current;
    lastActivePage.current = page;
    setActivePage(lastActivePage.current);
    // renderNumbers(filterState, page);
  }, [])

  const renderNumbers = useCallback((tagNum, currentNum?) => {
    setActiveTotalPages(tagNum.length - 1);
    let pageNums = tagNum.map((num, i) => i);
    const totalPageLength = pageNums.length;
    const finalPage = pageNums[pageNums.length - 1];

    if (totalPageLength < 8) {
      const newNums = pageNums;
      pageNums = newNums;
    } else {
      if (currentNum < 4 || (currentNum === 4 && lastPage.current > 4)) {
        pageNums = pageNums.slice(0, 5);
        pageNums.push("...", finalPage);
      } else if (currentNum >= 4) {
        if (finalPage - currentNum < 5) {
          endingNum.current = currentNum;

          pageNums = pageNums.slice(totalPageLength - 5, finalPage);
          pageNums.push(finalPage);
          pageNums.unshift(0, "...");
        } else {
          if (currentNum % 2 === 0) {
            if (lastPage.current < currentNum) {
              endingNum.current = currentNum;
              pageNums = pageNums.slice(
                endingNum.current,
                endingNum.current + 3
              );
            } else {
              endingNum.current = currentNum;
              pageNums = pageNums.slice(
                endingNum.current - 3,
                endingNum.current
              );
            }

            pageNums.push("...", finalPage);
            pageNums.unshift(0, "...");
          } else {
            endingNum.current = currentNum;
            pageNums = pageNums.slice(
              endingNum.current - 1,
              endingNum.current + 2
            );
            pageNums.push("...", finalPage);
            pageNums.unshift(0, "...");
          }
        }
      }
    }
    const allPageNums = pageNums.map((num, i) => {
      const displayNum = isNaN(num) ? num : num + 1;
      return (
        <PageNumber
          activeNum={activePage == num}
          key={i}
          onClick={() => handleNumberChange(num)}
        >
          {displayNum}
        </PageNumber>
      );
    });

    setPageNums(allPageNums);
  }, [])

  const handleNext = useCallback(() => {
    if (activePage < activeTotalPages) {
      handleNumberChange(activePage + 1);
    }
  }, [])

  const handlePrev = useCallback(() => {
    if (activePage > 0) {
      handleNumberChange(activePage - 1);
    }
  }, [])

  useEffect(() => {
    if (screen.mobile) {
      setActiveFilter(allTags[filterState]);
      setFiltersOpen(false);
    }
  }, [screen.mobile, filterState]);

  useEffect(() => {
    if (success) {
      const tl = gsap.timeline();

      tl.to(".blog_input", {
        duration: 2,
        onStart: () => setEmail("Thanks for Subscribing"),
      });

      return () => {
        tl.kill();
      };
    }
  }, [success]);

  const onSubmit = (e: any) => {
    setError("")
    e.preventDefault();
    addToMailchimp(
      email,
      {},
      "https://miqrotech.us5.list-manage.com/subscribe/post?u=2327c39cb10439bcfe1fa5d95&amp;id=107dd7b425"
    ).then((data) => {
      if (data.result === "success") {
        setSuccess(true);
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
  }

  return (
    <Wrapper id="blog-hero">
      <Ticker>
        <a href="/">Home</a> <Chevron />
        <a href="/blog">News</a>
      </Ticker>
      <TopSection>
        <Title>News</Title>
        <EmailList onSubmit={onSubmit}>
          <EmailTitle>
            {error || "Stay up to date on mIQrotech's latest news. No spam period."}
          </EmailTitle>
          <input
            className="blog_input"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Chevron onClick={onSubmit} />
        </EmailList>
      </TopSection>
      <FilterButtons filtersOpen={filtersOpen}>
        <MobileRow>
          <FilterBy>
            Filter by: {screen.mobile && <span>{activeFilter}</span>}
          </FilterBy>
          {screen.mobile && (
            <Open
              onClick={() => setFiltersOpen(!filtersOpen)}
              filtersOpen={filtersOpen}
            >
              <Ham />
            </Open>
          )}
        </MobileRow>
        <MobileFilters>{allButtons}</MobileFilters>
      </FilterButtons>

      <CardsContainer>{renderedPage}</CardsContainer>
      {pageNums.length > 1 && <PageRow>
        <ButtonContainer ref={buttonContainerRef}>
          <ArrowContainer1
            onClick={handlePrev}
            onMouseEnter={() => setEnter1(true)}
            onMouseLeave={() => setEnter1(false)}
          >
            <ArrowSquare mouseEnter={enter1} color={"rgba(5, 5, 5, 0.3)"} />
          </ArrowContainer1>
          <PageNumbers>{pageNums}</PageNumbers>
          <ArrowContainer2
            onClick={handleNext}
            onMouseEnter={() => setEnter2(true)}
            onMouseLeave={() => setEnter2(false)}
          >
            <ArrowSquare mouseEnter={enter2} color={"rgba(5, 5, 5, 0.3)"} />
          </ArrowContainer2>
        </ButtonContainer>
      </PageRow>}
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  position: relative;
  background: ${colors.culturedWhite100};
  padding: 6.9vw 1.2vw 12.5vw 3.5vw;

  ${media.tablet} {
    padding: 14.3vw 6vw 16.8vw 6vw;
  }

  ${media.mobile} {
    padding: 32vw 6.7vw 21.3vw 6.7vw;
  }
`;

const DateDisplay = styled.p`
  ${text.desktopSmallBody};
  color: ${colors.jetBlack20};
  margin-bottom: 0.7vw;
  ${media.tablet} {
    ${text.tabletSmallBody};
  }
  ${media.mobile} {
    ${text.mobileSmallBody};
    margin-bottom: 2.7vw;
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
  align-items: flex-start;
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
    font-size: 3.2vw;
    height: 8.3vw;
    ${Chevron} {
      width: 5vw;
      height: 5vw;
      margin-left: 1vw;
      margin-right: 1vw;
    }
    margin-bottom: 5.3vw;
  }
`;

const Tag = styled.div`
  ${text.desktopTagText};
  color: ${colors.jetBlack20};
  position: relative;
  padding: 0.1vw 0.7vw;
  margin-right: 1vw;
  text-decoration: none;
  z-index: 4;
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
    ${text.tabletTagText};
  }
  ${media.mobile} {
    font-size: 2.7vw;
  }
`;

const Tags = styled.div`
  display: flex;
`;

const EmailList = styled.form`
  ${text.desktopSmallBody};
  position: relative;
  width: 14.3vw;

  ${Chevron} {
    position: absolute;
    top: 5vw;
    width: 1.9vw;
    height: 1.9vw;
    right: 0;
  }
  input {
    border-radius: 0px;
    border: none;
    appearance: none;
    outline: none;
    background: transparent;
    height: 1.9vw;
    position: relative;
    width: 100%;
  }
  p {
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
    ${text.tabletSmallBody};
    width: 24.7vw;
    ${Chevron} {
      position: absolute;
      top: 8.5vw;
      width: 3.4vw;
      height: 3.4vw;
      right: 0;
    }
    input {
      height: 3.4vw;
      border-radius: 0px;
    }
  }
  ${media.mobile} {
    ${text.mobileSmallBody};
    width: 100%;
    margin-bottom: 10.7vw;

    ${Chevron} {
      position: absolute;
      bottom: 0;
      top: auto;
      width: 7.5vw;
      height: 7.5vw;
      right: 0;
    }

    input {
      height: 7.2vw;
      border-radius: 0px;
    }
  }
`;

const EmailTitle = styled.p`
  color: ${colors.jetBlack20};

  ${media.tablet} {
  }

  ${media.mobile} {
    width: 50vw;
    margin-bottom: 2.7vw;
  }
`;

const Title = styled.h1`
  ${text.desktopXLHeading};
  color: ${colors.jetBlack100};

  ${media.tablet} {
    ${text.tabletXLHeading};
  }
  ${media.mobile} {
    ${text.mobileXLHeading};
    margin-bottom: 8vw;
  }
  ${media.fullWidth} {
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.mobile} {
    flex-direction: column;
    margin-bottom: 24vw;
  }
`;

const ButtonText = styled.span`
  position: relative;

  ${media.tablet} {
    ${text.tabletSmallBody};
  }
  ${media.mobile} {
    ${text.mobileSmallBody};
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  div {
    width: 110%;
    left: -5%;
    top: -1px;
    height: 1px;
    background: ${colors.keppel100};
    position: absolute;
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transform-origin: 50% 50%;
    transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
  }
  ${ButtonText} {
    display: flex;
    align-items: center;
    color: ${(props) => (props.active ? colors.keppel100 : colors.jetBlack100)};
    transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
  }

  text-align: left;
  position: relative;
  width: fit-content;
  margin-right: 5.6vw;
  appearance: none;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  ${media.tablet} {
    margin-right: 3.8vw;
    padding: 0;
    ${ButtonText} {
      width: 100%;
    }
  }
  ${media.mobile} {
    margin-right: 5.3vw;
    margin-bottom: 2.7vw;
    div {
      display: none;
    }
  }
  ${media.fullWidth} {
  }
`;

const FilterButtons = styled.div<{ filtersOpen: boolean }>`
  ${text.desktopSmallBody};
  display: flex;
  height: 3.5vw;
  border-top: 1px solid ${colors.culturedWhite20};
  margin: 1.4vw 0 2.1vw;

  ${media.tablet} {
    margin: 4.8vw 0 4.8vw;
    height: 6vw;
  }

  ${FilterButton}:last-child() {
    margin-right: 0;
  }
  ${media.mobile} {
    background: ${colors.culturedWhite100};
    position: absolute;
    width: 86.7vw;
    left: 6.7vw;
    top: 106.7vw;
    display: block;
    height: ${(props) => (props.filtersOpen ? "46.1vw" : "13.3vw")};
    transition: height 0.5s cubic-bezier(0.3, 0, 0, 1);
    overflow: hidden;
    z-index: 10;
  }
  ${media.fullWidth} {
  }
`;

const FilterBy = styled.p`
  ${text.desktopSmallBody};
  padding: 1vw 8.3vw 1vw 1.4vw;
  margin-right: 6.2vw;
  border-right: 1px solid ${colors.culturedWhite20};
  ${media.tablet} {
    ${text.tabletSmallBody};
    padding: 1.7vw 14.4vw 1.7vw 2.4vw;
    margin-right: 7.1vw;
  }
  ${media.mobile} {
    ${text.mobileSmallBody};
    width: 68.8vw;
    padding: 3.7vw 0;
    margin-right: 0;

    span {
      margin-left: 3.7vw;
      color: ${colors.keppel100};
    }
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.tablet} {
    justify-content: space-between;
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
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
  ${media.fullWidth} {
  }
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
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    display: none;
  }
`;

const CardBottom = styled.div`
  width: 100%;
  padding: 1.4vw;
  background: #fefefe;
  position: relative;
  box-sizing: border-box;
  ${media.tablet} {
    padding: 2.4vw 4.8vw 6vw 2.4vw;
  }
  ${media.mobile} {
    padding: 5.3vw 5.3vw 13.3vw 5.3vw;
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
  ${media.fullWidth} {
  }
`;

const Arrow = styled(ArrowSVG)`
  width: 1.4vw;
  height: 1.4vw;
  position: absolute;
  top: 1.4vw;
  right: 1.4vw;
  z-index: 1;
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    display: none;
  }
  ${media.fullWidth} {
  }
`;

const Card = styled.a`
  width: 30.3vw;
  height: 30.6vw;
  cursor: pointer;
  margin-bottom: 4.2vw;
  text-decoration: none;
  margin-right: 1vw;
  ${Title} {
    ${text.desktopPetiteHeading};
    color: ${colors.jetBlack100};
    height: 5vw;
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
        transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
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

    margin-right: 0;
    ${Title} {
      ${text.tabletPetiteHeading};
      margin: 1.2vw 0 2.4vw;
      height: max-content;
    }
    ${Arrow} {
      display: none;
    }
  }
  ${media.mobile} {
    width: 86.7vw;
    height: 110.4vw;
    margin-bottom: 10.7vw;
    ${Title} {
      ${text.mobilePetiteHeading};
      margin: 2.7vw 0 5.3vw;
      height: auto;
    }
  }
  ${media.fullWidth} {
  }
`;

const FeatureCard = styled(Card)`
  width: 93.1vw;
  height: 27.8vw;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 0;
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

  ${CardTop} {
    width: 46vw;
    height: 100%;
  }

  ${CardBottom} {
    width: 47.1vw;
    height: 100%;
    padding: 12.8vw 16.5vw 2.8vw 2.8vw;
  }

  ${CardImage} {
    width: 46vw;
    height: 100%;
  }
  ${Arrow} {
    display: inline-block;
    width: 2.8vw;
    height: 2.8vw;
    top: 2.8vw;
    right: 2.8vw;
  }

  ${media.tablet} {
    flex-direction: column;
    width: 87.5vw;
    height: 74.8vw;

    ${CardImage} {
      width: 87.5vw;
      height: 29.9vw;
    }
    ${CardTop} {
      width: 87.5vw;
      height: 29.9vw;
    }

    ${CardBottom} {
      width: 87.5vw;
      height: 42.9vw;
      padding: 14.1vw 35.2vw 7.8vw 4.8vw;
    }
    ${Arrow} {
      width: 4.2vw;
      height: 4.2vw;
      top: 4.2vw;
      right: 4.2vw;
    }
    ${Title} {
      ${text.tabletPetiteHeading};
      margin: 1.2vw 0 4.8vw;
    }
  }
  ${media.mobile} {
    flex-direction: column;
    width: 86.7vw;
    height: auto;

    ${CardImage} {
      width: 86.7vw;
      height: 66.7vw;
    }
    ${CardTop} {
      width: 86.7vw;
      height: 66.7vw;
    }
    ${Tag} {
      position: relative;
      z-index: 1;
    }
    ${CardBottom} {
      width: 86.7vw;
      height: auto;
      padding: 31.5vw 2vw 16vw 10.7vw;
    }
    ${Arrow} {
      display: inline-block;
      width: 10.7vw;
      height: 10.7vw;
      top: 10.7vw;
      right: 10.7vw;
    }
    ${Title} {
      ${text.mobilePetiteHeading};
      width: 66.7vw;
      height: auto;
      margin: 2.7vw 0 8vw;
    }
  }
`;

const PageRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: fit-content;
  height: 1.9vw;
  margin-right: 1.2vw;
  ${media.tablet} {
    height: auto;
    width: fit-content;
  }
  ${media.mobile} {
    height: auto;
    width: fit-content;
    margin: 0 auto;
  }
`;

const ArrowContainerStyles = `
 cursor: pointer;
 width: 1.9vw;
  height: 1.9vw;

  ${media.tablet} {
    width: 3.4vw;
    height: 3.4vw;
  }
  ${media.mobile} {
    width: 7.5vw;
    height: 7.5vw;
  }
`;

const ArrowContainer1 = styled.div`
  ${ArrowContainerStyles}
  transform: rotate(180deg);
  margin-right: 0.694vw;
`;

const ArrowContainer2 = styled.div`
  ${ArrowContainerStyles}
  margin-left: 0.694vw;
`;

const PageNumber = styled.button<{ activeNum: boolean }>`
  ${text.desktopSmallBody};
  appearance: none;
  border: none;
  background: transparent;
  color: ${(props) => (props.activeNum ? colors.keppel100 : colors.black)};
  cursor: pointer;
  transition: 0.4s;
  text-decoration: ${(props) => (props.activeNum ? "underline" : "none")};
  ${media.tablet} {
    ${text.tabletSmallBody};
    margin: 0 0.6vw;
  }
  ${media.mobile} {
    ${text.mobileSmallBody};
    margin: 0 2vw;
  }
`;

const PageNumbers = styled.div`
  display: flex;
`;

const MobileRow = styled.div`
  ${media.mobile} {
    display: flex;
    width: 100%;
  }
`;

const Open = styled.button<{ filtersOpen: boolean }>`
  ${media.mobile} {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: transparent;
    text-align: right;
    width: 17.9vw;

    .filter_ham {
      transform: scaleX(${(props) => (props.filtersOpen ? 0 : 1)});
      transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      transition-delay: ${(props) => (props.filtersOpen ? 0 : "0.2s")};
      transform-origin: 50% 50%;
    }

    .filter_x {
      transform: scale(${(props) => (props.filtersOpen ? 1 : 0)});
      transition: 0.5s cubic-bezier(0.3, 0, 0, 1);
      transition-delay: ${(props) => (props.filtersOpen ? "0.2s" : 0)};
      transform-origin: 50% 50%;
    }
  }
`;

const Ham = styled(OpenFilterSVG)`
  ${media.mobile} {
    width: 6.4vw;
    height: 6.4vw;
  }
`;

const MobileFilters = styled.div`
  display: flex;
  ${media.mobile} {
    flex-wrap: wrap;
  }
`;
