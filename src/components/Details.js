import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../stylesheets/Details.css'

const Details = (props) => {

    const product = props.chosenCard;
    let quantity = 0;

    console.log("Inside Product Details card picked is", product);

    const adjustQuantity = (op) => {

        if (op === "add") {
            if (quantity < product.inventorycount) {
                quantity++;
            } else {
                alert("Quantity selected exceeds what's available in inventory");
            }
        } else {
            if (quantity > 0) quantity--;
        }

        document.getElementById("quantity-count").innerHTML = quantity;

    }

    return(
        <div>
        <div className="grid-container">
            <div className="caption"><img className="grid-item" src={product.imagelink} onClick={() => seeDetails(product)} alt="Pokemon"/>
        </div>
        <div className="v1"></div>
        <div className="main">
        <h2 id="details-header">{product.name} Details</h2>
        <hr></hr>
        <h4>Condition: {product.condition}</h4>
        <h4>Rarity: {product.rarity}</h4>
        {
            product.ability1 ? <h4>Ability 1: {product.ability1}</h4>
            :
            <></>
        }
        {
             product.ability2 ? <h4>Ability 2: {product.ability2}</h4>
             :
             <></>

        }
        {
            product.ability3 ? <h4>Ability 3: {product.ability3}</h4>
            :
            <></>

        }
        <h4 id="instock">In Stock: {product.inventorycount}</h4>
        <hr></hr>
        <div>
        <button  onClick={() => adjustQuantity("subtract")} id="minus">-</button>
            <div>
                <p id="quantity-count" value={quantity}>{quantity}</p>
            </div>
        <button onClick={() => adjustQuantity("add")} id="plus">+</button>
        <div><button id="addcard">Add To Cart</button></div>
        </div>
        </div>
        </div>
        </div>
    )

}

export default Details;