import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
    let [notes, setNotes] = useState([])

    // initial state of owr app 
    useEffect(()=>{
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('http://localhost:8000/api/notes/')
        let data = await response.json() 
        // wait untill the process is complet and allows to get a response
        // console.log('DATA', data)
        setNotes(data)
    }

    return (
        <div className="notes">

            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>                
            </div>
            <div className="notes-list">
                {
                    notes.map(
                        (note, index)=> (
                            <ListItem key = {index} note = {note}/>
                            // Keys help React identify which items have changed, are added, or are removed
                        )
                    )
                }
            </div>
            <AddButton/>
        </div>
    )
}

export default NotesListPage