import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <div>
            <h1>Single Node </h1>
            almost console.log("HOLA", {parseInt(params.id)});
            MY NOTE {note?.body}

        </div>
    )

}

export default NotePage