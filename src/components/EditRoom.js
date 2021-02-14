import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductButton from './ProductButton.js';
import AddProduct from './AddProduct.js';


export default function EditRoom(props) {

    const [showAddProduct, setshowAddProduct] = useState(false);

    const [productsList, setproductsList] = useState(props.productTypes);

    const [buttonColor, setbuttonColor] = useState(false);

    const hidden = () => { //shows and hides the dropdown of product adding
        if (showAddProduct == true) {
            return (
                <AddProduct product={productsList} />
            )
        }
    }

    return (
        <div>
            <h3>Type:{props.type}</h3>
            <h3>Name:{props.name}</h3>
            {hidden()}

            {/* the map of existing product */}
            {props.alreadyInRoom.map((element, i) => {
                // compares between the room names for showing the product in the right room
                if (element.roomName == props.name) {
                    return (
                        <button onClick={() => { //define if the product is on or off by colors
                            setbuttonColor(!buttonColor);
                            if (buttonColor == true) {
                                element.condition = 'green'
                            }
                            else {
                                element.condition = 'red'
                            }
                        }} style={{ backgroundColor: `${element.condition}` }}>
                            {/* present the product name on the button */}
                            <ProductButton product={element.productName} /> 
                        </button>
                    )
                }
            })}
            <br />
            <button onClick={() => {setshowAddProduct(!showAddProduct)}}>Add a product</button>


            <br />

            <Link to='/'>  <button>Back to main page</button> </Link>


        </div>
    )
}
