import React from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import {
  Container,
  Unit,
  Unit_Img,
  Unit_Name,
  Unit_Rooms,
  Unit_Footer,
  Unit_Detail,
  Unit_Caret,
} from "./styles"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { convertImgUrl } from "./../../utils/imageKit"

interface Props {
  onUnitClick: any
  units: Array<any>
  selected: any
  imgType: any
}
const DesktopLayout = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
const MobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`

export default function ListLayout({
  onUnitClick,
  units,
  selected,
  imgType,
}: Props) {
  return (
    <Container>
      {units.map(unit => {
        return (
          <Unit key={unit.title}>
            <Unit_Img onClick={() => onUnitClick(unit.title)}>
              <DesktopLayout>
                <LazyLoadImage
                  alt={unit.title}
                  effect="blur"
                  src={convertImgUrl(
                    imgType == "2d"
                      ? unit.unitFloorPlans_twodView[0].url
                      : unit.unitFloorPlans_mainImage[0].url,
                    false
                  )}
                  style={{ objectFit: "contain" }}
                />
              </DesktopLayout>
              <MobileLayout>
                <LazyLoadImage
                  alt={unit.title}
                  effect="blur"
                  src={convertImgUrl(
                    imgType == "2d"
                      ? unit.unitFloorPlans_twodView[0].url
                      : unit.unitFloorPlans_mainImage[0].url,
                    true
                  )}
                  style={{ objectFit: "contain" }}
                />
              </MobileLayout>
            </Unit_Img>
            <Unit_Name
              selected={selected && selected.title == unit.title}
            >{`${unit.title}`}</Unit_Name>
            <Unit_Rooms selected={selected && selected.title == unit.title}>
              {unit.UnitfloorPlanDescription == "1Bed1Bath"
                ? "1 Bed / 1 Bath"
                : unit.UnitfloorPlanDescription == "2Bed2Bath"
                ? "2 Bed / 2 Bath"
                : "Studio"}
            </Unit_Rooms>
            <Unit_Rooms
              selected={selected && selected.title == unit.title}
            >{`${unit.totalGrossUnitSquareFeet} SF`}</Unit_Rooms>
            <Unit_Footer>
              <Unit_Rooms selected={selected && selected.title == unit.title}>
                {`$${unit.minPrice || unit.price}`}
              </Unit_Rooms>
              <Unit_Detail onClick={() => onUnitClick(unit.title)}>
                Details
                <Unit_Caret>
                  <MdKeyboardArrowRight
                    size={40}
                    color="#636569"
                  ></MdKeyboardArrowRight>
                </Unit_Caret>
              </Unit_Detail>
            </Unit_Footer>
          </Unit>
        )
      })}
    </Container>
  )
}
