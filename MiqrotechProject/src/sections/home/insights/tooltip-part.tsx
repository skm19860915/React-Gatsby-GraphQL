import React from "react";
import styled from "styled-components";
import media from "@styles/media";
import loadable from '@loadable/component'
import useMedia from "@hooks/useMedia";

const ToolTip = loadable(() => import("@components/ToolTip"))

type props = {
    tooltipRef1: any;
    tooltipRef2: any;
    tooltipRef3: any;
    tooltipTrigger1: boolean;
    tooltipTrigger2: boolean;
    tooltipTrigger3: boolean;
    tooltipShow1: boolean;
    tooltipShow2: boolean;
    tooltipShow3: boolean;
    tooltipTimeLine: any;
};

const ToolTipPart: React.FC<props> = 
    ({ tooltipRef1, tooltipRef2, tooltipRef3, 
    tooltipTrigger1, tooltipTrigger2, tooltipTrigger3,
    tooltipShow1, tooltipShow2, tooltipShow3, tooltipTimeLine }) => {

    return (
        <div>
            <ToolTip1 ref={tooltipRef1}>
                <ToolTip
                    parentTimeline={tooltipTimeLine}
                    show={tooltipShow1}
                    trigger={tooltipTrigger1}
                    title="Corrosion - Possible Leak"
                    line1="7.1.21 | 6.11.47 AM"
                    line2="Pipeline: 0051 | Device: 010"
                    dir={useMedia("left", "left", "down", "down")}
                />
            </ToolTip1>
            <ToolTip2 ref={tooltipRef2}>
                <ToolTip
                    parentTimeline={tooltipTimeLine}
                    show={tooltipShow2}
                    trigger={tooltipTrigger2}
                    title="Acoustic - High Noise Level"
                    line1="7.1.21 | 6.35.12 AM"
                    line2="Pipeline: 0103 | Device: 003"
                    dir={useMedia("right", "right", "", "")}
                />
            </ToolTip2>
            <ToolTip3 ref={tooltipRef3}>
                <ToolTip
                    parentTimeline={tooltipTimeLine}
                    show={tooltipShow3}
                    trigger={tooltipTrigger3}
                    title="GPS Movement - Land Slippage"
                    line1="7.1.21 | 6.58.27 AM"
                    line2="Pipeline: 0014 | Device: 102"
                    dir={useMedia("right", "right", "up", "up")}
                />
            </ToolTip3>
        </div>
    );
};

export default ToolTipPart;

const toolTipStyles = `
  position: absolute;
  z-index: 5;
  opacity: 0;
`;

const ToolTip1 = styled.div`
  ${toolTipStyles}

  top: 28.889vw;
  right: 10.833vw;

  ${media.tablet} {
    top: 33.892vw;
    right: 20.12vw;
  }

  ${media.mobile} {
    top: unset;
    bottom: 130.933vw;
    right: 18.133vw;
    svg:nth-of-type(2) {
      overflow: visible;
    }
  }
`;

const ToolTip2 = styled.div`
  ${toolTipStyles}

  top: 41.25vw;
  right: 33.75vw;

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

const ToolTip3 = styled.div`
  ${toolTipStyles}

  top: 53.194vw;
  right: 27.153vw;

  ${media.tablet} {
    top: 75.569vw;
    right: 17.725vw;
    
    svg:nth-of-type(2) {
      overflow: visible;
      rect {
        width: 32vw;
      }
    }
  }

  ${media.mobile} {
    top: unset;
    bottom: 12vw;
    right: 37.867vw;
    svg:nth-of-type(2) {
      overflow: visible;
    }
  }
`;
