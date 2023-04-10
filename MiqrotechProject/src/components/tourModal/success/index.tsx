import React, { useState } from "react"
import "./styles.scss"

interface Props {}

export default function Success({}: Props) {
  return (
    <div className="success-view">
      <div className="success-view-content">
        <div className="success-view-icon" />
        <div className="success-view-time">thank you</div>
      </div>
      <div className="success-view-heading">We will keep in touch with you</div>
      <div className="success-view-footer"></div>
    </div>
  )
}
