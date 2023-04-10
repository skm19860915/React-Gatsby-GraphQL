import styled, { css } from "styled-components"
export const Container = styled.div`
  width: 1600px;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    width: 1000px;
  }

  @media screen and (max-width: 767px) {
    width: 600px;
  }

  svg {
    position: relative;
    left: -50px;
    // width: 200px;
    animation: wave 2s linear infinite;
  }
`
export const Wrapper = styled.div`
  overflow: hidden;
  width: 600px;
  height: 50px;
  margin-left: auto;
  margin-right: 0;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 50px;
    width: 300px;
  }

  @media screen and (max-width: 767px) {
    height: 39px;
    width: 250px;
  }
`
export const Wrapper1 = styled(Wrapper)`
  margin-left: auto;
  margin-right: -200px;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin-left: auto;
    margin-right: -60px;
  }
  @media screen and (max-width: 767px) {
    margin-left: auto;
    margin-right: -40px;
  }
`
export const Wrapper2 = styled(Wrapper)`
  margin-left: auto;
  margin-right: -200px;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin-left: auto;
    margin-right: -60px;
  }
  @media screen and (max-width: 767px) {
    margin-left: auto;
    margin-right: -20px;
  }
`
export const WaveComponent = styled.div`
  overflow: hidden;
`
