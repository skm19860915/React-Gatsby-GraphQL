import styled, { css } from "styled-components"
import BackImg from "../../assets/img/unit.jpg"
export const Container = styled.div`
  margin-top: 0px;
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 767px) {
  }
`
export const UnitImg = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 800px;
  /* background: url(${BackImg}) no-repeat center; */
  /* background-size: cover; */
  padding: 80px 150px 50px 150px;
  @media screen and (max-width: 1024px) {
    height: 500px;
    padding: 35px 60px;
  }
  @media screen and (max-width: 767px) {
    height: 500px;
    padding: 30px 35px;
  }
`
export const UnitImgBack = styled.div`
  width: 100%;
  height: 800px;
  left: 0;
  position: absolute;
  margin-top: -80px;
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1024px) {
    height: 500px;
    margin-top: -35px;
  }
  @media screen and (max-width: 767px) {
    height: 500px;
    margin-top: -30px;
  }
`
interface UnitImgProps {
  img: string
}
export const UnitImgSliderView = styled.div<UnitImgProps>`
  background: url(${props => props.img}) no-repeat center;
  background-size: 50%;
  width: 100%;
  height: 800px;

  @media screen and (max-width: 1024px) {
    height: 500px;
  }
`

export const UnitName = styled.div`
  font-family: "Noto Sans KR";
  font-size: 46px;
  font-weight: bold;
  color: #231f20;
  text-align: left;
  @media screen and (max-width: 1024px) {
    text-align: center;
    font-size: 32px;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 24px;
  }
`
export const UnitImgFooter = styled.div`
  font-family: "Overpass";
  font-size: 10px;
  color: white;
  text-align: left;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`
interface Props2 {
  active: boolean
}
export const UnitImgFooterItem = styled.div<Props2>`
  font-size: 10px;
  color: #231f20;
  cursor: pointer;
  margin-left: 20px;
  display: block;
  width: 65px;
  text-align: center;
  z-index: 9;
  border-bottom: ${props => (props.active ? "2px solid #231f20" : "")};
  &:hover {
    font-weight: bold;
    border-bottom: 2px solid #231f20;
  }
  &:first-child {
    margin-left: 0;
  }
  @media screen and (max-width: 1024px) {
    margin-left: 20px;
  }
`
export const InfoSection = styled.div`
  padding: 65px 150px;

  @media screen and (max-width: 1024px) {
    padding: 40px 60px;
  }
  @media screen and (max-width: 767px) {
    padding: 50px 35px;
  }
`
export const FirstSection = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media screen and (max-width: 1024px) {
    display: flex;
  }
  @media screen and (max-width: 767px) {
    display: block;
  }
`
export const FirstSection_1 = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 0;
  & > * {
    width: 50%;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    width: 50%;
    margin-bottom: 0;
  }
  @media screen and (max-width: 767px) {
    display: flex;
    width: 100%;
    margin-bottom: 50px;
  }
`
export const FirstSection_2 = styled.div`
  display: flex;
  width: 50%;
  @media screen and (max-width: 1024px) {
    display: block;
    width: 50%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
export const Button = styled.div`
  width: 300px;
  height: 75px;
  line-height: 75px;
  color: white;
  letter-spacing: 3px;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  border: 1px solid #946a4d;
  background-color: #946a4d;
  font-family: "Overpass";
  &:last-child {
    margin-left: 25px;
    margin-top: 0;
    @media screen and (max-width: 1024px) {
      margin-left: 0;
      margin-top: 15px;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 10px;
  }
  transition: all 200ms ease-out;
  &:hover {
    color: #946a4d;
    background-color: white;
  }
  @media screen and (max-width: 767px) {
    letter-spacing: 2px;
  }
`
interface InfoProps {
  name: string
}
export const Info = styled.div<InfoProps>`
  display: block;
  &:before {
    content: '${props => props.name}';
    font-size: 22px;
    font-weight: bold;
    font-family: "Overpass";
    text-align: left;
    color: #231f20;
    margin-bottom: 20px;
  }
  &>*:last-child{
    margin-top: 20px;
  }
  color: #231f20;
  font-size: 16px;
  font-family: "Overpass";
  font-weight: normal;

  @media screen and (max-width: 1024px) {
    &:before {
      font-size: 14px;
    }
    color: #636569;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    &:before {
      font-size: 14px;
    }
    color: #636569;
    font-size: 12px;
  }
`
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const AvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const AmenityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    width: 25%;
  }
  @media screen and (max-width: 767px) {
    & > * {
      width: 50%;
    }
  }
`
export const InfoItem = styled.div`
  text-align: left;
`

export const DesktopLayout = styled.div`
  display: block;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`
export const MobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
  }
`
interface SimilarUnitsProps {
  visible: boolean
}
export const SimilarUnits = styled.div<SimilarUnitsProps>`
  padding: 0 150px;
  display: ${props => (props.visible ? "block" : "none")};
  @media screen and (max-width: 1024px) {
    padding: 0 60px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 35px;
  }
`
export const SimilarUnits_Title = styled.div`
  font-family: "Noto Sans KR";
  font-size: 46px;
  font-weight: bold;
  color: #231f20;
  margin-top: 65px;
  margin-bottom: 60px;
  @media screen and (max-width: 1024px) {
    margin-top: 60px;
    margin-bottom: 40px;
    font-size: 32px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: bold;
  }
`
export const SimilarUnits_Table = styled.div`
  display: block;
`
export const SimilarUnits_Header = styled.div`
  display: flex;
  flex-direction: row;
`
export const HeaderItem = styled.div`
  width: 16.6%;
  font-size: 16px;
  font-weight: bold;
  font-family: "Overpass";
  color: #231f20;
  line-height: 100px;
`
export const SimilarUnits_Content = styled.div`
  display: block;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
  }
`
export const SimilarItem = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1024px) {
    display: block;
    width: 49%;
    margin-bottom: 50px;
    &:nth-child(2n) {
      margin-left: 2%;
      @media screen and (max-width: 767px) {
        margin-left: 0;
      }
    }
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    display: block;
    margin-left: 0;
  }
`
export const SimilarItemCaret = styled.div`
  position: absolute;
  line-height: 100px;
  right: 150px;
`
export const SimilarItemInfo = styled.div`
  width: 16.6%;
  border-top: 1px solid #231f20;
  height: 100px;
  line-height: 100px;
  font-size: 16px;
  font-family: "Overpass";
  text-align: left;
`
export const SimilarItemUnit = styled.div`
  font-family: "Overpass";
  font-size: 14px;
  color: #231f20;
  line-height: 24px;
  border-bottom: 1px solid #636569;
  margin-bottom: 10px;
`

export const SimilarMobileItemInfo = styled.div`
  font-size: 12px;
  line-height: 24px;
  font-family: "Overpass";
  color: #231f20;
`
export const TabletLayout = styled.div`
  display: none;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    display: block;
  }
`
export const NonTabletLayout = styled.div`
  display: block;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    display: none;
  }
`
export const TabletDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`
export const TabletDetail = styled.div`
  font-family: Overpass;
  font-size: 12px;
  color: #231f20;
  padding: 0px 45px;
  line-height: 45px;
  border-right: 1px solid #707070;
  &:last-child {
    border: none;
    &:after {
      border: none;
    }
  }
  &:after {
    @media screen and (max-width: 767px) {
      content: " ";
      border-bottom: 1px solid #707070;
      height: 1px;
      width: 25px;
      display: block;
      margin: auto;
    }
  }
  @media screen and (max-width: 767px) {
    border: none;
    text-align: center;
  }
`
export const TabletDesc = styled.div`
  margin: 30px auto 30px auto;
  font-size: 12px;
  text-align: center;
  color: #636569;
  font-family: "Overpass";
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    width: 640px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 12px;
    line-height: 24px;
  }
`
export const TabletButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    width: 315px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
