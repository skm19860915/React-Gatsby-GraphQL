import React, { useState } from "react"
import "./styles.scss"
import styled from "styled-components"
import moment from "moment"
import axios from "axios"
import Input from "./../input"
import Contact from "./../contact"
import Desc from "./../desc"
import { WEBHOOK_API } from "../constants"
import { MdCreate, MdAccessTime, MdEventNote } from "react-icons/md"
import Spinner from "react-spinkit"
import { useCookies } from "react-cookie"

interface Props {
  type?: string
  time?: string
  onGotoDate(): void
  onGotoTime(): void
  onSuccess(): void
}

const ERROR_MSG = "Please fill out the fields"
interface ButtonProps {
  active: number
}
const SubmitButton = styled.button<ButtonProps>`
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
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
  }
`
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`
export default function UserForm({
  time,
  type,
  onGotoDate,
  onGotoTime,
  onSuccess,
}: Props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cookies, setCookie] = useCookies(["_ga"])

  const validate = () => {
    if (!firstName || !lastName || !email || !phone) {
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validate()) {
      setError(true)
      return
    }
    if (isLoading) return
    setIsLoading(true)
    setError(false)
    let ip = await axios.get("https://ipapi.co/ip/", {
      params: {
        access_key: `${process.env.GATSBY_IPAPI_KEY}`,
      },
    })
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/${process.env.GATSBY_TOUR_WEBHOOK_API}`,
        {
          TourType: type,
          StartTime: moment(time).format(),
          Date_time_click_submit: moment().format(),
          Visitor_IP: ip.data,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          VisitorUID: cookies["VisitorUID"],
          _gid: cookies["_gid"],
          _ga: cookies["_ga"],
          calltrk_session_id: cookies["calltrk_session_id"],
          EAI_SessionId: cookies["EAI_SessionId"],
        }
      )
      .then(data => {
        const { status } = data
        if (status === 200) {
          onSuccess()
          setIsLoading(false)
        }
      })
      .catch(error => console.log(error))
  }
  function submit(e) {
    e.preventDefault()
    return false
  }
  const errorMsgStyle =
    (!!firstName && !!lastName && !!phone && !!email) || !error
      ? "user-form-error-msg"
      : "user-form-error-msg show"

  return (
    <form className="user-form-view" onSubmit={e => submit(e)}>
      <div className="user-form-view-heading">You're Almost Done!</div>
      <div className="user-form-view-datetime">
        <div className="user-form-view-date">
          <MdEventNote size={24} color={"gray"} />
          <span>{moment(time).format("ddd M/DD")}</span>
          <MdCreate
            size={24}
            color={"#946a4d"}
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={onGotoDate}
          />
        </div>
        <div className="user-form-view-time">
          <MdAccessTime size={24} color={"gray"} />
          <span>{moment(time).format("hh:mm A")}</span>
          <MdCreate
            size={24}
            color={"#946a4d"}
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={onGotoTime}
          />
        </div>
      </div>
      <div className="user-form-view-info">
        <Input
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e)}
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e)}
        />
        <Input
          placeholder="E-Mail"
          name="email"
          value={email}
          onChange={e => setEmail(e)}
        />
        <Input
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={e => setPhone(e)}
        />
      </div>
      {/* <div className="user-form-privacy">
        <input type="checkbox"></input>I consent to appointment updates via SMS
        communications.{" "}
        <a href="/privacy" target="_blank">
          Privacy Policy
        </a>
      </div> */}

      <div className="user-form-view-footer">
        <div className="user-form-view-buttons">
          <div className={errorMsgStyle}>{ERROR_MSG}</div>
          <SubmitButton
            active={!!firstName && !!lastName && !!phone && !!email ? 1 : 0}
            onClick={handleSubmit}
            type="submit"
          >
            {isLoading ? (
              <LoadingContainer>
                <Spinner name="cube-grid" size={64} color="white" />
              </LoadingContainer>
            ) : (
              "BOOK TOUR"
            )}
          </SubmitButton>
          <Desc />
        </div>
        <div className="user-form-view-bottom">
          <Contact />
        </div>
      </div>
    </form>
  )
}
