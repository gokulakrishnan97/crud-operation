const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../Models/user-schema.js');
const jwt = require('jsonwebtoken');
const route = express.Router();

// Login
route.post('/', async(req, res)=> {
    let user = await Users.findOne({ email: req.body.email});
    
    // Check the existing user
    if(!user){
        res.status(400).send('Invalid email or password');
    }

    // Compare the password
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.status(400).send('Invalid email or password');
    }
    let token = jwt.sign({_id: user._id, email: user.email, isAdmin: user.isAdmin}, 'jwtprivatekey');
    res.status(200).send(token);
})

module.exports = route;