import React from "react"
import { MdClose } from "react-icons/md"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import ReactModal from "react-modal"
import { MenuItems } from "../../utils/variables"

import { Container, Sub1, Sub2, Sub1_1, Sub1_2, Sub2_1, Sub2_2 } from "./styles"
import { url } from "inspector"
interface Props {
  placeholder: string
  value: string
  name: string
  onChange: any
}

export default function Input({ placeholder, value, name, onChange }: Props) {
  return (
    <Container>
      <input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={e => {
          onChange(e.target.value)
        }}
      ></input>
    </Container>
  )
}
