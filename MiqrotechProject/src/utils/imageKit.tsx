import React, { useState, useEffect } from "react"

import Url from "url-parse"
interface Props {
  img: string
  isMobile: boolean
}

function convertImgUrl(img, isMobile) {
  let url = new Url(img)

  return `https://ik.imagekit.io/amcodigital${
    isMobile ? "/tr:w-300/" : "/"
  }${url.pathname
    .split("/")
    .slice(url.pathname.split("/").findIndex(d => d == "amcocmsassets") + 1)
    .join("/")}`
}
export { convertImgUrl }
