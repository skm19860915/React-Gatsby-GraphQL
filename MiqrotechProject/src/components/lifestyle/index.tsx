import React, { useState, useEffect } from "react"
import renderHTML from "react-render-html"
import styled from "styled-components"
import { convertImgUrl } from "./../../utils/imageKit"
import LeaseModal from "../leaseModal"
import TourModal from "./../tourModal/modal"

import {
  Container,
  Section_Image,
  Image1,
  Image2,
  Section_Main,
  Header,
  Subheader,
  Desc,
  Section_Button,
  Button,
} from "./styles"
import { url } from "inspector"
interface Props {
  headline: string
  subHeadline: string
  text: string
  action1: string
  action2: string
  img1: string
  img2: string
  link1: string
  link2: string
}

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  width: 100%;
  height: 100%;
`

export default function LifeStyle({
  headline,
  subHeadline,
  text,
  action1,
  action2,
  img1,
  img2,
  link1,
  link2,
}: Props) {
  const [toggleLease, setToggleLease] = useState(false)
  const onClickLease = () => {
    setToggleLease(!toggleLease)
  }
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <Container>
      <Section_Image>
        <Image1
          img={convertImgUrl(img2, false)}
          mobileImg={convertImgUrl(img2, true)}
        >
          <Overlay />
        </Image1>
        <Image2
          img={convertImgUrl(img1, false)}
          mobileImg={convertImgUrl(img1, true)}
        />
      </Section_Image>
      <Section_Main>
        <Header>{renderHTML(headline)}</Header>
        <Subheader>{renderHTML(subHeadline)}</Subheader>
        <Desc>{renderHTML(text)}</Desc>
        <Section_Button>
          <Button
            onClick={() => {
              onClickLease()
            }}
          >
            SCHEDULE A TOUR
            {/* {renderHTML(action1)} */}
          </Button>
          <Button>
            <a href={link2}>{renderHTML(action2)}</a>
          </Button>
        </Section_Button>
      </Section_Main>
      {/* <LeaseModal
        open={toggleLease}
        onClose={() => onClickLease()}
      ></LeaseModal> */}
      <TourModal open={toggleLease} onClose={() => onClickLease()}></TourModal>
    </Container>
  )
}
