import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import $ from "jquery"
import axios from "axios"
import styled from "styled-components"
import { Modal } from "react-responsive-modal"
import "react-responsive-modal/styles.css"
import BackImg from "../../assets/img/floor3.svg"
import "./style.css"
import {
  Container,
  FloorImg,
  Footer,
  Selected,
  Available,
  Unavailable,
  Popup,
} from "./styles"
interface Props {
  floor: number
  onClick: any
  selected: Array<any>
}
const floorData = [
  ["#Floor_1_-_Grey", "#Floor_1_-_Light", "#Floor_1_-_Dark"],
  ["#Floor_2_-_Grey", "#Floor_2_-_Light", "#Floor_2_-_Dark"],
  ["#Floor_3_-_Grey", "#Floor_3_-_Light", "#Floor_3_-_Dark"],
  ["#Floor_4_-_Grey", "#Floor_4_-_Light", "#Floor_4_-_Dark"],
  ["#Floor_5-8_-_Grey", "#Floor_5_-_Light", "#Floor_5_-_Dark"],
  ["#Floor_5-8_-_Grey", "#Floor_6_-_Light", "#Floor_6_-_Dark"],
  ["#Floor_5-8_-_Grey", "#Floor_7_-_Light", "#Floor_7_-_Dark"],
  ["#Floor_5-8_-_Grey", "#Floor_8_-_Light", "#Floor_8_-_Dark"],
  ["#Floor_9_-_Grey", "#Floor_9_-_Light", "#Floor_9_-_Dark"],
]
interface ImgModalProps {
  open: boolean
  onClose(): void
  img: string
}
const ImgModalWrapper = styled.div`
  padding-top: 30px;
  width: 600px;
  height: 600px;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  @media screen and (max-width: 767px) {
    width: 250px;
    height: 250px;
  }
`
const ImgModal = ({ open, onClose, img }: ImgModalProps) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <ImgModalWrapper img={img}></ImgModalWrapper>
    </Modal>
  )
}
export default function FloorView({ floor, onClick, selected }: Props) {
  const [showImgModal, setShowImgModal] = useState(false)
  const [selectedImg, setSelectedImg] = useState("")
  const [images, setImages] = useState({})
  useEffect(() => {
    axios
      .get(
        `https://amcodigitalmedia.com/graphql?query= {entries(section: "smrSitewides", site: "starMetalsResidential") {
      id
      ... on smrSitewides_smrSitewides_Entry {
        id
        buildingViews {
          ... on buildingViews_buildingViews_BlockType {
            nameOfView
            imagesOfView {
              url
            }
          }
        }
      }
    }}`
      )
      .then(res => {
        setImages({
          westsideprov:
            res.data.data.entries[0].buildingViews[0].imagesOfView[0].url,
          midtown:
            res.data.data.entries[0].buildingViews[1].imagesOfView[0].url,
          downtown:
            res.data.data.entries[0].buildingViews[2].imagesOfView[0].url,
          mercedez:
            res.data.data.entries[0].buildingViews[3].imagesOfView[0].url,
          westside:
            res.data.data.entries[0].buildingViews[4].imagesOfView[0].url,
        })
      })
    return () => {}
  }, [])

  const showSelected = () => {
    let titles = []
    if (selected.length > 0) titles = selected.map(item => item.title)
    $(`g${floorData[floor][2]} > *`).each((index, el) => {
      if (
        titles.includes(
          $(el)
            .data("name")
            .split(" ")[1]
        )
      ) {
        $(el).css("display", "block")
      } else {
        $(el).css("display", "none")
      }
    })
  }
  useEffect(() => {
    showSelected()

    return () => {}
  }, [selected])
  return (
    <Container>
      <FloorImg>
        <ReactSVG
          src={BackImg}
          fallback={() => <span>Error!</span>}
          loading={() => <span>Loading</span>}
          afterInjection={(error: any, svg: any) => {
            if (error) {
              console.error(error)
              return
            }
            $("svg#floor_view > g").css("display", "none")
            floorData[floor].forEach((floor: string) => {
              $(`svg#floor_view > g${floor}`).css("display", "block")
            })
            $("g#VIEWS").css("display", "block")

            showSelected()
            $(`g#VIEWS > text`).click(function(e) {
              setShowImgModal(true)
              setSelectedImg(images[$(e.currentTarget).data("name")])
            })
            $(`g${floorData[floor][2]} > *`)
              .mouseenter((e: any) => {
                let title = e.currentTarget
                  .getAttribute("data-name")
                  .split(" ")[1]

                selected.forEach(item => {
                  if (item.title == title) {
                    $("div#popup")
                      .css(
                        "top",
                        e.currentTarget.getBoundingClientRect().top +
                          window.pageYOffset -
                          130
                      )
                      .css("left", e.currentTarget.getBoundingClientRect().left)
                      .show()
                    $("div#popup .popup-type").html(item.floorPlan)
                    $("div#popup .popup-unit").html(
                      e.currentTarget.getAttribute("data-name")
                    )
                    let bed =
                      item.associatedFloorPlanTypee[0].UnitfloorPlanDescription
                    $("div#popup .popup-bed").html(
                      bed == "2Bed2Bath"
                        ? "2 bed / 2 bath"
                        : bed == "1Bed1Bath"
                        ? "1 bed / 1 bath"
                        : "studio"
                    )
                    $("div#popup .popup-square").html(
                      `${item.associatedFloorPlanTypee[0].totalGrossUnitSquareFeet} SF`
                    )
                    $("div#popup .popup-price").html(`$${item.price}`)
                    $(".cls-116")
                      .removeClass("cls-116")
                      .addClass("cls-11")
                    $(e.currentTarget)
                      .find(".cls-11")
                      .removeClass("cls-11")
                      .addClass("cls-116")
                  }
                })

                // $("div#popup").show()
              })
              .mousemove(() => {})
              .mouseleave(() => {
                $("div#popup").hide()
                // $(".cls-116")
                //   .removeClass("cls-116")
                //   .addClass("cls-11")
              })
              .mousedown(e => {
                $("div#popup").hide()
                // $(e.currentTarget).css("color", "black")
                onClick(e.currentTarget.getAttribute("data-name").split(" ")[1])
              })
          }}
        ></ReactSVG>
      </FloorImg>
      <Footer>
        <Selected>SELECTED</Selected>
        <Available>AVAILABLE</Available>
        <Unavailable>UNAVAILABLE</Unavailable>
      </Footer>
      <ImgModal
        open={showImgModal}
        img={selectedImg}
        onClose={() => setShowImgModal(false)}
      />
      <Popup id="popup">
        <div className="popup-type" style={{ marginBottom: 4 }}></div>
        <div
          className="popup-unit"
          style={{ borderBottom: "1px solid #636569", marginBottom: 8 }}
        ></div>
        <div className="popup-bed"></div>
        <div className="popup-square"></div>
        <div className="popup-price"></div>
      </Popup>
    </Container>
  )
}
