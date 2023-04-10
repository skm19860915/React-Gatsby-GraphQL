import styled, { css } from "styled-components"
export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  height: 100%;
  width: 100%;
  background-color: #efefef;
  padding: 19px 26px;
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    padding: 10px;
    height: 200px;
  }
  & > textarea {
    color: #a0a1a4;
    width: calc(100% - 52px);
    height: calc(100% - 38px);
    background: transparent;
    outline: none;
    border: none;
    @media screen and (max-width: 767px) {
      font-size: 10px;
      line-height: 16px;
      width: auto;
      height: 180px;
    }
  }
`
