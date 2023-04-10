import React, { useMemo } from "react";
import { graphql } from "gatsby";
import SEO from "@components/SEO";

import Header from '@components/Header'
import Hero from "@sections/blogPostPage/Hero";
import StayUpToDate from "@components/StayUpToDate";
import colors from "@styles/colors";

type props = {
  pageContext: {
    allTags: any;
    allArticles: any;
    articleData: any;
  };
  data: any;
};

const BlogPage: React.FC<props> = ({ pageContext, data }) => {
  const { allArticles, articleData } = pageContext;

  const tagList = data.allContentfulBlogPost.tagList;

  let cardDataInitial = useMemo(() => allArticles.filter((article) => {
    const tags = article.moreTags.map((tag) => tag.tagName);
    const thisArticleTag = articleData.moreTags[0].tagName;
    return tags.includes(thisArticleTag) && article.id !== articleData.id;
  }), [allArticles])

  if (cardDataInitial.length < 4) {
    cardDataInitial = allArticles.filter((article) => {
      return article.id !== articleData.id;
    });
  }

  const cardData = useMemo(() => cardDataInitial
    .map((article, i) => {
      const moreTags = article.moreTags.map((tag) => tag.tagName);

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
    })
    .slice(0, 6), [cardDataInitial])

  const link = articleData.title
    .split(" ")
    .filter((e) => e !== "/")
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, "-");
    
  return (
    <>
      <Header 
        startingTextColor={colors.white}
        startingBackgroundColor={colors.black}
      />
      <SEO
        title={articleData.title}
        image={articleData.mainBlogImage.file.url}
        description={articleData.description}
        url={`https://www.miqrotech.com/blog/${link}`}
      />
      <Hero
        blog={articleData}
        url={`https://www.miqrotech.com/blog/${link}`}
        cardData={cardData}
        allPossibleTags={tagList}
      />
      <StayUpToDate />
    </>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query ($path: String!) {
    allContentfulBlogPost {
      tagList: distinct(field: moreTags___tagName)
    }
    allSitePage(filter: { path: { eq: $path } }) {
      nodes {
        context {
          allArticles {
            date
            id
            mainBlogImage {
              file {
                fileName
                url
              }
            }
            moreTags {
              tagName
            }
            title
          }
          articleData {
            body {
              childMarkdownRemark {
                html
              }
            }
            description
            date
            id
            mainBlogImage {
              file {
                fileName
                url
              }
            }
            moreTags {
              tagName
            }
            title
          }
        }
      }
    }
  }
`;
