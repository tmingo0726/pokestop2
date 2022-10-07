const express = require("express");
const adminRouter = express.Router();
const {
  getCustomerById
} = require("../db");
const { requireUser } = require("./utils");



module.exports = adminRouter;