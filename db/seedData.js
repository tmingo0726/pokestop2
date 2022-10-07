const { createCustomer, createCard } = require("./");
const client = require("./client");

const dropTables = async () => {
  console.log("DROPPING TABLES");
  try {
    await client.query(`
      DROP TABLE IF EXISTS cards;      
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
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                address VARCHAR(255) NOT NULL,
                email VARCHAR(50) NOT NULL,
                isadmin BOOLEAN DEFAULT false,
                UNIQUE (username, email)
            ); 
            
            CREATE UNIQUE INDEX uname_email on customers (username, email);

            CREATE TABLE cards (
              id SERIAL PRIMARY KEY,
              name VARCHAR(50) UNIQUE NOT NULL,
              price INTEGER NOT NULL,
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


const createInitialCards = async() => {
  console.log('STARTING TO CREATE CARDS');
    try {
      const cardsToCreate = [
        { 
          name: 'Charizard',
          price: 30000,
          condition:'Good',
          rarity: "Holo",
          ability1: "Energy Burn: As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
          ability2: "Fire Spin: Discard 2 Energy cards attached to Charizard in order to use this attack.",
          imagelink: "https://images.pokemontcg.io/base1/4.png",
          inventorycount: 35,
          isactive: true,
        },
        {
          name: 'Blastoise',
          price: 50000,
          condition: 'Mint',
          rarity: "Holo",
          ability1: "Rain Dance: As often as you like during your turn (before your attack), you may attach 1 Water Energy card to 1 of your Water Pokémon. (This doesn't use up your 1 Energy card attachment for the turn.) This power can't be used if Blastoise is Asleep, Confused, or Paralyzed.",
          ability2: "Hydro Pump: Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count.",
          imagelink: "https://images.pokemontcg.io/base4/2.png",
          inventorycount: 50,
          isactive: true,
        },
        {
          name:'Venusaur',
          price: 5000,
          condition: 'Poor',
          rarity: 'Holo',
          ability1: "Energy Trans: As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can't be used if Venusaur is Asleep, Confused, or Paralyzed.",
          ability2: "Solarbeam",
          imagelink: "https://images.pokemontcg.io/base6/18.png",
          inventorycount: 10,
          isactive: true,
        },
    ];

      console.log("CARDS TO CREATE", cardsToCreate);
      const cards = await Promise.all(cardsToCreate.map(createCard));
      console.log("CARDS", cards);
      console.log("FINISHED CREATING CARDS");

    } catch (err) {
      console.log('ERROR CREATING CARDS');
      throw err;
    }
}

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
    await createInitialCards();
  } catch (err) {
    console.log("ERROR DURING REBUILDDB");
    throw err;
  }
};

module.exports = {
  rebuildDB,
};
