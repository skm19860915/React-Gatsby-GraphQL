import React from "react"
import Dropdown from "./dropdown"
import { Container, Floor, Available } from "./styles"
interface Props {
  floor: number
  available: number
  setFloor(floor: number): void
}

export default function FloorResult({ floor, available, setFloor }: Props) {
  return (
    <Container>
      <Dropdown
        list={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        current={floor + 1}
        placeholder={`Floor ${floor + 1}`}
        onChooseItem={e => {
          setFloor(parseInt(e) - 1)
        }}
      ></Dropdown>
      <Available>{available} Available Units </Available>
    </Container>
  )
}
