import styled, { css } from "styled-components"

export const Container = styled.div`
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 15px;
  color: #946a4d;
  width: auto;
  text-align: center;
  @media screen and (max-width: 1024px) {
    color: #707070;
    padding-bottom: 17px;
    border-bottom: 1px solid #707070;
    margin: 0 60px;
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    color: #707070;
    border-bottom: 1px solid #707070;
    padding-bottom: 10px;
    font-size: 14px;
    margin: 0 35px;
  }
`
export const Highlight = styled.span`
  color: #946a4d;
  font-weight: bold;
`
export const DesktopLayout = styled.div`
  display: block;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`
export const MobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    letter-spacing: 1px;
  }
  @media screen and (max-width: 767px) {
    letter-spacing: 0.3px;
  }
`
