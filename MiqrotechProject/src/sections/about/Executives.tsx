import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import CardPart from "./executives/card-part";
import BackgroundPart from "./executives/background-part";

type props = {
  executives: any;
  txt1: string[];
};

const Executives: React.FC<props> = ({ executives, txt1 }) => {
  const [triggerTitle, setTriggerTitle] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top-=20% top",
      },
    });
    tl.call(setTriggerTitle, [true], 0);
    tl.to(".exec", { opacity: 1, duration: 0.8, stagger: 0.2 }, 0.8);

    return () => { tl.kill(); };
  }, [wrapperRef, setTriggerTitle]);

  const sortedExecs = useMemo(() => executives.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    } else {
      return 0;
    }
  }), [executives])

  const execs = useMemo(() => sortedExecs.map((item, index) => {
    let slug = item.fullName.replace(/\s/, "-").toLowerCase().trim();
    return (<CardPart key={index} item={item} slug={slug} />);
  }), [sortedExecs])

  return (<BackgroundPart wrapperRef={wrapperRef} txt={txt1} titleTrigger={triggerTitle} execs={execs} />);
};

export default Executives;