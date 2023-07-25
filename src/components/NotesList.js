import React from 'react';

import Note from './Note';

const NotesList = (props) => {

  return (
    <>
      <p className={props.notesList.length === 0 ? '' : 'no-notes'}>No notes to show...</p>
      <div className='notes-list'>
          {
              props.notesList &&
                  props.notesList.map((note) =>{
                      return <Note 
                                key={note.id} 
                                note={note} 
                                deleteNote={props.deleteNote} 
                                setNotesId={props.setNotesId} 
                                setNoteContentEdit={props.setNoteContentEdit}
                                setIsEditing={props.setIsEditing}
                              />
                  })
          }
      </div>
    </>
  )
}

export default NotesList
