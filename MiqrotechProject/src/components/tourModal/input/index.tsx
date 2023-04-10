import React from "react"
import styled from "styled-components"

interface Props {
  placeholder: string
  value: string
  name: string
  onChange: any
}
export const Container = styled.div`
  display: flex;
  font-family: "Overpass";
  /* height: 54px; */
  background-color: #efefef;
  padding: 0 8px;
  width: 440px;
  height: 45px;
  border: 1px solid #707070;
  margin-bottom: 10px;
  @media screen and (max-width: 1024px) {
    height: 40px;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
    padding: 2px 8px;
    width: 100%;
  }
  & > input {
    color: #121212;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    margin-top: auto;
    margin-bottom: auto;
    @media screen and (max-width: 767px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
`

export default function Input({ placeholder, value, onChange, name }: Props) {
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
