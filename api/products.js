const express = require("express");
const productsRouter = express.Router();
const client = require("../db/client");

const { getAllProducts } = require("../db");

//Get all the products
productsRouter.get("/", async (req, res, next) => {
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
});

productsRouter.patch("/", async (req, res, next) => {

  const { id, amountToSubtract } = req.body;

  console.log("inside patch product and params are", id, amountToSubtract);

  try {
    const { rows: [product] } = await client.query(
      `
      UPDATE products
      SET inventorycount = inventorycount - ${amountToSubtract}
      WHERE products.id = ${id}
      RETURNING *;
    `);
    
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }


})

module.exports = productsRouter;
