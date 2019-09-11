import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Light')};
  font-size: 1.6rem;
  color: ${props => (props.color ? props.color : '#777')};

  width: 100%;
  padding: ${props => (props.padding ? props.padding : '1rem 2rem')};
  -webkit-appearance: none;
  border: 0;
  border-radius: 0;
  border: 1px solid #ccc;
  background: ${props => (props.bgColor ? props.bgColor : 'none')};
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    transition: background-color 5000s 0s;
  }

  &:focus {
    outline: none;
    background: none !important;
  }
`

const RenderInput = ({ value, ...restProps }) => <Input value={value} {...restProps}></Input>

export default RenderInput
