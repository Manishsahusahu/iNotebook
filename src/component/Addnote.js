import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="container my-5">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" name='title' className="form-control" id="title" aria-describedby="title" onChange={onChange} value={note.title} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea className="form-control" id="desc" name='description' onChange={onChange} value={note.description} minLength={5} required ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} / >
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick} >Add note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote;