import styled, { css } from "styled-components"

export const Container = styled.div`
  display: flex;
  font-family: "Noto Sans KR";
  font-size: 30px;
  font-weight: bold;
  justify-content: space-between;
  border-bottom: 1px solid #707070;
  padding-bottom: 15px;
  width: calc(50% - 150px);
  margin-left: auto;
  margin-right: 150px;
  margin-top: 20px;
  @media screen and (max-width: 1024px) {
    margin-left: 60px;
    margin-right: 60px;
    width: calc(100% - 120px);
    padding-bottom: 17px;
  }
  @media screen and (max-width: 767px) {
    margin-left: 35px;
    margin-right: 35px;
    padding-bottom: 0px;
    width: calc(100% - 70px);
  }
`
export const Floor = styled.div`
  font-size: 30px;
  text-align: left;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`
export const Available = styled.div`
  font-size: 20px;
  line-height: 45px;
  text-align: right;
  color: #946a4d;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`
