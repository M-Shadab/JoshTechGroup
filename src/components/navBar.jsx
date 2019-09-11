import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
  padding: 2rem 3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 425px) {
    display: block;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  a {
    text-decoration: none;
  }
  a:not(:last-child) {
    margin-right: 2rem;
  }
  @media (max-width: 425px) {
    justify-content: flex-end;
  }
`

const Font28 = styled.p`
  font-family: Klavika Bold;
  font-size: 2.8rem;
  color: #fff;
  letter-spacing: 1px;
  @media (max-width: 425px) {
    font-size: 2rem;
  }
`

const Font24 = styled.p`
  font-family: Klavika Light;
  font-size: 2.4rem;
  color: #fff;
  text-decoration: none;
  @media (max-width: 425px) {
    font-size: 1.6rem;
  }
`

const NavBar = () => (
  <Wrapper>
    <Font28>Josh Technology Group</Font28>
    <ButtonWrapper>
      <Link>
        <Font24 href="#">Play</Font24>
      </Link>
      <Link>
        <Font24 href="#">Explore</Font24>
      </Link>
      <Link>
        <Font24 href="#">Connect</Font24>
      </Link>
      <Link>
        <Font24 href="#">Apply</Font24>
      </Link>
    </ButtonWrapper>
  </Wrapper>
)

export default NavBar
