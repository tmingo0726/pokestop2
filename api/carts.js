const express = require("express");
const cartsRouter = express.Router();
const { requireUser } = require("./utils");
const { getCartIdbyCustomerId, closeCart } = require("../db");

cartsRouter.patch("/", requireUser, async(req, res, next) => {
    const { id: customerId } = req.user;
    console.log("Inside cart patch and customer Id is", customerId);
    try {
        const { id: cartid } = await getCartIdbyCustomerId(customerId);

        console.log("cartId is ", cartid);
        const cart = await closeCart(cartid)
        console.log("cart is", cart);

        res.send({
            cart,
            success: "Successfully closed the cart"
        })
    } catch ({ error, message }) {
        next({ error, message });
    } 
})

module.exports = cartsRouter;