import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//import { loadStripe } from "@stripe/stripe-js";
//import '../stylesheets/MyCart.css'

//let stripePromise;

const MyCart = (props) => {

    console.log("Inside cart endpoint");
    const cartItems = props.cartItems;
    const setCartItems = props.setCartItems;


    const purchaseItems = localStorage.getItem("cartItems");
    const testItems = JSON.parse(purchaseItems);
    console.log("Purchase Items are ", Object.keys(testItems));
    //const testItems = purchaseItems.json();
    //console.log("Item from local storage is ", itepym);
    //console.log("Current cart item is ", testItems);



    /*
    const key = "pk_test_51Lr4m0KMgpGl7kEFPICUiPJ1j9Qs8mXMKCjWbDp8Z9fjbS8ptGQUkcjVtTnHJIz6hbA8DhpLhfNyEJifFiSb07GQ00bRqHvuil";

    const getStripe = () => {

        if (!stripePromise) {
            stripePromise = loadStripe(key);
        }
        return stripePromise;
    }
    const item = [];
    item.push({price: "price_1LrPCHKMgpGl7kEFZfgLeFgQ", quantity: 2});
    item.push({price: "price_1LrPBWKMgpGl7kEFLP5R97Ry", quantity: 3});
    
    const checkoutOptions = {
        lineItems: item,
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    }
    
    const redirectToCheckout = async () => {
    
        console.log("redirectToCheckout");
    
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error", error);
    }
    */
    

    //Map through localStorage to retrieve all of the purchase items 
    
    return (
        <div>
            <h1>Welcome to your Cart</h1>
            {
            testItems.map((singleItem, i) => {
                console.log("single item is ", singleItem);
                return (
                    <div className="cart-item" key={i}>
                        <h2>NAME: {singleItem.name}</h2>
                        <h2>PRICE: {singleItem.price}</h2>
                        <h2>QUANTITY: {singleItem.quantity}</h2>
                    </div>
                );
        })}
    </div>
  );
}


export default MyCart;