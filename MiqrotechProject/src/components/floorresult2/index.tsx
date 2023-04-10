import React from "react"

import { Container, Highlight, DesktopLayout, MobileLayout } from "./styles"
interface Props {
  available: number
}

export default function FloorResult2({ available }: Props) {
  return (
    <Container>
      <DesktopLayout>
        <Highlight>{available} Available Floorplans</Highlight>
      </DesktopLayout>
      <MobileLayout>
        Found <Highlight> {available} Floorplans</Highlight> matching your
        criteria
      </MobileLayout>
    </Container>
  )
}
