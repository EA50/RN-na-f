import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const Note = ({note, deleteNote, setNotesId, setNoteContentEdit, setIsEditing}) => {

  function setNotes() {
    setNotesId(note._id)
    setNoteContentEdit(note.noteContent)
    setIsEditing(true);
  }

  return (
    <div 
      className='note'
      key={note._id_a}
      data-noteid={note._id}>
        <div className='note-date'>{note.dateCreated}</div>
        <div className='note-description'>{note.noteContent}</div>
        <div className='note-icon-wrapper'>
          <FontAwesomeIcon icon={faPen} onClick={ setNotes } className='icon' />
          <FontAwesomeIcon icon={ faTrash } fade onClick={()=> deleteNote(note._id)} className='icon' />

        </div>
    </div>
  )
}

export default Note