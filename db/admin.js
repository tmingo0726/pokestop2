const client = require('./client')

const {
    getCustomerById
} = require('../db')

const adminCheckById = async (id) => {
    try {
      const user = await getCustomerById(id);
  
      if (user.isadmin) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

module.exports = {
    adminCheckById
}