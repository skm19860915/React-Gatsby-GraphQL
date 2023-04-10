import React from "react"
import styled from "styled-components"
import { FaMapMarkerAlt, FaUtensils } from "react-icons/fa"
import { MdClose } from "react-icons/md"
const K_SIZE = 40

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",

  cursor: "pointer",
}

const markerStyleHover = {
  ...markerStyle,
}

export default class Marker extends React.Component {
  static defaultProps = {}

  constructor(props: any) {
    super(props)
    this.state = {
      popoverOpen: false,
    }
  }

  render() {
    const style = this.props.$hover ? markerStyleHover : markerStyle

    return (
      <React.Fragment>
        <div
          style={markerStyle}
          onClick={() =>
            this.props.type !== "center" && this.setState({ popoverOpen: true })
          }
        >
          {this.props.type === "center" ? (
            <FaMapMarkerAlt size={40} color="green" />
          ) : this.props.type === "restaurant" ? (
            <FaUtensils size={24} color="#565656" />
          ) : null}
        </div>
        <Popover
          open={this.state.popoverOpen}
          onClose={() => this.setState({ popoverOpen: false })}
        ></Popover>
      </React.Fragment>
    )
  }
}

const PopoverContainer = styled.div`
  position: absolute;
  width: 200px;
  margin-left: -90px;
  background: white;
  border-top: 4px solid #443635;
  display: ${props => (props.open ? "block" : "none")};
  margin-top: -120px;
`
const PopoverImg = styled.div`
  background: #e2e2e2;
  width: 100%;
  height: 50px;
  display: flex;
`
const PopoverClose = styled.div`
  margin-left: auto;
  cursor: pointer;
  width: 16px;
  height: 16px;
`
const PopoverContent = styled.div`
  padding: 4px;
`
const Popover = ({
  name = "KUSH",
  address = "2003 N Miami Ave Miami, FL 33127",
  phone = "(305) 576 4500",
  rating = 4.5,
  onClose = () => {},
  open = 0,
}) => {
  return (
    <PopoverContainer open={open}>
      <PopoverImg>
        <PopoverClose onClick={() => onClose()}>
          <MdClose size={16} color="black" />
        </PopoverClose>
      </PopoverImg>
      <PopoverContent>
        <div>{name}</div>
        <div>{address}</div>
        <div>{phone}</div>
        <div>{rating}</div>
      </PopoverContent>
    </PopoverContainer>
  )
}
