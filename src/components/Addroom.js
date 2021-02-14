import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Addroom(props) {

    const [roomType, setroomType] = useState(props.rooms[0]);//default the first choice

    const [roomName, setroomName] = useState('');

    const [roomColor, setroomColor] = useState('');

    return (
        <div>
            {/* maps the room types dropdown */}
            <label>Choose a room: </label> 
            <select onChange={(element) => { setroomType(element.target.value) }}>
                {props.rooms.map((element) => {
                    return (
                        <option>{element}</option>
                    )
                })}
            </select>
            <p>Name: 
                 <input onChange={(element) => { setroomName(element.target.value)}} type='text' placeholder='Name your room' />
            </p>
            <p>Pick a color for your room: 
                <input onChange={(element) => { setroomColor(element.target.value) }} type='color' placeholder='Color your room' />
            </p>

            <Link to='/'><button  onClick={()=>{
                if(roomName.length>5){
                    alert('Name have to be maximum 5 letters')
                }
                else if(roomColor==''){
                    alert('Pick a color for your room')
                } else{
                     {props.addRoom(roomType,roomName,roomColor)} //sends all the chosen data back to app component
                }
            }}>ADD</button></Link>
        </div>
    )
}