import styled, { css } from "styled-components"
import BackImg from "../../assets/img/star_quat.png"
import BuildingImg from "../../assets/img/building.png"

interface ContainerProps {
  img: string
  mobileImg: string
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
  margin-top: 120px;
  margin-left: 3.5%;
  margin-right: 3.5%;
  background-color: #636569;
  background-size: contain;
  font-family: "Noto Sans KR";
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  height: 458px;
  width: calc(100vw - 7%);
  display: block;
  flex-direction: column;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin-top: 74px;
  }

  @media screen and (max-width: 767px) {
    height: 425px;
    margin-top: 80px;
    margin-left: 25px;
    margin-right: 25px;
    width: calc(100vw - 50px);
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
export const Background = styled.div`
  background-color: white;
  width: 100vw;
  height: 578px;
`

export const Container_Background = styled.div`
  height: 185px;
  background-color: #443635;
  z-index: -1;
  width: 100%;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 105px;
  }

  @media screen and (max-width: 767px) {
    height: 140px;
    top: 100px;
  }
`
export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`
export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  padding: 0 0 0 100px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    padding: 0 0px 0px 40px;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 767px) {
    padding: 0px;
  }
`
export const Title = styled.div`
  text-align: left;
  font-size: 50px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  letter-spacing: 0;
  color: white;
  z-index: 1;
  margin-top: auto;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    text-align: left;
    font-size: 38px;
  }

  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 28px;
  }
`
export const Subheader = styled.div`
  text-align: left;
  font-size: 30px;
  font-family: "Noto Sans KR";
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  margin-bottom: 0;
  letter-spacing: 0;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    text-align: left;
    font-size: 20px;
  }

  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 16px;
    padding: 0 10px;
  }
`
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  margin-top: 0;
  @media screen and (max-width: 767px) {
    margin-top: auto;
  }
`

export const Footer_Star = styled.div`
  width: 120px;
  height: 100px;
  background: url(${BackImg}) no-repeat bottom right;
  background-size: contain;

  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 90px;
  }

  @media screen and (max-width: 767px) {
    width: 70px;
    height: 65px;
  }
`
