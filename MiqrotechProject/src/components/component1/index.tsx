import React, { useState, useEffect } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import renderHTML from "react-render-html"
import VisibilitySensor from "react-visibility-sensor"
import Animate from "react-smooth"
import { convertImgUrl } from "./../../utils/imageKit"

import {
  Container,
  Sub1,
  Sub2,
  Sub1_1,
  Sub1_2,
  Sub2_1,
  Sub2_2,
  Desc,
  Detail,
  MobileLayout,
  DesktopLayout,
} from "./styles"
interface Props {
  desc: string
  smallImg: string
  bigImg: string
  heading: string
  action: string
  link: string
  containDetail: boolean
  descTop: boolean
}

export default function Component1({
  desc,
  smallImg,
  bigImg,
  heading,
  link,
  containDetail,
  descTop,
  action,
}: Props) {
  const [animateSmallImg, setAnimateSmallImg] = useState(false)
  const [loadedSmallImg, setLoadedSmallImg] = useState(false)
  const [animateBigImg, setAnimateBigImg] = useState(false)
  const [loadedBigImg, setLoadedBigImg] = useState(false)
  const steps = [
    {
      style: {
        opacity: 0.1,
      },
      duration: 400,
    },
    {
      style: {
        opacity: 1,
        transform: "translate(0, -56px)",
      },
      duration: 3000,
    },
  ]
  const onChangeSmallImg = (visible: boolean) => {
    if (visible && !loadedSmallImg) {
      setLoadedSmallImg(true)
      setAnimateSmallImg(true)
    }
  }
  const onChangeBigImg = (visible: boolean) => {
    if (visible && !loadedBigImg) {
      setLoadedBigImg(true)
      setAnimateBigImg(true)
    }
  }
  return (
    <Container>
      <Sub2>
        <VisibilitySensor
          onChange={visible => onChangeSmallImg(visible)}
          partialVisibility={true}
        >
          <Animate
            steps={steps}
            canBegin={animateSmallImg}
            onAnimationEnd={() => {
              setAnimateSmallImg(false)
            }}
          >
            <Sub2_1
              img={convertImgUrl(smallImg, false)}
              mobileImg={convertImgUrl(smallImg, true)}
            ></Sub2_1>
          </Animate>
        </VisibilitySensor>
        <Sub2_2>
          <MobileLayout>
            {!descTop ? <Desc>{renderHTML(desc)}</Desc> : null}
          </MobileLayout>
          <DesktopLayout>
            <Desc>{renderHTML(desc)}</Desc>
          </DesktopLayout>
          {containDetail ? (
            <Detail>
              <a href={link}>{renderHTML(action)}</a>
              <MdKeyboardArrowRight
                size={42}
                color="#636569"
              ></MdKeyboardArrowRight>
            </Detail>
          ) : null}
        </Sub2_2>
      </Sub2>
      <Sub1>
        <VisibilitySensor
          onChange={visible => onChangeBigImg(visible)}
          partialVisibility={true}
        >
          <Animate
            steps={steps}
            canBegin={animateBigImg}
            onAnimationEnd={() => {
              setAnimateBigImg(false)
            }}
          >
            <Sub1_2
              img={convertImgUrl(bigImg, false)}
              mobileImg={convertImgUrl(bigImg, true)}
            ></Sub1_2>
          </Animate>
        </VisibilitySensor>

        <MobileLayout>
          {descTop ? <Desc>{renderHTML(desc)}</Desc> : null}
        </MobileLayout>

        <Sub1_1>{renderHTML(heading)}</Sub1_1>
      </Sub1>
    </Container>
  )
}
