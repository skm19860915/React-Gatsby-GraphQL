import * as React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import Component1 from "../components/component1"
import Component2 from "../components/component2"
import Hero from "../components/hero"
import Lifestyle from "../components/lifestyle"
import Wave3 from "../components/wave3"
import Wave from "../components/wave"
import {
  Home,
  Section1,
  Section1_Heading,
  Section2,
  Section21,
  Section2_Heading,
  Section3,
  Section3_Heading,
  Section4,
  Section4_Heading,
} from "../styles/home"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import SEO from "../components/seo"
import NeighbourhoodImg from "../assets/img/neighbourhood.png"
import NeighbourhoodImg2 from "../assets/img/neighbourhood2.png"
import renderHTML from "react-render-html"
import { convertImgUrl } from "../utils/imageKit"

const HomePage: React.FC = (props: any) => {
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
      <Hero
        title={heroBlock[0].headline || ""}
        img={heroBlock[0].heroImage[0].url || ""}
        action={heroBlock[0].callToActionText || ""}
        // link={heroBlock[0].callToActionLink || ""}
        link={"/amenities"}
        type={0}
      />
      <Lifestyle
        headline={standardContentBlock[0].headline || ""}
        subHeadline={standardContentBlock[0].subheadline || ""}
        action1={standardContentBlock[0].callToAction1Text || ""}
        action2={standardContentBlock[0].callToAction2Text || ""}
        link1={standardContentBlock[0].callToActionLink || ""}
        link2={standardContentBlock[0].callToAction2Link || ""}
        img1={standardContentBlock[0].heroImage[0].url || ""}
        img2={standardContentBlock[0].image2[0].url || ""}
        text={standardContentBlock[0].longText || ""}
      />

      <Section1
        img={convertImgUrl(
          standardContentBlock[1].backgroundImage[0].url || "",
          false
        )}
        mobileImg={convertImgUrl(
          standardContentBlock[1].backgroundImage[0].url || "",
          true
        )}
      >
        <Section1_Heading>
          {renderHTML(standardContentBlock[1].textBlock || "")}
        </Section1_Heading>
      </Section1>
      <Component1
        desc={standardContentBlock[2].longText || ""}
        bigImg={standardContentBlock[2].image2[0].url || ""}
        smallImg={standardContentBlock[2].heroImage[0].url || ""}
        heading={standardContentBlock[2].headline || ""}
        action={standardContentBlock[2].callToAction1Text || ""}
        link={standardContentBlock[2].callToActionLink || ""}
        containDetail={true}
        descTop={false}
      />
      <Section2>
        <Wave3></Wave3>
        <Section2_Heading>
          {renderHTML(standardContentBlock[3].textBlock || "")}
        </Section2_Heading>
        <Wave3></Wave3>
      </Section2>
      <Section21 id="section21">
        <Wave id="section21" />
      </Section21>
      <Component2
        desc={standardContentBlock[4].longText || ""}
        smallImg={standardContentBlock[4].image2[0].url || ""}
        bigImg={standardContentBlock[4].heroImage[0].url || ""}
        heading={standardContentBlock[4].headline || ""}
        action={standardContentBlock[4].callToAction1Text || ""}
        link={standardContentBlock[4].callToActionLink || ""}
        containDetail={true}
        descTop={false}
      />
      <Section3>
        <Wave3></Wave3>
        <Section3_Heading>
          {renderHTML(standardContentBlock[5].textBlock || "")}
        </Section3_Heading>
        <Wave3></Wave3>
      </Section3>
      <Component1
        desc={standardContentBlock[6].longText || ""}
        bigImg={standardContentBlock[6].image2[0].url || ""}
        smallImg={standardContentBlock[6].heroImage[0].url || ""}
        heading={standardContentBlock[6].headline || ""}
        action={standardContentBlock[6].callToAction1Text || ""}
        link={standardContentBlock[6].callToActionLink || ""}
        containDetail={true}
        descTop={false}
      />
      <Section4>
        <Wave3></Wave3>
        <Section4_Heading>
          {renderHTML(standardContentBlock[7].textBlock || "")}
        </Section4_Heading>
        <Wave3></Wave3>
      </Section4>

      {/* <Component2
        desc={standardContentBlock[8].longText || ""}
        bigImg={standardContentBlock[8].image2[0].url || ""}
        smallImg={standardContentBlock[8].heroImage[0].url || ""}
        heading={standardContentBlock[8].headline || ""}
        action={standardContentBlock[8].callToAction1Text || ""}
        link={standardContentBlock[8].callToActionLink || ""}
        containDetail={true}
        descTop={false}
      /> */}

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

export default HomePage
export const homeQuery = graphql`
  query {
    craft {
      entry(section: "smrLandingPage", site: "starMetalsResidential") {
        id
        ... on Craft_smrLandingPage_smrLandingPage_Entry {
          heroBlock {
            ... on Craft_heroBlock_BlockType {
              headline
              heroImage {
                url
              }
              callToActionText
              callToActionLink
            }
          }
          standardContentBlock {
            ... on Craft_standardContentBlock_matrixContentBlock_BlockType {
              headline
              subheadline
              teaserText
              longText
              callToActionLink
              callToAction1Text
              callToAction2Text
              callToAction2Link
              heroImage {
                url
              }
              image2 {
                url
              }
            }
            ... on Craft_standardContentBlock_simpleTextBlock_BlockType {
              textBlock
              backgroundImage {
                url
              }
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
          title
          websitePageDescription
          websiteKeywords
          WebsitepageTitle
        }
      }
    }
  }
`
