import React from "react"
import styled from "styled-components"
import { FaEnvelope } from "react-icons/fa"
import { MdPhone } from "react-icons/md"
const Container = styled.div`
  width: 880px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #d2d2d2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 18px;
  @media screen and (max-width: 1024px) {
    width: calc(100% - 120px);
    margin-left: 60px;
    margin-right: 60px;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    padding-top: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 0px;
    margin-right: 0px;
  }
`
const Label = styled.div`
  font-family: "Overpass";
  font-style: italic;
  color: #232323;
  text-align: left;
  font-size: 16px;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`
const Contacts = styled.div`
  display: flex;
`
const ContactInfo = styled.div`
  text-align: left;
  display: flex;
  margin-left: 80px;
  font-size: 16px;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    margin-left: 0;
    font-size: 12px;
  }
`
const Icon = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 4px;
  & > svg {
    @media screen and (max-width: 1024px) {
      width: 20px;
      height: 20px;
    }
    @media screen and (max-width: 767px) {
      width: 16px;
      height: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    margin-right: 2px;
  }
`
export default function Contact() {
  return (
    <Container>
      <Label>Not Ready for the tour yet?</Label>
      <Contacts>
        <ContactInfo>
          <Icon>
            <MdPhone color="#946a4d" size={24} />
          </Icon>
          <span>+1 (404) 458-0919</span>
        </ContactInfo>
        {/* <ContactInfo>
          <Icon>
            <FaEnvelope color="#946a4d" size={20} />
          </Icon>
          <span>Send Message</span>
        </ContactInfo> */}
      </Contacts>
    </Container>
  )
}
