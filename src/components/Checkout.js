import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../stylesheets/Checkout.css';

const Checkout = () => {
    console.log('Checkout');
    let subTotal = 0;
    const handleSubmit = (event) => {
        event.preventDefault();
      };

      const cart = localStorage.getItem("cartItems");
      const cartItem = JSON.parse(cart);
      if (cartItem.length){
        cartItem.map((item, i) => {
          subTotal += Number(item.price.replace(",", ""));
        })
      }
      console.log('Subtotal', subTotal)
      
  
      const Tax = subTotal * .0825;
      const Total = subTotal + Tax;
      console.log("Bill", subTotal, Tax, Total);

      

    return (
        <div>
          <form id="checkout" className="form" onSubmit={handleSubmit}>
                <h2 className="form-header">Payment Info</h2>
                <hr className="form-divider"></hr>
                <div className="input-wrapper">
                  <input
                    className="form-inputs"
                    type="text"
                    placeholder="Name On Card"
                    required
                  ></input>
                  <input
                    className="form-inputs"
                    required
                    type="CC Number"
                    placeholder="Credit Card Number"
                    minLength={16}
                  ></input>
                  <input
                    className="form-inputs"
                    placeholder="Security Code"
                    required
                    type="Security Code"
                  ></input>
                  <textarea
                    id="billing-address-input"
                    className="form-inputs"
                    type="text"
                    placeholder="Billing Address&#10;City&#10;State&#10;Zip Code"
                    required
                  ></textarea>
                </div>
                <div>
                  <p className="misc-form-text">Subtotal: &emsp; ${subTotal}</p>
                  <p className="misc-form-text">Tax: &emsp; &emsp; &emsp; &nbsp; ${Tax}</p>
                  <p className="misc-form-text">Total: &emsp; &emsp; &nbsp; ${Total}</p>
                </div>
                <div>
                  <button className="form-btn" type="submit">Submit Payment!</button>
                </div>
          </form>
        </div>
      );

    };
  



export default Checkout;
