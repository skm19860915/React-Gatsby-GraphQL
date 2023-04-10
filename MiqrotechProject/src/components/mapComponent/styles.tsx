import styled, { css } from "styled-components"
export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  justify-content: center;
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    padding: 50px;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    padding: 50px;
  }
`

export const Sub1 = styled.div`
  display: flex;

  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`

export const Sub1_1 = styled.div`
  writing-mode: tb-rl;
  font-size: 36px;
  font-weight: bold;
  font-family: "Noto Sans KR";
  color: #636569;
  margin-top: 293px;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
    font-weight: bold;
    margin-top: 160px;
  }
  @media screen and (max-width: 767px) {
    writing-mode: initial;
    text-align: right;
    margin-top: 0;
    margin-bottom: 20px;
  }
`
interface SubProps2 {
  img: string
}
export const Sub1_2 = styled.div<SubProps2>`
  width: 50vw;
  height: 664px;
  margin: 0 30px;
  background: url(${props => props.img}) no-repeat center;
  box-shadow: 10px 3px 20px rgba(0, 0, 0, 0.2);

  background-size: cover;
  @media screen and (max-width: 1024px) {
    width: calc(100% - 60px);
    height: 414px;
    margin: 0 25px 0 0;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 212px;
    margin: 0;
  }
`

export const Sub2 = styled.div`
  display: block;
  width: 524px;
  max-width: 524px;
  margin-left: 50px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    max-width: initial;
    margin-top: 30px;
    margin-left: 0;
    display: flex;
    flex-direction: row-reverse;
  }
  @media screen and (max-width: 767px) {
    display: block;
    width: 100%;
    margin: 25px 0 0 0;
  }
`

export const Sub2_1 = styled.div<SubProps2>`
  height: 320px;
  margin-bottom: 56px;
  background: url(${props => props.img}) no-repeat center;
  box-shadow: 10px 3px 20px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1024px) {
    width: 60%;
    margin-left: 30px;
    margin-bottom: 0;
    height: 240px;
  }
  @media screen and (max-width: 767px) {
    height: 138px;
    margin-bottom: 25px;
    width: 80%;
    margin-left: auto;
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
    height: 240px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 12px;
    height: auto;
  }
`
export const Desc = styled.div`
  margin-bottom: 20px;
`
export const Detail = styled.div`
  margin-top: auto;
  margin-right: auto;
  cursor: pointer;
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
