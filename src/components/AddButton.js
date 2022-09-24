import React from "react";
import {ReactComponent as AddIcon} from '../assets/add.svg'
import {Link} from 'react-router-dom'
const AddButton = () => {
    return (
        <div>
            <h3>
                <Link to={"notes/new"} className="floating-button">
                    <AddIcon/>
                </Link>
            </h3>
        </div>
    )
}

export default AddButton