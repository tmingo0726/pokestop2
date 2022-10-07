import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Details = (props) => {

    const product = props.chosenCard;

    console.log("Inside Product Details card picked is", product);

    return(
        <div className="grid-container">
            <div className="caption"><img className="grid-item" src={product.imagelink} onClick={() => seeDetails(product)} alt="Pokemon"/>

                <p>Price: ${product.price}</p>
                <p>Cards in Stock: {product.inventorycount}</p></div>
            </div>
    )

}

export default Details;