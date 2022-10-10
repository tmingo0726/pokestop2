const express = require("express");
const adminRouter = express.Router();
const {
  adminCreateProduct,
  adminGetProductIdByName,
  adminUpdateProductById,
  adminSetActiveProductById,
  adminGetCustomerByUsername,
} = require("../db");
const { requireAdmin } = require("./utils");

adminRouter.post("/products", requireAdmin, async (req, res, next) => {
  const fieldName = ({
    name: productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive,
  } = req.body);

  try {
    const _product = await adminGetProductIdByName(productName);
    if (_product) {
      next({
        error: "Product Exists",
        message: `${productName} already exists. Try making it active.`,
      });
    }
    const product = await adminCreateProduct(fieldName);
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

adminRouter.patch("/editproduct", requireAdmin, async (req, res, next) => {
  const adminInputs = ({
    name: productName,
    price,
    condition,
    rarity,
    ability1,
    ability2,
    imagelink,
    inventorycount,
    isactive,
  } = req.body);

  const { id } = await adminGetProductIdByName(productName);

  if (!id) {
    next({
      error: "Product doesn't exist",
      message: `${productName} doesn't exist in our inventory yet.`,
    });
  }
  adminInputs.id = id;

  try {
    const updatedProduct = await adminUpdateProductById(adminInputs);

    if (updatedProduct) {
      res.send({
        updatedProduct,
        message: `Successfully updated fields: ${adminInputs}`,
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.patch("/setactiveproduct", requireAdmin, async (req, res, next) => {
  const { name: productName, isactive } = req.body;
  try {
    const product = await adminGetProductIdByName(productName);
    if (!product) {
      next({
        error: "Product doesn't exist",
        message: `${productName} doesn't exist in our inventory yet.`,
      });
    } else {
      const id = product.id;
      await adminSetActiveProductById(id, isactive);

      res.send({
        success: `Successfully changed active status for ${productName}`,
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

adminRouter.get("/customerinfo", requireAdmin, async (req, res, next) => {
  const { username } = req.body;
  try {
    const viewCustomer = await adminGetCustomerByUsername(username);
    console.log("CUST", viewCustomer);
    if (!viewCustomer) {
      next({
        error: "Customer doesn't exist",
        message: `${username} is not a registerd customer.`,
      });
    } else {
      res.send({
        success: `${viewCustomer}`,
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});
module.exports = adminRouter;
