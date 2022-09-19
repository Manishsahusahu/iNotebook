import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:4000";
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);

	// to get all notes

	const getNotes = async () => {
		// API CALL
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMGVjOGIyOGJlZDlmNTgyMDA0NjZiIn0sImlhdCI6MTY2MzA4NTYxN30.chc1lelLDbkWPkpV294FkB9yDNAdNe2wciMrfiuG3y0'
			}
		});
		const json =await response.json();
		console.log(json);
		// logic for adding a note
		setNotes(json);
	}

	// to add a note

	const addNote = async (title, description, tag) => {
		// API CALL
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMGVjOGIyOGJlZDlmNTgyMDA0NjZiIn0sImlhdCI6MTY2MzA4NTYxN30.chc1lelLDbkWPkpV294FkB9yDNAdNe2wciMrfiuG3y0'
			},
			body: JSON.stringify({title, description, tag})
		});
		const note =await response.json();
		setNotes(notes.concat(note));
	}

	// to delete a note
	const deleteNote = async (id) => {
		// API CALL
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMGVjOGIyOGJlZDlmNTgyMDA0NjZiIn0sImlhdCI6MTY2MzA4NTYxN30.chc1lelLDbkWPkpV294FkB9yDNAdNe2wciMrfiuG3y0'
			} 
		});
		const json = response.json();
		console.log(json);

		// LOGIC FOR delete a NOTE
		const newNote = notes.filter((note) => { return (note._id !== id); });
		setNotes(newNote);
	}

	// to update a note.
	const editNote = async (id, title, description, tag) => {
		// API CALL
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMGVjOGIyOGJlZDlmNTgyMDA0NjZiIn0sImlhdCI6MTY2MzA4NTYxN30.chc1lelLDbkWPkpV294FkB9yDNAdNe2wciMrfiuG3y0'
			},
			body: JSON.stringify({title, description, tag})
		});
		const json =await response.json();
		console.log(json);

		// LOGIC FOR EDIT NOTE
		let newNotes= JSON.parse(JSON.stringify(notes));
		newNotes.every(element => {  // every works same as foreach except one thing that foreach doesn't work on break; but in every we can write return false as break; and return true as continue; return true is cumpolsury in the end.
			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
				return false;
			}
			return true;
		});
		setNotes(newNotes);
	}

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
			{props.children}
		</NoteContext.Provider>
	)

}

export default NoteState;