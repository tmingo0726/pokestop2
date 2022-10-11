const express = require("express");
const cartProductsRouter = express.Router();
const {
    getOpenCartByCustomerId
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

module.exports = cartProductsRouter;