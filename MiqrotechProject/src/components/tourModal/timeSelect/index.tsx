import React, { useEffect, useState } from "react"
import "./styles.scss"
import DatePicker, { DatePickerCalendar } from "../../../components/datePicker"

interface Props {
  date: Date
  times: Date[]
  value?: Date
  onNext(time: Date): void
  onGotoDate(): void
}

export default function TimeSelect({
  times,
  value,
  onNext,
  onGotoDate,
  date,
}: Props) {
  const getBtnClasses = (btnType: string) => {
    if (btnType === "NEXT") {
      const disableClass = selectedTime ? "" : " disabled"

      return `time-select-view-button button-next${disableClass}`
    }
  }

  const getSelectedClass = (time: Date) => {
    const defaultClassName = "time-select-view-button slot-button"
    if (!selectedTime) {
      return defaultClassName
    }
    if (selectedTime.getTime() === time.getTime()) {
      return `${defaultClassName} active`
    }
    return defaultClassName
  }
  let [morning, setMorning] = useState<string[]>([])
  let [morningDate, setMorningDate] = useState<Date[]>([])
  let [afternoon, setAfternoon] = useState<string[]>([])
  let [afternoonDate, setAfternoonDate] = useState<string[]>([])
  let [rawTimes, setRawTimes] = useState<string[]>([])
  let [rawTimesDate, setRawTimesDate] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<Date>(undefined)
  const [showError, setShowError] = useState(false)
  const curMonth = date ? date.getMonth() + 1 : "-"
  const monthString = curMonth < 10 ? `0${curMonth}` : curMonth
  const curDay = date ? date.getDate() : "-"
  const curYear = date ? date.getFullYear() : "-"
  const dateString = `${monthString}/${curDay}/${curYear}`

  useEffect(() => {
    let rtimes = [],
      rtimesDate = [],
      morningArr = [],
      morningDateArr = [],
      afternoonArr = [],
      afternoonDateArr = []
    times.forEach(time => {
      let hours = time.getHours()
      let minutes = time.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = Number(minutes < 10 ? "0" + minutes : minutes)
      const minutesString = minutes < 10 ? `0${minutes}` : minutes
      const rawTime = hours + ":" + minutesString + " " + ampm

      rtimes.push(rawTime)
      rtimesDate.push(time)
      if (ampm === "AM") {
        morningArr.push(rawTime)
        morningDateArr.push(time)
      }
      if (ampm === "PM") {
        afternoonArr.push(rawTime)
        afternoonDateArr.push(time)
      }
    })
    setRawTimes(rtimes)
    setRawTimesDate(rtimesDate)
    setMorning(morningArr)
    setMorningDate(morningDateArr)
    setAfternoon(afternoonArr)
    setAfternoonDate(afternoonDateArr)
    return () => {}
  }, [times])

  const handleNext = () => {
    if (!!selectedTime) {
      onNext(selectedTime)
    } else {
      setShowError(true)
    }
  }
  return (
    <div className="time-select-view">
      <div className="time-select-view-label"></div>
      <div className="time-select-view-date" onClick={onGotoDate}>
        <span>{dateString}</span>
        <div className="calendar-icon" />
      </div>
      <div className="time-select-view-heading">Select an available time:</div>
      <div className="time-select-view-slots">
        <div className="time-select-view-desktop">
          {morning.length ? (
            <>
              <div className="slot-button-container">
                {morning.map((time, index) => {
                  return (
                    <div className="slot-button-wrapper" key={time}>
                      <div
                        className={getSelectedClass(morningDate[index])}
                        onClick={() => setSelectedTime(morningDate[index])}
                      >
                        {time}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            ""
          )}
          {afternoon.length ? (
            <>
              <div className="time-select-view-slots-label">Afternoon</div>
              <div className="slot-button-container">
                {afternoon.map((time, index) => {
                  return (
                    <div className="slot-button-wrapper" key={time}>
                      <div
                        className={getSelectedClass(afternoonDate[index])}
                        onClick={() => setSelectedTime(afternoonDate[index])}
                      >
                        {time}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="time-select-view-mobile">
          <div className="slot-button-container">
            {rawTimes.map((time, index) => {
              return (
                <div className="slot-button-wrapper" key={time}>
                  <div
                    className={getSelectedClass(rawTimesDate[index])}
                    onClick={() => setSelectedTime(rawTimesDate[index])}
                  >
                    {time}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {showError && !selectedTime ? (
        <div className="time-select-error-message">Please select time.</div>
      ) : null}

      <div className="time-select-view-footer">
        <div className={getBtnClasses("NEXT")} onClick={() => handleNext()}>
          NEXT
        </div>
      </div>
    </div>
  )
}
