import styled, { css } from "styled-components"
interface Props {
  orientation: string
}
export const Container = styled.div`
  font-family: "Overpass";
  padding: 100px 0;
  display: flex;
`
export const Container_Back = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 767px) {
  }
`

export const White = styled.div`
  height: 140px;
  width: 100%;
  background-color: white;
  @media screen and (max-width: 1024px) {
    height: 86px;
  }
  @media screen and (max-width: 767px) {
    height: 88px;
  }
`
interface GrayProps {
  img: string
  mobileImg: string
}
export const Gray = styled.div<GrayProps>`
  height: 555px;
  width: 100%;
  position: relative;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  @media screen and (max-width: 1024px) {
    height: 495px;
  }
  @media screen and (max-width: 767px) {
    height: 330px;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
export const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: ${props =>
    props.orientation === "right" ? "row" : "row-reverse"};
  position: absolute;
  margin-left: 150px;
  width: calc(100vw - 300px);
  justify-content: space-between;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    margin-left: 120px;
    width: calc(100vw - 240px);
    flex-direction: column;
  }
  @media screen and (max-width: 767px) {
    margin-left: 30px;
    width: calc(100vw - 70px);
    flex-direction: column;
  }
`
interface BackImgProps {
  img: string
  mobileImg: string
}
export const BackImg = styled.div<BackImgProps>`
  width: 60%;
  height: 600px;
  background-color: #636569;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 370px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 190px;
    margin-left: auto;
    margin-right: auto;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  color: #231f20;
  width: 35%;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 45px;
  }
  @media screen and (max-width: 767px) {
    margin: 25px 0 0 0;
    width: 100%;
    margin-top: 20px;
  }
`
export const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR";
  text-align: left;
  @media screen and (max-width: 1024px) {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
`
export const Desc = styled.div`
  margin-top: 36px;
  font-size: 16px;
  line-height: 30px;
  font-family: "Overpass";
  color: #231f20;
  text-align: left;
  @media screen and (max-width: 1024px) {
    text-align: center;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 12px;
    line-height: 24px;
    margin-top: 20px;
  }
`
