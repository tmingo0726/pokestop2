import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Products.css'

const Products = (props) => {

    //const [error, setError] = useState("");
    //const [errorMessage, setErrorMessage] = useState("");
    
    const allProducts = props.allProducts;
    const setAllProducts = props.setAllProducts;
    const chosenCard = props.chosenCard;
    const setChosenCard = props.setChosenCard;

    const navigate = useNavigate();

    useEffect(() => {
        const getAllData = async () => {
          await getAllProducts();
        };
        getAllData();
    }, []);

    const BASE_URL = "http://localhost:4000/api";

    const getAllProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            const result = await response.json();
            if (result.success) {
                console.log("SUCCESS! RESULT:", result);
                setAllProducts(result.data);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    const seeDetails = (product) => {

        setChosenCard(product);
        console.log("Clicked on Card id", product);
        navigate("/products/details");

    }


    return (
        <div>
            <h1 id="products-heading">Cards For Sale</h1>
            {
            allProducts.map((product, i) => {
                return (
                    
                    <div className="grid-container" key={i}>
                        <div className="caption"><img className="grid-item" src={product.imagelink} onClick={() => seeDetails(product)} alt="Pokemon"/>

                        <p>Price: ${product.price}</p>
                        <p>Cards in Stock: {product.inventorycount}</p></div>
                    </div>
                )
            })
            }
        </div>
    );

}

export default Products;