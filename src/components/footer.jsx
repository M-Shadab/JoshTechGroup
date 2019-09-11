import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  background: #4a4a4a;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 425px) {
    display: block;
    p {
      margin-top: 3.6rem;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  a:not(:last-child) {
    margin-right: 2rem;
  }
`

const Font28 = styled.p`
  font-family: Klavika Bold;
  font-size: 2.8rem;
  color: #fff;
  letter-spacing: 1px;
  @media screen and (max-width: 425px) {
    font-size: 2rem;
  }
`

const Font24 = styled.a`
  font-family: Klavika Light;
  font-size: 2.4rem;
  color: #fff;
  text-decoration: none;
  @media screen and (max-width: 425px) {
    font-size: 1.6rem;
  }
`

const Footer = () => (
  <Wrapper>
    <ButtonWrapper>
      <Font24 href="#">Terms & Conditions</Font24>
      <Font24 href="#">Privacy Policy</Font24>
      <Font24 href="#">Contact Us</Font24>
    </ButtonWrapper>
    <Font28>Josh Technology Group</Font28>
  </Wrapper>
)

export default Footer
