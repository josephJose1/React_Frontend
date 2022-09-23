import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from "react-router-dom";

const NotePage = () => {
    let params = useParams();
    let [note, setNote] = useState(null)

    // initial state of owr app 
    useEffect(()=>{
        let getNote = async () => {
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
    

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to={'/'}>
                        <ArrowLeft/>
                    </Link>
                    
                </h3>
                
            </div>
            <textarea defaultValue={note?.body}></textarea>

        </div>
    )

}

export default NotePage