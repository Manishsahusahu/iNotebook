import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial =[
        {
          "_id": "632596e898478c07e4d0c75c",
          "user": "6310ec8b28bed9f58200466b",
          "title": "New title ",
          "description": "First description added to notes",
          "tag": "Personal notes",
          "timestamp": "2022-09-17T09:44:08.091Z",
          "__v": 0
        },
        {
          "_id": "632596f898478c07e4d0c75e",
          "user": "6310ec8b28bed9f58200466b",
          "title": "New title second",
          "description": "second description added to notes",
          "tag": "Personal notes second",
          "timestamp": "2022-09-17T09:44:24.239Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;