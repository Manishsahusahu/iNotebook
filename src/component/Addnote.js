import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note);
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
                        <input type="text" name='title' className="form-control" id="title" aria-describedby="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea className="form-control" id="desc" name='description' onChange={onChange} ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote;