import styled, { css, Link } from "styled-components"

export const Home = styled.div`
  overflow: auto;
  background-color: white;
`
export const Info = styled.div`
  display: flex;
  margin: 100px 150px;
  text-align: left;
  @media screen and (max-width: 1024px) {
    margin: 100px 60px;
    text-align: left;
    flex-direction: row;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    margin: 45px 0 75px 0;
    flex-direction: column-reverse;
  }
`
interface MapProps {
  img: string
}
export const MapContainer = styled.div<MapProps>`
  width: 50%;
  background-color: #9ea1a7;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  .leaflet-control-attribution.leaflet-control {
    display: none;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 315px;
    margin-top: 65px;
  }
`

export const Info_Content = styled.div`
  width: 50%;
  margin-left: 80px;
  @media screen and (max-width: 1024px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 767px) {
    margin-left: 0;
    padding: 0 35px;
    width: 100%;
  }
`

export const Info_Content_Heading = styled.div`
  font-family: "Noto Sans KR";
  font-size: 36px;
  font-weight: bold;
  color: #231f20;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
`
export const Address = styled.div`
  margin: 40px 0;
  font-size: 16px;
  font-family: "Overpass";
  line-height: 30px;
  color: #231f20;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
    line-height: 24px;
    margin: 20px 0;
  }
`
export const EmailUS = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  font-family: "Overpass";
  text-decoration: underline;
  color: #946a4d;
  cursor: pointer;
  a {
    color: #946a4d;
  }
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
`
export const Socials = styled.div`
  display: flex;
  color: #946a4d;
  margin: 30px 0 0 0;
  justify-content: start;
  a {
    color: #946a4d;
  }
  & > *:last-child {
    margin-left: 70px;
  }
  @media screen and (max-width: 1024px) {
    margin: 20px 0 0 0;
  }
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
  }
`
export const Divider = styled.div`
  width: 100%;
  height: 10px;
  margin: 60px 0;
  border-bottom: 1px solid #707070;
  @media screen and (max-width: 1024px) {
    margin: 30px 0;
  }
`
export const Question = styled.div`
  display: block;
  margin: 120px 150px 95px 150px;
  @media screen and (max-width: 1024px) {
    margin: 100px 60px;
  }
  @media screen and (max-width: 767px) {
    margin: 75px 35px 100px 35px;
  }
`
export const Question_Heading = styled.div`
  text-align: left;
  font-family: "Noto Sans KR";
  color: #231f20;
  font-size: 46px;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    font-size: 32px;
  }
  @media screen and (max-width: 767px) {
    font-size: 24px;
    text-align: center;
  }
`
export const Question_Content = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
`
export const Question_Footer = styled.div`
  display: flex;
  flex-direction: end;
  justify-content: flex-end;
  margin-top: 30px;
  @media screen and (max-width: 1024px) {
    margin-top: 16px;
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`
export const Question_Input = styled.div`
  width: calc(50% - 15px);
  margin: 0 30px 30px 0;
  display: flex;
  &:nth-child(2n) {
    margin-right: 0;
  }
  & > * :first-child {
    width: 100%;
  }
  &:after {
    width: 12px;
    content: "*";
    color: red;
    text-align: right;
  }
  @media screen and (max-width: 1024px) {
    margin: 0 16px 16px 0;
    width: calc(50% - 8px);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0 0 16px 0;
    /* height: 40px; */
  }
`
export const Question_Submit = styled.button`
  width: 300px;
  height: 75px;
  background-color: #946a4d;
  border: 1px solid #946a4d;
  color: white;
  font-family: "Overpass";
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 75px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  letter-spacing: 4px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #946a4d;
  }
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 50px;
    text-align: center;
    font-size: 10px;
    font-family: "Overpass";
    letter-spacing: 3px;
    line-height: 50px;
  }
  @media screen and (max-width: 767px) {
    width: 220px;
    height: 50px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 3px;
    line-height: 50px;
  }
`
export const Direction = styled.a`
  text-transform: uppercase;
  color: #946a4d;
  font-family: "Overpass";
  &:hover {
    color: #946a4d;
    text-decoration: none;
  }
`
