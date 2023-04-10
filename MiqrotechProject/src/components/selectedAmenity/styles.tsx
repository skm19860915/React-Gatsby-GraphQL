import styled, { css } from "styled-components"
import SymbolImg from "../../assets/img/star_circle.png"
import StarImg from "../../assets/img/star.png"
export const Container = styled.div`
  font-family: "Overpass";
  padding: 0px 150px;
  display: block;
  padding: 0;
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 767px) {
    display: block;
    padding: 0;
  }
`
export const Header = styled.div`
  background-color: #d3d3d5;
  padding: 50px 100px 10px 100px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    padding: 45px 100px 5px 100px;
    background-color: #d3d3d5;
  }
  @media screen and (max-width: 767px) {
    padding: 20px 35px 10px 35px;
    background-color: white;
  }
`
export const Symbol = styled.div<ImgProps>`
  width: 105px;
  height: 105px;
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
`
export const Title = styled.div`
  font-family: "Noto Sans KR";
  font-size: 30px;
  font-weight: bold;
  line-height: 105px;
  margin-left: 30px;
  color: #231f20;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
    line-height: 60px;
  }
`
export const Desc = styled.div`
  font-family: "Overpass";
  font-size: 16px;
  color: #636569;
  text-align: left;
  padding: 0 120px 30px 235px;
  width: 100%;
  background-color: #d3d3d5;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    background: white;
    font-size: 12px;
    padding: 0px 35px 15px 35px;
  }
`
export const ImgContainer = styled.div`
  display: flex;
  background-color: #d3d3d5;
  margin-top: -1px;
  padding: 0 100px;
  width: 100%;
  background: linear-gradient(#d3d3d5, white);
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 767px) {
    padding: 0px;
  }
`
interface ImgProps {
  url: string
}
export const Img1 = styled.div<ImgProps>`
  width: 50%;
  height: 450px;
  background-color: #636569;
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 1024px) {
    height: 315px;
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    height: 205px;
    width: 100%;
  }
`
export const Img2 = styled.div<ImgProps>`
  margin-left: 15px;
  width: 50%;
  height: 450px;
  background-color: #636569;
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  box-shadow: 0px 10px 7px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`
export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  /* display: grid; */
  padding: 0;
  @media screen and (max-width: 1024px) {
    /* display: grid; */
    padding: 0;
    margin-bottom: 30px;
  }
`
interface AmenityProps {
  active: boolean
  icon: string
}
export const Amenity = styled.div<AmenityProps>`
  &::before {
    content: "";
    position: absolute;
    width: 55px;
    height: 55px;
    background: url(${props => props.icon}) no-repeat left;
    background-size: cover;
    margin-left: -70px;
    @media screen and (max-width: 767px) {
      width: 35px;
      height: 35px;
      margin-left: -55px;
    }
  }
  padding-left: 70px;
  line-height: 55px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Sans KR";
  cursor: pointer;
  width: calc(50% - 150px);
  opacity: ${props => (props.active ? 0.7 : 1)};
  &:hover {
    opacity: 0.7;
  }
  transition: all 0.3s ease;
  margin-left: 120px;
  margin-top: 30px;
  margin-bottom: 5px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    padding-left: 55px;
    margin-top: 30px;
    margin-bottom: 10px;
    line-height: 35px;
    font-size: 14px;
    margin-left: 35px;
  }
`
export const DesktopLayout = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`
export const MobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    width: 100%;
    display: block;
  }
`
export const SlideView = styled.div<ImgProps>`
  background: url(${props => props.url}) no-repeat center;
  width: 100%;
  @media screen and (max-width: 1024px) {
    height: 315px;
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    height: 205px;
    width: 100%;
  }
`
