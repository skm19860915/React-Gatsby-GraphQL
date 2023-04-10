import React, { useState } from "react"
import "./styles.scss"

import { LIVE_VIRTUAL_TOUR, IN_PERSON_TOUR } from "../constants"

interface Props {
  onNext(type: string): void
}
export default function TourType({ onNext }: Props) {
  const [showError, setShowError] = useState(false)
  const [type, setType] = useState("")
  const getBtnClasses = (btnType: string) => {
    if (btnType === LIVE_VIRTUAL_TOUR) {
      const activeClass = type === btnType ? " active" : ""

      return `tour-type-view-button${activeClass}`
    }
    if (btnType === IN_PERSON_TOUR) {
      const activeClass = type === btnType ? " active" : ""

      return `tour-type-view-button${activeClass}`
    }
    if (btnType === "NEXT") {
      const disableClass = type ? "" : " disabled"

      return `tour-type-view-button button-next${disableClass}`
    }
  }
  const handleNext = () => {
    if (!!type) {
      onNext(type)
    } else {
      setShowError(true)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    return false
  }
  return (
    <form className="tour-type-view" onSubmit={e => handleSubmit(e)}>
      <div className="tour-type-view-heading">
        which type of tour would you like to schedule?
      </div>
      <div className="tour-type-view-buttons-wrapper">
        <div
          className={getBtnClasses(LIVE_VIRTUAL_TOUR)}
          onClick={() => setType(LIVE_VIRTUAL_TOUR)}
        >
          <label>
            <input type="radio" name="tourType" value="virtualTour" />
            <span>LIVE VIRTUAL TOUR</span>
          </label>
        </div>
        <div
          className={getBtnClasses(IN_PERSON_TOUR)}
          onClick={() => setType(IN_PERSON_TOUR)}
        >
          <label>
            <input type="radio" name="tourType" value="personalTour" />
            <span>IN PERSON TOUR</span>
          </label>
        </div>
      </div>
      {showError && !type ? (
        <div className="tour-type-error-message">Please select a tour type</div>
      ) : null}

      <div className="tour-type-view-footer">
        <button
          type="submit"
          className={getBtnClasses("NEXT")}
          onClick={handleNext}
        >
          NEXT
        </button>
      </div>
    </form>
  )
}
