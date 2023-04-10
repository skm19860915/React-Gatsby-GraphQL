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
interface Props {
  width: number
}
export const Wrapper = styled.div<Props>`
  overflow: hidden;
  width: ${props => props.width}px;
  margin-left: auto;
  margin-right: 0;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 50px;
    width: ${props => props.width}px;
  }

  @media screen and (max-width: 767px) {
    height: 25px;
    width: ${props => props.width}px;
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
  margin-right: -100px;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin-left: auto;
    margin-right: -30px;
  }
  @media screen and (max-width: 767px) {
    margin-left: auto;
    margin-right: -20px;
  }
`
export const WaveComponent = styled.div`
  overflow: hidden;
`
