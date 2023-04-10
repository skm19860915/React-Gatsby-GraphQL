import styled, { css } from "styled-components"
export const Container = styled.div`
  height: 300px;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    /* height: 250px; */
  }

  @media screen and (max-width: 767px) {
  }

  svg {
    position: relative;
    top: 0px;
    animation: wave2 2s linear infinite;
  }
`
export const Wrapper = styled.div`
  overflow: hidden;
  width: 60px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    width: 40px;
    height: 240px;
  }

  @media screen and (max-width: 767px) {
    width: 30px;
    height: 160px;
  }
`
export const WaveComponent = styled.div`
  overflow: hidden;
`
