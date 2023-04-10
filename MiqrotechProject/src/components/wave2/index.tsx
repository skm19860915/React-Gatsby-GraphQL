import React from "react"
import SVG from "react-inlinesvg"
import WaveImg5 from "../../assets/img/wave5.svg"
import { Container, Wrapper1, Wrapper, Wrapper2, WaveComponent } from "./styles"
interface Props {}

export default function Wave2() {
  return (
    <WaveComponent>
      <Wrapper>
        <Container>
          <SVG src={WaveImg5}></SVG>
        </Container>
      </Wrapper>
      <Wrapper2>
        <Container>
          <SVG src={WaveImg5}></SVG>
        </Container>
      </Wrapper2>
    </WaveComponent>
  )
}
