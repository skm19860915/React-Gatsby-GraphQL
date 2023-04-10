import React, { useState, useEffect } from "react"
import { MdClose } from "react-icons/md"
import ReactModal from "react-modal"
import LeaseNow1 from "../leaseNow1"
import LeaseNow2 from "../leaseNow2"
import LeaseNow3 from "../leaseNow3"
import axios from "axios"
import styled from "styled-components"
import moment from "moment"
import "bootstrap/dist/css/bootstrap.min.css"
import BackImg from "./../../assets/img/atlanta_skyline2.png"
import "./styles.scss"
import { convertImgUrl } from "./../../utils/imageKit"
interface Props {
  open: boolean
  onClose: any
}
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
const ModalWrapper = styled.div``
interface BackInterface {
  img: string
  mobileImg: string
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
export default function LeaseModal({ open, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [resultCount, setResultCount] = useState(50)
  const [monthData, setMonthData] = useState([])
  const [results, setResults] = useState(0)
  const [planMonths, setPlanMonths] = useState("")
  const [bedRooms, setBedRooms] = useState([])
  const [backImg, setBackImg] = useState<string>("")
  const onChooseMonth = () => {
    setCurrentStep(1)
  }
  const onChooseFlexible = () => {
    setCurrentStep(2)
  }
  const onViewResults = () => {
    location.href = `/floorplan?months=${monthData
      .filter(a => a.active)
      .map(a => a.title)
      .join(",")}&bedrooms=${bedRooms.join(",")}`
  }
  const initMonths = () => {
    let temp = []
    let startMonth = moment().isBefore("2020-08-01")
      ? moment("2020-07-01")
      : moment()
    for (var i = 0; i < 12; i++) {
      temp.push({
        title: startMonth
          .add(1, "M")
          .locale("en")
          .format("MMMM YYYY"),
        active: false,
      })
    }
    setMonthData(temp)
  }
  useEffect(() => {
    initMonths()
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://amcodigitalmedia.com/graphql?query={entry(section: "smrSitewides", site: "starMetalsResidential") {
            ... on smrSitewides_smrSitewides_Entry {            
          
              leaseNowModalBackground
              {
                url
              }
            }
          }}`
      )
      .then(res => {
        setBackImg(res.data.data.entry.leaseNowModalBackground[0].url)
      })
    !open &&
      setTimeout(() => {
        initMonths()
        setCurrentStep(0)
        setResultCount(0)
        setResults(0)
        setPlanMonths("")
        setBedRooms([])
      }, 500)
    return () => {}
  }, [open])
  const onChangeMonth = (index: number) => {
    let newData = [
      ...monthData.slice(0, index),
      {
        title: monthData[index].title,
        active: !monthData[index].active,
      },
      ...monthData.slice(index + 1),
    ]
    setMonthData(newData)
  }
  const onChangeBedroom = (index: number) => {
    let beds = bedRooms
    if (bedRooms.includes(index)) {
      beds = bedRooms.filter(a => a != index)
    } else {
      beds.push(index)
    }
    setBedRooms(beds)
  }
  return (
    <ModalWrapper>
      <ReactModal
        isOpen={open}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={onClose}
        style={customStyles}
        closeTimeoutMS={200}
      >
        <div className="lease-modal">
          <ModalBack
            img={convertImgUrl(backImg, false)}
            mobileImg={convertImgUrl(backImg, true)}
          />
          <div className="lease-modal-header">
            <div
              className="lease-modal-close"
              onClick={() => {
                onClose()
              }}
            >
              <MdClose size={30}></MdClose>
            </div>
          </div>
          <div className="lease-modal-content">
            {currentStep == 0 ? (
              <LeaseNow1
                onMonth={onChooseMonth}
                onFlexible={onChooseFlexible}
                onViewResults={onViewResults}
                results={resultCount}
              ></LeaseNow1>
            ) : currentStep == 1 ? (
              <LeaseNow2
                onBack={() => setCurrentStep(0)}
                onNext={() => setCurrentStep(2)}
                onStartOver={() => setCurrentStep(0)}
                onViewResults={onViewResults}
                monthData={monthData}
                results={results}
                planMonths={planMonths}
                onChangeMonth={(e: number) => onChangeMonth(e)}
              ></LeaseNow2>
            ) : currentStep == 2 ? (
              <LeaseNow3
                onBack={() => setCurrentStep(1)}
                onNext={() => onViewResults()}
                onStartOver={() => setCurrentStep(0)}
                results={results}
                onViewResults={onViewResults}
                bedRooms={bedRooms}
                planMonths={planMonths}
                onChangeBedroom={(e: number) => onChangeBedroom(e)}
              ></LeaseNow3>
            ) : null}
          </div>
        </div>
      </ReactModal>
    </ModalWrapper>
  )
}
