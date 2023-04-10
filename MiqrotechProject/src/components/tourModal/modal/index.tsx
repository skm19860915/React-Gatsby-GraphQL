import React, { useState, useEffect } from "react"
import { MdClose } from "react-icons/md"
import ReactModal from "react-modal"
import "bootstrap/dist/css/bootstrap.min.css"
import Spinner from "react-spinkit"
import _ from "lodash"
import styled from "styled-components"
import axios from "axios"
import moment from "moment"
import "./styles.scss"
import TourType from "../tourType"
import DateSelect from "../dateSelect"
import UserForm from "../userForm"
import TimeSelect from "../timeSelect"
import TourDateTime from "../tourDateTime"
import Success from "../success"
import { convertImgUrl } from "./../../../utils/imageKit"

import { LIVE_VIRTUAL_TOUR, IN_PERSON_TOUR } from "../constants"

interface Props {
  open: boolean
  onClose: any
}
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "95%",
    height: "90%",
    margin: "0",
    padding: "0",
    borderRadius: "0",
    transform: "translate(-50%, -50%)",
    borderWidth: "0",
    transition: "left",
    // background: "url('../../assets/img/atlanta_skyline2.png') no-repeat top",
    // backgroundSize: "cover",
  },
}
const ModalBack = styled.div<BackInterface>`
  background: url(${props => props.img}) no-repeat top;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  @media screen and (max-width: 767px) {
    background: url(${props => props.mobileImg}) no-repeat top;
    background-size: cover;
  }
`
const getDate = (date: string) => {
  return moment(date).format("ddd M/DD")
}
export default function TourModal({ open, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tourType, setTourType] = useState<string>()
  const [curTime, setCurTime] = useState<string>("")
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [backImg, setBackImg] = useState<string>("")

  useEffect(() => {
    axios
      .get(
        `https://amcodigitalmedia.com/graphql?query={entry(section: "smrSitewides", site: "starMetalsResidential") {
            ... on smrSitewides_smrSitewides_Entry {            
          
              scheduleTourModalBackground
              {
                url
              }
            }
          }}`
      )
      .then(res => {
        setBackImg(res.data.data.entry.scheduleTourModalBackground[0].url)
      })
    if (open) {
      setLoading(true)
      axios
        .get(`${process.env.GATSBY_TOUR_TIME_API}`, {
          headers: { "x-api-key": `${process.env.GATSBY_TOUR_API_KEY}` },
        })
        .then(data => {
          const { acceptableTimes }: { acceptableTimes: string[] } = data.data
          console.log("res", data.data)
          setAvailableDates(_.uniq(acceptableTimes.map(getDate)))
          setAvailableTimes(_.groupBy(acceptableTimes, getDate))
          setLoading(false)
        })
        .catch(error => console.log(error))
    }
  }, [open])

  const reset = () => {
    setCurrentStep(0)
    setTourType("")
    setCurTime("")
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="tour-modal-wrapper">
      <ReactModal
        isOpen={open}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={onClose}
        style={customStyles}
        closeTimeoutMS={200}
      >
        <div className="tour-modal">
          <ModalBack
            img={convertImgUrl(backImg, false)}
            mobileImg={convertImgUrl(backImg, true)}
          />
          <div className="tour-modal-header">
            <div className="tour-modal-close" onClick={handleClose}>
              <MdClose size={30}></MdClose>
            </div>
          </div>
          <div className="tour-modal-content">
            <div className="tour-modal-label"></div>

            {loading ? (
              <LoadingContainer>
                <Spinner name="cube-grid" size={64} color="#946a4d" />
              </LoadingContainer>
            ) : currentStep == 0 ? (
              <TourType
                onNext={type => {
                  setTourType(type)
                  goToStep(1)
                }}
              />
            ) : currentStep == 1 ? (
              <TourDateTime
                curTime={curTime}
                availableDates={availableDates}
                availableTimes={availableTimes}
                onNext={time => {
                  setCurTime(time)
                  goToStep(2)
                }}
              />
            ) : currentStep == 2 ? (
              <UserForm
                type={tourType}
                time={curTime}
                onGotoDate={() => goToStep(1)}
                onGotoTime={() => goToStep(1)}
                onSuccess={() => goToStep(3)}
              />
            ) : currentStep == 3 ? (
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  paddingBottom: 120,
                }}
              >
                <Success />
              </div>
            ) : null}
          </div>
        </div>
      </ReactModal>
    </div>
  )
}
