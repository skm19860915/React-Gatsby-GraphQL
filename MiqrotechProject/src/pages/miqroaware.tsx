import React from "react";
import loadable from "@loadable/component";
import SEO from "@components/SEO";
import colors from "@styles/colors";
import Hero from "@sections/miqroaware/Hero";
import useMedia from '@hooks/useMedia'
import DataStore from "../sections/miqroaware/DataStore";
import { graphql } from "gatsby";

const Header = loadable(() => import("@components/Header"))
const Features = loadable(() => import("@sections/miqroaware/Features"));
const Benefits = loadable(() => import("@sections/miqroaware/Benefits"));
const Insights = loadable(() => import("@sections/miqroaware/Insights"));
const HowItWorks = loadable(() => import("@sections/miqroaware/HowItWorks"));
const Learn = loadable(() => import("@sections/miqroaware/Learn"));
const WhyChoose = loadable(() => import("@sections/miqroaware/WhyChoose"));
const PartnerCTA = loadable(() => import("@sections/miqroaware/PartnerCTA"));
type props = {
  data: any;
};

const Miqroaware: React.FC<props> = ({ data }) => {
  const content1OfHero = useMedia(DataStore.t_hero_1_1, DataStore.t_hero_1_1, DataStore.t_hero_1_1, DataStore.t_hero_1_2);
  const content2OfHero = useMedia(DataStore.t_hero_4_1, DataStore.t_hero_4_1, DataStore.t_hero_4_1, DataStore.t_hero_4_2);
  const content1OfLearn = useMedia(DataStore.t_learn_1_1, DataStore.t_learn_1_1, DataStore.t_learn_1_1, DataStore.t_learn_1_2);
  const style1OfLearn = useMedia(DataStore.s_learn_1, DataStore.s_learn_1, DataStore.s_learn_2, DataStore.s_learn_2);
  const styleOfHowItWorks = {
    mobileLinkOffsets : DataStore.s_how_1, desktopWidths:DataStore.s_how_2, tabletWidths:DataStore.s_how_3, mobileWidths:DataStore.s_how_4, 
    desktopPositions:DataStore.s_how_5, tabletPositions:DataStore.s_how_6, mobilePositions:DataStore.s_how_7
  };

  const content1OfPartner = useMedia(DataStore.t_partner_1_1, DataStore.t_partner_1_1, DataStore.t_partner_1_1, DataStore.t_partner_1_2);
   
  return (
    <>
      <Header backgroundTrigger={"#miqroaware-hero"} startingTextColor={colors.black} startingButtonColor={colors.keppel100} startingButtonBorderColor={colors.keppel100}/>
      <SEO title="MiqroAware | mIQrotech" />
      <Hero title1TextArray={content1OfHero} subTitle2TextArray={DataStore.t_hero_2} title2TextArray={DataStore.t_hero_3} subTitle3TextArray={DataStore.t_hero_5} title3TextArray={content2OfHero} />
      <Features featureData={data.allContentfulFeatureSection.nodes} />
      <Benefits benefitData={data.allContentfulBenefitSection.nodes} />
      <Insights txt1={DataStore.t_insights_1} txt2={DataStore.t_insights_2} txt3={DataStore.t_insights_3} />
      <HowItWorks causeData={data.allContentfulCauseSection.nodes} styleData={styleOfHowItWorks} />
      <Learn txt1={content1OfLearn} txt2={DataStore.t_learn_2} tlStart={style1OfLearn} tlEnd={DataStore.s_learn_3} />
      <WhyChoose txt1={DataStore.t_why_1} />
      <PartnerCTA txt1={content1OfPartner} />
    </>
  );
};

export default Miqroaware;

export const pageQuery = graphql`
  query {
    allContentfulFeatureSection (sort: {fields: sortNumber}) {
      nodes {
        sortNumber
        title
        description {
          description
        }
      }
    }
    allContentfulBenefitSection (sort: {fields: sortNumber}) {
      nodes {
        sortNumber
        title
        description {
          description
        }
        svgImage {
          file {
            url
          }
        }
      }
    }
    allContentfulCauseSection(sort: {fields: sortNumber}) {
      nodes {
        sortNumber
        title
        description {
          description
        }
        description2 {
          description2
        }
        photo2 {
          gatsbyImageData(formats: JPG, quality: 100)
        }
      }
    }
  }
`;