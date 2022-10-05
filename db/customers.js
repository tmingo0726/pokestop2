const client = require("./client");
const bcrypt = require("bcrypt");

const createCustomer = async ({
  username,
  password,
  firstname,
  lastname,
  email,
  address,
  isadmin,
}) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [customer],
    } = await client.query(
      `
            INSERT INTO customers (username, password, firstname, lastname, email, address, isadmin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (username, email) DO NOTHING
            RETURNING id, username;
        `,
      [username, hashedPassword, firstname, lastname, email, address, isadmin]
    );

    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomer = async ({ username, password }) => {
  try {
    const customer = await getCustomerByUsername(username);
    const hashedPassword = customer.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      const validCustomer = {
        id: customer.id,
        username: customer.username,
      };
      return validCustomer;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerById = async (customerId) => {
  try {
    const {
      rows: [customer],
    } = await client.query(`
            SELECT id, username
            FROM users
            WHERE id = ${customerId};
        `);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomerByUsername = async (username) => {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username = $1;
        `,
      [username]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const isAdmin = async ({ username, password }) => {
  try {
    const user = await getCustomerByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      const admin = {
        id: user.id,
        username: user.username,
      };
      return admin;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  getCustomerByUsername,
  isAdmin,
};
