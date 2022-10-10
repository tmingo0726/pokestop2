const client = require("./client");

const createCart = async ({
  customerid,
  isopen,
}) => {
  try {
    
    const { rows: [cart] } = await client.query(
      `
            INSERT INTO carts (customerid, isopen)
            VALUES ($1, $2)
            RETURNING *;
        `,
      [customerid, isopen]
    );

    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
    createCart
};