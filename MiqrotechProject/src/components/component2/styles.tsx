import styled, { css } from "styled-components"
export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: -1px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 50px;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 35px;
  }
`

export const Sub1 = styled.div`
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`

export const Sub1_1 = styled.div`
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR";
  color: #636569;
  transform: rotate(-90deg);
  transform-origin: left top 0;
  margin-left: -50px;
  position: absolute;
  text-align: center;
  margin-top: 664px;
  width: 664px;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
    font-weight: bold;
    margin-top: 414px;
    width: 414px;
    margin-left: 0;
  }
  @media screen and (max-width: 767px) {
    writing-mode: initial;
    text-align: right;
    margin-top: 0;
    margin-bottom: 20px;
    transform: none;
    position: static;
    width: 100%;
  }
`
interface SubProps2 {
  img: string
  mobileImg: string
}
export const Sub1_2 = styled.div<SubProps2>`
  width: 50vw;
  height: 664px;
  margin: 0 30px;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  box-shadow: 10px 3px 20px rgba(0, 0, 0, 0.2);
  margin-left: 20px;
  @media screen and (max-width: 1024px) {
    width: calc(100% - 60px);
    height: 414px;
    margin: 0 0 0 40px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 212px;
    margin: 0;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`

export const Sub2 = styled.div`
  display: block;
  width: 524px;
  max-width: 524px;
  margin-left: 0px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    max-width: initial;
    margin-top: 30px;
    margin-left: 0;
    display: flex;
    flex-direction: row;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 25px 0 0 0;
    display: block;
  }
`

export const Sub2_1 = styled.div<SubProps2>`
  height: 320px;
  margin-bottom: 56px;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  box-shadow: 10px 3px 20px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1024px) {
    width: 60%;
    margin-bottom: 0;
    min-height: 240px;
    height: auto;
  }
  @media screen and (max-width: 767px) {
    height: 138px;
    min-height: 138px;
    margin-bottom: 25px;
    width: 80%;
    margin-right: 0;
    margin-left: auto;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
export const Sub2_2 = styled.div`
  font-size: 16px;
  color: #636569;
  display: flex;
  flex-direction: column;
  height: 280px;

  @media screen and (max-width: 1024px) {
    width: 40%;
    font-size: 12px;
    min-height: 240px;
    height: auto;
    margin-left: 20px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 12px;
    height: auto;
    margin-left: 0;
  }
`
export const Desc = styled.div`
  margin-bottom: 20px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    line-height: 24px;
  }
`
export const Detail = styled.div`
  margin-top: auto;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  p {
    line-height: 40px;
  }
  a {
    color: #636569;
    text-decoration: none;
  }
  @media screen and (max-width: 767px) {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
  }
`
export const DesktopLayout = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
export const MobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`
