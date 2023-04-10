import React, { useEffect, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

CustomEase.create(
  "text",
  "M0,0.005 C0,0.005 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0"
);

type Props = {
  textArray: string[];
  trigger: boolean;
  callback: any;
  height: string;
  className: string;
  centered?: boolean;
  justifyContent?: string;
  textAlign?: string;
};

const TextAnimation: React.FC<Props> = ({
  textArray,
  trigger,
  callback,
  height,
  className,
  justifyContent,
  textAlign,
}) => {
  let lines = textArray.map((Item, index) => {
    return (
      <Span key={index} $height={height}>
        <InnerSpan
          $justifyContent={justifyContent}
          $textAlign={textAlign}
          className={className}
        >
          <Item />
        </InnerSpan>
      </Span>
    );
  });

  useEffect(() => {
    if (trigger) {
      let els = Array.from(document.getElementsByClassName(className));
      let stagger = 0;

      els.forEach((el) => {
        gsap.to(el, {
          duration: 0.6,
          delay: stagger,
          ease: "circ.inOut",
          top: 0,
          onComplete: () => {
            gsap.set(el.parentElement, {
              overflow: "unset",
            });
            if (callback) {
              callback();
            }
          },
        });

        stagger += 0.2;
      });
    }
  }, [trigger]);

  return <>{lines}</>;
};

export default TextAnimation;

const Span = styled.span<{ $height: string }>`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: ${(props) => props.$height};
`;

const InnerSpan = styled.span<{
  $justifyContent?: string;
  $textAlign?: string;
}>`
  width: 100%;
  position: absolute;
  top: 100%;

  display: flex;
  text-align: ${(props) => props.$textAlign || "unset"};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
`;
