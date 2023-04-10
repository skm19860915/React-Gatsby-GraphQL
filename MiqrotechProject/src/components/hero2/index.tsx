import React, { useState, useEffect } from "react"
import Url from "url-parse"
import renderHTML from "react-render-html"

import {
  Container,
  Container_Background,
  Title,
  Subheader,
  Footer,
  Footer_Star,
  Background,
  Overlay,
  Content,
} from "./styles"
import { url } from "inspector"
interface Props {
  header: string
  subheader: string
  img: string
}

export default function Hero2({ header, subheader, img }: Props) {
  const [heroImgUrl, setHeroImgUrl] = useState("")
  const [heroMobileImgUrl, setHeroMobileImgUrl] = useState("")
  useEffect(() => {
    let url = new Url(img)
    setHeroImgUrl(
      `https://ik.imagekit.io/amcodigital/${url.pathname
        .split("/")
        .slice(2)
        .join("/")}`
    )
    setHeroMobileImgUrl(
      `https://ik.imagekit.io/amcodigital/tr:w-800/${url.pathname
        .split("/")
        .slice(2)
        .join("/")}`
    )
    return () => {}
  }, [])
  return (
    <React.Fragment>
      <Container img={heroImgUrl} mobileImg={heroMobileImgUrl}>
        <Overlay />
        <Content>
          <Title>{renderHTML(header)}</Title>
          <Subheader>{renderHTML(subheader)}</Subheader>
          <Footer>
            <Footer_Star></Footer_Star>
          </Footer>
        </Content>
      </Container>
      <Background>
        <Container_Background></Container_Background>
      </Background>
    </React.Fragment>
  )
}
