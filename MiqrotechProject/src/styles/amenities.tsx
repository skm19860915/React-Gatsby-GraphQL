import styled, { css } from "styled-components"

export const Home = styled.div`
  overflow: auto;
  background-color: white;
`
export const Section1 = styled.div`
  background: linear-gradient(rgba(158, 161, 167, 0.6), white);
  /* background: url("../assets/img/amenity.png") no-repeat top right; */
  padding-top: 342px;
  font-family: "Overpass";

  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 767px) {
    padding-top: 180px;
  }
`
export const Desc = styled.div`
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 46px;
  text-align: center;
  margin: 128px auto 28px auto;
  width: 75%;
  @media screen and (max-width: 1024px) {
    font-size: 24px;
    margin: 50px auto 0px auto;
  }

  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 33px;
    font-family: "Noto Sans KR";
    font-weight: bold;
    margin: 16px auto 0px auto;
  }
`
export const Section2 = styled.div`
  height: 605px;
  & > *:first-child {
    /* position: absolute; */
  }
  @media screen and (max-width: 1024px) {
    height: 705px;
  }
  @media screen and (max-width: 767px) {
    height: 565px;
  }
`
