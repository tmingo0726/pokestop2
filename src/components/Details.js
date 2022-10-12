import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../stylesheets/Details.css';

let purchaseItems = [];
const Details = (props) => {

    const chosenCard = props.chosenCard;
    const cartItems = props.cartItems;
    const setCartItems = props.setCartItems;
    let quantity = 0;
    let checkLocalStorage = [];
    
    const productNotParsed = localStorage.getItem("currentDetails");
    const product = JSON.parse(productNotParsed);
    
    checkLocalStorage = localStorage.getItem("cartItems");
    console.log("checkLocalStorage is", checkLocalStorage);
    if (checkLocalStorage === null || checkLocalStorage === [] || !checkLocalStorage.length) {
        purchaseItems = [];
    }

    console.log("Inside Product Details card picked is", product);
    let navigate = useNavigate();

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

    const addToCart = async (name, price, quantity, productId) => {

        console.log("name price quantity product id: ", name, price, quantity, productId);
        const path = "http://localhost:4000/api";
        const token = localStorage.getItem("token");

        if (!quantity) {
            alert("Please select a quantity");
        } else {

          let item = {
            name: name,
            price: price,
            quantity: quantity,
            productid: productId,
          };

          purchaseItems.push(item);
          localStorage.setItem("cartItems", JSON.stringify([...purchaseItems]));
          setCartItems(JSON.stringify([...purchaseItems]));

          //Here I am ready to POST to cart_products table with data I have
          if (token) {
                const response = await fetch(`${path}/cart_products`, {
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify({
                    
                          productid: productId,
                          quantity: quantity
                 
                    })
                });
                const data = await response.json();
                if (!data.success) {
                    alert("Error adding purchase item to cart");
                } else {
                    console.log('data', data);
                    alert("Item successfully added to your cart");
                }
            } else {
                alert("No valid user is logged in.");
            }
        }
    }

    return(
        <div>
        <div className="grid-container">
            <div className="caption"><img className="grid-item" src={product.imagelink} alt="Pokemon"/>
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
        <div><button onClick={() => addToCart(product.name, product.price, quantity, product.id)} id="addcard">Add To Cart</button></div>
        </div>
        </div>
        </div>
        </div>
    )

}

export default Details;