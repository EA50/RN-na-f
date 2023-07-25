import NotesList from './components/NotesList';
import EditNote from './components/EditNote';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import PreLoader from './components/PreLoader';




function App() {

  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const today = `${day}/${month}/${year}`;

  const [preLoader, setPreLoader] = useState(false);
  const [input, setInput] = useState('');
  const [noteState, setNoteState] = useState(true);
  const [notesList, setNotesList] = useState([{}]);
  
  const [noteId, setNotesId] = useState('');
  const [noteContentEdit, setNoteContentEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === 'Escape') {
        setIsEditing(false)
      }
    }

  }, [])

  useEffect(() => {
    setPreLoader(true)
    axios.get(`https://giddy-kimono-cod.cyclic.app/data`, {
      credentials: 'included',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(r=> {
        setPreLoader(false)

        setNotesList(r.data);
      })
      .catch(err => {
      console.log(err);
      })
  }, [noteState])

  function settingInput(e) {
    setInput(e.target.value);
  }
  
  function addNote() {
    if (notesList.length === 20) {
      alert('Maximum number of notes reached.');
    } else {
      axios.post(`https://giddy-kimono-cod.cyclic.app/newNote`, {
        id: uuidv4(), 
        dateCreated: today, 
        noteContent: input
      })
        .then(r=> {
          setNoteState(prevNoteState => !prevNoteState);
          setInput('')
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  function deleteSingleNote(noteId) {
    axios.delete(`https://giddy-kimono-cod.cyclic.app/deleteNote/${noteId}`)
      .then(res => {
        console.log('res from /deleteNote to /data: ',res)
        setNoteState(prevNoteState => !prevNoteState)
        setIsEditing(false)
      })
      .catch(err => 
        console.log(err)
      )
  }
  function editNote(noteId, noteContent) {
    axios.post(`https://giddy-kimono-cod.cyclic.app/editNote/${noteId}`, {
      noteContent: noteContent
    })
      .then(r=> {
        setNoteState(prevNoteState => !prevNoteState);
        setNoteContentEdit('')
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <section className="a1">

        <header>
          <h1>My Notes</h1>
        </header>
        <div className='header-border'></div>
      </section>
    
      <section className="a2">
        {
          preLoader &&
            <PreLoader />
        }
        <div className='add-note-form'>
          <textarea 
            className="note-content" 
            onChange={settingInput} value={input}
            onKeyDown={e=> e.key === 'Enter' ? addNote() : false}></textarea>
          <div className={input !== '' ? "form-indicator dis-none" : "form-indicator"}>Text Here</div>
        </div>
      </section>

      <NotesList 
        notesList={notesList} 
        deleteNote={deleteSingleNote} 
        setNotesId={setNotesId} 
        setNoteContentEdit={setNoteContentEdit}
        setIsEditing={setIsEditing}
        />
      <EditNote 
        noteState={noteState}
        notesId={noteId} 
        noteContentEdit={noteContentEdit}
        isEditing={isEditing}
        setNoteContentEdit={setNoteContentEdit}
        editNote={editNote}
        setIsEditing={setIsEditing}
        />

    </>
  );
}

export default App;
