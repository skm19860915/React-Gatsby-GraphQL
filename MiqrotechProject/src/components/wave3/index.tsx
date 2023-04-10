import React from "react"
import SVG from "react-inlinesvg"
import WaveImg6 from "../../assets/img/wave6.svg"
import { Container, Wrapper1, Wrapper, Wrapper2, WaveComponent } from "./styles"
interface Props {}

export default function Wave2() {
  return (
    <Wrapper>
      <Container>
        <SVG src={WaveImg6}></SVG>
      </Container>
    </Wrapper>
  )
}
