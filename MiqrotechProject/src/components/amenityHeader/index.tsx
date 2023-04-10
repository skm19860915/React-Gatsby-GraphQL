import React from "react"
import styled from "styled-components"
import renderHTML from "react-render-html"
import { convertImgUrl } from "./../../utils/imageKit"

import {
  Container,
  Container_Back,
  White,
  Gray,
  BackImg,
  Content,
  Title,
  Desc,
  Wrapper,
} from "./styles"

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #ffffffaa, #ffffffff);
  left: 0;
  z-index: 0;
`
interface Props {
  header: string
  desc: string
  img: string
  backImg: string
  orientation: string
}

export default function AmenityHeader({
  header,
  desc,
  img,
  backImg,
  orientation,
}: Props) {
  return (
    <Container>
      <Wrapper orientation={orientation}>
        <BackImg
          img={convertImgUrl(img, false)}
          mobileImg={convertImgUrl(img, true)}
        ></BackImg>
        <Content>
          <Desc>{renderHTML(desc)}</Desc>
          <Title>{renderHTML(header)}</Title>
        </Content>
      </Wrapper>
      <Container_Back>
        <White></White>
        <Gray
          img={convertImgUrl(backImg, false)}
          mobileImg={convertImgUrl(backImg, true)}
        >
          <Overlay />
        </Gray>
      </Container_Back>
    </Container>
  )
}
