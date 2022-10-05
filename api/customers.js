const express = require('express');
const customersRouter = express.Router();
const {
    createCustomer,
    getCustomer,
    getCustomerByUsername
} = require('../db');
const { requireUser } = require('./utils');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;



// LOGIN
customersRouter.post('/login', async(req, res, next) => {
    const { username, password } = req.body;
    const customer = await getCustomer({ username, password })

    if(!username || !password) {
        next({
            name: 'MissingCredentials',
            message: 'Please provide both a username and password'

        });
    }

    try {
        if(customer) {
            const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1w'});

            res.send({
                user,
                message: "Login successful.",
                token
            })
        } else {
            next({
                name: 'Invalid Credentials',
                message: 'Incorrect username or password.'
            });
        }
        
    } catch ({ name, message }) {
        next({ name, message });
    }
})


// REGISTER
customersRouter.post('/register', async(req, res, next) => {
    const { 
        username, 
        password,
        firstname,
        lastname,
        email,
        address
    } = req.body;

    try {
        const _customer = await getCustomerByUsername(username);

        if(_customer) {
            next({
                name: 'Username Exists',
                message: `${username} is already taken.`
            })
        } else if(password.length < 8) {
            next({
                name: 'Password Too Short',
                message: 'Minimum password length is 8 characters'
            })
        } else {
            const customer = await createCustomer({
                username,
                password,
                firstname,
                lastname,
                email,
                address
            });

            const customerData = await getCustomer({
                username,
                password
            })

            const token = jwt.sign(
                customerData,
                JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                customer: customerData,
                message: 'Thanks for signing up!',
                token
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

customersRouter.patch('/:username/edit', async(req, res, next) => {
    const { username } = req.params;

    try {
        
    } catch (error) {
        
    }
})

// GET /api/users/me PLACEHOLDER

