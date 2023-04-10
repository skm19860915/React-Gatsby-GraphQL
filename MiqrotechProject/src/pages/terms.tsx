import * as React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import renderHTML from "react-render-html"

import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import styled from "styled-components"

import Hero2 from "../components/hero2"
import ContactInfo from "../components/contactInfo"
import { Home } from "../styles/contact"
import SEO from "../components/seo"

const Content = styled.div`
  margin: 64px;
  font-family: "Overpass";
  font-size: 16px;
  a {
    color: #946a4d;
    &:hover {
      color: #946a4d;
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
    margin: 32px;
  }
`

const Terms: React.FC = (props: any) => {
  const {
    WebsitepageTitle,
    websiteKeywords,
    websitePageDescription,
    heroBlock,
    standardContentBlock,
    callToActionBlock,
  } = props.data.craft.entry

  return (
    <Home>
      <SEO
        title={WebsitepageTitle || ""}
        keywords={websiteKeywords || ""}
        description={websitePageDescription || ""}
      />
      <Header></Header>
      <Hero2
        header={heroBlock[0].headline || ""}
        subheader={heroBlock[0].subHeadline || ""}
        img={heroBlock[0].heroImage[0].url || ""}
      />
      <Content>{renderHTML(standardContentBlock[0].textBlock)}</Content>
      <Prefooter
        headline={callToActionBlock[0].headline || ""}
        action={callToActionBlock[0].callToActionTextblock || ""}
        img={callToActionBlock[0].heroImage[0].url || ""}
        backImg={callToActionBlock[0].backgroundImage[0].url || ""}
        link={callToActionBlock[0].callToActionLinkblock || ""}
      ></Prefooter>
      <Footer></Footer>
    </Home>
  )
}

export default Terms
export const termsQuery = graphql`
  query {
    craft {
      entry(section: "smrTermsOfService", site: "starMetalsResidential") {
        id
        ... on Craft_smrTermsOfService_smrTermsOfService_Entry {
          id
          heroBlock {
            ... on Craft_heroBlock_BlockType {
              headline
              subHeadline
              heroImage {
                url
              }
              callToActionText
              callToActionLink
            }
          }
          standardContentBlock {
            ... on Craft_standardContentBlock_simpleTextBlock_BlockType {
              id
              textBlock
            }
          }
          callToActionBlock {
            ... on Craft_callToActionBlock_BlockType {
              headline
              callToActionTextblock
              callToActionLinkblock
              heroImage {
                url
              }
              backgroundImage {
                url
              }
            }
          }
          websitePageDescription
          websiteKeywords
          WebsitepageTitle
        }
      }
    }
  }
`
