import React, { useMemo, useContext } from "react";
import loadable from '@loadable/component'
import { ScreenContext, OpenFormContext } from '@components/Layout'

type props = {
  backgroundTrigger?: string;
  startingTextColor?: string;
  triggerOffset?: string;
  startingBackgroundColor?: string
  startingButtonColor?: string
  startingButtonBorderColor?: string
};

const Header: React.FC<props> = ({
  backgroundTrigger,
  startingTextColor,
  startingBackgroundColor,
  startingButtonColor,
  startingButtonBorderColor,
  triggerOffset,
}) => {
  const screen = useContext(ScreenContext)
  const openForm = useContext(OpenFormContext)
  const Component = (screen.desktop || screen.fullWidth) ? loadable(() => import("./Desktop")) : loadable(() => import("./Tablet"))

  const DATA = useMemo(() => [
    {
      name: "Solutions",
      subLinks: [
        {
          name: "mIQroAware™",
          slug: "/miqroaware/",
          text: "Advanced pipeline monitoring system blending Internet of Things (IoT), sensor, Artificial Intelligence (AI), and Analytics technology to monitor and report major risks to pipeline health.",
        },
        {
          name: "Future Innovations",
          slug: "/future-innovations/",
          text: "We are passionately working to launch our future initiatives to transform oil and gas. We’re excited to share more with you soon.",
        },
      ],
    },
    {
      name: "Company",
      subLinks: [
        {
          name: "About Us",
          slug: "/about/",
          text: "Learn more about who mIQrotech is, what we stand for and how we are changing the future.",
        },
        // {
        //   name: "Careers",
        //   slug: "https://www.linkedin.com/company/miqrotech/jobs/",
        //   text: "See latest job openings and new career opportunities with mIQrotech.",
        // },
        {
          name: "News",
          slug: "/blog/",
          text: "Read more about the latest news and articles published by mIQrotech and other partners.",
        },
      ],
    },
    // {
    //   name: "Support",
    //   subLinks: [
    //     {
    //       name: "Help Center",
    //       slug: "/help-center",
    //       text: "Need help? We have plenty of resources to help you with any questions you have about our product.",
    //     },
    //     // {
    //     //   name: "Investor Login",
    //     //   slug: "/investor-login",
    //     //   text: "Investors login into your portal here.",
    //     // },
    //   ],
    // },
  ], [])

  if (Component) {
    return (
      <Component
        backgroundTrigger={backgroundTrigger}
        startingBackgroundColor={startingBackgroundColor}
        triggerOffset={triggerOffset}
        openForm={openForm}
        data={DATA}
        startingTextColor={startingTextColor}
        startingButtonColor={startingButtonColor}
        startingButtonBorderColor={startingButtonBorderColor}
      />
    );
  } else return null;
};

export default Header;
