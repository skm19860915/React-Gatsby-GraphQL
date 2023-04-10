import React from "react"
import { MdUnfoldMore } from "react-icons/md"
import "./styles.scss"
interface IProps {
  list: Array<any>
  placeholder: string
  current: any
  onChooseItem: (item: any) => void
}
interface IState {
  isOpen: boolean
  labelItem: any
  typeDropdown: any
}
export default class Dropdown extends React.Component<IProps, IState> {
  state: IState = {
    isOpen: false,
    labelItem: null,
    typeDropdown: null,
  }

  constructor(props: any) {
    super(props)
  }

  componentWillMount() {
    this.setState({
      labelItem: this.props.placeholder,
    })
  }
  componentDidUpdate(preprops: any) {
    if (this.props.current !== preprops.current) {
      if (this.props.current === -1) {
        this.setState({
          labelItem: this.props.placeholder,
        })
      } else {
        this.setState({
          labelItem: this.props.list[this.props.current],
        })
      }
    }
    if (JSON.stringify(this.props.list) != JSON.stringify(preprops.list)) {
      if (this.props.current === -1) {
        this.setState({
          labelItem: this.props.placeholder,
        })
      } else {
        this.setState({
          labelItem: this.props.list[this.props.current],
        })
      }
    }
  }
  checkType = (value: any) => {
    this.setState({
      typeDropdown: value,
    })
  }
  showDropdown = () => {
    this.setState({ isOpen: true })
    document.addEventListener("click", this.hideDropdown)
  }
  hideDropdown = () => {
    this.setState({ isOpen: false })
    document.removeEventListener("click", this.hideDropdown)
  }
  chooseItem = (value: any) => {
    this.props.onChooseItem(value)
  }

  renderDataDropDown = (item: any, index: number) => {
    const { value, label } = this.state.typeDropdown
      ? { value: index, label: item }
      : item
    return (
      <li key={index} value={value} onClick={() => this.chooseItem(label)}>
        <a>{label}</a>
      </li>
    )
  }
  render() {
    const { list, placeholder, current } = this.props
    return (
      <div className={`floor-dropdown ${this.state.isOpen ? "open" : ""}`}>
        <div className="floor-dropdown-button" onClick={this.showDropdown}>
          <span>{`Floor ${current}` || placeholder}</span>
          <span className="caret">
            <MdUnfoldMore size={20} />
          </span>
        </div>
        <ul className="floor-dropdown-menu">
          {/* <li value={placeholder} onClick={() => this.chooseItem("")}>
            <a>{placeholder}</a>
          </li> */}
          {list.map(value => {
            return (
              <li
                key={`floor${value}`}
                onClick={() => {
                  this.chooseItem(value)
                }}
              >
                <a>{`Floor ${value}`}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
