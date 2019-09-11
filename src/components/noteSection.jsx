import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { getNotes } from '../services/notesService'
import Icons from './icons'
import AddNoteForm from './addNoteForm'

const NotesSection = styled.div`
  & > :last-child {
    margin-bottom: 0;
  }
`

const NotesButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button:not(:last-child) {
    margin-right: 2rem;
  }
`

const NotesHeader = styled(NotesButton)`
  margin: 5rem 0 3rem 0;

  div {
    border-right: 3px #4a4a4a solid;
    padding-right: 1rem;
    margin-right: 2rem;
  }
`

const Button = styled.button`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border: 0;
  background: ${props => (props.bgColor ? props.bgColor : 'transparent')};

  :focus {
    outline: none;
  }
  :hover {
    border-radius: 1.2rem;
    background: #eee;
  }
`

const NoteWrapper = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 1.2rem;
  transition: all 0.3s;
`
const NoteLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    width: 100%;
  }
`

const TagWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  p {
    padding: 0.8rem 0.8rem;
    margin: 0 1rem 1rem 0;
    border-radius: 1.5rem;
    background: lightgreen;
  }
`

const Font20 = styled.p`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Medium')};
  font-size: 2rem;
  color: ${props => (props.color ? props.color : '#4a4a4a')};
`

export default class NoteSection extends Component {
  state = {
    noteTitle: '',
    isExpandNotes: true,
    isOpenNoteForm: false,
    personIndex: null,
    tags: [],
    openNotes: {},
    notesList: []
  }

  componentDidMount = async () => {
    const { data: notesList } = await getNotes()
    this.setState({ notesList })
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.personIndex !== state.personIndex) return { personIndex: props.personIndex, openNotes: {} }
    return null
  }

  handleSaveNote = () => {
    const noteIndex = _.findIndex(this.state.notesList, { index: this.state.personIndex })

    if (noteIndex !== -1) {
      const newNote = {
        // Assuming id: {0... notesLen - 1} but it will be assigned by backend in actual
        id: this.state.notesList[noteIndex].notes.length,
        title: this.state.noteTitle,
        tags: this.state.tags
      }

      let prevNoteObj = this.state.notesList[noteIndex]
      prevNoteObj.notes.push(newNote)
      const newNotes = {
        [this.state.personIndex]: prevNoteObj
      }

      const prevNotes = JSON.parse(localStorage.getItem('notes'))

      if (prevNotes) {
        localStorage.setItem('notes', JSON.stringify({ ...newNotes, ...prevNotes }))
      } else localStorage.setItem('notes', JSON.stringify(newNotes))
    } else {
      //If there is no note saved
      const personNotesObj = {
        index: this.state.personIndex,
        // Assuming id: {0... notesLen - 1} but it will be assigned by backend in actual
        notes: [
          {
            id: 0,
            title: this.state.noteTitle,
            tags: this.state.tags
          }
        ]
      }

      const prevNotes = JSON.parse(localStorage.getItem('notes'))
      const newNotes = {
        [this.state.personIndex]: personNotesObj
      }

      if (prevNotes) {
        localStorage.setItem('notes', JSON.stringify({ ...newNotes, ...prevNotes }))
      } else localStorage.setItem('notes', JSON.stringify(newNotes))
    }
    this.setState({
      isOpenNoteForm: false,
      noteTitle: ''
    })
  }

  handleInputChange = e => {
    console.log('Get Title', e.target.value)
    this.setState({ noteTitle: e.target.value })
  }

  handleTagChange = tags => {
    this.setState({ tags })
  }

  handleOpenNoteForm = () => {
    this.setState({ isOpenNoteForm: true, tags: [] })
  }

  handleExpandNotes = () => {
    this.setState(prevState => ({
      isExpandNotes: !prevState.isExpandNotes
    }))
  }

  handleOpenNote = title => {
    this.setState(state => ({ openNotes: { ...state.openNotes, [title]: !state.openNotes[title] } }))
  }

  renderNotesHeader = () => (
    <NotesHeader>
      <div>
        <Button onClick={this.handleOpenNoteForm}>
          <Icons icon="addEmpty" fill="#4a4a4a" />
          <Font20>Add New</Font20>
        </Button>
      </div>
      <Button onClick={this.handleExpandNotes}>
        <Font20>Expand all</Font20>
        {this.state.isExpandNotes ? <Icons icon="upEmpty" fill="#4a4a4a" /> : <Icons icon="downEmpty" fill="#4a4a4a" />}
      </Button>
    </NotesHeader>
  )

  renderNotes = () => {
    const notesStored = JSON.parse(localStorage.getItem('notes'))
    let personNotes
    if (notesStored) {
      personNotes = notesStored[this.state.personIndex]
    }

    let notesList
    if (personNotes) {
      notesList = personNotes.notes
    } else {
      const notes = this.state.notesList.filter(obj => obj.index === this.state.personIndex)
      notesList = notes.length > 0 ? notes[0].notes : []
    }

    return notesList.map(note => (
      <NoteWrapper>
        <NoteLabel key={note.id}>
          <Font20 fontFamily="Klavika Medium" color="#4a4a4a" onClick={() => this.handleOpenNote(note.title)}>
            {note.title}
          </Font20>
          <Icons icon="removeFill" fill="red" />
        </NoteLabel>
        {(this.state.openNotes[note.title] || !this.state.isExpandNotes) && note.tags.length > 0 && (
          <TagWrapper>
            {note.tags.map((tag, index) => (
              <Font20 key={index} fontFamily="Klavika Light">
                {tag}
              </Font20>
            ))}
          </TagWrapper>
        )}
      </NoteWrapper>
    ))
  }

  render = () => {
    const { isOpenNoteForm, noteTitle, tags } = this.state
    return (
      <NotesSection>
        {this.renderNotesHeader()}
        <AddNoteForm
          show={isOpenNoteForm}
          noteTitle={noteTitle}
          tags={tags}
          onInputChange={this.handleInputChange}
          onTagChange={this.handleTagChange}
          onCancelClick={() => this.setState({ noteTitle: '', tags: [], isOpenNoteForm: false })}
          onSaveClick={this.handleSaveNote}
        />
        {this.renderNotes()}
      </NotesSection>
    )
  }
}
