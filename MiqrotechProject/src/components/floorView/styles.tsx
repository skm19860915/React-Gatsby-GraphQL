import styled, { css } from "styled-components"
interface Props {}

export const Container = styled.div`
  font-family: "Overpass";
  display: flex;
  flex-direction: column;
  width: 50%;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
export const FloorImg = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding-top: 50px;
  display: flex;
  justify-content: center;
  & > div {
    width: 480px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 0;
    height: 100%;
    & > svg {
      width: 300px;
    }
  }
`
export const Footer = styled.div`
  margin-top: auto;
  margin-left: 50px;
  margin-right: 50px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    margin-left: 150px;
    margin-right: 150px;
  }
  @media screen and (max-width: 767px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`
export const Selected = styled.div`
  &:before {
    content: " ";
    width: 20px;
    height: 20px;
    background-color: #443635;
    position: absolute;
    margin-left: -30px;
  }
  padding-left: 35px;
  font-size: 15px;
  line-height: 20px;
  font-family: "Overpass";
  text-transform: uppercase;
  color: #231f20;
  @media screen and (max-width: 767px) {
    &:before {
      width: 15px;
      height: 15px;
      margin-left: -25px;
    }
    padding-left: 25px;
    line-height: 15px;
    font-size: 9px;
  }
`
export const Available = styled.div`
  &:before {
    content: " ";
    width: 20px;
    height: 20px;
    background-color: #946a4d;
    position: absolute;
    margin-left: -30px;
  }
  padding-left: 35px;

  font-size: 15px;
  line-height: 20px;
  font-family: "Overpass";
  text-transform: uppercase;
  color: #231f20;

  @media screen and (max-width: 767px) {
    &:before {
      width: 15px;
      height: 15px;
      margin-left: -25px;
    }
    padding-left: 25px;
    line-height: 15px;
    font-size: 9px;
  }
`
export const Unavailable = styled.div`
  &:before {
    content: " ";
    width: 20px;
    height: 20px;
    background-color: white;
    border: 1px solid #707070;
    position: absolute;
    margin-left: -30px;
  }
  padding-left: 35px;

  font-size: 15px;
  line-height: 20px;
  font-family: "Overpass";
  text-transform: uppercase;
  color: #231f20;
  @media screen and (max-width: 767px) {
    &:before {
      width: 15px;
      height: 15px;
      margin-left: -25px;
    }
    padding-left: 25px;
    line-height: 15px;
    font-size: 9px;
  }
`
interface PopupProps {
  id: string
}
export const Popup = styled.div<PopupProps>`
  position: absolute;
  z-index: 999;
  display: none;
  width: 100px;
  line-height: 20px;
  background-color: white;
  /* border: 1px solid #707070; */
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  padding: 10px 0 10px 10px;
  font-size: 12px;
`
