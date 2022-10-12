import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const MyCart = (props) => {

    const cartItems = props.cartItems;
    const setCartItems = props.setCartItems;
    let purchaseItems = [];
    let checkLocalStorage = [];
    const navigate = useNavigate();
    
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
        
    const deleteItem = async (index, productId) => {

        console.log("Inside delete item", index);
        const path = "http://localhost:4000/api";
        
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

        //Now call the backend to delete the item from the customer's cart
        const token = localStorage.getItem("token");
        if (token) {
            const response = await fetch(`${path}/cart_products`, {
            method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    id: productId
                })
            });
            const data = await response.json();
            if (!data.success) {
                alert("Error removing purchase item from cart");
            } else {
                console.log('data', data);
                alert("Item successfully deleted from your cart");
            }
        } else {
            alert("No valid user is logged in.");
        }
    }
       
    const goToCheckout = () => {
            
       navigate("/checkout")
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
                                <h2>{str} <a onClick={() => deleteItem(i, singleItem.productid)} href="#" className="fa fa-trash"></a></h2>
                            </div>
                        );
                    })
                :
                <></>
            }
            <button className="form-btn" onClick={goToCheckout}>Proceed to Checkout</button>
    </div>
  );
}




export default MyCart;