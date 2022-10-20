import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/MyCart.css";
const path = "http://localhost:4000/api";

let cartItemsArr = [];
let runningTotal = 0;
const MyCart = (props) => {

  const [allCartItems, setAllCartItems] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  let priceTotal = props.priceTotal;
  const setPriceTotal = props.setPriceTotal;
  const Monetize = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })


  useEffect(() =>{

    
    priceTotal = 0;
    runningTotal = 0;
    console.log("Inside useEffect and priceTotal/running total are:", priceTotal, runningTotal);
    const awaitCart = async() =>{
      await getCurrentCart();
    }
    awaitCart();
  }, []);


  //This is coming from the Add To Cart button press in Details...
  
  const token = localStorage.getItem("token");

  const putInCartProductsTable = async (product) => {

    const cartInfo = await getCustomerCartInfo();
    console.log("About to write to DB:", cartInfo);
    if (cartInfo.length && token) {
      try {
        const response = await fetch(`${path}/cart_products`, {
            method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                  cartid : cartInfo.cartid,
                  productid : product.id,
                  quantity : product.quantity
              })
        })
        const result = await response.json();
        console.log("RESULT from putInCartProductsTable:", result);
      } catch (error) {
        console.error(error);
        //setCart([]);
      }
    } else {
      console.log("EMPTY CART or No Customer Logged in");
    }
  }

  //This routine is used to sometimes just provide the cart ID and also
  //used to return all of the items in a cart for a customer
  const getCustomerCartInfo = async () => {

    //Since there can be only 1 open cart per customer all we need is the token
    let result;
    try {
      const response = await fetch(`${path}/cart_products`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
      });
      result = await response.json();
      console.log("From getCustomerCartInfo Result is:", result);
      localStorage.setItem("CartItems", JSON.stringify(result));
      return result;
    } catch (error) {
      console.error(error);
      //setCart([])
    }
  }
  

  const getCurrentCart = async () => {

    const sessionCart = localStorage.getItem("singleCartItem");
    //Only add the card if the customer actually picked something in details to add
    if (sessionCart) {
      const productFromDetailsPage = JSON.parse(sessionCart);
      console.log("productFromDetailsPage:", productFromDetailsPage[0].name);
      //Let's go ahead and put this in the cart_products table
      await putInCartProductsTable(productFromDetailsPage[0]);
    }

    //We need to get what's in the cart regardless of whether or not something was chosen from the Details page
    await getCustomerCartInfo();
    cartItemsArr = await JSON.parse(localStorage.getItem("CartItems"));
    cartItemsArr.map((item, index) => {
      console.log("before computation price total is:", priceTotal);
      runningTotal += Number(priceTotal + item.price.replace(",", "") * item.quantity);
      console.log("How many times are we coming here?", runningTotal);
    });
    setPriceTotal(runningTotal);
    console.log("cartItemsArr is:", cartItemsArr.length);
    localStorage.setItem("singleCartItem", []);
    setAllCartItems(cartItemsArr);
    
  }
  
 
  
  return(
    <div>
      <div>
        <h1 id="mycart-heading">Your Cart: {Monetize.format(priceTotal)}</h1>
        {
          allCartItems.length ?
          allCartItems.map((singleItem, index) => {
            return (
              <div className="cart-item" key={index}>
                <div id="img-name">
                <img id="cp-img" src={singleItem.imagelink} width="50px" height="75px"/>
                <h2>{singleItem.quantity} {singleItem.name} {Monetize.format(Number(singleItem.price.replace(",", "") * singleItem.quantity))}</h2>
                </div>
              </div>
            )
          })
          :
          <>
          <h2>Cart is currently empty</h2>
          </>
        }
    </div>
    <div>
      {
        <div>
          <hr></hr>
          <h2>Total: {Monetize.format(priceTotal)}</h2>
        </div>
      }
    </div>
  </div>
  )
}


 export default MyCart;   