import styled, { css } from "styled-components"
export const Container = styled.div`
  font-family: "Overpass";
  font-size: 16px;

  height: 820px;
  margin-bottom: 100px;

  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    height: 680px;
  }
`
export const Background = styled.div`
  width: 100%;
`

export const Gray = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(white, #9ea1a7);
  @media screen and (max-width: 1024px) {
    height: 400px;
  }
  @media screen and (max-width: 767px) {
    height: 270px;
  }
`
export const White = styled.div`
  height: 320px;
  width: 100%;
  background-color: white;
  @media screen and (max-width: 1024px) {
    height: 420px;
  }
  @media screen and (max-width: 767px) {
    height: 370px;
  }
`
export const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  margin-left: 150px;
  width: calc(100vw - 300px);
  margin-top: 200px;
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    margin-left: 120px;
    width: calc(100vw - 240px);
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    margin-left: 35px;
    margin-top: 180px;
    width: calc(100vw - 70px);
  }
`
export const MainContent = styled.div`
  width: 35%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    margin-right: 0;
    width: 100%;
  }
`
export const Desc = styled.div`
  font-size: 16px;
  font-family: "Overpass";
  color: #636569;
  text-align: left;
  margin-top: auto;
  margin-bottom: 35px;
  @media screen and (max-width: 1024px) {
    font-size: 12px;
    width: 100%;
    text-align: center;
    margin-top: 85px;
    margin-bottom: 55px;
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
    text-align: center;
    width: 100%;
    margin-top: 50px;
    line-height: 24px;
    margin-bottom: 50px;
  }
`

export const Button = styled.div`
  width: 300px;
  height: 75px;
  line-height: 75px;
  font-size: 16px;
  font-weight: bold;
  font-family: "Overpass";
  color: white;
  text-align: center;
  background-color: #946a4d;
  border: 1px solid #946a4d;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #946a4d;
  }
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
    width: 220px;
    height: 50px;
    line-height: 50px;
  }
`
export const Img = styled.div`
  height: 600px;
  width: 60%;
  background-color: #636569;
  margin-top: auto;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 370px;
    margin: 0;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 190px;
  }
`
