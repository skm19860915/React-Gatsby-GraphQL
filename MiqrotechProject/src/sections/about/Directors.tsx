import React, { useMemo } from "react";
import CardPart from "./directors/card-part";
import TopPart from "./directors/top-part";

type props = {
  directors: any;
};

const Directors: React.FC<props> = ({ directors }) => {
  
  const sortedDirectors = useMemo(() => directors.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    } else {
      return 0;
    }
  }), [directors])

  const cards = useMemo(() => sortedDirectors.map((item, index) => {
    return (<CardPart key={index} item={item} />);
  }), [sortedDirectors])

  return (<TopPart contents={cards} />);
};

export default Directors;
