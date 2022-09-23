import React from "react";
import { Link } from "react-router-dom";
//take care onclick event for us!!

const ListItem = ({note}) => {
    return (
        <Link to={`/notes/${note.id}`}>
            <div className="notes-list-item">
                <h3>{note.body}</h3>
            </div>
        </Link>
    )
}

export default ListItem