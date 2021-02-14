import React,{useState} from 'react';
import { Link } from 'react-router-dom';

export default function RoomButtons(props) {

    const [room, setroom] = useState(props)

     
    return (
    // lead us to "editroom" component
     <Link to='/room'> 
            <p>{props.type}</p>
            <p>{props.name}</p>   
        </Link> 
    )
}