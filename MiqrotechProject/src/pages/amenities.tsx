import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import Component1 from "../components/component1"
import Component2 from "../components/component2"
import Hero2 from "../components/hero2"
import PlaceCopy from "../components/placeCopy"
import AmenityHeader from "../components/amenityHeader"
import SelectedAmenity from "../components/selectedAmenity"
import { Home, Desc, Section2 } from "../styles/amenities"
import SEO from "../components/seo"
import renderHTML from "react-render-html"

const Amenities: React.FC = (props: any) => {
  const {
    WebsitepageTitle,
    websiteKeywords,
    websitePageDescription,
    heroBlock,
    contentBlock,
    textBlock,
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
      <Desc>{renderHTML(textBlock[0].headline)}</Desc>

      <AmenityHeader
        orientation="left"
        header={contentBlock[1].headline || ""}
        desc={contentBlock[1].teaserText || ""}
        img={contentBlock[1].heroImage[0].url || ""}
        backImg={contentBlock[1].backgroundImage[0].url || ""}
      ></AmenityHeader>
      <SelectedAmenity type="community" />
      <AmenityHeader
        orientation="right"
        header={contentBlock[0].headline || ""}
        desc={contentBlock[0].teaserText || ""}
        img={contentBlock[0].heroImage[0].url || ""}
        backImg={contentBlock[0].backgroundImage[0].url || ""}
      ></AmenityHeader>
      <SelectedAmenity type="apartment" />
      <Component1
        desc={contentBlock[2].teaserText || ""}
        bigImg={contentBlock[2].image2[0].url || ""}
        smallImg={contentBlock[2].heroImage[0].url || ""}
        heading={contentBlock[2].headline || ""}
        action={contentBlock[2].callToActionText || ""}
        link={contentBlock[2].callToActionLink || ""}
        containDetail={false}
        descTop={true}
      />
      <Section2>
        <Component2
          desc={contentBlock[3].teaserText || ""}
          smallImg={contentBlock[3].image2[0].url || ""}
          bigImg={contentBlock[3].heroImage[0].url || ""}
          heading={contentBlock[3].headline || ""}
          action={contentBlock[3].callToActionText || ""}
          link={contentBlock[3].callToActionLink || ""}
          containDetail={false}
          descTop={true}
        />
      </Section2>
      <PlaceCopy
        heading={callToActionBlock[0].headline || ""}
        desc={callToActionBlock[0].paragraphText || ""}
        action={callToActionBlock[0].callToActionTextblock || ""}
        link={callToActionBlock[0].callToActionLinkblock || ""}
      ></PlaceCopy>
      <Footer></Footer>
    </Home>
  )
}

export default Amenities
export const amenityQuery = graphql`
  query {
    craft {
      entry(section: "smramenities", site: "starMetalsResidential") {
        id
        ... on Craft_smramenities_smramenities_Entry {
          heroBlock {
            ... on Craft_heroBlock_BlockType {
              heroImage {
                url
              }
              headline
              subHeadline
            }
          }
          textBlock {
            ... on Craft_textBlock_BlockType {
              id
              headline
            }
          }
          contentBlock {
            ... on Craft_contentBlock_BlockType {
              heroImage {
                url
              }
              image2 {
                url
              }
              backgroundImage {
                url
              }
              headline
              teaserText
              callToActionText
              callToActionLink
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
              paragraphText
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
