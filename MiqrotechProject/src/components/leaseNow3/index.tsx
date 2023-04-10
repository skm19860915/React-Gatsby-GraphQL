import React, { useState, useEffect } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

import "./styles.scss"
import "bootstrap/dist/css/bootstrap.min.css"

interface Props {
  onBack: any
  onNext: any
  onViewResults?: any
  onStartOver: any
  results: number
  onChangeBedroom: any
  bedRooms: any
  planMonths: string
}

const BEDROOMS = ["studio", "1 bedroom", "2 bedrooms"]
export default function LeaseNow3({
  onBack,
  onNext,
  onViewResults,
  results,
  onChangeBedroom,
  planMonths,
  bedRooms,
  onStartOver,
}: Props) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    return () => {}
  }, [])
  const onClickBedroom = (index: number) => {
    onChangeBedroom(index)
    setCurrent(index)
  }
  return (
    <div className="lease-now-3">
      <div className="lease-now-3-heading">How many bedrooms do you need?</div>
      <div className="lease-now-3-content">
        {BEDROOMS.map((bed, index) => {
          return (
            <div
              className={`lease-now-3-button ${
                bedRooms.includes(index) ? "active" : ""
              }`}
              key={bed}
              onClick={() => onClickBedroom(index)}
            >
              {bed}
            </div>
          )
        })}
      </div>
      <div className="lease-now-3-footer">
        {/* <div
          className="lease-now-3-plan"
          dangerouslySetInnerHTML={{ __html: planMonths }}
        ></div> */}
        {/* <div className="lease-now-3-result">
          There are <strong>{results}</strong> results matching your criteria.
        </div> */}
        <div className="lease-now-3-pre-bottom">
          {/* <div className="lease-now-3-start-over" onClick={() => onStartOver()}>
            START OVER
          </div>
          <div
            className="lease-now-3-view-result"
            onClick={() => onViewResults()}
          >
            VIEW RESULTS
          </div> */}
        </div>
        <div className="lease-now-3-bottom">
          <div className="lease-now-3-back" onClick={() => onBack()}>
            <MdChevronLeft size={50} color=""></MdChevronLeft>
            Back
          </div>

          <div className="lease-now-3-next" onClick={() => onNext()}>
            Next Step
            <MdChevronRight size={50} color=""></MdChevronRight>
          </div>
        </div>
      </div>
    </div>
  )
}
