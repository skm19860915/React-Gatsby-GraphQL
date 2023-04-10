import styled, { css, Link } from "styled-components"
import Wave6Img from "../assets/img/wave6.png"

export const Home = styled.div`
  overflow: auto;
  background-color: white;
`

export const Desc = styled.div`
  padding: 160px 150px 0px 150px;
  display: flex;
  @media screen and (max-width: 1024px) {
    padding: 90px 60px 0 60px;
    display: flex;
  }

  @media screen and (max-width: 767px) {
    display: block;
    padding: 75px 35px 0 35px;
  }
`
export const Big = styled.div`
  font-family: "Noto Sans KR";
  font-size: 46px;
  font-weight: bold;
  text-align: left;
  width: 45%;
  margin-right: 5%;
  @media screen and (max-width: 1024px) {
    font-size: 24px;
    margin-right: 5%;
    width: 45%;
  }

  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 33px;
    width: 100%;
  }
`
export const Small = styled.div`
  font-family: "Overpass";
  font-size: 16px;
  width: 50%;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
    margin-top: 0;
    width: 50%;
  }

  @media screen and (max-width: 767px) {
    margin-top: 50px;
    font-size: 12px;
    line-height: 24px;
    width: 100%;
  }
`
export const Section1 = styled.div`
  padding: 100px 0;
  background: white;
  @media screen and (max-width: 1024px) {
    padding: 100px 0;
  }

  @media screen and (max-width: 767px) {
    padding: 100px 0;
  }
`
export const Wave = styled.div`
  opacity: 0.75;
  background: url(${Wave6Img}) no-repeat center;
  height: 300px;
  width: 100%;
  background-size: contain;
`
export const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 122px);
  box-shadow: 0px 0px 2000px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 1024px) {
    height: calc(100vh - 74px);
  }
  @media screen and (max-width: 767px) {
    height: calc(100vh - 80px);
  }
`
export const WalkScore = styled.div`
  margin: 10px auto 10px auto;
`
export const WalkScore_Title = styled.div`
  font-family: "Noto Sans KR";
  font-size: 30px;
  font-weight: bold;
  color: #636569;
  text-align: center;
`
export const WalkScore_Score = styled.div`
  line-height: 144px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  text-align: center;
  color: #946a4d;
  font-size: 70px;
  display: flex;
  justify-content: center;
  height: 150px;
  margin-top: 40px;
  margin-bottom: 40px;
  .wrapper {
    margin: 50px;
    overflow: hidden;
    position: relative;
  }

  .right {
    border: #946a4d solid 3px;
    height: 150px;
    width: 150px;
    border-radius: 120px;
    border-top-color: transparent;
    border-left-color: transparent;
    position: absolute;
    transform: rotate(-45deg);
    animation: rota2 1000ms linear;
    -moz-animation: rota2 1000ms linear;
    -o-animation: rota2 1000ms linear;
    -webkit-animation: rota2 1000ms linear;
  }

  @keyframes rota2 {
    from {
      transform: rotate(-225deg);
    }
    to {
      transform: rotate(-45deg);
    }
  }
  .left {
    border: #946a4d solid 3px;
    height: 150px;
    width: 150px;
    border-radius: 120px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    position: absolute;
    transform: rotate(315deg);
    animation: rota 2000ms linear;
    -o-animation: rota 2000ms linear;
    -moz-animation: rota 2000ms linear;
    -webkit-animation: rota 2000ms linear;
  }
  @keyframes rota {
    from {
      transform: rotate(-45deg);
    }
    to {
      transform: rotate(315deg);
    }
  }

  .middle {
    color: #946a4d;
    font-size: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    position: relative;
    z-index: 4;
  }

  .popover {
    background: white;
    width: 80px;
    height: 162px;
    position: absolute;
    top: -3px;
    left: -3px;
    opacity: 0;
    z-index: 2;
    animation: popover 1000ms linear;
    -moz-animation: popover 1000ms linear;
    -o-animation: popover 1000ms linear;
    -webkit-animation: popover 1000ms linear;
  }

  @keyframes popover {
    0% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes popover {
    0% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes popover {
    0% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes popover {
    0% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
export const WalkScore_Desc = styled.div`
  font-size: 16px;
  font-family: "Overpass";
  text-align: center;
  color: #636569;
  width: 582px;
  margin: 0 auto 42px auto;
  @media screen and (max-width: 1024px) {
    width: 418px;
    font-size: 12px;
  }

  @media screen and (max-width: 767px) {
    padding: 0 35px;
    width: calc(100% - 70px);
    font-family: "Overpass";
    font-size: 12px;
  }
`
export const WalkScore_Learn = styled.div`
  color: #443635;
  margin: 0 auto;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  width: fit-content;
  font-family: "Overpass";
  a {
    color: #443635;
    &:hover {
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
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
export const ScoresContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`
export const ScoreWrapper = styled.div`
  margin: 0 20px;
`
