import styled, { css } from "styled-components"
export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  background: transparent;
  padding: 150px;
  height: 1050px;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 125px;
    height: auto;
  }
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 35px 25px 85px 25px;
    height: auto;
  }
`
export const Section_Image = styled.div`
  width: 50%;
  display: flex;
  height: auto;
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 525px;
    margin-top: 120px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-top: 80px;
    height: 360px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
  }
`
interface ImageProps {
  img: string
  mobileImg: string
}
export const Image1 = styled.div<ImageProps>`
  background-color: #9ea1a7;
  width: 500px;
  height: 800px;
  position: absolute;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  display: flex;
  @media screen and (max-width: 1024px) {
    width: 394px;
    height: 525px;
  }
  @media screen and (max-width: 767px) {
    width: 240px;
    height: 360px;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`

export const Image2 = styled.div<ImageProps>`
  width: 500px;
  height: 800px;
  background-color: #636569;
  margin-top: 288px;
  margin-left: auto;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    width: 394px;
    height: 525px;
    margin-top: 263px;
    margin-left: 126px;
  }
  @media screen and (max-width: 767px) {
    width: 240px;
    height: 360px;
    margin-top: 180px;
    margin-left: 60px;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
export const Section_Main = styled.div`
  width: 40%;
  margin-top: 150px;
  margin-left: 10%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-top: 30px;
    margin-left: 0;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-left: 0;
  }
`
export const Header = styled.div`
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 46px;
  color: #231f20;
  text-transform: uppercase;
  @media screen and (max-width: 1024px) {
    font-size: 32px;
    font-family: "Noto Sans KR";
  }
  @media screen and (max-width: 767px) {
    font-size: 24px;
    text-align: center;
    font-family: "Noto Sans KR";
  }
`

export const Subheader = styled.div`
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 30px;
  color: #231f20;
  text-transform: uppercase;
  margin-top: 10px;
  @media screen and (max-width: 1024px) {
    font-size: 18px;
    font-family: "Noto Sans KR";
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
    text-align: center;
    font-family: "Noto Sans KR";
  }
`
export const Desc = styled.div`
  font-family: "Overpass";
  font-size: 16px;
  color: #636569;
  margin-top: 127px;

  @media screen and (max-width: 1024px) {
    font-size: 12px;
    font-family: "Overpass";
    margin-top: 30px;
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
    margin-top: 50px;
    text-align: center;
    line-height: 22px;
    padding-left: 10px;
    padding-right: 10px;
  }
`
export const Section_Button = styled.div`
  display: flex;
  margin-top: auto;
  @media screen and (max-width: 1024px) {
    display: flex;
    margin-top: 70px;
  }
  @media screen and (max-width: 767px) {
    display: block;
    margin-top: 70px;
  }
`

export const Button = styled.div`
  font-size: 16px;
  color: white;
  background-color: #946a4d;
  width: 300px;
  height: 75px;
  text-align: center;
  text-transform: uppercase;
  font-family: "Overpass";
  letter-spacing: 2px;
  line-height: 75px;
  cursor: pointer;
  border: 1px solid #946a4d;
  transition: all 200ms ease-in-out;
  &:hover {
    background: white;
    color: #946a4d;
    text-decoration: none;
    a {
      color: #946a4d;
      text-decoration: none;
    }
  }
  a {
    color: white;
  }
  &:last-child {
    margin-left: 25px;
    @media screen and (max-width: 767px) {
      margin-top: 30px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 10px;
  }
  @media screen and (max-width: 767px) {
    width: 220px;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
  }
`
