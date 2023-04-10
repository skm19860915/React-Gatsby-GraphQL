import React from "react"
import renderHTML from "react-render-html"
import styled from "styled-components"
import "./styles.scss"
import Wave2 from "../wave2"
import { convertImgUrl } from "./../../utils/imageKit"

interface IProps {
  img: string
  mobileImg: string
}
const PrefooterSection = styled.div<IProps>`
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  margin-top: 90px;
  width: 100%;
  height: 600px;
  padding-top: 150px;
  padding-left: 65%;
  display: block;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    display: block;
    padding-left: 140px;
    height: 458px;
    padding-top: 250px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 80px;
    padding-left: 0;
    padding-top: 130px;
    display: flex;
    justify-content: center;
    height: 263px;
    background: url(${props => props.mobileImg}) no-repeat center;
    background-size: cover;
  }
`
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 600px;
  margin-top: -150px;
  background: linear-gradient(to bottom, #ffffffaa, #ffffffff);
  left: 0;
  z-index: 0;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 458px;
    margin-top: -250px;
  }
  @media screen and (max-width: 767px) {
    margin-top: -130px;
    height: 263px;
  }
`
interface ImageProps {
  img: string
  mobileImg: string
}
const Image = styled.div<ImageProps>`
  background-size: cover;
  width: 50%;
  height: 596px;
  left: 8%;
  z-index: 9;
  position: absolute;
  box-shadow: 2px 10px 15px rgba(0, 0, 0, 0.26);
  background: ${props => `url(${props.img}) no-repeat center`};
  background-size: cover;
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 300px;
    width: 60%;
    left: 20%;
  }
  @media screen and (max-width: 767px) {
    height: 190px;
    left: 35px;
    width: calc(100% - 70px);
    background: ${props => `url(${props.mobileImg}) no-repeat center`};
    background-size: cover;
  }
`
interface Props {
  img: string
  headline: string
  action: string
  link: string
  backImg: string
}
export default function PreFooter({
  img,
  headline,
  action,
  link,
  backImg,
}: Props) {
  return (
    <div className="prefooter">
      <Image
        img={convertImgUrl(img, false)}
        mobileImg={convertImgUrl(img, true)}
      />
      <div className="prefooter-section-1" style={{}}></div>
      <PrefooterSection
        img={convertImgUrl(backImg, false)}
        mobileImg={convertImgUrl(backImg, true)}
      >
        <Overlay></Overlay>
        <div className="prefooter-section-2-1">
          <div className="prefooter-section-2-text">{renderHTML(headline)}</div>
          <div className="prefooter-section-2-CTA">
            <a href={link}>{renderHTML(action)}</a>
          </div>
        </div>
        <div className="prefooter-section-2-wave">
          <Wave2 />
        </div>
      </PrefooterSection>
    </div>
  )
}
