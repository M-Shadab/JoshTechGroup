import React from 'react'
import styled from 'styled-components'
import RenderInput from './renderInput'
import TagsInput from 'react-tagsinput'

const NoteForm = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  border-radius: 1.2rem;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  transform: ${props => (props.show ? 'translateY(0) scaleX(1)' : 'translateY(-400vh) scaleX(0.5)')};
  opacity: ${props => (props.show ? '1' : '0')};
  margin-bottom: ${props => (props.show ? '2rem' : '-18rem')};

  transition: all 0.7s ease-in-out;

  & > :not(:last-child) {
    margin-bottom: 2rem;
  }
`
const NotesButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button: not(:last-child) {
    margin-right: 2rem;
  }
`

const Button = styled.button`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border: 0;
  background: ${props => (props.bgColor ? props.bgColor : 'transparent')};
  : focus {
    outline: none;
  }
  :hover {
    border-radius: 1.2rem;
    background: #eee;
  }
`

const Font20 = styled.p`
  font-family: ${props => (props.fontFamily ? props.fontFamily : 'Klavika Medium')};
  font-size: 2rem;
  color: ${props => (props.color ? props.color : '#4a4a4a')};
`

const AddNoteForm = ({ noteTitle, tags, onInputChange, onCancelClick, onTagChange, onSaveClick, show }) => {
  return (
    <NoteForm show={show}>
      <RenderInput placeholder="Enter note title" value={noteTitle} onChange={onInputChange} />
      <TagsInput value={tags} onChange={tags => onTagChange(tags)} />
      <NotesButton>
        <Button onClick={() => onCancelClick()}>
          <Font20>cancel</Font20>
        </Button>
        <Button bgColor="lightgreen" onClick={() => onSaveClick()}>
          <Font20>save</Font20>
        </Button>
      </NotesButton>
    </NoteForm>
  )
}

export default AddNoteForm
