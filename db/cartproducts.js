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

const getProductsByCartId = async(cartId) => {
  try {
    const { 
      rows
    } = await client.query(
      `
        SELECT products.id, cart_products.*, carts.isopen
        FROM products
        JOIN cart_products
          ON cart_products.productid = products.id
        JOIN carts
          ON carts.id = cart_products.cartid
        WHERE carts.isopen = true
          AND carts.id = ${cartId};
      `
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
    createCartProduct,
    getProductsByCartId
};