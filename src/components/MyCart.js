import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const MyCart = (props) => {

    const cartItems = props.cartItems;
    const setCartItems = props.setCartItems;
    let purchaseItems = [];
    let checkLocalStorage = [];
    
    console.log("Cart items from props is ", cartItems);

    //When I refresh the page it clears the props cartItems variable thereby not rendering what's TRULY in the cart.
    //So I need to check local storage instead.
    checkLocalStorage = localStorage.getItem("cartItems");
    console.log("checkLocalStorage is", checkLocalStorage);
    if (checkLocalStorage.length) {
        purchaseItems = JSON.parse(localStorage.getItem("cartItems"));
    } else {
        purchaseItems.length = 0;
    }
        
    const deleteItem = async (index) => {

        console.log("Inside delete item", index);

        if (index === 0) {
            purchaseItems.shift();
        } else if (index === purchaseItems.length - 1) {
            purchaseItems.pop();
        } else {
            for (let i = index; i < purchaseItems.length; i++) {
                purchaseItems[i] = purchaseItems[i + 1];
            }
            purchaseItems.length -= 1;
        }   
        
        localStorage.setItem("cartItems", JSON.stringify([...purchaseItems]));
        if (purchaseItems.length === 0) {
            setCartItems([]);
            localStorage.setItem("cartItems", []);
        } else {
            await setCartItems(JSON.stringify([...purchaseItems]));
            //localStorage.setItem("cartItems", JSON.stringify([...purchaseItems]));
        }
   }
    

    //Map through localStorage to retrieve all of the purchase items 
    return (
        <div>
            <h1>Welcome to your Cart</h1>
            {
                purchaseItems.length ?
                    purchaseItems.map((singleItem, i) => {
                        let str = `${singleItem.quantity}   ${singleItem.name} @ $${singleItem.price.replace(",","")} $${singleItem.price.replace(",", "") * singleItem.quantity}`;
                        return (
                            <div className="cart-item" key={i}>
                                <h2>{str} <a onClick={() => deleteItem(i)} href="#" className="fa fa-trash"></a></h2>
                            </div>
                        );
                    })
                :
                <></>
            }
            <button className="form-btn">Proceed to Checkout</button>
    </div>
  );
}




export default MyCart;