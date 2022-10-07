const client = require("./client");

const createProduct = async ({
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
            [ name, price, condition, rarity, ability1, ability2, imagelink, inventorycount, isactive ]
        );

      return product;
    } catch (error) {
     console.error(error);
     throw error; 
    } 
}

const getAllProducts = async () => {

    console.log("Inside db/getAllProducts");
    try {
        const { rows } = await client.query(`
                SELECT * FROM products
                WHERE isactive=true;
            `);
    
        return rows;
      } catch (error) {
        console.error(error);
        throw error;
      }

}

module.exports = {
    getAllProducts,
    createProduct
};