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

const getOpenCartByCustomerId = async(customerId) => {
  try {
    const { 
      rows
    } = await client.query(
      `
        SELECT cart_products.id,
          jsonb_agg(jsonb_build_object(
            'id', products.id,
            'name', products.name,
            'price', products.price,
            'quantity', cart_products.quantity,
            'imagelink', products.imagelink
          )) as products
        FROM products
        JOIN cart_products
          ON cart_products.productid = products.id
        JOIN carts
          ON carts.id = cart_products.cartid
        WHERE carts.isopen = true
          AND carts.customerid = ${customerId}
        GROUP BY cart_products.id;
      `
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getPastOrdersByCustomerId = async(customerId) => {
  try {
    const { 
      rows
    } = await client.query(
      `
        SELECT cart_products.id,
          jsonb_agg(jsonb_build_object(
            'id', products.id,
            'name', products.name,
            'price', products.price,
            'quantity', cart_products.quantity,
            'imagelink', products.imagelink
          )) as products
        FROM products
        JOIN cart_products
          ON cart_products.productid = products.id
        JOIN carts
          ON carts.id = cart_products.cartid
        WHERE carts.isopen = false
          AND carts.customerid = ${customerId}
        GROUP BY cart_products.id;
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
    getOpenCartByCustomerId,
    getPastOrdersByCustomerId
};