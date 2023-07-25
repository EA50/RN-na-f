import React from 'react';

const EditNote = ({notesId, noteContentEdit, isEditing, setNoteContentEdit, editNote, setIsEditing}) => {
    // props as note id and content

    function onEnter(e) {
        if (e.key === 'Enter') {
            editNote(notesId, noteContentEdit)
            setIsEditing(false)
        }
    }

    return (
        <div className={isEditing ? "editing-note" : "editing-note editing-note-hide"}>
            <textarea 
                className="note-content-edit" 
                onChange={e=> setNoteContentEdit(e.target.value)} 
                value={noteContentEdit}
                onKeyDown={onEnter}>

                </textarea>
        </div>
    )
}

export default EditNote