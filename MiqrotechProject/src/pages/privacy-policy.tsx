import React from "react";
import loadable from "@loadable/component";

import SEO from "@components/SEO";
import Title from "@sections/privacy/Title";
import Content from "@sections/privacy/Content";
const Header = loadable(() => import("@components/Header"))

const Privacy: React.FC = () => {
  return (
    <>
      <Header/>
      <SEO title="Privacy Policy | mIQrotech" />
      <Title />
      <Content />
    </>
  );
};

export default Privacy;
