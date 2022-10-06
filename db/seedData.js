const { createCustomer } = require("./");
const client = require("./client");

const dropTables = async () => {
  console.log("DROPPING TABLES");
  try {
    await client.query(`
            DROP TABLE IF EXISTS customers;
        `);
  } catch (err) {
    console.log("ERROR DROPPING TABLES");
    throw err;
  }
};

const createTables = async () => {
  try {
    await client.query(`
            CREATE TABLE customers (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                address VARCHAR(255) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                isadmin BOOLEAN DEFAULT false
            );
        `);
    console.log("FINISHED BUILDING TABLES!");
  } catch (err) {
    console.log("ERROR BUILDING TABLES!");
    throw err;
  }
};

const createInitialUsers = async () => {
  console.log("STARTING TO CREATE USERS");
  try {
    const customersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        firstname: "Al",
        lastname: "Bert",
        email: "Al.Bert@gmail.com",
        address: "123 Sesame St"
      },
      {
        username: "sandra",
        password: "sandra123",
        firstname: "San",
        lastname: "Dra",
        email: "San.Dra@gmail.com",
        address: "1234 Sesame St"
      },
      {
        username: "glamgal",
        password: "glamgal123",
        firstname: "Glam",
        lastname: "Gal",
        email: "Glam.Gal@gmail.com",
        address: "12345 Sesame St"
      },
    ];
    console.log("CUSTOMERS TO CREATE", customersToCreate);
    const customers = await Promise.all(customersToCreate.map(createCustomer));

    console.log("CUSTOMERS", customers);

    console.log("FINISHED CREATING USERS");
  } catch (err) {
    console.log("ERROR CREATING USERS");
    throw err;
  }
};

// const testDB = async() => {
//     try {
//         console.log('STARTING TO TEST DATABASE')

//         console.log('')
//     }
// }

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (err) {
    console.log("ERROR DURING REBUILDDB");
    throw err;
  }
};

module.exports = {
  rebuildDB,
};
