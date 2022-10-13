import { useState, useEffect } from "react";
import "../stylesheets/PurchaseHistory.css";
import Products from "./Products";

const BASE_URL = "http://localhost:4000/api";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const token = localStorage.getItem("token");

  const getPurchaseHistory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart_products/closedcarts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setPurchases(result);
      console.log("PURCHASE HISTORY RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getPurchaseHistory();
  }, []);
  return (
    <div id="purchase-history-table">
      {purchases.map((purchase, i) => {
        console.log("PURCHASE", purchase);
        return (
          <div className="purchase-container" key={i}>
            <div>
              <img className="purchase-picture" src={purchase.imagelink}></img>
              <span>Name: {purchase.name}</span> {""}
              {/* <p>{purchase.price}</p> */}
              <span>Quantity: {purchase.quantity}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseHistory;
