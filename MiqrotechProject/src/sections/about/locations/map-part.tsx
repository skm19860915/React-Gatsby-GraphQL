import React, { useContext } from "react";
import styled from "styled-components";
import media from "@styles/media";
import { ScreenContext } from '@components/Layout'
import mobileMap from "../../../images/png/mapMobile.png"
import defaultMap from "../../../images/png/map.png"

type props = {
    mapRef: any;
};

const MapPart: React.FC<props> = ({ mapRef }) => {
  const screen = useContext(ScreenContext)
  return (
    <Map id="map" ref={mapRef}>
      <img alt="US map" placeholder="blurred" src={ screen.mobile ? mobileMap : defaultMap } />
    </Map>
  );
};

export default MapPart;

const Map = styled.div`
  opacity: 0;
  img{
      width: 100%;
      height: 100%;
  }

  ${media.fullWidth} {
    position: absolute;
    width: 60vw;
    height: 40vw;
    top: 30vw;
    left: 20.319vw;
  }

  ${media.desktop} {
    position: absolute;
    width: 60vw;
    height: 40vw;
    top: 30vw;
    left: 20.319vw;
  }

  ${media.tablet} {
    position: absolute;
    width: 69.7vw;
    height: 47.8vw;
    top: 26.1vw;
    left: 15.1vw;
  }

  ${media.mobile} {
    opacity: 1;
    width: 100%;
    margin-bottom: 16vw;
  }
`;
