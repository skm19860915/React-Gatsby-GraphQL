import React, { useState, useEffect, useCallback } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import Component1 from "../components/component1"
import Hero from "../components/hero"
import Wave from "../components/wave"
import Layout from "../components/layout"
import "../styles/landing.scss"
import SEO from "../components/seo"
import WestSideImg from "../assets/img/westside_people.png"
import WaveImg3 from "../assets/img/wave3.svg"
import SVG from "react-inlinesvg"
import VisibilitySensor from "react-visibility-sensor"
import Animate from "react-smooth"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import renderHTML from "react-render-html"
import Favicon from "react-favicon"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const IndexPage: React.FC = (props: any) => {
  const [animateSection2, setAnimateSection2] = useState(false)
  const [loadedSection2, setLoadedSection2] = useState(false)
  const [animateSection5, setAnimateSection5] = useState(false)
  const [loadedSection5, setLoadedSection5] = useState(false)
  const [waveLength, setWaveLength] = useState(0)
  const [loadWave, setLoadWave] = useState(true)
  const [wavePosition, setWavePosition] = useState(0)
  const steps = [
    {
      style: {
        opacity: 0.1,
      },
      duration: 400,
    },
    {
      style: {
        opacity: 1,
        transform: "translate(0, -70px)",
      },
      duration: 3000,
    },
  ]
  const onChangeSection2Img = (visible: boolean) => {
    if (visible && !loadedSection2) {
      setLoadedSection2(true)
      setAnimateSection2(true)
    }
  }
  const onChangeSection5Img = (visible: boolean) => {
    if (visible && !loadedSection5) {
      setLoadedSection5(true)
      setAnimateSection5(true)
    }
  }
  const handleWaveLength = (visible: boolean) => {
    // if (visible && !loadWave) {
    //   setLoadWave(true)
    //   setAnimateSection2(true)
    //   setWavePosition(window.scrollY)
    //   console.log("handle wave")
    // }
  }
  useEffect(() => {
    setWavePosition(
      document.getElementById("section_3").getBoundingClientRect().top
    )
    return () => {}
  }, [])

  useScrollPosition(({ prevPos, currPos }) => {
    let maxWidth =
      window.innerWidth > 1024 ? 750 : window.innerWidth > 767 ? 500 : 250
    let length = -currPos.y - wavePosition + window.innerHeight - maxWidth / 2
    if (length > maxWidth) {
      setLoadWave(false)
      length = maxWidth
    }

    length = length > waveLength ? length : waveLength
    setWaveLength(length)
  })
  const {
    title,
    websiteKeywords,
    websitePageDescription,
    heroBlock,
    standardContentBlock,
    callToActionBlock,
  } = props.data.craft.entry
  return (
    <div className="landing-page">
      <SEO
        title={title}
        keywords={websiteKeywords}
        description={websitePageDescription}
      />
      <Header></Header>
      {/* <Favicon url="http://oflisback.github.io/react-favicon/public/img/github.ico" /> */}

      <Hero
        title={heroBlock[0].headline}
        img={heroBlock[0].heroImage[0].url}
        action={heroBlock[0].callToActionText}
        link={heroBlock[0].callToActionLink}
        type={1}
      ></Hero>
      <div className="wave2-wrapper">
        <div className="wave2"></div>
      </div>
      <div className="section-2">
        <div className="section-2-header">
          {renderHTML(standardContentBlock[0].headline)}
        </div>
        <VisibilitySensor
          onChange={visible => onChangeSection2Img(visible)}
          partialVisibility={true}
        >
          <Animate
            steps={steps}
            canBegin={animateSection2}
            onAnimationEnd={() => {
              setAnimateSection2(false)
            }}
          >
            <div
              className="section-2-img"
              style={{
                background: `url(${standardContentBlock[0].heroImage[0].url}) no-repeat center`,
                backgroundSize: "cover",
              }}
            ></div>
          </Animate>
        </VisibilitySensor>
        <div className="section-2-desc">
          {renderHTML(standardContentBlock[0].longText)}
        </div>
      </div>
      <VisibilitySensor
        onChange={visible => handleWaveLength(visible)}
        partialVisibility={true}
      >
        <div className="section-3-wrapper" id="section_3">
          <div className="section-3" style={{ width: waveLength }}>
            <div className="section-3-container">
              <SVG
                src={WaveImg3}
                style={{
                  animation: !loadWave ? "none" : "wave 2s linear infinite",
                }}
              ></SVG>
            </div>
          </div>
        </div>
      </VisibilitySensor>
      <Component1
        desc={standardContentBlock[1].longText}
        bigImg={standardContentBlock[1].image2[0].url}
        smallImg={standardContentBlock[1].heroImage[0].url}
        heading={standardContentBlock[1].headline}
        action={""}
        containDetail={false}
        descTop={false}
      ></Component1>
      <div className="section-5-wrapper">
        <div className="section-5">
          <div className="section-5-1"></div>
          <div className="section-5-2">
            {renderHTML(standardContentBlock[2].headline)}
          </div>
          <VisibilitySensor
            onChange={visible => onChangeSection5Img(visible)}
            partialVisibility={true}
          >
            <Animate
              steps={steps}
              canBegin={animateSection5}
              onAnimationEnd={() => {
                setAnimateSection5(false)
              }}
            >
              <div
                className="section-5-3"
                style={{
                  background: `url(${WestSideImg}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              ></div>
            </Animate>
          </VisibilitySensor>

          <div className="section-5-4">
            {renderHTML(standardContentBlock[2].longText)}
          </div>
        </div>
      </div>
      <div className="section-6" id="section_6">
        <Wave id="section_6"></Wave>
      </div>
      <Prefooter
        headline={callToActionBlock[0].headline}
        action={callToActionBlock[0].callToActionTextblock}
        img={callToActionBlock[0].heroImage[0].url}
        backImg={callToActionBlock[0].backgroundImage[0].url || ""}
        link={callToActionBlock[0].callToActionLinkblock}
      ></Prefooter>
      <Footer></Footer>
    </div>
  )
}

export default IndexPage
export const indexQuery = graphql`
  query {
    craft {
      entry(
        section: "smrhomepage"
        site: "starMetalsResidential"
        slug: "smr-website-pages"
      ) {
        id
        ... on Craft_smrhomepage_smrfloorplans_Entry {
          websiteKeywords
          websitePageDescription
          title
          id
          heroBlock {
            ... on Craft_heroBlock_BlockType {
              id
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
              id
              heroImage {
                url
              }
              headline
              longText
              image2 {
                url
              }
            }
          }
          callToActionBlock {
            ... on Craft_callToActionBlock_BlockType {
              heroImage {
                url
              }
              backgroundImage {
                url
              }
              headline
              subHeadline
              callToActionTextblock
              callToActionLinkblock
            }
          }
        }
      }
    }
  }
`
