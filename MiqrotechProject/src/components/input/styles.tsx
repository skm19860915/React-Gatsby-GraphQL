import styled, { css } from "styled-components"
export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  /* height: 54px; */
  background-color: #efefef;
  padding: 19px 26px;
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
  & > input {
    color: #a0a1a4;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    @media screen and (max-width: 767px) {
      font-size: 10px;
      line-height: normal;
    }
  }
`
