import React from "react"
import styled from "styled-components"
const Container = styled.div`
  font-family: "Overpass";
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  width: 840px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  a {
    color: #946a4d;
    &:hover {
      color: #946a4d;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 600px;
  }
  @media screen and (max-width: 767px) {
    font-size: 9.2px;
    line-height: 12px;
    width: 100%;
  }
`
export default function Desc() {
  return (
    <Container>
      By clicking "Book Tour", you agree to Star Metals{" "}
      <a href="/terms" target="_blank">
        Terms of use{" "}
      </a>{" "}
      and{" "}
      <a href="/privacy" target="_blank">
        Privacy Policy
      </a>{" "}
      and Knock CRM's{" "}
      <a href="https://www.knockcrm.com/terms/" target="_blank">
        Term of Use
      </a>{" "}
      and{" "}
      <a href="https://www.knockcrm.com/privacy/" target="_blank">
        Privacy Policy
      </a>{" "}
      and consent to be contacted at this phone number by text message, and/or
      by autodialer for any purpose, including marketing, by the properly and
      anyone acting on behalf.
      <br />
      Consent not required to purchase or rent.
    </Container>
  )
}
