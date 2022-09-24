import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { useNavigate } from "react-router-dom";

const NotePage = () => {
    let params = useParams();

    let navigate = useNavigate();
    let [note, setNote] = useState(null)


    // initial state of owr app 
    useEffect(()=>{
        let getNote = async () => {
            if (params.id === 'new') return 
            let urlpath='http://localhost:8000/api/notes/'
            urlpath = urlpath.concat(params.id, "/")
            console.log(urlpath)
            let response = await fetch(urlpath)
            let data = await response.json() 
            // wait untill the process is complet and allows to get a response
            setNote(data)
        }  //this method is here because we don't wan't warnings
        getNote()
    }, [params.id])
    
    let createNote = async () => {
        fetch(`http://localhost:8000/api/notes/create/`,{
            method: "POST",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate("/"); //, {state:true}
    }

    let updateNote = async () => {
        fetch(`http://localhost:8000/api/notes/${params.id}/update/`,{
            method: "PUT",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`http://localhost:8000/api/notes/${params.id}/delete/`,{
            method: "DELETE",
            headers: {
                'Content-type':'application/json'
            },
        })
        navigate("/");
    }
    
    let handle_submit = ()=>{
        console.log('NOte', note)
        if(params.id !== 'new' && note.body === ''){
            deleteNote()
        }else if(params.id !== 'new'){
            updateNote()
        }else if(params.id === 'new' && note !== null){
            createNote()
    }
        navigate("/");
    }


    

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                        <ArrowLeft onClick={handle_submit}/>
                        
                </h3>
                {params.id !== 'new' ? (
                    <button onClick={deleteNote}> DELETE </button>
                ):(
                    <button onClick={handle_submit}> DONE </button>
                )}

                
            </div>
            {/* commit actual state our note on each key up show message */}
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>

        </div>
    )

}

export default NotePage