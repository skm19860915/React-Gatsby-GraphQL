import React, { useState } from "react";
import styled from "styled-components";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";
import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";
import TileWrapperPart from "./tile-wrapper-part";

const TextAnimation = loadable(() => import("@components/TextAnimation"));

type props = {
  contentRef: any;
  titleTrigger: boolean;
  title: string;
  contentList: any;
};

const ContentPart: React.FC<props> = ({ contentRef, title, titleTrigger, contentList }) => {
  const [triggerTiles, setTriggerTiles] = useState(false);
  const titleHeight = useMedia("5.556vw", "5.556vw", "7.194vw", "9.600vw");
  const tileHeight= useMedia("1.736vw", "1.736vw", "2.638vw", "6.400vw");
  const detailHeightArray = [
    useMedia("6.944vw", "6.944vw", "16.547vw", "26.667vw"), useMedia("10.417vw", "10.417vw", "19.305vw", "40vw"),
    useMedia("12.153vw", "12.153vw", "22.062vw", "46.667vw"), useMedia("12.153vw", "12.153vw", "22.062vw", "46.667vw"), 
    useMedia("10vw", "10vw", "24.820vw", "40vw")];

  return (
    <Content ref={contentRef}>
      <Title>
        <TextAnimation textArray={title} className="solutions-title" trigger={titleTrigger} height={titleHeight} callback={() => setTriggerTiles(true)}/>
      </Title>
      <TileContainer>
        {
          contentList.map((content, i) => (
            <TileWrapperPart key={i} tileTrigger={triggerTiles} title={content.title} titleHeight={tileHeight} 
            detail={content.description.description} detailHeight={detailHeightArray[i]} />
          ))
        }
      </TileContainer>
    </Content>
  );
};

export default ContentPart;

const Content = styled.div`
  width: 70%;
  border-top: 1px solid ${colors.culturedWhite60};
  position: relative;
  z-index: 2;

  ${media.fullWidth} {
    padding-top: 2.222vw;
  }

  ${media.desktop} {
    padding-top: 2.222vw;
  }

  ${media.tablet} {
    padding-top: 3.837vw;
  }

  ${media.mobile} {
    padding-top: 5.333vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite60};
  display: flex;
  flex-direction: column;

  ${media.desktop} {
    ${text.desktopXLHeading}
    width: 47.431vw;
    margin-bottom: 7.917vw;
  }

  ${media.fullWidth} {
    ${text.desktopXLHeading}
    width: 47.431vw;
    margin-bottom: 7.917vw;
  }

  ${media.tablet} {
    ${text.tabletMHeading}
    width: 81.894vw;
    margin-bottom: 9.592vw;
  }

  ${media.mobile} {
    ${text.mobileXSHeading}
    margin-bottom: 16vw;
  }
`;

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.fullWidth} {
    width: 70.833vw;
  }

  ${media.desktop} {
    width: 70.833vw;
  }

  ${media.tablet} {
    width: 100%;
  }
`;
