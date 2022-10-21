import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../stylesheets/MyCart.css";
const path = "http://localhost:4000/api";

let cartItemsArr = [];
let runningTotal = 0;
const MyCart = (props) => {

  const [allCartItems, setAllCartItems] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState('Select Quantity');
  const [subTotal, setSubTotal] = useState(0);

  let priceTotal = props.priceTotal;
  const setPriceTotal = props.setPriceTotal;
  const navigate = useNavigate();

  const Monetize = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  const quantities = [
    { label: "1", value: 1},
    { label: "2", value: 2},
    { label: "3", value: 3},
    { label: "4", value: 4},
    { label: "5", value: 5},
    { label: "6", value: 6},
    { label: "7", value: 7},
  ];

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

  const removeFromCartProductsTable = async (id) => {

    try {
      const response = await fetch(`${path}/cart_products`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body : JSON.stringify({
              id
          })
      });
      const result = await response.json();
      console.log("DEL RESULT", id, result.deletedProduct.id)
      return result;               
    } catch (error) {
      console.error(error);
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
  
  const deleteItem = async (id, totalPriceOfItem) => {

    console.log("Inside delete item", id, totalPriceOfItem);
    const result = await removeFromCartProductsTable(id);
    //TBD: Add quantity back to inventory count

    console.log("Inside deleteItem and result is:", result);
    priceTotal = 0;
    runningTotal = 0;
    await getCurrentCart();

  }

  const updateProductInventoryCount = async (qty, id) => {
    
    console.log("Inside updateProductInventoryCount and qty/id are:", qty, id);
    const response = await fetch(`${path}/products/`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          id : id,
          amountToSubtract: qty
      })
    });
    const result = await response.json();
    console.log("Result FROM updateProductInventoryCount:", result);
  }

  const checkInventory = async (qty, productId) => {

    console.log("Inside check inventory and qty/id are:", qty, productId)
    try {
      const response = await fetch(`${path}/products/${productId}`);
      const { data } = await response.json();
      console.log("DATA", data)

      if (data) {
        if (qty > data.inventorycount) {
          return false;
        } else {
          //Let's update the product's inventorycount field...
          //updateProductInventoryCount(qty, productId);
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleQtyChange = async (updatedQty, id, productId) => {

    console.log("Quantity changed to:", updatedQty, id, productId);
    const isEnough = await checkInventory(updatedQty, productId);
    console.log("Is Enough is:", isEnough);
    
    //First let's update the quantity in the cart_products table
    //We can use the current token to get the current open cart
    if (isEnough) {
      setUpdateQuantity(updatedQty);
      const response = await fetch(`${path}/cart_products`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            id,
            quantity: updatedQty,
        })
      });
      const result = await response.json();
      console.log("QTY UPDATED:", result);
      if (result.success) {
        priceTotal = 0;
        runningTotal = 0;
        getCurrentCart();
      }
    } else {
      alert("Quantity exceeds Inventory -- Please choose a smaller amount");
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
    if (cartItemsArr.length) {
      cartItemsArr.map((item, index) => {
        console.log("before computation price total is:", priceTotal);
        runningTotal += Number(priceTotal + item.price.replace(",", "") * item.quantity);
        console.log("How many times are we coming here?", runningTotal);
      });
    }
    setPriceTotal(runningTotal);
    console.log("cartItemsArr is:", cartItemsArr.length);
    localStorage.setItem("singleCartItem", []);
    setAllCartItems(cartItemsArr);
    
  }
  
 const proceedToCheckout = () => {

  console.log("Inside Proceed to Checkout");
  navigate("/checkout");

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
                <h3 id="single-item">{singleItem.quantity} {singleItem.name} {Monetize.format(Number(singleItem.price.replace(",", "") * singleItem.quantity))}
                <i
                              id="trash"
                              className="fa-solid fa-trash-can fa-xl"
                              onClick={() => deleteItem(singleItem.id,
                                Number(singleItem.price.replace(",", "")) * 
                                singleItem.quantity)}
                            ></i>
                <select id="qty-select" onChange={(e) => handleQtyChange(e.target.value, singleItem.id, singleItem.productId)}>
                  <option value="Update Quantity">Update Quantity</option>
                  {quantities.map((qty) => <option value={qty.value}>{qty.label}</option>)}
                </select></h3>
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
          <h2>Total: {Monetize.format(priceTotal)}
          <button className="form-btn" onClick={proceedToCheckout}>Proceed To Checkout</button></h2>
        </div>
      }
    </div>
  </div>
  )
}


 export default MyCart;   