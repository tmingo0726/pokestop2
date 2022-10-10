const {
  createCustomer,
  adminCheckById,
  adminCreateProduct,
  adminGetProductIdByName,
  adminUpdateProductById,
  adminSetActiveProductById,
  adminGetCustomerByUsername,
} = require("./");
const client = require("./client");

const dropTables = async () => {
  console.log("DROPPING TABLES");
  try {
    await client.query(`
      DROP TABLE IF EXISTS products;      
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
            
            CREATE UNIQUE INDEX uname_email on customers (username, email);

            CREATE TABLE products (
              id SERIAL PRIMARY KEY,
              name VARCHAR(50) UNIQUE NOT NULL,
              price VARCHAR(20) NOT NULL,
              condition VARCHAR(50) NOT NULL,
              rarity VARCHAR(50) NOT NULL,
              ability1 VARCHAR(500) NOT NULL,
              ability2 VARCHAR(500),
              imagelink VARCHAR(255) NOT NULL,
              inventorycount INTEGER NOT NULL,
              isactive BOOLEAN DEFAULT true
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
        address: "123 Sesame St",
        isadmin: true,
      },
      {
        username: "sandra",
        password: "sandra123",
        firstname: "San",
        lastname: "Dra",
        email: "San.Dra@gmail.com",
        address: "1234 Sesame St",
      },
      {
        username: "glamgal",
        password: "glamgal123",
        firstname: "Glam",
        lastname: "Gal",
        email: "Glam.Gal@gmail.com",
        address: "12345 Sesame St",
      },
    ];
    console.log("CUSTOMERS TO CREATE", customersToCreate);
    const customers = await Promise.all(customersToCreate.map(createCustomer));

    console.log("CUSTOMERS", customers);

    console.log("FINISHED CREATING CUSTOMERS");
  } catch (err) {
    console.log("ERROR CREATING CUSTOMERS");
    throw err;
  }
};

const createInitialProducts = async () => {
  console.log("STARTING TO CREATE PRODUCTS");
  try {
    const productsToCreate = [
      {
        name: "Charizard",
        price: "30,000",
        condition: "Good",
        rarity: "Holo",
        ability1:
          "Energy Burn: As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
        ability2:
          "Fire Spin: Discard 2 Energy cards attached to Charizard in order to use this attack.",
        imagelink: "https://images.pokemontcg.io/base1/4_hires.png",
        inventorycount: 35,
        isactive: true,
      },
      {
        name: "Blastoise",
        price: "50,000",
        condition: "Mint",
        rarity: "Holo",
        ability1:
          "Rain Dance: As often as you like during your turn (before your attack), you may attach 1 Water Energy card to 1 of your Water Pokémon. (This doesn't use up your 1 Energy card attachment for the turn.) This power can't be used if Blastoise is Asleep, Confused, or Paralyzed.",
        ability2:
          "Hydro Pump: Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count.",
        imagelink: "https://images.pokemontcg.io/base1/2_hires.png",
        inventorycount: 50,
        isactive: true,
      },
      {
        name: "Venusaur",
        price: "5,000",
        condition: "Poor",
        rarity: "Holo",
        ability1:
          "Energy Trans: As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can't be used if Venusaur is Asleep, Confused, or Paralyzed.",
        ability2: "Solarbeam",
        imagelink: "https://images.pokemontcg.io/base1/15_hires.png",
        inventorycount: 10,
        isactive: true,
      },
      {
        name: "Mewtwo",
        price: "10,000",
        condition: "Good",
        rarity: "Holo",
        ability1:
          "Psychic: Does 10 damage plus 10 more damage for each Energy card attached to the Defending Pokémon.",
        ability2:
          "Barrier: Discard 1 Psychic Energy card attached to Mewtwo in order to prevent all effects of attacks, including damage, done to Mewtwo during your opponent's next turn.",
        imagelink: "https://images.pokemontcg.io/base1/10_hires.png",
        inventorycount: 3,
        isactive: true,
      },
      {
        name: "Zapdos",
        price: "300",
        condition: "Poor",
        rarity: "Holo",
        ability1:
          "Thunder: Flip a coin. If tails, Zapdos does 30 damage to itself.",
        ability2:
          "Thunderbolt: Discard all Energy cards attached to Zapdos in order to use this attack.",
        imagelink: "https://images.pokemontcg.io/base1/16_hires.png",
        inventorycount: 1,
        isactive: true,
      },
      {
        name: "Raichu",
        price: "69.99",
        condition: "Good",
        rarity: "Holo",
        ability1:
          "Agility: Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Raichu.",
        ability2:
          "Thunder: Flip a coin. If tails, Raichu does 30 damage to itself.",
        imagelink: "https://images.pokemontcg.io/base1/14_hires.png",
        inventorycount: 2,
        isactive: true,
      },
    ];

    console.log("PRODUCTS TO CREATE", productsToCreate);
    const products = await Promise.all(
      productsToCreate.map(adminCreateProduct)
    );
    console.log("PRODUCTS", products);
    console.log("FINISHED CREATING PRODUCTS");
  } catch (err) {
    console.log("ERROR CREATING PRODUCTS");
    throw err;
  }
};

// const testAdminCheckById = async (id) => {
//   try {
//     const testing = await adminCheckById(id);
//     console.log("TESTING", testing);
//     return testing;
//   } catch (error) {
//     throw error;
//   }
// };

// const testAdminCreateProduct = async (
//   name,
//   price,
//   condition,
//   rarity,
//   ability1,
//   ability2,
//   imagelink,
//   inventorycount,
//   isactive
// ) => {
//   try {
//     const testing = await adminCreateProduct(
//       name,
//       price,
//       condition,
//       rarity,
//       ability1,
//       ability2,
//       imagelink,
//       inventorycount,
//       isactive
//     );
//     console.log("TESTING", testing);
//   } catch (error) {
//     throw error;
//   }
// };

// const testAdminGetProductIdByName = async (name) => {
//   try {
//     const testing = await adminGetProductIdByName(name);
//     console.log("TESTING", testing);
//   } catch (error) {
//     throw error;
//   }
// };

// const fields = { id: 4, name: "Mew", isactive: false };

// const testAdminUpdateProductById = async (fields) => {
//   try {
//     const testing = await adminUpdateProductById(fields);
//     console.log("TESTING", testing);
//   } catch (error) {
//     throw error;
//   }
// };

// const testAdminSetActiveProductById = async (id, bool) => {
//   try {
//     const testing = await adminSetActiveProductById(id, bool);
//     console.log("TESTING", testing);
//   } catch (error) {
//     throw error;
//   }
// };

// const testAdminGetCustomerByUsername = async (username) => {
//   try {
//     const testing = await adminGetCustomerByUsername(username);
//     console.log("TESTING", testing);
//   } catch (error) {
//     throw error;
//   }
// };

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    // await testAdminCreateProduct({
    //   name: "Mewtwo",
    //   price: "1,000,000",
    //   condition: "mint",
    //   rarity: "holo",
    //   ability1: "psychic",
    //   ability2: "psychic2",
    //   imagelink: "https://images.pokemontcg.io/base1/10_hires.png",
    //   inventorycount: 1,
    //   isactive: true,
    // });
  } catch (err) {
    console.log("ERROR DURING REBUILDDB");
    throw err;
  }
};

module.exports = {
  rebuildDB,
};
