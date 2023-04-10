import React from "react"
import { MdClose } from "react-icons/md"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import ReactModal from "react-modal"
import { MenuItems } from "../../utils/variables"

import {
  Container,
  Content,
  Desc,
  Background,
  Gray,
  White,
  Button,
  Img,
  MainContent,
} from "./styles"
import { url } from "inspector"
interface Props {
  desc: string
}

export default function Brochure({ desc }: Props) {
  return (
    <Container>
      <Content>
        <MainContent>
          <Desc>{desc}</Desc>
          <Button>E BROCHURE</Button>
        </MainContent>
        <Img></Img>
      </Content>
      <Background>
        <Gray></Gray>
        <White></White>
      </Background>
    </Container>
  )
}
