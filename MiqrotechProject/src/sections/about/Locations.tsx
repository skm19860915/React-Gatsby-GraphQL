import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import loadable from '@loadable/component'

import media from "@styles/media";
import colors from "@styles/colors";
import text from "@styles/text";

import useMedia from "@hooks/useMedia";
import MapPart from "./locations/map-part";

const LocationSVGR = loadable(() => import("@components/LocationSVGR"));

const Locations: React.FC = () => {

  const wrapperRef = useRef(null);
  const mapRef = useRef(null);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [triggerOH, setTriggerOH] = useState(false);
  const [triggerCA, setTriggerCA] = useState(false);
  const [triggerFL, setTriggerFL] = useState(false);
  const [triggerTX, setTriggerTX] = useState(false);

  const indicatorList = [
    { x: 50, y: 195, cx: 34.5, cy: 195.5, loc: "florida", locTxt: "Tampa, Florida", type: "Headquarters", 
      addr1: "1503 US 301, Suite 3, Clair Mel", addr2: "City, FL 33619", tgr: triggerFL },
    { x: 362.591, y: 49.7126, cx: 362.5, cy: 34.5, loc: "texas", locTxt: "Houston, Texas", type: "Remote Office", 
      addr1: "1301 Fannin St, Suite 2440", addr2: "Houston, TX 77002", tgr: triggerTX },
    { x: 34.4934, y: 285.081, cx: 34.5, cy: 300.5, loc: "ohio", locTxt: "Cincinnati, Ohio", type: "Remote Office", 
      addr1: "2724 Erie Ave Suite 200", addr2: "Cincinnati, OH 45208", tgr: triggerOH },
    { x: 208.186, y: 188.536, cx: 223.5, cy: 189.5, loc: "california", locTxt: "Sunnyvale, California", type: "Remote Office", 
      addr1: "440 N Wolfe Road, Sunnyvale", addr2: "CA 94085", tgr: triggerCA }
  ]

  const parallaxIt = useCallback((e, target, movement) => {
    const container = wrapperRef.current;
    const relX = e.pageX - container.offsetLeft;
    const relY = e.pageY - container.offsetTop;

    let x = ((relX - container.offsetWidth / 2) / container.offsetWidth) * movement;
    let y = ((relY - container.offsetHeight / 2) / container.offsetHeight) * movement;

    setXOffset(x);
    setYOffset(y);

    gsap.to(target, { x: x / 2, y: y / 2 });
  }, [])

  const onMouseMove = useCallback((e) => { parallaxIt(e, "#map", -30); }, [parallaxIt])
  const tlStart = useMedia("top top", "top top", "top-=40% top", "top-=30% top");

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: tlStart,
      },
    });
    tl.to(
      mapRef.current,
      {
        duration: 0.5,
        opacity: 1,
      },
      0
    );
    tl.call(setTriggerOH, [true], 0);
    tl.call(setTriggerCA, [true], 0);
    tl.call(setTriggerTX, [true], 0);
    tl.call(setTriggerFL, [true], 0);

    return () => {
      tl.kill();
    };

  }, [mapRef, wrapperRef, tlStart, setTriggerOH, setTriggerCA, setTriggerTX, setTriggerFL]);

  return (
    <Wrapper ref={wrapperRef} onMouseMove={onMouseMove}>
      <TopSection>
        <Title>Our locations</Title>
        <HR />
      </TopSection>
      <MapPart mapRef={mapRef} />
      {
        indicatorList.map((item, i) => (
          <Indicator id={(i + 1).toString()} key={i}>
            <LocationSVGR
              startingX={item.x}
              startingY={item.y}
              startingCX={item.cx}
              startingCY={item.cy}
              xOffset={xOffset}
              yOffset={yOffset}
              location={item.loc}
              locationText={item.locTxt}
              type={item.type}
              address1={item.addr1}
              address2={item.addr2}
              trigger={item.tgr}
            />
          </Indicator>
        ))
      }
    </Wrapper>
  );
};

export default Locations;

const Wrapper = styled.section`
  background-color: ${colors.black};
  position: relative;

  padding-top: 12.5vw;
  padding-left: 11.3vw;
  padding-right: 11.3vw;
  padding-bottom: 73.8vw;

  ${media.tablet} {
    padding-top: 8.9vw;
    padding-left: 5.9vw;
    padding-right: 6vw;
    padding-bottom: 69.9vw;
  }

  ${media.mobile} {
    padding-top: 21.1vw;
    padding-left: 6.7vw;
    padding-right: 6.7vw;
    padding-bottom: 20.8vw;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.mobile} {
    margin-bottom: 12.533vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite60};

  ${media.fullWidth} {
    ${text.desktopLHeading}
  }

  ${media.desktop} {
    ${text.desktopLHeading}
  }

  ${media.tablet} {
    ${text.tabletMHeading}
  }

  ${media.mobile} {
    ${text.mobileSHeading}
  }
`;

const HR = styled.hr`
  background-color: ${colors.culturedWhite60};
  border: none;
  height: 1px;
  margin: 0px;

  ${media.fullWidth} {
    width: 45.417vw;
  }

  ${media.desktop} {
    width: 45.417vw;
  }

  ${media.tablet} {
    width: 40.12vw;
  }

  ${media.mobile} {
    display: none;
  }
`;

// 1-florida, 2-texas, 3-ohio, 4-california
const Indicator = styled.div`
  position: absolute;
  z-index: 2;

  ${media.fullWidth} {
    width: ${props => props.id === '1' ? '22.708vw' : props.id === '2' ? '26.215vw' : props.id === '3' ? '22.431vw' : '17.153vw'};
    height: ${props => props.id === '1' ? '14.653vw' : props.id === '2' ? '15.799vw' : props.id === '3' ? '21.944vw' : '14.167vw'};
    top: ${props => props.id === '1' ? '48.8vw' : props.id === '2' ? '56.6vw' : props.id === '3' ? '26.3vw' : '34.06vw'};
    left: ${props => props.id === '1' ? '66.3vw' : props.id === '2' ? '30.1vw' : props.id === '3' ? '61.55vw' : '11.6vw'};
  }

  ${media.desktop} {
    width: ${props => props.id === '1' ? '22.708vw' : props.id === '2' ? '26.215vw' : props.id === '3' ? '22.431vw' : '17.153vw'};
    height: ${props => props.id === '1' ? '14.653vw' : props.id === '2' ? '15.799vw' : props.id === '3' ? '21.944vw' : '14.167vw'};
    top: ${props => props.id === '1' ? '48.8vw' : props.id === '2' ? '56.6vw' : props.id === '3' ? '26.3vw' : '34.06vw'};
    left: ${props => props.id === '1' ? '66.3vw' : props.id === '2' ? '30.1vw' : props.id === '3' ? '61.55vw' : '11.6vw'};
  }

  ${media.tablet} {
    width: ${props => props.id === '1' ? '23.473vw' : props.id === '2' ? '27.066vw' : props.id === '3' ? '23.234vw' : '17.725vw'};
    height: ${props => props.id === '1' ? '15.09vw' : props.id === '2' ? '16.287vw' : props.id === '3' ? '22.635vw' : '14.611vw'};
    top: ${props => props.id === '1' ? '50.6vw' : props.id === '2' ? '58.3vw' : props.id === '3' ? '24.9vw' : '32.9vw'};
    left: ${props => props.id === '1' ? '68.8vw' : props.id === '2' ? '29.5vw' : props.id === '3' ? '63.2vw' : '6.868vw'};
  }

  ${media.mobile} {
    position: relative;
    margin-bottom: 8vw;
  }
`;
