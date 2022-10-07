const client = require("./client");

const getAllProducts = async () => {

    console.log("Inside db/getAllProducts");
    try {
        const { rows } = await client.query(`
                SELECT * FROM cards
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
};