const client = require("./client");

const {} = require("../db");

const adminCheckById = async (id) => {
  try {
    const {
      rows: [admin],
    } = await client.query(`
        SELECT id, username
        FROM customers
        WHERE id = ${id}
        AND isadmin = true;
      `);
    return admin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminCreateProduct = async ({
  name,
  price,
  condition,
  rarity,
  ability1,
  ability2,
  imagelink,
  inventorycount,
  isactive,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
              INSERT INTO products (name, price, condition, rarity, ability1, ability2, imagelink, inventorycount, isactive)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              RETURNING *;
          `,
      [
        name,
        price,
        condition,
        rarity,
        ability1,
        ability2,
        imagelink,
        inventorycount,
        isactive,
      ]
    );

    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminGetProductIdByName = async (name) => {
  try {
    if (!name) {
      return;
    }

    const {
      rows: [product],
    } = await client.query(`
      SELECT id, name
      FROM products
      WHERE name = '${name}'
    `);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminUpdateProductById = async ({ id, ...fields }) => {
  console.log("ID AND FIELDS", id, fields);
  const columns = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");
  console.log("COLUMNS", columns);

  if (columns.length === 0) {
    return;
  }
  console.log("Object.values(fields)", Object.values(fields));
  try {
    const {
      rows: [product],
    } = await client.query(
      `
              UPDATE products
              SET ${columns}
              WHERE id = ${id}
              RETURNING *;
          `,
      Object.values(fields)
    );
    console.log("PRODUCT", product);

    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminSetActiveProductById = async (id, bool) => {
  try {
    const {
      rows: [product],
    } = await client.query(`
    UPDATE products
    SET isactive = ${bool}
    WHERE id = ${id}
    RETURNING *;
    `);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminGetCustomerByUsername = async (username) => {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
            SELECT id, username, firstname, lastname, email, address, isadmin
            FROM customers
            WHERE username = '${username}';
        `
    );

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  adminCheckById,
  adminCreateProduct,
  adminGetProductIdByName,
  adminUpdateProductById,
  adminSetActiveProductById,
  adminGetCustomerByUsername,
};
