import React, { useState, useEffect } from "react"
import SVG from "react-inlinesvg"
import WaveImg3 from "../../assets/img/wave3.svg"
import { Container, Wrapper1, Wrapper, Wrapper2, WaveComponent } from "./styles"
interface Props {
  id: string
}
import { useScrollPosition } from "@n8tb1t/use-scroll-position"

export default function Wave({ id }: Props) {
  const [waveLength, setWaveLength] = useState(0)
  const [loadWave, setLoadWave] = useState(true)
  const [wavePosition, setWavePosition] = useState(0)
  useEffect(() => {
    setWavePosition(document.getElementById(id).getBoundingClientRect().top)
    return () => {}
  }, [])

  useScrollPosition(({ prevPos, currPos }) => {
    let maxWidth =
      window.innerWidth > 1024 ? 600 : window.innerWidth > 767 ? 200 : 250
    let length = -currPos.y - wavePosition + window.innerHeight - maxWidth / 2
    if (length > maxWidth) {
      setLoadWave(false)
      length = maxWidth
    }

    length = length > waveLength ? length : waveLength
    setWaveLength(length)
  })
  return (
    <WaveComponent>
      <Wrapper1 width={waveLength}>
        <Container>
          <SVG
            style={{
              animation: !loadWave ? "none" : "wave 2s linear infinite",
            }}
            src={WaveImg3}
          ></SVG>
        </Container>
      </Wrapper1>
      <Wrapper2 width={waveLength}>
        <Container>
          <SVG
            style={{
              animation: !loadWave ? "none" : "wave 2s linear infinite",
            }}
            src={WaveImg3}
          ></SVG>
        </Container>
      </Wrapper2>
      <Wrapper width={waveLength}>
        <Container>
          <SVG
            style={{
              animation: !loadWave ? "none" : "wave 2s linear infinite",
            }}
            src={WaveImg3}
          ></SVG>
        </Container>
      </Wrapper>
    </WaveComponent>
  )
}
