import React, { useState } from "react"
import renderHTML from "react-render-html"
import { Container, Desc, BackImg, Heading, CTA } from "./styles"
import TourModal from "./../tourModal/modal"

interface Props {
  heading: string
  desc: string
  action: string
  link: string
}

export default function PlaceCopy({ heading, desc, action, link }: Props) {
  const [showTour, setShowTour] = useState(false)

  return (
    <Container>
      <Desc>{renderHTML(desc)}</Desc>
      <BackImg></BackImg>
      <Heading>{renderHTML(heading)}</Heading>
      <CTA onClick={() => setShowTour(true)}>
        {renderHTML(action)}
        {/* <a href={link} target="_blank">
          {renderHTML(action)}
        </a> */}
      </CTA>
      <TourModal open={showTour} onClose={() => setShowTour(false)} />
    </Container>
  )
}
