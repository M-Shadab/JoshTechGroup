import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { getUsers, getUser } from '../services/notesService'
import NoteSection from './noteSection'
import Icons from './icons'
import RenderDropDown from './renderDropDown'
import advisor from '../assets/svgs/advisor.svg'
import connector from '../assets/svgs/connector.svg'
import doer from '../assets/svgs/doer.svg'
import dreamer from '../assets/svgs/dreamer.svg'
import organiser from '../assets/svgs/organiser.svg'
import original from '../assets/svgs/original.svg'

const Wrapper = styled.div`
  > p:first-child {
    text-align: center;
    margin: 5rem 0;
  }
  @media (max-width: 425px) {
    > p:first-child {
      margin: 5rem 0 3rem;
      padding: 0 3rem;
    }
  }
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10rem;

  @media (max-width: 425px) {
    display: block;
    margin-bottom: 0;
  }
`

const Column1 = styled.div`
  width: 38%;
  padding-left: 8rem;
  padding-right: 10rem;
  padding-bottom: 2rem;
  border-right: 1px solid #ccc;
  & > p {
    margin-top: 3rem;
    font-family: Klavika Light;
    text-align: center;
    color: #fff;
    background: #4a4a4a;
    padding: 1rem 0;
  }

  @media (max-width: 425px) {
    width: 100%;
    padding: 0;
    border: 0;
    & > p {
      margin: 3rem 2.4rem 0 2.4rem;
    }
  }
`

const Column2 = styled.div`
  width: 46%;
  @media (max-width: 425px) {
    width: 100%;
    padding: 4rem 2.4rem;
  }
`
const Column2Label = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  svg {
    margin: 0 2rem;
  }

  @media (max-width: 425px) {
    width: 100%;
    margin-bottom: 1.6rem;
    justify-content: space-evenly;
  }
`

const ComparisonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const IconColumn = styled.div`
  & > div:last-of-type {
    margin-bottom: 0;
  }
  & > p {
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  & > p:first-child {
    border: 1px solid #fff;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`

const IconWrapper = styled.div`
  margin-bottom: 5rem;

  p {
    text-align: center;
  }
`
const IconBackground = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: ${props => (props.bgColor ? props.bgColor : 'pink')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  margin-bottom: 2rem;
  img {
    width: 4.4rem;
  }
`

const Font28 = styled.p`
  font-family: Klavika Medium;
  font-size: 2.8rem;
  color: ${props => (props.color ? props.color : '#4a4a4a')};
  letter-spacing: 1px;

  span {
    font-family: Klavika Bold;
    color: #4a4a4a;
  }
`

const Font24 = styled.p`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Bold')};
  font-size: 2.4rem;
  color: ${props => (props.color ? props.color : '#4a4a4a')};
`

const Font20 = styled.p`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Medium')};
  font-size: 2rem;
  color: ${props => (props.color ? props.color : '#4a4a4a')};
`

const Font16 = styled.p`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Light')};
  font-size: 1.6rem;
  color: #4a4a4a;
`

export default class ProfileSection extends Component {
  state = {
    user: {},
    personList: [],
    personIndex: null,
    isOpenDropDown: false,
    selectPerson: '',
    selectPersonListIndex: null
  }

  componentDidMount = async () => {
    try {
      const { data } = await getUser()
      const { data: personList } = await getUsers()

      this.setState({
        user: data[0],
        personList,
        selectPerson: personList[0].name,
        selectPersonListIndex: 0,
        personIndex: personList[0].index
      })
    } catch (ex) {
      alert(ex)
    }
  }

  mapIcon = label => {
    let background
    if (label === 'Advisor') background = [advisor, 'lightpink']
    else if (label === 'Connector') background = [connector, 'lightgreen']
    else if (label === 'Doer') background = [doer, 'cyan']
    else if (label === 'Dreamer') background = [dreamer, 'lightblue']
    else if (label === 'Organiser') background = [organiser, 'lightgrey']
    else if (label === 'Orignal') background = [original, 'yellow']
    else background = [advisor, 'aqua']
    return background
  }

  renderIcon = (tag, index, isUserAttributes) => {
    const personTags = this.state.personList[this.state.selectPersonListIndex].tags

    if (!isUserAttributes) {
      const obj = _.filter(personTags, { name: tag.name })
      if (obj.length === 0) {
        return null
      }
    }

    const background = this.mapIcon(tag.name)
    return (
      <IconWrapper key={index}>
        <IconBackground bgColor={background[1]}>
          <img src={background[0]} alt="" />
        </IconBackground>
        <Font20>{tag.name}</Font20>
      </IconWrapper>
    )
  }

  renderTagSection = () => {
    const { user, personList, selectPersonListIndex } = this.state
    return (
      <Fragment>
        <ComparisonWrapper>
          {user.tags && <IconColumn>{this.renderProfileData('You', 350, false, user.tags)}</IconColumn>}
          {selectPersonListIndex !== null && (
            <IconColumn>
              {this.renderProfileData('Person', 45, true, personList[selectPersonListIndex].tags)}
            </IconColumn>
          )}
        </ComparisonWrapper>
        <Font20>Go to your profile</Font20>
      </Fragment>
    )
  }

  renderNoteSection = () => (
    <Fragment>
      <Column2Label>
        <Font24 color="#436ab2">ORGANIZERS</Font24>
        <Icons icon="addEmpty" fill="#4a4a4a" />
        <Font24 color="#26dab2">DREAMERS</Font24>
      </Column2Label>
      <Font20 fontFamily="Klavika Light" color="#3e3e3e">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Earum fugit velit nihil, temporibus
        alias consequuntur praese ntium esse optio amet obcaecati, odit expedita reiciendis labore aspernatur dicta
        magnam fuga! Dolores, rem, maiores repudiandae dolorem, iusto voluptatem vel perspiciatis beatae quo totam
        recusandae possimus omnis non cumque consectetur. Consequuntur minima dolor dolore totam architecto ad tenetur.
        Beatae explicabo.
      </Font20>
      <NoteSection personIndex={this.state.personIndex} />
    </Fragment>
  )

  renderProfileData = (category, PQ, isUserAttributes, tags = []) => (
    <Fragment>
      {isUserAttributes ? (
        <RenderDropDown
          value={this.state.selectPerson}
          options={this.state.personList}
          onSelectDropDown={(person, index) => this.handleSelectDropDown(person, index)}
        />
      ) : (
        <Font16 fontFamily="Klavika Medium">{category}</Font16>
      )}
      {tags.length > 0 && tags.map((tag, index) => this.renderIcon(tag, index, isUserAttributes))}
      <Font28>
        <span>{PQ}</span> PQ
      </Font28>
    </Fragment>
  )

  updateState = (person, index, prevState) => {
    return {
      selectPerson: person.name,
      selectPersonListIndex: index,
      personIndex: person.index,
      openNotes: {}
    }
  }

  handleSelectDropDown = (person, index) => {
    this.setState(prevState => this.updateState(person, index, prevState))
  }

  render = () => (
    <Wrapper>
      <Font28 color="#7e7e7e">
        Your Profile Comparison with <span>{this.state.selectPerson}</span>
      </Font28>
      <ContentWrapper>
        <Column1>{this.renderTagSection()}</Column1>
        <Column2>{this.renderNoteSection()}</Column2>
      </ContentWrapper>
    </Wrapper>
  )
}
