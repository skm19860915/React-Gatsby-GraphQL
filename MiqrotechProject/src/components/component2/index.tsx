import React from "react"
import renderHTML from "react-render-html"
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
import { MdKeyboardArrowRight } from "react-icons/md"

interface Props {
  desc: string
  smallImg: string
  bigImg: string
  action: string
  heading: string
  link: string
  containDetail: boolean
  descTop: boolean
}

export default function Component2({
  desc,
  smallImg,
  bigImg,
  heading,
  action,
  link,
  containDetail,
  descTop,
}: Props) {
  return (
    <Container>
      <Sub1>
        <Sub1_1>{renderHTML(heading)}</Sub1_1>
        <MobileLayout>
          {descTop ? <Desc>{renderHTML(desc)}</Desc> : null}
        </MobileLayout>
        <Sub1_2
          img={convertImgUrl(bigImg, false)}
          mobileImg={convertImgUrl(bigImg, true)}
        ></Sub1_2>
      </Sub1>
      <Sub2>
        <Sub2_1
          img={convertImgUrl(smallImg, false)}
          mobileImg={convertImgUrl(smallImg, true)}
        ></Sub2_1>
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
    </Container>
  )
}
