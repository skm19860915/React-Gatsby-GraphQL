import React, { useState, useEffect } from "react"
import BackImg from "../../assets/img/building.svg"
import { ReactSVG } from "react-svg"
import $ from "jquery"

import { Container, Popup2 } from "./styles"
interface Props {
  floor: number
  onClickFloor: (floor: number) => void
}
const MAX_FLOOR = 9
const floorData = [
  "Floor_1",
  "Floor_2",
  "Floor_3",
  "Floor_4",
  "Floor_5",
  "Floor_6",
  "Floor_7",
  "Floor_8",
  "Floor_9",
]
export default function BuildingView({ floor, onClickFloor }: Props) {
  const [currentFloor, setCurrentFloor] = useState(floor)
  const [animation, setAnimation] = useState(true)
  // let animation = true;
  useEffect(() => {
    // animation = false;
    setCurrentFloor(floor)
    // setAnimation(false)
    return () => {}
  }, [floor])
  useEffect(() => {}, [])

  let showFloor = (id: string) => {
    $("svg#building_view > polygon").css("opacity", "0")
    $(`svg#building_view > polygon#${id}`).css("opacity", "0.75")
  }
  let animateFloor = (floor: number) => {
    showFloor(floorData[floor])
    setTimeout(function() {
      if (floor < MAX_FLOOR - 1) {
        animateFloor(floor + 1)
      } else {
        showFloor(floorData[currentFloor])
      }
    }, 100)
  }
  return (
    <Container>
      <ReactSVG
        src={BackImg}
        fallback={() => <span>Error!</span>}
        loading={() => <span>Loading</span>}
        afterInjection={(error: any, svg: any) => {
          if (error) {
            console.error(error)
            return
          }
          if (animation) {
            // animation = false;
            setAnimation(false)
            animateFloor(0)
          } else {
            showFloor(floorData[currentFloor])
          }

          $(`svg#building_view > polygon`)
            .mouseenter((e: any) => {
              $("div#popup2")
                .css(
                  "top",
                  e.currentTarget.getBoundingClientRect().top +
                    window.pageYOffset -
                    40
                )
                .css("left", e.currentTarget.getBoundingClientRect().left)
                .show()
              $("div#popup2").html(e.currentTarget.getAttribute("data-name"))
              $("svg#building_view > polygon").css("opacity", "0")
              $(e.currentTarget).css("opacity", "0.75")
            })
            .mousemove(() => {
              $("div#popup2").show()
            })
            .mouseleave(() => {
              $("svg#building_view > polygon").css("opacity", "0")
              $(`svg#building_view > polygon#${floorData[currentFloor]}`).css(
                "opacity",
                "0.75"
              )
              $("div#popup2").hide()
            })
            .mousedown((e: any) => {
              $("div#popup2").hide()
              const flr = parseInt(e.currentTarget.getAttribute("floor-num"))
              setCurrentFloor(flr)
              onClickFloor(flr)
            })
        }}
      ></ReactSVG>
      <Popup2 id="popup2"></Popup2>
    </Container>
  )
}
