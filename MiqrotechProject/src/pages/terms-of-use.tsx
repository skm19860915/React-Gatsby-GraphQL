import React from "react";
import loadable from "@loadable/component";

import SEO from "@components/SEO";
import Title from "@sections/terms/Title";
import Content from "@sections/terms/Content";
const Header = loadable(() => import("@components/Header"))

const Terms: React.FC = () => {
  return (
    <>
      <Header/>
      <SEO title="Terms of Use | mIQrotech" />
      <Title />
      <Content />
    </>
  );
};

export default Terms;
