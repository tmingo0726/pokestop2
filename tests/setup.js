const { createTables, dropTables } = require('../db/seedData');

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await dropTables();
  await createTables();
  console.log("Inside test setup routine");
}

module.exports = setup;