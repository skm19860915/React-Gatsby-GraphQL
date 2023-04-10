import React from "react"
import { MdClose } from "react-icons/md"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import ReactModal from "react-modal"
import { MenuItems } from "../../utils/variables"

import { Container } from "./styles"
import { url } from "inspector"
interface Props {
  placeholder: string
  value: string
  name: string
  onChange: any
}

export default function TextArea({
  placeholder,
  value,
  onChange,
  name,
}: Props) {
  return (
    <Container>
      <textarea
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={e => onChange(e.target.value)}
      ></textarea>
    </Container>
  )
}
