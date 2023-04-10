import React, { useContext } from "react";
import loadable from "@loadable/component";
import { graphql } from "gatsby";
import { ScreenContext } from "@components/Layout";
import colors from "@styles/colors";
import useMedia from '@hooks/useMedia'
import DataStore from "../sections/home/DataStore";

const Header = loadable(() => import("@components/Header"));
const SEO = loadable(() => import("@components/SEO"));

const Hero = loadable(() => import("@sections/home/Hero"));
const Insights = loadable(() => import("@sections/home/Insights"));
const Solutions = loadable(() => import("@sections/home/Solutions"));
const Causes = loadable(() => import("@sections/home/Causes"));
const Discover = loadable(() => import("@sections/home/Discover"));
const Challenging = loadable(() => import("@sections/home/Challenging"));
const PartnerCTA = loadable(() => import("@sections/home/PartnerCTA"));
const ReadMore = loadable(() => import("@sections/home/ReadMore"));

type props = {
  data: any;
};

const Home: React.FC<props> = ({ data }) => {
  const screen = useContext(ScreenContext);
  const content1OfHero = useMedia(DataStore.t_hero_1_1, DataStore.t_hero_1_1, DataStore.t_hero_1_1, DataStore.t_hero_1_2);
  const content1OfInsights = useMedia(DataStore.t_insights_1_1, DataStore.t_insights_1_1, DataStore.t_insights_1_2, DataStore.t_insights_1_3);
  const content1OfCause = useMedia(DataStore.t_cause_3_1, DataStore.t_cause_3_1, DataStore.t_cause_3_1, DataStore.t_cause_3_2);
  const content1OfDiscover = useMedia(DataStore.t_discover_1_1, DataStore.t_discover_1_1, DataStore.t_discover_1_2, DataStore.t_discover_1_3);

  return (
    <>
      <Header backgroundTrigger={"#hero-bottom"} startingTextColor={colors.white} startingBackgroundColor={screen.mobile ? colors.black : "transparent"}/>
      <SEO title="Home | mIQrotech" />
      <Hero txt1={content1OfHero} heroData={data.heroBackgroundImg.edges[0].node} />
      <Insights txt1={content1OfInsights} txt2={DataStore.t_insights_2} />
      <Solutions txt1={DataStore.t_solution_1} solutionData={data.allContentfulSolutionSection.nodes} />
      <Causes txt1={DataStore.t_cause_1} txt2={DataStore.t_cause_2} txt3={content1OfCause} causeData={data.allContentfulCauseSection.nodes} />
      <Discover txt1={content1OfDiscover} />
      <Challenging txt1={DataStore.t_challenging_1} txt2={DataStore.t_challenging_2} />
      <ReadMore storyData={data.allContentfulBlogPost.nodes} txt1={DataStore.t_readMore_1} />
      <PartnerCTA txt1={DataStore.t_partner_1} />
    </>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    heroBackgroundImg: allContentfulAsset(filter: {contentful_id: {eq: "3H06edymmG1kSiJEHP6ty9"}}) {
      edges {
        node {
          title
          gatsbyImageData
        }
      }
    }
    allContentfulBlogPost {
      nodes {
        title
        date
        description
        featured
        mainBlogImage {
          gatsbyImageData(placeholder: BLURRED, formats: [WEBP, JPG])
        }
      }
    }
    allContentfulCauseSection (sort: {fields: sortNumber}, limit: 5) {
      nodes {
        sortNumber
        title
        description {
          description
        }
        photo {
          gatsbyImageData(formats: JPG, quality: 100)
        }
      }
    }
    allContentfulSolutionSection (sort: {fields: sortNumber}) {
      nodes {
        sortNumber
        title
        description {
          description
        }
      }
    }
  }
`;
