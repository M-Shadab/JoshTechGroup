import React, { Component } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import RenderInput from './renderInput'
import Icons from './icons'

const DropDownWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  position: relative;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  input {
    border-radius: 1.2rem;
    margin-bottom: 1rem;
  }

  svg {
    margin-top: -1rem;
    margin-left: -2rem;
  }

  @media (max-width: 425px) {
    svg {
      margin-left: -3rem;
    }
  }
`

const ListWrapper = styled.div`
  height: 12rem;
  overflow-y: scroll;
  width: 100%;
  background: #fff;
  position: absolute;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  li {
    list-style: none;
    padding: 1rem;
    :focus {
      background: lightgreen;
    }
  }
`

const Font16 = styled.p`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Light')};
  font-size: 1.6rem;
  color: #4a4a4a;
`

class RenderDropDown extends Component {
  state = { isOpenDropDown: false, value: '', options: [] }

  componentDidMount = () => {
    this.setState({ value: this.props.value, options: this.props.options })
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.value !== state.value) return { value: props.value }
    else if (props.options !== state.options) return { options: props.options }
    return null
  }

  toggleList = () => this.setState(prevState => ({ isOpenDropDown: !prevState.isOpenDropDown }))

  handleClickOutside = evt => {
    this.state.isOpenDropDown && this.toggleList()
  }

  handleSelectDropDown = (item, index) => {
    this.toggleList()
    return this.props.onSelectDropDown(item, index)
  }

  renderList = () => {
    return (
      this.state.isOpenDropDown && (
        <ListWrapper>
          {this.state.options.map((item, index) => (
            <li tabIndex={index} key={index} onClick={() => this.handleSelectDropDown(item, index)}>
              <Font16>{item.name}</Font16>
            </li>
          ))}
        </ListWrapper>
      )
    )
  }

  render = () => {
    return (
      <DropDownWrapper>
        <InputWrapper>
          <RenderInput
            color="#4a4a4a"
            fontFamily="Klavika Medium"
            value={this.state.value}
            bgColor="#eee"
            padding="1rem"
            readOnly
            onClick={this.toggleList}
          />
          {this.state.isOpenDropDown ? (
            <Icons icon="upEmpty" fill="#4a4a4a" />
          ) : (
            <Icons icon="downEmpty" fill="#4a4a4a" />
          )}
        </InputWrapper>
        {this.renderList()}
      </DropDownWrapper>
    )
  }
}

export default onClickOutside(RenderDropDown)
