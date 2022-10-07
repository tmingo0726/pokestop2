const client = require("./client");

const createCard = async ({
    name,
    price,
    condition,
    rarity,
    ability1,
    ability2,
}) => {
    try {
        const {
            rows: [card],
        } = await client.query(
            `
                INSERT INTO cards (name, price, condition, rarity, ability1, ability2)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT
            `,
            [ name, price, condition, rarity, ability1, ability2 ]
        );

        return card;
    } catch (error) {
     console.error(error);
     throw error; 
    } 
}

module.exports = {
    createCard
}