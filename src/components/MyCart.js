import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:4000/api";

const path = "http://localhost:4000/api";

const MyCart = (props) => {

    // const cartItems = props.cartItems;
    // const setCartItems = props.setCartItems;
    const loggedIn = props.loggedIn;
    const token = props.token;
    // let purchaseItems = [];
    // let checkLocalStorage = [];
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    
    // console.log("Cart items from props is ", cartItems);

    useEffect(() =>{
        const awaitCart = async() =>{
            await getCurrentCart()
            console.log("UE CART", cart)
        }
        awaitCart()
        // console.log("TEST", test)
    }, [])

    //When I refresh the page it clears the props cartItems variable thereby not rendering what's TRULY in the cart.
    //So I need to check local storage instead.
    // checkLocalStorage = localStorage.getItem("cartItems");
    // // console.log("checkLocalStorage is", checkLocalStorage);
    // if (checkLocalStorage && checkLocalStorage.length) {
    //     purchaseItems = JSON.parse(localStorage.getItem("cartItems"));
    // } else {
    //     purchaseItems.length = 0;
    // }

    const getCurrentCart = async () => {
        const sessionCart = localStorage.getItem("cartItems");
        const cartArr = sessionCart ? JSON.parse(sessionCart) : null;
        const cartid = loggedIn ? getCartId() : null;
        console.log("CART ID", cartid);
        console.log("LOGGED IN?", loggedIn);
        console.log("STORAGE RESULT", cartArr);
        if (!loggedIn && sessionCart) {
            setCart(cartArr);
            console.log("SESSION CART", cart)
        } else if(loggedIn && !sessionCart) {
            setCart(await fetchCustomerCart());
            console.log("DB CART", cart)
        } else if(loggedIn && sessionCart) {
            console.log("CART?", cartArr)
            await Promise.all(cartArr.map(cartItem => {
                console.log("PRODOUCT", cartItem)
                addCartItemsToExistingCart({
                    cartid,
                    productid: cartItem.productid,
                    quantity: cartItem.quantity
                })
            }))
            setCart(await fetchCustomerCart());
            localStorage.removeItem("cartItems")
            console.log("LOCAL + DB CART", cart)
        } else {
            setCart([])
        }
    }

    const getCartId = async() => {
        try {
            const response = await fetch(`${BASE_URL}/cart_products`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            const result = await response.json();
            console.log("CART ID", result)
            return result;
        } catch (error) {
            console.error(error);
        }
    } 

    const fetchCustomerCart = async() => {
        try {
            const response = await fetch(`${BASE_URL}/cart_products`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            const result = await response.json();
            console.log("FETCH CART", result)
            return result;
        } catch (error) {
            console.error(error);
            setCart([])
        }
    }

    const addCartItemsToExistingCart = async({cartid, productid, quantity}) => {
        // console.log("CART ITEM", cartItem)
        try {
            const response = await fetch(`${BASE_URL}/cart_products`, {
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        cartid,
                        productid,
                        quantity
                    })
            })
            const result = await response.json();
            console.log("RESULT", result);
        } catch (error) {
            console.error(error);
            setCart([])
        }
    }
        
    // const deleteItem = async (index, productId) => {

        // console.log("Inside delete item", index);
        
    //     if (index === 0) {
    //         purchaseItems.shift();
    //     } else if (index === purchaseItems.length - 1) {
    //         purchaseItems.pop();
    //     } else {
    //         for (let i = index; i < purchaseItems.length; i++) {
    //             purchaseItems[i] = purchaseItems[i + 1];
    //         }
    //         purchaseItems.length -= 1;
    //     }   
        
    //     localStorage.setItem("cartItems", JSON.stringify([...purchaseItems]));
    //     if (purchaseItems.length === 0) {
    //         setCartItems([]);
    //         localStorage.setItem("cartItems", []);
    //     } else {
    //         await setCartItems(JSON.stringify([...purchaseItems]));
    //         //localStorage.setItem("cartItems", JSON.stringify([...purchaseItems]));
    //     }

        //Now call the backend to delete the item from the customer's cart
    //     if (token) {
    //         const response = await fetch(`${path}/cart_products`, {
    //         method: "DELETE",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body : JSON.stringify({
    //                 id: productId
    //             })
    //         });
    //         const data = await response.json();
    //         if (!data.success) {
    //             alert("Error removing purchase item from cart");
    //         } else {
    //             console.log('data', data);
    //             alert("Item successfully deleted from your cart");
    //         }
    //     } 
    // }

    // const adjustQuantity = async (index, productId, quantity) => {

    //     console.log("Index and product are", index, productId, quantity);
    //     //Here we need to increase the quantity by ONLY 1 each time the button is clicked.
    //     //However, we need to make sure the current inventory can handle the increase.
    //     const response = await fetch(`${path}/products/${productId}`);
    //     const data = await response.json();
    //     if (data.success) {
    //         console.log("INVENTORY COUNT is", data.data.inventorycount);
    //         if (data.data.inventorycount < quantity + 1) {
    //             alert("Unable to add this extra card to your card due to inventory constraints");
    //         } else {
    //             purchaseItems[index].quantity++;
    //             await setCartItems(JSON.stringify([...purchaseItems]));
    //             localStorage.setItem("cartItems", cartItems);
    //             //console.log("New quantity is ", purchaseItems[0].inventorycount);
    //         }
    //     } else {
    //         alert("Error attempting to increase purchase quantity");
    //     }

    // }
       
    const goToCheckout = () => {   
       navigate("/checkout")
    }

    //Map through localStorage to retrieve all of the purchase items 
    return (
        <div> {console.log("CART RENDER", cart)}
            <h1>Welcome to your Cart</h1>
            {   
                cart && cart.length ?
                    cart.map((singleItem, i) => {
                        let str = `${singleItem.quantity}   ${singleItem.name} @ $${singleItem.price.replace(",","")} $${singleItem.price.replace(",", "") * singleItem.quantity}`;
                        return (
                            <div className="cart-item" key={i}>
                                <h2>{str} <a onClick={() => deleteItem(i, singleItem.productid)} href="#" className="fa fa-trash"></a>
                                <a onClick={() => adjustQuantity(i, singleItem.productid, singleItem.quantity)} href="#" className="fa fa-plus"></a></h2>
                            </div>
                        );
                    })
                :
                <h2>No Items In Cart</h2>
            }
            <button className="form-btn" onClick={goToCheckout}>Proceed to Checkout</button>
    </div>
  );
}




export default MyCart;