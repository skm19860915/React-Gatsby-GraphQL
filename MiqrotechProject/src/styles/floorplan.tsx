import styled, { css, Link } from "styled-components"

export const Home = styled.div`
  overflow: auto;
  background-color: white;
`
export const ViewButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 72px;
  margin-bottom: 45px;
  @media screen and (max-width: 1024px) {
    padding: 0 60px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 35px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
`
interface ViewButtonProps {
  active: boolean
}
export const ViewButton = styled.div<ViewButtonProps>`
  width: 300px;
  height: 75px;
  line-height: 75px;
  background-color: ${props => (props.active ? "#946a4d" : "white")};
  border: ${props =>
    props.active ? "1px solid #946a4d" : "1px solid #636569"};
  color: ${props => (props.active ? "white" : "#231F20")};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  font-family: "Overpass";
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  /* &:hover {
    color: ${props => (props.active ? "#946a4d" : "white")};
    background-color: ${props => (props.active ? "white" : "#231F20")};
  } */
  &:last-child {
    margin-left: 30px;
    @media screen and (max-width: 1024px) {
      margin-left: 16px;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 50%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
    letter-spacing: 2px;
  }
`
export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto 100px auto;
  width: fit-content;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: auto;
    margin: 0 60px 60px 60px;
  }
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    margin: 0 35px 35px 35px;
  }
`
export const Container3 = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 45px;
  }
`
export const Container2 = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1024px) {
    /* flex-direction: column; */
    flex-direction: row-reverse;
  }
`
export const Container1 = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
export const Bedrooms = styled.div`
  display: block;
  width: 30vw;
  font-family: "Overpass";
  margin-bottom: 5px;
  &:before {
    content: "BEDROOMS";
    font-size: 10px;
    color: #231f20;
    text-transform: uppercase;
    font-family: "Overpass";
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`
export const BedroomsContainer = styled.div`
  display: flex;
  & > *:last-child {
    margin-right: 0;
  }
  font-size: 20px;
  @media screen and (max-width: 1024px) {
    margin: 0 0 25px 0;
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    margin: 0 0 25px 0;
    font-size: 12px;
  }
`
interface Bedrooms1Props {
  active: boolean
}
export const Bedrooms_1 = styled.div<Bedrooms1Props>`
  width: calc(25% - 14px);
  margin-right: 18px;
  text-align: center;
  height: 50px;
  color: ${props => (props.active ? "white" : "#231f20")};
  line-height: 50px;
  border: 1px solid #707070;
  background-color: ${props => (props.active ? "#946a4d" : "white")};
  cursor: pointer;
  text-transform: uppercase;
  transition: all 200ms ease-in-out;

  &:hover {
    color: white;
    background-color: #946a4d;
  }
  @media screen and (max-width: 767px) {
    margin-right: 8px;
    width: calc(25% - 6px);
  }
`
export const Bedrooms_2 = styled.div`
  width: calc(25% - 14px);
  margin-right: 18px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: 1px solid #946a4d;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 200ms ease-in-out;
  background-color: white;

  color: #946a4d;
  &:hover {
    color: white;
    background-color: #946a4d;
  }
`
export const Availability = styled.div`
  margin-left: 5vw;
  width: 10vw;
  &:before {
    content: "AVAILABILITY";
    font-size: 10px;
    color: #231f20;
    text-transform: uppercase;
    font-family: "Overpass";
  }
  @media screen and (max-width: 1024px) {
    margin-left: 2%;
    width: 49%;
  }
`
export const RentRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & > :first-child {
    margin-right: 20px;
    @media screen and (max-width: 767px) {
      margin-right: 6px;
    }
  }
`
export const RentRange = styled.div`
  margin-left: 5vw;
  width: 13vw;
  &:before {
    content: "RENT RANGE";
    font-size: 10px;
    color: #231f20;
    text-transform: uppercase;
    font-family: "Overpass";
  }
  @media screen and (max-width: 1024px) {
    margin-left: 0;
    width: 49%;
  }
`

export const Floor = styled.div`
  display: none;
  margin-left: 5vw;
  width: 4vw;
  &:before {
    content: "FLOOR";
    font-size: 10px;
    color: #231f20;
    text-transform: uppercase;
    font-family: "Overpass";
  }
  @media screen and (max-width: 1024px) {
    display: block;
    width: 100%;
    margin: 0 0 25px 0;
  }
`
export const ResetFilter = styled.div`
  margin-left: 5vw;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-weight: bold;
  color: #231f20;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  padding-top: 27px;
  min-width: fit-content;
  letter-spacing: 5px;
  &:hover {
    /* box-shadow: 10px 3px 5px rgba(0, 0, 0, 0.4); */
  }
  @media screen and (max-width: 1024px) {
    padding-top: 0;
  }
  @media screen and (max-width: 767px) {
    padding-top: 0;
    font-size: 12px;
    letter-spacing: 2px;
  }
`
export const BuildingLayout = styled.div`
  display: flex;
  height: 700px;
  padding-left: 150px;
  padding-right: 150px;
  @media screen and (max-width: 1024px) {
    padding-left: 60px;
    padding-right: 60px;
    height: 700px;
  }
  @media screen and (max-width: 767px) {
    padding-left: 35px;
    padding-right: 35px;
    height: 600px;
    margin-bottom: 20px;
  }
`
export const BuildingViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    /* flex-direction: column-reverse; */
  }
`
export const ListViewLayout = styled.div`
  display: block;
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
export const BuildingDesktopLayout = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
export const BuildingMobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`
