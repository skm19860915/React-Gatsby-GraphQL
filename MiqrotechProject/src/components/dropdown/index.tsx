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
    if (this.state.labelItem !== value) {
      this.setState({
        labelItem: value,
      })
      this.props.onChooseItem(value)
    }
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
      <div className={`dropdown ${this.state.isOpen ? "open" : ""}`}>
        <div className="dropdown-button" onClick={this.showDropdown}>
          {current || placeholder}
          <span className="caret">
            <MdUnfoldMore size={20} />
          </span>
        </div>
        <ul className="dropdown-menu">
          {/* <li value={placeholder} onClick={() => this.chooseItem("")}>
            <a>{placeholder}</a>
          </li> */}
          {list.map(value => {
            return (
              <li
                key={value}
                value={value}
                onClick={() => this.chooseItem(value)}
              >
                <a>{`${value}`}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
