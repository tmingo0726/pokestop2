const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
} = require("../db");

//Get all the products
productsRouter.get('/', async (req, res, next) => {
     
    console.log("Inside GET for all products");
    try {
        const products = await getAllProducts();
        res.send({
            data: products,
            success: true,
        });
    } catch ({ error, message }) {
        next({ error, message });
    }
})

module.exports = productsRouter;
  