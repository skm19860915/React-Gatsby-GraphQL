import styled, { css } from "styled-components"
import { Link } from "gatsby"
import BackImg from "../../assets/img/smr_exterior.png"
import StarImg from "../../assets/img/star_white.png"

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
`
export const Wrapper = styled.div`
  width: 100%;
  background-color: white;
`
interface ContainerProps {
  // img: string
}
export const Container = styled.div<ContainerProps>`
  margin-top: 120px;
  margin-left: 3.5%;
  margin-right: 3.5%;
  background: transparent;
  font-family: "Overpass";

  height: calc(100vh - 120px);
  width: calc(100vw - 7%);
  display: flex;
  flex-direction: column;

  position: absolute;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    /* padding: 0 48px 0 58px; */
    margin-top: 74px;
    height: calc(100vh - 74px);
  }

  @media screen and (max-width: 767px) {
    /* padding: 0 60px 0 60px; */
    /* padding: 60px 37px 0 37px; */
    margin-top: 80px;
    height: calc(100vh - 80px);
    width: calc(100vw - 50px);
    margin-left: 25px;
    margin-right: 25px;
  }
`
export const Content = styled.div`
  position: absolute;
`
export const Background = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
`
export const Container_Background = styled.div`
  height: 185px;
  background-color: #443635;

  width: 100%;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 105px;
    top: 0px;
  }

  @media screen and (max-width: 767px) {
    height: 140px;
    top: 0px;
  }
`
export const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-family: "Overpass";
  font-weight: bold;
  word-spacing: 12px;
  color: white;
  letter-spacing: 3px;
  margin-top: auto;
  padding-top: 120px;
  text-transform: uppercase;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    text-align: left;
    line-height: 60px;
    width: 500px;
    margin-left: 60px;
  }

  @media screen and (max-width: 767px) {
    padding-top: 0;
    margin-top: auto;
    text-align: center;
    font-size: 28px;
  }
`

export const Tour = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 30px 50px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  margin-top: 50px;
  letter-spacing: 3px;
  margin-bottom: auto;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    a {
      color: rgba(0, 0, 0, 0.9);
      text-decoration: none;
    }
  }
  a {
    color: white;
  }

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin-left: 0;
    margin-right: auto;
    margin-top: 20px;
    padding: 20px 38px;
    font-size: 10px;
    margin-left: 60px;
  }

  @media screen and (max-width: 767px) {
    background-color: rgba(255, 255, 255, 0.9);
    a {
      color: rgba(0, 0, 0, 0.9);
      text-decoration: none;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 12px;
    letter-spacing: 2px;
    width: calc(100% - 70px);
    text-align: center;
    padding: 18px 12px;
    margin-left: 35px;
    margin-right: 35px;
  }
`
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;

  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`

export const Footer_Socials = styled.div`
  display: flex;
  position: absolute;
  margin-left: 60px;
  & > *:last-child {
    margin-left: 50px;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`
export const Footer_Star = styled.div`
  width: 150px;
  height: 75px;
  background: url(${StarImg}) no-repeat bottom center;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 767px) {
    width: 110px;
    height: 55px;
  }
`
export const Footer_Accessibility = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  font-family: "Overpass";
  letter-spacing: 3.2px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
export const Footer_Social = styled.a`
  color: white;
  &:hover {
    color: white;
  }
`
