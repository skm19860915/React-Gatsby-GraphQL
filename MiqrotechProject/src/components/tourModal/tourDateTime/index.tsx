import React, { useState, useEffect, useRef } from "react"
import Swiper from "react-id-swiper"
import styled from "styled-components"
import moment from "moment"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import Contact from "./../contact"
import "swiper/css/swiper.css"
import "./styles.scss"

import { LIVE_VIRTUAL_TOUR, IN_PERSON_TOUR } from "../constants"
interface ButtonProps {
  active: number
}
const DateSlide = styled.div``
const DateSlideArrow = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  color: ${props => (props.active ? "#946a4d" : "#d2d2d2")};
  @media screen and (max-width: 767px) {
    & > svg {
      width: 24px;
      height: 24px;
    }
  }
`
const Button = styled.div<ButtonProps>`
  cursor: pointer;
  background-color: ${props => (props.active ? "#946a4d" : "transparent")};
  border: 1px solid #946a4d;
  color: ${props => (props.active ? "white" : "#946a4d")};
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  text-align: center;
  font-family: "Overpass";
  width: calc(100% - 2px);
  transition: 200ms all ease-in-out;
  @media screen and (max-width: 1024px) {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
  }
`
const TimesContainer = styled.div`
  width: calc(100% - 64px);
  @media screen and (max-width: 767px) {
    width: calc(100% - 48px);
  }
`
const TimeButton = styled(Button)`
  width: calc(25% - 30px);
  margin-right: 40px;
  margin-bottom: 12px;
  &:nth-child(4n) {
    margin-right: 0;
    @media screen and (max-width: 767px) {
      margin-right: 12px;
    }
  }
  &:nth-child(3n) {
    margin-right: 40px;

    @media screen and (max-width: 767px) {
      margin-right: 0px;
    }
  }
  &:nth-child(12n) {
    margin-right: 0px;

    @media screen and (max-width: 767px) {
      margin-right: 0px;
    }
  }
  @media screen and (max-width: 1024px) {
    margin-bottom: 8px;
  }
  @media screen and (max-width: 767px) {
    width: calc(33.33% - 8px);
    margin-right: 12px;
    margin-bottom: 6px;
  }
`
const NextButton = styled.div<ButtonProps>`
  opacity: ${props => (props.active ? 1 : 0.5)};
  width: 300px;
  border: 1px solid #946a4d;
  background: #946a4d;
  color: white;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  transition: 200ms all ease-in-out;
  &:hover {
    cursor: ${props => (props.active ? "pointer" : "initial")};
    color: ${props => (props.active ? "#946a4d" : "white")};
    background: ${props => (props.active ? "transparent" : "#946a4d")};
  }
  @media screen and (max-width: 1024px) {
    height: 52px;
    line-height: 52px;
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
  }
`

interface Props {
  availableDates: Array<string>
  availableTimes: any
  curTime: string
  onNext(date: string): void
}

export default function TourDateTime({
  onNext,
  curTime,
  availableTimes,
  availableDates,
}: Props) {
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [swiper, setDesktopSwiper] = useState(null)
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [times, setTimes] = useState([])
  useEffect(() => {
    if (!!curTime) {
      let date = moment(curTime).format("ddd M/DD")
      setSelectedDate(date)
      setSelectedTime(curTime)
      setTimes(availableTimes[date])
    }
    return () => {}
  }, [])

  const swiperParams = {
    loop: false,
    spaceBetween: 40,
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    on: {
      slideChange: () => onSlideChange(),
    },
  }
  useEffect(() => {
    if (!!swiper) {
      swiper.on("slideChange", () => onSlideChange())
      let curSlide = availableDates.findIndex(a => a == selectedDate)
      swiper.slideTo(
        curSlide - swiper.params.slidesPerView >= 0
          ? curSlide - swiper.params.slidesPerView + 1
          : 0
      )
    }
  }, [swiper])
  useEffect(() => {
    if (!!curTime && availableTimes.length > 0) {
      let date = moment(curTime).format("ddd M/DD")
      setSelectedDate(date)
      setSelectedTime(curTime)
      setTimes(availableTimes[date])
    }
    return () => {}
  }, [curTime])
  useEffect(() => {
    !!selectedDate && setTimes(availableTimes[selectedDate])
    return () => {}
  }, [selectedDate])
  const onSlideChange = () => {
    swiper && setSwiperIndex(swiper.activeIndex)
  }
  const handleNext = () => {
    if (!selectedDate) {
      setErrorMessage("Please select date.")
      setShowError(true)
    } else if (!selectedTime) {
      setErrorMessage("Please select time.")
      setShowError(true)
    } else {
      onNext(selectedTime)
    }
  }
  const handleSwiperNext = () => {
    swiper && swiper.slideNext()
  }
  const handleSwiperPrev = () => {
    swiper && swiper.slidePrev()
  }
  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    setShowError(false)
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    setShowError(false)
  }

  return (
    <div className="tour-datetime-view">
      <div className="tour-datetime-view-content"></div>
      <div className="tour-datetime-view-heading">SELECT AN AVAILABLE DATE</div>
      <div className="tour-datetime-view-content-dates">
        <DateSlideArrow
          active={swiperIndex != 0 ? 1 : 0}
          onClick={handleSwiperPrev}
        >
          <AiOutlineLeft size={32} />
        </DateSlideArrow>
        <TimesContainer>
          <Swiper {...swiperParams} getSwiper={setDesktopSwiper}>
            {availableDates.map(date => {
              return (
                <DateSlide key={date}>
                  <Button
                    active={date == selectedDate ? 1 : 0}
                    onClick={() => handleDateClick(date)}
                  >
                    {parseInt(moment().format("DD")) -
                      parseInt(moment(date).format("DD")) ===
                    0
                      ? "Today"
                      : date}
                  </Button>
                </DateSlide>
              )
            })}
          </Swiper>
        </TimesContainer>
        <DateSlideArrow
          active={
            swiper
              ? swiperIndex <
                availableDates.length - swiper.params.slidesPerView
                ? 1
                : 0
              : 0
          }
          onClick={handleSwiperNext}
        >
          <AiOutlineRight size={32} />
        </DateSlideArrow>
      </div>
      <div className="tour-datetime-view-heading">SELECT AN AVAILABLE TIME</div>
      <div className="tour-datetime-view-times-container">
        <div className="tour-datetime-view-content-times">
          {times.map(time => {
            return (
              <TimeButton
                key={time}
                active={selectedTime == time ? 1 : 0}
                onClick={() => handleTimeClick(time)}
              >
                {moment(time).format("hh:mm A")}
              </TimeButton>
            )
          })}
        </div>
      </div>

      <div className="tour-datetime-view-footer">
        {showError && (
          <div className="tour-datetime-view-error">{errorMessage}</div>
        )}
        <div className="tour-datetime-view-bottom">
          <NextButton onClick={handleNext} active={!!selectedTime ? 1 : 0}>
            NEXT
          </NextButton>
          <div className="tour-datetime-view-contact">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  )
}
