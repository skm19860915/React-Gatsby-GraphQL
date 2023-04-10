import React from "react"
import "./styles.scss"
interface Props {
  onMonth: any
  onFlexible: any
  results: number
  onViewResults?: any
}
export default function LeaseNow1({
  onMonth,
  onFlexible,
  results,
  onViewResults,
}: Props) {
  results = results || 50
  return (
    <div className="lease-now-1">
      <div className="lease-now-1-label"></div>
      <div className="lease-now-1-heading">When would you like to move in?</div>
      <div className="lease-now-1-buttons-wrapper">
        <div className="lease-now-1-button" onClick={() => onMonth()}>
          CHOOSE A MONTH
        </div>
        <div className="lease-now-1-button" onClick={() => onFlexible()}>
          I'M FLEXIBLE
        </div>
      </div>
      <div className="lease-now-1-footer"></div>
    </div>
  )
}
