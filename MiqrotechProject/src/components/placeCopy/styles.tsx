import styled, { css } from "styled-components"
import Back1Img from "../../assets/img/atlanta_skyline.png"
import Wave7Img from "../../assets/img/wave7.png"

export const Container = styled.div`
  font-family: "Overpass";
  padding: 305px 0 305px 0;
  background: url(${Back1Img}) no-repeat center;
  background-size: cover;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding: 150px 0 100px 0;
  }
  @media screen and (max-width: 767px) {
    padding: 145px 0 100px 0;
  }
`
export const Desc = styled.div`
  width: 800px;
  font-size: 16px;
  text-align: left;
  font-family: "Overpass";
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
    text-align: left;
    width: 316px;
  }
  @media screen and (max-width: 767px) {
    margin-left: 35px;
    marign-right: 35px;
    width: calc(100% - 70px);
    font-size: 12px;
    line-height: 24px;
    text-align: left;
  }
`
export const BackImg = styled.div`
  width: 115px;
  height: 565px;
  background: url(${Wave7Img}) no-repeat center;
  background-size: contain;
  margin: 75px auto 85px auto;
`
export const Heading = styled.div`
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 50px;
  @media screen and (max-width: 1024px) {
    font-size: 32px;
    margin-bottom: 35px;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`
export const CTA = styled.div`
  background-color: #946a4d;
  border: 1px solid #946a4d;
  color: 16px;
  width: 300px;
  height: 75px;
  line-height: 75px;
  cursor: pointer;
  text-align: center;
  font-family: "Overpass";
  color: white;
  font-weight: bold;
  letter-spacing: 3px;
  margin-left: auto;
  margin-right: auto;
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #946a4d;
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #946a4d;
  }
  @media screen and (max-width: 1024px) {
    font-size: 10px;
    font-weight: bold;
    font-family: "Overpass";
    letter-spacing: 2px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 15px;
    width: 220px;
    height: 50px;
    line-height: 50px;
    letter-spacing: 2px;
    margin-left: auto;
    margin-right: auto;
  }
`
