import React, { useState, useRef, useEffect } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import ReactTooltip from "react-tooltip"
import ReactModal from "react-modal"
import { useCookies } from "react-cookie"

import { Modal } from "react-responsive-modal"
import "react-responsive-modal/styles.css"

import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"
import withLocation from "./../utils/withLocation"
import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import Input from "../components/input"
import TextArea from "../components/textarea"
import Hero2 from "../components/hero2"
import axios from "axios"
import ContactInfo from "./../components/contactInfo"
import {
  Home,
  Info,
  Map,
  Info_Content,
  Info_Content_Heading,
  Address,
  EmailUS,
  Socials,
  Divider,
  Question,
  Question_Heading,
  Question_Footer,
  Question_Content,
  Question_Submit,
  Question_Input,
} from "../styles/contact"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import Success from "./../components/tourModal/success"
import SEO from "../components/seo"
import styled from "styled-components"
import "./../styles/contact.scss"
interface ThankyouProps {
  open: boolean
  onClose(): void
}
const ThankyouWrapper = styled.div`
  padding-top: 30px;
  width: 600px;
  @media screen and (max-width: 767px) {
    width: 250px;
  }
`
const ThankyouModal = ({ open, onClose }: ThankyouProps) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <ThankyouWrapper>
        <div className="tour-modal-label"></div>

        <Success />
      </ThankyouWrapper>
    </Modal>
  )
}

const Contact: React.FC = (props: any) => {
  const {
    WebsitepageTitle,
    websiteKeywords,
    websitePageDescription,
    heroBlock,
    standardContentBlock,
    callToActionBlock,
  } = props.data.craft.entry
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const [showThankyou, setShowThankyou] = useState(false)
  const [cookies, setCookie] = useCookies(["_ga"])

  const hideTooltip = () => {
    ReactTooltip.hide(firstNameRef.current)
    ReactTooltip.hide(lastNameRef.current)
    ReactTooltip.hide(phoneRef.current)
    ReactTooltip.hide(emailRef.current)
  }
  const onSubmit = () => {
    if (!firstName) {
      ReactTooltip.show(firstNameRef.current)
      return
    }

    if (!lastName) {
      ReactTooltip.show(lastNameRef.current)
      return
    }
    if (!phone) {
      ReactTooltip.show(phoneRef.current)
      return
    }
    if (!email) {
      ReactTooltip.show(emailRef.current)
      return
    }
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/3216128/or2aeft/",
        {
          params: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            SourceTitle: "Property Website",
            Message: message,
            VisitorUID: cookies["VisitorUID"],
            _gid: cookies["_gid"],
            _ga: cookies["_ga"],
            calltrk_session_id: cookies["calltrk_session_id"],
            EAI_SessionId: cookies["EAI_SessionId"],
          },
        }
      )
      .then(res => {
        setShowThankyou(true)
        setEmail("")
        setFirstName("")
        setLastName("")
        setPhone("")
        setMessage("")
      })
  }
  useEffect(() => {
    const { location } = props
    if (location.hash == "#question") {
      scroller.scrollTo("unitScrollElement", {
        duration: 500,
        smooth: true,
        spy: true,
        offset: -100,
      })
    }
    return () => {}
  }, [])
  function handleSubmit(e) {
    e.preventDefault()
    return false
  }
  return (
    <Home>
      <SEO
        title={WebsitepageTitle || ""}
        keywords={websiteKeywords || ""}
        description={websitePageDescription || ""}
      />
      <Header></Header>
      <Hero2
        header={heroBlock[0].headline || ""}
        subheader={heroBlock[0].subHeadline || ""}
        img={heroBlock[0].heroImage[0].url || ""}
      />
      <ContactInfo img={standardContentBlock[0].image[0].url} />
      <Element name="unitScrollElement"></Element>

      <form id="question" onSubmit={e => handleSubmit(e)}>
        <Question>
          <Question_Heading>Questions</Question_Heading>
          <Question_Content>
            <Question_Input>
              <div>
                <Input
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e: any) => {
                    setFirstName(e)
                    hideTooltip()
                  }}
                ></Input>
                <p ref={firstNameRef} data-tip="Please input first name."></p>
              </div>
            </Question_Input>
            <Question_Input>
              <Input
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e: any) => {
                  setLastName(e)
                  hideTooltip()
                }}
              ></Input>
              <p ref={lastNameRef} data-tip="Please input last name."></p>
            </Question_Input>
            <Question_Input>
              <Input
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={(e: any) => {
                  setPhone(e)
                  hideTooltip()
                }}
              ></Input>
              <p ref={phoneRef} data-tip="Please input phone number."></p>
            </Question_Input>
            <Question_Input>
              <Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e)
                  hideTooltip()
                }}
              ></Input>
              <p ref={emailRef} data-tip="Please input email."></p>
            </Question_Input>
          </Question_Content>
          <TextArea
            placeholder="Message"
            name="Message"
            value={message}
            onChange={(e: any) => setMessage(e)}
          ></TextArea>
          <p ref={messageRef} data-tip="Please input email."></p>
          <Question_Footer>
            <Question_Submit type="submit" onClick={() => onSubmit()}>
              Submit
            </Question_Submit>
          </Question_Footer>
        </Question>
      </form>
      <Prefooter
        headline={callToActionBlock[0].headline || ""}
        action={callToActionBlock[0].callToActionTextblock || ""}
        img={callToActionBlock[0].heroImage[0].url || ""}
        backImg={callToActionBlock[0].backgroundImage[0].url || ""}
        link={callToActionBlock[0].callToActionLinkblock || ""}
      ></Prefooter>

      <ReactTooltip place={"bottom"} type="error" className="contact-tooltip" />
      <Footer></Footer>
      <ThankyouModal
        open={showThankyou}
        onClose={() => setShowThankyou(false)}
      />
    </Home>
  )
}

export default withLocation(Contact)
export const contactQuery = graphql`
  query {
    craft {
      entry(section: "smrContactPage", site: "starMetalsResidential") {
        id
        ... on Craft_smrContactPage_smrContactPage_Entry {
          heroBlock {
            ... on Craft_heroBlock_BlockType {
              headline
              subHeadline
              heroImage {
                url
              }
              callToActionText
              callToActionLink
            }
          }
          standardContentBlock {
            ... on Craft_standardContentBlock_imageBlock_BlockType {
              id
              image {
                url
              }
            }
          }
          callToActionBlock {
            ... on Craft_callToActionBlock_BlockType {
              headline
              callToActionTextblock
              callToActionLinkblock
              heroImage {
                url
              }
              backgroundImage {
                url
              }
            }
          }
          websitePageDescription
          websiteKeywords
          WebsitepageTitle
        }
      }
    }
  }
`
