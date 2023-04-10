import React, { useState, useEffect } from "react"
import LeaseModal from "../leaseModal"
import { StaticQuery, graphql } from "gatsby"
import Url from "url-parse"
import { MdClose } from "react-icons/md"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import styled from "styled-components"
import renderHTML from "react-render-html"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { convertImgUrl } from "./../../utils/imageKit"

import {
  Container,
  Container_Background,
  Title,
  Tour,
  Footer,
  Footer_Socials,
  Footer_Star,
  Footer_Accessibility,
  Background,
  Content,
  Overlay,
  Footer_Social,
} from "./styles"
import { url } from "inspector"
interface Props {
  title: string
  img: string
  action: string
  link: string
  type: number
}

const DesktopLayout = styled.div`
  display: block;
  height: 100%;
  @media screen and (max-width: 767px) {
    display: none;
  }
`

const MobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
    height: 100%;
  }
`
export default function Hero({ title, img, action, link, type }: Props) {
  const [toggleLease, setToggleLease] = useState(false)
  const [heroImgUrl, setHeroImgUrl] = useState("")
  const [heroMobileImgUrl, setHeroMobileImgUrl] = useState("")
  const onClickLease = () => {
    setToggleLease(!toggleLease)
  }
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
      <Container>
        <DesktopLayout>
          <LazyLoadImage
            alt={title}
            height={"100%"}
            effect="blur"
            src={heroImgUrl}
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
        </DesktopLayout>
        <MobileLayout>
          <LazyLoadImage
            alt={title}
            height={"100%"}
            effect="blur"
            src={heroMobileImgUrl}
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
        </MobileLayout>
        <Overlay />
      </Container>
      <Container>
        <Title>{renderHTML(title)}</Title>
        <Tour
        // onClick={() => {
        //   onClickLease()
        // }}
        >
          {type === 0 ? (
            <a href={link}>{renderHTML(action)}</a>
          ) : (
            <React.Fragment>{renderHTML(action)}</React.Fragment>
          )}
        </Tour>

        <Footer>
          <Footer_Socials>
            <Footer_Social
              href="https://facebook.com/starmetals/"
              target="_blank"
            >
              <FaFacebookF size={25}></FaFacebookF>
            </Footer_Social>
            <Footer_Social
              href="https://instagram.com/starmetalsatl/"
              target="_blank"
            >
              <FaInstagram size={25}></FaInstagram>
            </Footer_Social>
          </Footer_Socials>
          <Footer_Star></Footer_Star>
          <Footer_Accessibility></Footer_Accessibility>
        </Footer>
      </Container>
      <Background>
        <Container_Background></Container_Background>
      </Background>
      <LeaseModal
        open={toggleLease}
        onClose={() => onClickLease()}
      ></LeaseModal>
    </React.Fragment>
  )
}
