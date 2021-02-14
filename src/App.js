import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import EditRoom from './components/EditRoom';
import Addroom from './components/Addroom';
import MainPage from './components/MainPage';
import RoomButtons from './components/RoomButtons';
import './App.css'
import { Provider } from './components/ContextAPI'


export default function App() {

  const roomsTypes = ['Bedroom', 'Living room', 'Bathroom', 'Kitchen']; 

  const productTypes = ['Air conditioner', 'Stereo Station', 'Lamp', 'Boiler'];

  const [newRoom, setnewRoom] = useState([]); //this hook gets every new room we add .
  const [roomButtonName, setroomButtonName] = useState([]);
  const [roomButtonType, setroomButtonType] = useState([]);
  //gets the product by name ,condition if green or red, room name and room type. 
  const [productInRoom, setproductInRoom] = useState([]);



  const addRoom = (type, name, color) => {
    setnewRoom([...newRoom, { roomType: type, roomName: name, roomColor: color }]);
  }

  //limit what can be in room
  const controlProductsInRoom = (productName, condition, roomName, roomType) => {
    if (limitProductsInRoom(roomName)) {
      alert('Max 5 products in room')
    }
    if (limitStereo(roomName, productName)) {
      alert('No more stereo')
    }
    if (productName == 'Boiler' && roomType != 'Bathroom') {
      alert('Boiler can be only in Bathroom')
    }
    if (limitProductsInRoom(roomName) == false && limitStereo(roomName, productName) == false && (productName == 'Boiler' && roomType != 'Bathroom') == false) {
      setproductInRoom([...productInRoom, { productName, condition, roomName, roomType }]);
    }
  }

  const limitProductsInRoom = (roomName) => {
    let counter = 0;
    for (let i = 0; i < productInRoom.length; i++) {
      if (productInRoom[i].roomName == roomName) {
        counter++
      }
      if (counter == 5) {
        return true
      }
    }
    return false
  }

  const limitStereo = (roomName, product) => {
    let counter = 0;
    for (let i = 0; i < productInRoom.length; i++) {
      if (productInRoom[i].roomName == roomName && productInRoom[i].productName == 'Stereo Station' && product == 'Stereo Station') {
        counter++
      }
      if (counter == 1) {
        return true
      }
    }
    return false
  }

//sets the name and the type of the room button in mainscreen
  const theRoom = (element) => {
    setroomButtonName(element.roomName);
    setroomButtonType(element.roomType);
  }

  return (<div className="App">
    <h1>Smart House</h1>
    <Router>
      <div>
        <Switch>
          <Route path="/addRoom">
            <Addroom rooms={roomsTypes} addRoom={addRoom} />
          </Route>
          <Route path="/room">
            <Provider value={{ name: roomButtonName, products: productTypes, addProducts: controlProductsInRoom, roomType: roomButtonType }}>
              <EditRoom name={roomButtonName} type={roomButtonType} alreadyInRoom={productInRoom} productTypes={productTypes} />
            </Provider>
          </Route>
          <Route path='/'>
            {/* present us the room button */}
            {newRoom.map((element, i) => { 
              return (
                <button onClick={() => { theRoom(element) }} style={{ backgroundColor: `${element.roomColor}` }}>
                  <RoomButtons setTheRoom={theRoom} name={element.roomName} type={element.roomType} color={element.roomColor} />
                </button>)
            })}
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
  );
}