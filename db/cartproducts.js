const client = require("./client");

const createCartProduct = async ({
  cartid,
  productid,
  quantity
}) => {
  try {
    
    const { rows: [cartitem] } = await client.query(
      `
            INSERT INTO cart_products (cartid, productid, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [cartid, productid, quantity]
    );

    return cartitem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
    createCartProduct
};