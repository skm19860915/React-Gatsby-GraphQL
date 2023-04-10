import React, { useState, useEffect } from "react"
import styled from "styled-components"
import moment from "moment"
import { format } from "date-fns"
import { enGB } from "date-fns/locale"
import { DatePicker, Calendar as OriginalCalendar } from "react-nice-dates"

import "react-nice-dates/build/style.css"
import "./style.scss"
const Input = styled.input`
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-family: "Overpass";
  color: rgb(35, 31, 32);
  border: none;
  outline: none;
  border-bottom: 1px solid #707070;
`
interface CalenderProps {
  focused: boolean
}
const CalendarWrapper = styled.div<CalenderProps>`
  max-height: ${props => (props.focused ? "360px" : 0)};
  overflow: hidden;
  transition: 300ms all ease-in-out;
  z-index: 999;
  position: absolute;
  margin-top: 16px;
`
const Calendar = styled.div`
  width: 280px;
  /* min-height: 280px; */
  height: auto;
  border: 1px solid #443635;
  font-family: "Overpass";
  padding: 8px;
  border-radius: 0px;
  background: white;
  font-size: 12px;
  line-height: 30px;
  @media screen and (max-width: 767px) {
    left: calc(50% - 140px);
  }
`
const Wrapper = styled.div`
  font-family: "Overpass";
  font-size: 12px;
`
interface IProps {
  date: any
  onChange: any
  onRef?: any
}
const _DatePicker = React.memo(({ date, onChange }: IProps) => {
  return (
    <Wrapper>
      <DatePicker
        date={date}
        onDateChange={(e: any) => {
          onChange(e)
        }}
        format="MMM dd yyyy"
        locale={enGB}
      >
        {({ inputProps, focused }) => (
          <input
            className={"datepicker-input" + (focused ? " -focused" : "")}
            value={format(date, "dd MMM yyyy", { locale: enGB })}
            {...inputProps}
          />
        )}
      </DatePicker>
    </Wrapper>
  )
})

const CustomDatePicker = React.memo(({ date, onChange, onRef }: IProps) => {
  return (
    <Wrapper>
      <DatePicker
        date={date}
        onDateChange={(e: any) => {
          onChange(e)
        }}
        format="MMM dd yyyy"
        locale={enGB}
      >
        {({ inputProps, focused }) => (
          <div className="time-select-view-date">
            <span>{format(date, "MM/dd/yyyy", { locale: enGB })}</span>
            <div className="calendar-icon" />
            <input
              className={"datepicker-custom-input" + (!focused ? " -focused" : "")}
              value={format(date, "dd MMM yyyy", { locale: enGB })}
              {...inputProps}
              ref={onRef}
            />
          </div>
        )}
      </DatePicker>
    </Wrapper>
  )
})

const DatePickerCalendar = React.memo(
  ({ onChange }: { onChange(date?: Date): void }) => {
    return (
      <Wrapper className="datepicker-calendar-wrapper">
        <div className="nice-dates-popover -open">
          <OriginalCalendar onDayClick={onChange} locale={enGB} />
        </div>
      </Wrapper>
    )
  }
)

export { DatePickerCalendar, CustomDatePicker }

export default _DatePicker
