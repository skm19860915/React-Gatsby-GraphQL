import styled, { css } from "styled-components"
import BackImg from "../assets/img/amenity.png"
import Wave1Img from "../assets/img/wave1.png"
import Wave6Img from "../assets/img/wave6.png"
import Wave4Img from "../assets/img/wave4.png"
import Wave41Img from "../assets/img/wave41.png"
import Wave8Img from "../assets/img/wave8.png"
import StarHalfImg from "../assets/img/star_half.png"
import SkyLineImg from "./../assets/img/atlanta_skyline.png"
export const Home = styled.div`
  overflow: auto;
  background-color: white;
`
interface Section1Props {
  img: string
  mobileImg: string
}
export const Section1 = styled.div<Section1Props>`
  /* background: linear-gradient(rgba(158, 161, 167, 0.6), white); */
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  padding-top: 342px;
  font-family: "Overpass";

  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 767px) {
    padding-top: 180px;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
export const Section1_Heading = styled.div`
  font-family: "Noto Sans KR";
  text-align: center;
  font-size: 46px;
  font-weight: bold;
  color: #231f20;
  padding-bottom: 220px;
  margin-left: 14%;
  margin-right: 14%;
  @media screen and (max-width: 1024px) {
    margin-bottom: 160px;
  }

  @media screen and (max-width: 767px) {
    font-size: 22px;
    font-weight: bold;
    color: #231f20;
    margin-left: 35px;
    margin-right: 35px;
    margin-bottom: 50px;
    width: calc(100% - 70px);
  }
`
export const Section2 = styled.div`
  width: 100%;
  margin: 150px 0 150px 0;
  @media screen and (max-width: 1024px) {
    margin: 100px 0 100px 0;
    background-position: top 700px right -400px;
    background-size: 80%;
  }

  @media screen and (max-width: 767px) {
    margin: 100px 0 100px 0;
    background-position: top 740px right -200px;
    background-size: 90%;
  }
`
export const Section21 = styled.div`
  position: absolute;
  right: 0;
  margin-top: -600px;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin-top: -300px;
  }
  @media screen and (max-width: 767px) {
    overflow: hidden;
    margin-top: -220px;
    & > * {
      margin-right: -150px;
    }
  }
`
export const Section2_Heading = styled.div`
  text-align: center;
  font-size: 16px;
  font-family: "Overpass";
  color: #636569;
  width: 40%;
  margin: 150px 30% 150px 30%;
  @media screen and (max-width: 1024px) {
    margin: 130px 30% 130px 30%;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 70px);
    margin: 100px 35px 100px 35px;
    font-size: 12px;
  }
`
export const VerticalWave = styled.div`
  background: url(${Wave6Img}) no-repeat center;
  background-size: contain;
  height: 300px;
`
export const Section3 = styled.div`
  width: 100%;
  background: url(${Wave4Img}) no-repeat;
  background-position: top 70px left;
  background-size: 25% 70%;
  margin: 150px 0 150px 0;
  @media screen and (max-width: 1024px) {
    margin: 100px 0 100px 0;
    background: url(${Wave41Img}) no-repeat;
  }
  @media screen and (max-width: 767px) {
    margin: 100px 0 100px 0;
    background: url(${Wave8Img}) no-repeat;
    background-position: top 170px left;
  }
`
export const Section3_Heading = styled.div`
  text-align: center;
  font-size: 37px;
  font-weight: bold;
  font-family: "Noto Sans KR";
  color: #231f20;
  width: 65%;
  margin: 150px auto 150px auto;
  @media screen and (max-width: 1024px) {
    width: 60%;
    margin: 130px auto 130px auto;
    font-size: 24px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 70px);
    margin: 100px 35px 100px 35px;
    font-size: 22px;
  }
`
export const Section4 = styled.div`
  width: 100%;
  background: url(${StarHalfImg}) no-repeat;
  background-position: top 370px right;
  margin: 150px 0 150px 0;
  @media screen and (max-width: 1024px) {
    margin: 100px 0 100px 0;
  }
  @media screen and (max-width: 767px) {
    background-position: top 550px right;
    background-size: 65px 130px;
    margin: 100px 0 100px 0;
  }
`
export const Section4_Heading = styled.div`
  text-align: center;
  font-size: 16px;
  font-family: "Overpass";
  color: #636569;
  width: 40%;
  margin: 150px 30% 150px 30%;
  @media screen and (max-width: 1024px) {
    margin: 130px auto 130px auto;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 70px);
    margin: 100px 35px 100px 35px;
    font-size: 12px;
  }
`
