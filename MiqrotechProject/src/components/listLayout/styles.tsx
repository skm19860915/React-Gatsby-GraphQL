import styled, { css } from "styled-components"
import BackImg from "../../assets/img/unit.jpg"
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 0 150px;

  @media screen and (max-width: 1024px) {
    margin-top: 30px;
    padding: 0 60px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 35px;
  }
`

export const Unit = styled.div`
  width: calc(25% - 18px);
  margin-right: 24px;
  margin-bottom: 40px;
  &:nth-child(4n) {
    margin-right: 0;
  }
  @media screen and (max-width: 1024px) {
    width: calc(50% - 12px);
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`
export const Unit_Img = styled.div`
  width: 100%;
  cursor: pointer;
  background-color: white;
  & > * {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1024px) {
    height: 250px;
  }
  @media screen and (max-width: 767px) {
    height: 144px;
  }
`
interface UnitProps {
  selected: boolean
}
export const Unit_Name = styled.div<UnitProps>`
  font-family: "Overpass";
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 15px;
  text-align: left;
  color: ${props => (props.selected ? "#946a4d" : "rgba(0,0,0,0.8)")};
  @media screen and (max-width: 767px) {
    text-align: center;
  }
`
export const Unit_Rooms = styled.div<UnitProps>`
  font-size: 16px;
  font-family: "Overpass";
  font-weight: normal;
  text-align: left;
  color: ${props => (props.selected ? "#946a4d" : "rgba(0,0,0,0.8)")};

  @media screen and (max-width: 1024px) {
    text-align: left;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 12px;
  }
`
export const Unit_Footer = styled.div<UnitProps>`
  display: flex;
  line-height: 45px;
  color: ${props => (props.selected ? "#946a4d" : "rgba(0,0,0,0.8)")};

  @media screen and (max-width: 767px) {
    display: block;
  }
`
export const Unit_Detail = styled.div`
  margin-left: auto;
  font-family: "Overpass";
  display: flex;
  margin-right: 10px;

  justify-content: flex-end;
  cursor: pointer;
  &:hover {
    /* border-bottom: 1px solid #9ea1a7; */
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
    margin-right: -20px;
  }
`
export const Unit_Caret = styled.div``
