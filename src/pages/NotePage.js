import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { useNavigate } from "react-router-dom";

const NotePage = () => {
    let params = useParams();
    let noteId = params.id
    let navigate = useNavigate();
    let [note, setNote] = useState(null)


    // initial state of owr app 
    useEffect(()=>{
        let getNote = async () => {
            if (noteId === 'new') return 
            let urlpath='http://localhost:8000/api/notes/'
            urlpath = urlpath.concat(noteId, "/")
            console.log(urlpath)
            let response = await fetch(urlpath)
            let data = await response.json() 
            // wait untill the process is complet and allows to get a response
            setNote(data)
        }  //this method is here because we don't wan't warnings
        getNote()
    }, [noteId])
    
    let createNote = async () => {
        fetch(`http://localhost:8000/api/notes/create/`,{
            method: "POST",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate("/",{state:true}); //, 
    }

    let updateNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/update/`,{
            method: "PUT",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate("/");
    }

    let deleteNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/delete/`,{
            method: "DELETE",
            headers: {
                'Content-type':'application/json'
            },
        })
        navigate("/", {state:true});
    }
    
    let handle_submit = ()=>{
        console.log('NOte', note)
        if(noteId !== 'new' && !note.body){
            console.log('DELETE METHOD', note)
            deleteNote()
        }else if(noteId !== 'new'){
            console.log('UPDATE METHOD', note)
            updateNote()
        }else if(noteId === 'new' && note.body !== null){
            console.log('CREATE METHOD', note)
            createNote()
    }
        navigate("/", {state:true});
        navigate("/", );
    }

    let handleChange = (e) => {
        setNote(note => ({...note, 'body':e.target.value}))
        console.log('Handle Change:', note, 'target', e.target.value)
    }
    

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                        <ArrowLeft onClick={handle_submit}/>
                        
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}> DELETE </button>
                ):(
                    <button onClick={handle_submit}> DONE </button>
                )}

                
            </div>
            {/* commit actual state our note on each key up show message */}
            <textarea onChange={(e) => {handleChange(e) }} value={note?.body}></textarea>

        </div>
    )

}

export default NotePage