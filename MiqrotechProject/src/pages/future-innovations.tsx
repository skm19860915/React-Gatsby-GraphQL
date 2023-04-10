import React from "react";
import loadable from "@loadable/component";

import colors from '@styles/colors'

import SEO from "@components/SEO";
import Hero from "@sections/innovations/Hero"

const Header = loadable(() => import("@components/Header"))

const FutureInnovations: React.FC = () => {
  return (
    <>
      <Header startingTextColor={colors.white}/>
      <SEO title="Future Innovations | mIQrotech" />
      <Hero />
    </>
  );
};

export default FutureInnovations;
