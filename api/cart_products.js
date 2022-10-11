const express = require("express");
const cartProductsRouter = express.Router();
const {
    getOpenCartByCustomerId, getCartIdbyCustomerId, createCartProduct
} = require("../db");
const { requireUser } = require("./utils");

cartProductsRouter.get("/", requireUser, async(req, res, next) => {
    const { id } = req.user;
    console.log('USER', req.user)

    try {
        const cart = await getOpenCartByCustomerId(id);

        console.log("CART", cart)

        if(cart.length === 0 || Object.keys(cart).length === 0) {
            res.send({
                message: "Cart is Empty"
            })
        } else {
            res.send(cart)
        }
    } catch ({ error, message }) {
        next({ error, message });
    }
})

cartProductsRouter.post("/", requireUser, async(req, res, next) => {
    const { id: customerId } = req.user;
    const { productid, quantity } = req.body;

    try {
        const { id: cartId } = await getCartIdbyCustomerId(customerId);

        const cartItem = await createCartProduct({cartId, productid, quantity})

        res.send({
            cartItem,
            success: "Successfully added to cart"
        })
    } catch ({ error, message }) {
        next({ error, message });
    } 
})

cartProductsRouter.delete("/", requireUser, async(req, res, next) => {
    
})

module.exports = cartProductsRouter;