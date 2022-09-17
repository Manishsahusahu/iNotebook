import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
	const context = useContext(noteContext);
	const {notes, setNotes} = context;
    return (
        <div>
            <div className="contianer my-3">
                <h2>Your notes</h2>
            </div>
            <div className="row">
                {notes.map((note) => {
                    return <Noteitem note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes;