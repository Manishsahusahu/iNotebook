import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
    return (
        <div>
            <Addnote />
            <div className="contianer my-3">
                <h2>Your notes</h2>
            </div>
            <div className="row">
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes;