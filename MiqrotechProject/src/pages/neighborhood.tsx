import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import Component1 from "../components/component1"
import Component2 from "../components/component2"
import Hero2 from "../components/hero2"
import PlaceCopy from "../components/placeCopy"
import MapComponent from "../components/mapComponent"
import Wave3 from "../components/wave3"
import VisibilitySensor from "react-visibility-sensor"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

import {
  Home,
  Desc,
  Big,
  Small,
  Section1,
  Section2,
  MapContainer,
  WalkScore,
  WalkScore_Title,
  WalkScore_Score,
  WalkScore_Desc,
  WalkScore_Learn,
  ScoresContainer,
  ScoreWrapper,
} from "../styles/neighborhood"
import { useCountUp } from "react-countup"
import renderHTML from "react-render-html"

import { FaFacebookF, FaInstagram } from "react-icons/fa"
import SEO from "../components/seo"
import NeighbourhoodImg from "../assets/img/neighbourhood.png"
import NeighbourhoodImg2 from "../assets/img/neighbourhood2.png"

const Score = ({ title, score }) => {
  const { countUp, start, pauseResume, reset, update } = useCountUp({
    start: 0,
    end: score,
    delay: 0,
    duration: 1.5,
    useEasing: false,

    onReset: () => console.log("Resetted!"),
    onUpdate: () => console.log("Updated!"),
    onPauseResume: () => console.log("Paused or resumed!"),
    onStart: ({ pauseResume }) => console.log(pauseResume),
    onEnd: ({ pauseResume }) => console.log(pauseResume),
  })
  return (
    <ScoreWrapper>
      <WalkScore_Title>{title}</WalkScore_Title>
      <VisibilitySensor onChange={start}>
        <WalkScore_Score>
          <CircularProgressbarWithChildren
            value={countUp}
            strokeWidth={3}
            maxValue={score}
            styles={{
              // Customize the root svg element
              root: {
                width: "150px",
                height: "150px",
              },
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: `rgba(148, 106, 77, ${countUp / score})`,
                // // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                // strokeLinecap: "butt",
                // // Customize transition animation
                // transition: "stroke-dashoffset 0.5s ease 0s",
                // // Rotate the path
                // transformOrigin: "center center",
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: "#d6d6d6",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
                transformOrigin: "center center",
              },
              // Customize the text
              text: {
                // Text color
                fill: "#946A4D",
                // Text size
                fontSize: "40px",
                fontWeight: "bold",
                fontFamily: "Noto Sans KR",
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: "#3e98c7",
                width: "150px",
                height: "150px",
              },
            }}
          >
            <span>{countUp}</span>
          </CircularProgressbarWithChildren>
        </WalkScore_Score>
      </VisibilitySensor>
    </ScoreWrapper>
  )
}

const Neighborhood: React.FC = (props: any) => {
  const [score, setScore] = useState(90)
  const [tempScore, setTempScore] = useState(0)
  const [mapData, setMapData] = useState([])

  useEffect(() => {
    setInterval(function() {
      if (tempScore < score) setTempScore(tempScore + 1)
    }, 1000)
    return () => {}
  }, [])

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
      <Desc>
        <Big>{renderHTML(standardContentBlock[0].textBlock || "")}</Big>
        <Small>{renderHTML(standardContentBlock[1].textBlock || "")}</Small>
      </Desc>
      <Section1>
        <Wave3></Wave3>
      </Section1>
      <MapContainer>
        <MapComponent></MapComponent>
      </MapContainer>
      <Section1>
        <Wave3></Wave3>
      </Section1>
      <WalkScore>
        <ScoresContainer>
          <Score
            score={81}
            title={renderHTML(standardContentBlock[2].headline || "")}
          />
          <Score score={70} title={"Bike Score"} />
          <Score score={48} title={"Transit Score"} />
        </ScoresContainer>
        <WalkScore_Desc>
          {renderHTML(standardContentBlock[2].longText || "")}
        </WalkScore_Desc>
        <WalkScore_Learn>
          <a href={standardContentBlock[2].callToActionLink}>
            {renderHTML(standardContentBlock[2].callToAction1Text || "")}
          </a>
        </WalkScore_Learn>
      </WalkScore>
      <Section1>
        <Wave3></Wave3>
      </Section1>
      <div style={{ height: 150 }}></div>
      <Component1
        desc={standardContentBlock[3].longText || ""}
        bigImg={standardContentBlock[3].image2[0].url || ""}
        smallImg={standardContentBlock[3].heroImage[0].url || ""}
        heading={standardContentBlock[3].headline || ""}
        action={standardContentBlock[3].callToAction1Text || ""}
        link={standardContentBlock[3].callToActionLink || ""}
        containDetail={false}
        descTop={true}
      />
      <Section2>
        <Component2
          desc={standardContentBlock[4].longText || ""}
          bigImg={standardContentBlock[4].image2[0].url || ""}
          smallImg={standardContentBlock[4].heroImage[0].url || ""}
          heading={standardContentBlock[4].headline || ""}
          action={standardContentBlock[4].callToAction1Text || ""}
          link={standardContentBlock[4].callToActionLink || ""}
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

export default Neighborhood
export const neighborQuery = graphql`
  query {
    craft {
      entry(section: "smrNeighborhoodPage", site: "starMetalsResidential") {
        id
        ... on Craft_smrNeighborhoodPage_smrNeighborhoodPage_Entry {
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
