const client = require("./client");

const createCard = async ({
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
            rows: [card],
        } = await client.query(
            `
                INSERT INTO cards (name, price, condition, rarity, ability1, ability2, imagelink, inventorycount, isactive)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *;
            `,
            [ name, price, condition, rarity, ability1, ability2, imagelink, inventorycount, isactive ]
        );

      return card;
    } catch (error) {
     console.error(error);
     throw error; 
    } 
}

module.exports = {
    createCard
};