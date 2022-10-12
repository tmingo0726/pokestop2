import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../stylesheets/Details.css';
const BASE_URL = "http://localhost:4000/api";

let purchaseItems = [];
const Details = (props) => {
    const { productId } = useParams();
    
    const [product, setProduct] = useState({})
    const setCartItems = props.setCartItems;
    let quantity = 1;
    let checkLocalStorage = [];
    

    checkLocalStorage = localStorage.getItem("cartItems");
    console.log("checkLocalStorage is", checkLocalStorage);
    if (checkLocalStorage === null || checkLocalStorage === [] || !checkLocalStorage.length) {
        purchaseItems = [];
    }

    useEffect(() => {
        const selectedProduct = async (id) => {
            setProduct(await fetchProductById(id))
        }
        selectedProduct(productId)
    }, []);

    const fetchProductById = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`);
            const singleProduct = await response.json();
            return singleProduct.data;
        } catch (error) {
            console.error(error);
            setProduct(null)
        }
    }

    const adjustQuantity = (op) => {

        if (op === "add") {
            if (quantity < product.inventorycount) {
                quantity++;
            }
        } else {
            if (quantity > 1) quantity--;
        }

        document.getElementById("quantity-count").innerHTML = quantity;

    }

    const addToCart = (name, price, quantity) => {

        if (!quantity) {
            alert("Please select a quantity");
        } else {

            let item = {
                name: name,
                price: price,
                quantity: quantity
            };

            purchaseItems.push(item);
            localStorage.setItem("cartItems", JSON.stringify([...purchaseItems]));
            setCartItems(JSON.stringify([...purchaseItems]));
            alert("Item successfully added to your cart");
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
            <h4>Ability 1: {product.ability1}</h4>
            {
                product.ability2
                ?
                <h4>Ability 2: {product.ability2}</h4>
                :
                null
            }
            <h4 id="instock">In Stock: {product.inventorycount}</h4>
            <hr></hr>
            <div>
            <button  onClick={() => adjustQuantity("subtract")} id="minus">-</button>
                <div>
                    <p id="quantity-count" value={quantity}>{quantity}</p>
                </div>
            <button onClick={() => adjustQuantity("add")} id="plus">+</button>
            <div><button onClick={() => addToCart(product.name, product.price, quantity)} id="addcard">Add To Cart</button></div>
            </div>
            </div>
            </div>
        </div>
    )

}

export default Details;