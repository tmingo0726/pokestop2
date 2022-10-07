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

  const { id } = adminGetProductIdByName(productName);
  if (!id) {
    res.send({
      error: "Product doesn't exist",
      message: `${productName} doesn't exist in our inventory yet.`,
    });
  }
  const updatedFields = { id };
  if (productName) {
    updatedFields.productName = productName;
  }

  if (price) {
    updatedFields.price = price;
  }

  if (condition) {
    updatedFields.condition = condition;
  }

  if (rarity) {
    updatedFields.rarity = rarity;
  }

  if (ability1) {
    updatedFields.ability1 = ability1;
  }

  if (ability2) {
    updatedFields.ability2 = ability2;
  }

  if (imagelink) {
    updatedFields.imagelink = imagelink;
  }

  if (inventorycount) {
    updatedFields.inventorycount = inventorycount;
  }

  if (isactive) {
    updatedFields.isactive = isactive;
  }
  console.log("UPDATED FIELDS", updatedFields);
  const updatedProduct = await adminUpdateProductById({ id, updatedFields });
  console.log("UPDATED PRODUCT", updatedProduct);

  res.send({
    updatedProduct,
    message: `Successfully updated fields: ${updatedFields}`,
  });
});

adminRouter.patch("/setactiveproduct", requireAdmin, async (req, res, next) => {
  const { name: productName, isactive } = req.body;
  const { id } = adminGetProductIdByName(productName);
  if (!id) {
    res.send({
      error: "Product doesn't exist",
      message: `${productName} doesn't exist in our inventory yet.`,
    });
  }
  await adminSetActiveProductById(id);
  res.send({
    success: `Successfully changed active status for ${productName}`,
  });
});

adminRouter.get("/customerinfo", requireAdmin, async (req, res, next) => {
  const { username } = req.body;
  const viewCustomer = await adminGetCustomerByUsername(username);
  if (!viewCustomer) {
    res.send({
      error: "Customer doesn't exist",
      message: `${username} is not a registerd customer.`,
    });
  }
  res.send({
    success: `${viewCustomer}`,
  });
});
module.exports = adminRouter;
