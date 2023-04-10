import React, { useState } from "react";
import styled from "styled-components";

import media from "@styles/media";
import colors from "@styles/colors";

import Arrow from "@components/ArrowSquare";

type ButtonProps = {
  backgroundColor?: string;
  hoverColor?: string;
  textColor: string;
  borderColor?: string;
  text: string;
  padding?: boolean;
  width?: string;
  onClick: any;
  left?: boolean;
  type: string;
};

const PrimaryButton: React.FC<ButtonProps> = ({
  backgroundColor,
  hoverColor,
  textColor,
  borderColor,
  text,
  padding,
  onClick,
  width,
  left,
  type,
}) => {
  const [enter, setEnter] = useState(false);

  let defaultTextColor = textColor || colors.white;

  return (
    <Button
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      borderColor={borderColor}
      padding={padding}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      onClick={onClick}
      width={width}
      className="header-color-change"
      type={type}
    >
      {left && (
        <ArrowContainer left={true}>
          <Arrow mouseEnter={enter} color={defaultTextColor} />
        </ArrowContainer>
      )}
      <P className="header-button" color={defaultTextColor}>
        {text}
      </P>
      {!left && (
        <ArrowContainer>
          <Arrow mouseEnter={enter} color={defaultTextColor} />
        </ArrowContainer>
      )}
    </Button>
  );
};

export default PrimaryButton;
export { Arrow };

const Button = styled.span<{
  backgroundColor?: string;
  padding?: boolean;
  hoverColor?: string;
  borderColor?: string;
  width?: string;
}>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "unset"};
  box-sizing: border-box;
  display: flex;
  -webkit-appearance: none;
  appearance: none;
  justify-content: center;

  width: ${(props) => props.width || "fit-content"};
  box-shadow: 0px 67px 80px rgba(5, 5, 5, 0.07),
    0px 43.4259px 46.8519px rgba(5, 5, 5, 0.0531481),
    0px 25.8074px 25.4815px rgba(5, 5, 5, 0.0425185),
    0px 13.4px 13px rgba(5, 5, 5, 0.035),
    0px 5.45926px 6.51852px rgba(5, 5, 5, 0.0274815),
    0px 1.24074px 3.14815px rgba(5, 5, 5, 0.0168519);
  border-radius: 2px;
  border: ${(props) =>
    props.borderColor ? "1px solid" + props.borderColor : "none"};
  cursor: pointer;
  transition: 500ms;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }

  padding: ${(props) => (props.padding ? props.padding : "1vw 1.4vw")};

  ${media.tablet} {
    padding: ${(props) => (props.padding ? props.padding : "1.465vw 1.953vw")};
  }

  ${media.mobile} {
    padding: ${(props) => (props.padding ? props.padding : "2.667vw 5.333vw")};
  }
`;

const ArrowContainer = styled.div<{ left?: boolean }>`
  box-sizing: border-box;
  transform: ${(props) => (props.left ? "rotate(180deg)" : "unset")};

  ${media.fullWidth} {
    width: 1.944vw;
    height: 1.994vw;
    margin-right: ${(props) => (props.left ? "0.694vw" : "0vw")};
  }

  ${media.desktop} {
    width: 1.944vw;
    height: 1.994vw;
    margin-right: ${(props) => (props.left ? "0.694vw" : "0vw")};
  }

  ${media.tablet} {
    width: 2.734vw;
    height: 2.734vw;
    margin-right: ${(props) => (props.left ? "1.198vw" : "0vw")};
  }

  ${media.mobile} {
    width: 7.467vw;
    height: 7.467vw;
    margin-right: ${(props) => (props.left ? "2.667vw" : "0vw")};
  }
`;

const P = styled.p`
  color: ${(props) => props.color};
  margin: 0px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-family: "Helvetica Neue Medium";
  line-height: 100%;
  letter-spacing: -0.02em;
  cursor: pointer;
  text-decoration: none;
  ${media.fullWidth} {
    font-size: 1.25vw;
    margin-right: 0.694vw;
    text-decoration: none;
  }

  ${media.desktop} {
    font-size: 1.25vw;
    margin-right: 0.694vw;
  }

  ${media.tablet} {
    font-size: 1.758vw;
    margin-right: 0.977vw;
  }

  ${media.mobile} {
    font-size: 4.267vw;
    margin-right: 2.667vw;
  }
`;
