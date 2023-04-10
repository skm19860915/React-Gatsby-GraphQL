import React, { useMemo } from "react";
import loadable from "@loadable/component";
import { graphql } from "gatsby";
import colors from "@styles/colors";

import SEO from "@components/SEO";
import Articles from "@sections/blog/Articles";
const Header = loadable(() => import("@components/Header"))
const StayUpToDate = loadable(() => import("@components/StayUpToDate"));

type props = {
  data: any;
  loading: boolean
};

const Blog: React.FC<props> = ({ data, loading }) => {
  let testData = data.allContentfulBlogPost.nodes;

  let allTestData = useMemo(() => testData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  }), [testData])

  const allTags = useMemo(() => ["All", ...data.allContentfulBlogPost.tagList], [])

  const cardData = useMemo(() => allTestData.map((article, i) => {
    const moreTags = article.moreTags.map((tag) => tag.tagName)
    const newData = {
      date: article.date,
      cardImage: article.mainBlogImage.file,
      cardTitle: article.title,
      cardTags: moreTags,
      mainTag: moreTags[0],
      link: article.title
        .split(" ")
        .filter((e) => e !== "/")
        .join(" ")
        .toLowerCase()
        .replace(/\s+/g, "-"),
    };
    return newData;
  }), [allTestData])

  return (
    <>
      <Header 
        startingTextColor={colors.white}
        startingBackgroundColor={colors.black}
      />
      <SEO title="News | mIQrotech" />
      <Articles allTags={allTags} allCards={cardData}/>
      <StayUpToDate/>
    </>
  );
};

export default Blog;

export const pageQuery = graphql`
  query allBlogs {
    allContentfulBlogPost {
      tagList: distinct(field: moreTags___tagName)
      nodes {
        title
        date
        moreTags {
          tagName
        }
        description
        mainBlogImage {
          file {
            fileName
            url
          }
        }
      }
    }
  }
`;
