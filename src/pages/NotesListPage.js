import { useEffect, useState } from "react";
import React from "react";

const NotesListPage = () => {
    let [notes, setNotes] =useState([])
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
        <div>
            notes
            <div className="notes-lits">
                {
                    notes.map(
                        (note, index)=> (
                            <h3 key = {index}> Body = {note.body} </h3>
                            // Keys help React identify which items have changed, are added, or are removed
                        )


                    )
                }

            </div>
        </div>
    )
}

export default NotesListPage