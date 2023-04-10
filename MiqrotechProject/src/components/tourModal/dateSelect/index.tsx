import React, { useEffect, useRef } from "react"
import "./styles.scss"
import { CustomDatePicker } from "../../../components/datePicker"

interface Props {
  date?: Date
  onChange(date: Date): void
  onNext(): void
}
export default function DateSelect({ date, onChange, onNext }: Props) {
  const dateInputRef = useRef()

  useEffect(() => {
    if (dateInputRef && dateInputRef.current) {
      // dateInputRef.current.focus()
    }
  }, [])

  const getBtnClasses = (btnType: string) => {
    if (btnType === "NEXT") {
      const disableClass = date ? "" : " disabled"

      return `date-select-view-button button-next${disableClass}`
    }
  }

  return (
    <div className="date-select-view">
      <div className="date-select-view-label"></div>
      <div className="date-select-view-heading">Select an available date:</div>

      <div className="date-select-view-calendar">
        <CustomDatePicker
          date={date}
          onChange={onChange}
          onRef={dateInputRef}
        />
      </div>

      <div className="date-select-view-footer">
        <div className={getBtnClasses("NEXT")} onClick={onNext}>
          NEXT
        </div>
      </div>
    </div>
  )
}
