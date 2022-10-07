const express = require("express");
const adminRouter = express.Router();
const {
  adminCheckById,
  adminCreateProduct,
  adminGetProductIdByName,
  adminUpdateProductById,
  adminSetActiveProductById,
  adminGetCustomerByUsername,
} = require("../db");
const { requireAdmin } = require("./utils");

adminRouter.post("/products", requireAdmin, async (req, res, next) => {
  const fieldName = ({
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive,
  } = req.body);
  const { name } = req.body;
  try {
    const _product = await adminGetProductIdByName(name);
    if (_product) {
      next({
        error: "Product Exists",
        message: `${name} already exists. Try making it active.`,
      });
    }
    const product = await adminCreateProduct({ name, fieldName });
    if (!product) {
      next({
        error: "Error Creating Product",
        message: "Error Creating Product",
      });
    }
    res.send({
      product,
      success: "Product Created!",
    });
  } catch ({ error, message }) {
    next({ error, message });
  }
});

module.exports = adminRouter;
