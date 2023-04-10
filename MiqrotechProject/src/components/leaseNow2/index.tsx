import React, { useState, useEffect } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

import "./styles.scss"
import "bootstrap/dist/css/bootstrap.min.css"

interface Props {
  onBack: any
  onNext: any
  onViewResults?: any
  onStartOver: any
  onChangeMonth: any
  results: number
  monthData: any
  planMonths: string
}

export default function LeaseNow2({
  onBack,
  onNext,
  results,
  onViewResults,
  onStartOver,
  onChangeMonth,
  monthData,
  planMonths,
}: Props) {
  useEffect(() => {
    return () => {}
  }, [])
  const onClickMonth = (index: number) => {
    onChangeMonth(index)
  }
  return (
    <div className="lease-now-2">
      <div className="lease-now-2-heading">
        What months are you looking for?
      </div>
      <div className="lease-now-2-content">
        {monthData.map((month, index) => {
          return (
            <div
              className={`lease-now-2-button ${month.active ? "active" : ""}`}
              key={month.title}
              onClick={() => onClickMonth(index)}
            >{`${month.title}`}</div>
          )
        })}
      </div>
      <div className="lease-now-2-footer">
        {/* <div className="lease-now-2-result">
          There are <strong>{results}</strong> results matching your criteria.
        </div>
        <div className="lease-now-2-pre-bottom">
          <div className="lease-now-2-start-over" onClick={() => onStartOver()}>
            START OVER
          </div>
          <div
            className="lease-now-2-view-result"
            onClick={() => onViewResults()}
          >
            VIEW RESULTS
          </div>
        </div> */}
        <div className="lease-now-2-bottom">
          <div className="lease-now-2-back" onClick={() => onBack()}>
            <MdChevronLeft size={50} color=""></MdChevronLeft>
            Back
          </div>

          <div className="lease-now-2-next" onClick={() => onNext()}>
            Next Step
            <MdChevronRight size={50} color=""></MdChevronRight>
          </div>
        </div>
      </div>
    </div>
  )
}
