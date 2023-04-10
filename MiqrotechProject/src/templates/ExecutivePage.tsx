import React, { useEffect } from "react";
import gsap from 'gsap'

import Header from "@components/Header";
import SEO from "@components/SEO";

import Hero from "@sections/executivePage/Hero";

type props = {
  pageContext: any;
};

const ExecutivePage: React.FC<props> = ({ pageContext }) => {
  const { executive } = pageContext;
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser) {
      gsap.to(window, {
        scrollTo: 0
      })
    }
  }, [isBrowser])

  return (
    <>
      <Header startingTextColor={'rgb(254, 254, 254)'}/>
      <SEO title="About | mIQrotech" />
      <Hero executive={executive}/>
    </>
  );
};

export default ExecutivePage;
