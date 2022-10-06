const express = require("express");
const customersRouter = express.Router();
const {
  createCustomer,
  getCustomer,
  getCustomerByUsername,
  getCustomerById,
  updateCustomer,
} = require("../db");
const { requireUser } = require("./utils");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// LOGIN
customersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const customer = await getCustomer({ username, password });

  if (!username || !password) {
    next({
      name: "MissingCredentials",
      message: "Please provide both a username and password",
    });
  }

  try {
    if (customer) {
      const token = jwt.sign(customer, JWT_SECRET, { expiresIn: "1w" });

      res.send({
        customer,
        message: "Login successful.",
        token,
      });
    } else {
      next({
        name: "Invalid Credentials",
        message: "Incorrect username or password.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// REGISTER
customersRouter.post("/register", async (req, res, next) => {
  console.log("REQBODY", req.body);
  const {
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
    email,
    address,
  } = req.body;

  try {
    const _customer = await getCustomerByUsername(username);

    if (_customer) {
      next({
        error: "Username Exists",
        message: `${username} is already taken.`,
      });
    } else if (password.length < 8) {
      next({
        error: "Password Too Short",
        message: "Minimum password length is 8 characters",
      });
    } else if (password !== confirmPassword) {
      next({
        error: "Passwords do not match",
        message: "Passwords do not match",
      });
    } else {

      await createCustomer({
        username,
        password,
        firstname,
        lastname,
        email,
        address,
      });

      const customerData = await getCustomer({
        username,
        password,
      });

      const token = jwt.sign(customerData, JWT_SECRET, {
        expiresIn: "1w",
      });

      res.send({
        customer: customerData,
        message: "Thanks for signing up!",
        token,
      });
    }
  } catch ({ error, message }) {
    next({ error, message });
  }
});

customersRouter.patch(
  "/:username/edit",
  requireUser,
  async (req, res, next) => {
    const { id, username: _username } = req.user;
    const { username } = req.params;
    const {
      password,
      confirmPassword,
      firstname,
      lastname,
      email,
      address
      } = req.body;

    if (password !== confirmPassword) {
      next({
        error: "Passwords do not match",
        message: "Passwords do not match",
      });
    } else if (password.length < 8) {
      next({
        error: "Password Too Short",
        message: "Minimum password length is 8 characters",
      });
    } else {

      try {

        if (username !== _username) {
          res.status(403).send({
            name: "Unauthorized User",
            message: `${_username} cannot update ${username}'s information.`,
          });
        } else {
          const updatedFields = {
            id
          }

          if (password) {
            updatedFields.password = password
          }

          if (firstname) {
            updatedFields.firstname = firstname
          }

          if (lastname) {
            updatedFields.lastname = lastname
          }

          if (email) {
            updatedFields.email = email
          }

          if (address) {
            updatedFields.address = address
          }

          console.log("UPDATED FIELDS", updatedFields)

          await updateCustomer(updatedFields)

          const customer = await getCustomer({ username, password })
          
          res.send(customer)
        }
      } catch ({ error, message }) {
        next({ error, message })
      }
    }
  })

// GET /api/users/me PLACEHOLDER

module.exports = customersRouter;
