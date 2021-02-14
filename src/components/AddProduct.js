import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './ContextAPI'


export default function AddProduct(props) {

    const [selectedProduct, setselectedProduct] = useState(props.product[0]); //default the first choice

    const [buttonColor, setbuttonColor] = useState('red');



    return (
        <div>
            <Consumer>
                {(val) => {
                    return (
                        <div>
                            {/* maps the product types dropdown */}
                            <label>Choose a product : </label>
                            <select onChange={(element) => { (setselectedProduct(element.target.value)) }}>
                                {val.products.map((element) => {
                                    
                                    return (
                                        <option>{element}</option>
                                    )
                                })}
                            </select>

                            <div>
                                {/* sets the current choice of product and sends it to app component */}
                                <button onClick={() => { val.addProducts(selectedProduct, buttonColor,val.name,val.roomType) ;}}>Add this product</button>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        </div>
    )
}
