import styled, { css } from "styled-components"
import BackImg from "../../assets/img/building.png"

export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  flex-direction: column;
  justify-content: center;
  background: url(${BackImg}) no-repeat center;
  background-size: 0 0;
  width: 50%;
  height: 100%;
  margin-right: 150px;
  & > *:first-child {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`
interface PopupProps {
  id: string
}
export const Popup2 = styled.div<PopupProps>`
  position: absolute;
  z-index: 999;
  display: none;
  width: 100px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 18px;
  /* border: 1px solid #707070; */
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
`
