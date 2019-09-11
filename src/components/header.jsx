import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import '../assets/styles/header.css'
import slide1 from '../assets/images/slide1.jpg'
import slide2 from '../assets/images/slide2.jpg'

const Slide = styled.div`
  position: relative;
  img {
    width: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right bottom, rgba(67, 94, 108, 0.8), rgba(102, 145, 158, 0.8));
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`

const LinkWrapper = styled.div`
  p {
    text-align: center;
    margin-bottom: 2rem;
  }
  p:last-child {
    text-align: center;
    padding: 1rem 2rem;
    border: 1px solid #fff;
    background: transparent;
  }

  @media (max-width: 425px) {
    a {
      padding: 1rem;
    }
    p {
      margin-bottom: 1rem;
    }
  }
`

const Font40 = styled.p`
  font-family: Klavika Bold;
  font-size: 4rem;
  color: #fff;
  letter-spacing: 1px;
  @media (max-width: 425px) {
    font-size: 2.4rem;
  }
`
const Font24 = styled.p`
  font-family: Klavika Light;
  font-size: 2.4rem;
  color: #fff;
  text-decoration: none;
  @media (max-width: 425px) {
    font-size: 1.2rem;
  }
`

const Header = () => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true
  }

  const renderSlide = (src, title) => (
    <Slide>
      <img src={src} alt={`${src}.png`} />
      <Overlay>
        <LinkWrapper>
          <Font40>{title}</Font40>
          <Font24 href="#">CTA Link to Redirect</Font24>
        </LinkWrapper>
      </Overlay>
    </Slide>
  )

  return (
    <Slider {...settings}>
      {renderSlide(slide1, 'Slide 1')}
      {renderSlide(slide2, 'Slide 2')}
      {renderSlide(slide1, 'Slide 3')}
    </Slider>
  )
}

export default Header
