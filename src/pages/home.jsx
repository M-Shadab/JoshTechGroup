import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../components/navBar'
import Footer from '../components/footer'
import Header from '../components/header'
import ProfileSection from '../components/profileSection'

const Wrapper = styled.div`
  width: 100%;
`

export default class Home extends Component {
  render() {
    return (
      <Wrapper>
        <NavBar />
        <Header />
        <ProfileSection />
        <Footer />
      </Wrapper>
    )
  }
}
