import React, { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import { GatsbyImage } from "gatsby-plugin-image";
import { ScreenContext } from "@components/Layout";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));

type props = {
  storyInfos: any;
};

const StorySectionPart: React.FC<props> = ({ storyInfos }) => {
  const screen = useContext(ScreenContext);
  
  let showCards = useMemo(() => storyInfos.filter((info) => { return info.featured; }).slice(0, 3)
  .sort((a, b) => { return new Date(b.date) - new Date(a.date); }), [storyInfos]);

  const getDate = useCallback((inputDate) => 
  {
    const newDate = inputDate.split("-");
    const myNewDate = new Date(Date.UTC(newDate[0], newDate[1] - 1, newDate[2]));
    const printedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(myNewDate);

    return printedDate;
  }, [])

  const cardData = useMemo(() => showCards.map((article, i) => 
  {
    const newData = {
      date: getDate(article.date),
      cardImage: article.mainBlogImage.gatsbyImageData,
      cardTitle: article.title,
      description: article.description,
      link: article.title.split(" ").filter((e) => e !== "/").join(" ").toLowerCase().replace(/\s+/g, "-")
    };
    return newData;
  }), [showCards])

  const allFeatured = useMemo(() => cardData.map((story, i) => {
  return (
      <Story className={`featured_story${i}`} key={`featured_story${i}`} href={`/blog/${story.link}`}>
        <GatsbyImage image={story.cardImage} alt="article image" />
        <DateText>{story.date}</DateText>
        <SmallTitle>{story.cardTitle}</SmallTitle>
        <Text>{story.description}</Text>
        <PrimaryButton text="Read Article" textColor={colors.culturedWhite} hoverColor={colors.black} backgroundColor={colors.black} padding />
      </Story>
    );
  }), [cardData])

  return (
    <div>
      {!screen.mobile ? ( <TileContainer>{allFeatured}</TileContainer> ) : ( <TileContainer><MobileWrapper>{allFeatured}</MobileWrapper></TileContainer> )}
    </div>
  );
};

export default StorySectionPart;

const DateText = styled.p`
  color: ${colors.jetBlack20};

  ${media.fullWidth} {
    ${text.desktopBodyCopy1};
    margin-top: 3.2vw;
    margin-bottom: 1.4vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1};
    margin-top: 3.2vw;
    margin-bottom: 1.4vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    margin-top: 3.597vw;
    margin-bottom: 1.559vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-top: 8vw;
    margin-bottom: 3.467vw;
  }
`;

const Text = styled.p`
  position: relative;
  color: ${colors.culturedWhite60};
  letter-spacing: -0.02em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 0.2vw;

  ${text.desktopSmallBody};
  height: 5.5vw;
  width: 17.2vw;
  margin-bottom: 1.667vw;

  ${media.tablet} {
    ${text.tabletSmallBody}
    height: 10.671vw;
    width: 23.621vw;
    margin-bottom: 4.796vw;
    font-size: 1.439vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    height: 33.333vw;
    width: 100%;
    margin-bottom: 8.8vw;
  }
`;

const SmallTitle = styled.h3`
  color: ${colors.culturedWhite60};
  letter-spacing: -0.02em;
  ${text.desktopPetiteHeading};
  height: 5.2vw;
  margin-bottom: 1.4vw;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 0.2vw;

  ${media.tablet} {
    ${text.tabletBodyCopy2}
    height: 5.6vw;
    margin-bottom: 2.4vw;
    line-height: 100%;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy2}
    height: 13.5vw;
    margin-bottom: 5.3vw;
    line-height: 100%;
  }
`;

const Story = styled.a`
  overflow: hidden;
  position: relative;
  opacity: 0;
  text-decoration: none;

  height: 40.8vw;
  width: 22.6vw;

  .gatsby-image-wrapper {
    width: 100%;
    height: 17.4vw;
    object-fit: cover;
  }

  ${media.tablet} {
    height: auto;
    width: 25.659vw;

    .gatsby-image-wrapper {
      width: 100%;
      height: 19.784vw;
    }
  }

  ${media.mobile} {
    width: 52.533vw;
    margin-right: 12vw;
    height: auto;
    opacity: 1;
    .gatsby-image-wrapper {
      width: 100%;
      height: 44vw;
    }
  }
`;

const TileContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.mobile} {
    justify-content: flex-start;
    position: relative;
    width: 100vw;
    overflow: scroll;
    padding-bottom: 10vw;
  }
`;

const MobileWrapper = styled.div`
  ${media.mobile} {
    display: flex;
    justify-content: flex-start;
    position: relative;
    width: 208vw;
  }
`;
