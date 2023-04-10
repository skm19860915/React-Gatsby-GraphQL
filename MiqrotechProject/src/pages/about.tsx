import React from "react";
import loadable from "@loadable/component";
import { graphql } from "gatsby";
import colors from '@styles/colors'
import useMedia from '@hooks/useMedia'
import DataStore from "../sections/about/DataStore";

const Hero = loadable(() => import("@sections/about/Hero"));
const SEO = loadable(() => import("@components/SEO"));
const Header = loadable(() => import("@components/Header"));
const TedX = loadable(() => import("@sections/about/TedX"));
const Executives = loadable(() => import("@sections/about/Executives"));
const Directors = loadable(() => import("@sections/about/Directors"));
const Team = loadable(() => import("@sections/about/Team"));
const StandFor = loadable(() => import("@sections/about/StandFor"));
const Values = loadable(() => import("@sections/about/Values"));
const Locations = loadable(() => import("@sections/about/Locations"));
const PartnerCTA = loadable(() => import("@sections/about/PartnerCTA"));

type props = {
  data: any;
};

const About: React.FC<props> = ({ data }) => {
  const content1OfHero = useMedia(DataStore.t_hero_1_1, DataStore.t_hero_1_1, DataStore.t_hero_1_2, DataStore.t_hero_1_1);
  const content1OfTedX = useMedia(DataStore.t_tedx_1_1, DataStore.t_tedx_1_1, DataStore.t_tedx_1_2, DataStore.t_tedx_1_3);
  const content1OfExecutives = useMedia(DataStore.t_executives_1_1, DataStore.t_executives_1_1, DataStore.t_executives_1_1, DataStore.t_executives_1_2);
  const content1OfPartnerCTA = useMedia(DataStore.t_partner_1_1, DataStore.t_partner_1_1, DataStore.t_partner_1_1, DataStore.t_partner_1_2);

  return (
    <>
      <Header backgroundTrigger={"#about-hero"} startingTextColor={colors.white}/>
      <SEO title="About | mIQrotech" />
      <Hero txt1={content1OfHero} />
      <TedX txt1={content1OfTedX} />
      <Executives executives={data.allContentfulExecutive.nodes} txt1={content1OfExecutives} />
      <Directors directors={data.allContentfulDirector.nodes} />
      <Team txt1={DataStore.t_team_1} txt2={DataStore.t_team_2} />
      <StandFor txt1={DataStore.t_standFor_1} txt2={DataStore.t_standFor_2} />
      <Values valueData={data.allContentfulSection.nodes} />
      <Locations />
      <PartnerCTA txt1={content1OfPartnerCTA} />
    </>
  );
};

export default About;

export const query = graphql`
  query AboutPageQuery {
    allContentfulExecutive {
      nodes {
        fullName
        headshot {
          gatsbyImageData(
            formats: [WEBP, JPG]
            placeholder: BLURRED
            quality: 100
          )
        }
        linkedin
        order
        title
        bio {
          bio
        }
      }
    }
    allContentfulDirector {
      nodes {
        fullName
        linkedin
        order
        bio {
          bio
        }
      }
    }
    allContentfulBlogPost {
      nodes {
        title
        body {
          body
        }
      }
    }
    allContentfulSection (sort: {fields: sortNumber}) {
      nodes {
        sortNumber
        title
        text {
          text
        }
        tileImage {
          file {
            url
          }
        }
      }
    }
  }
`;
