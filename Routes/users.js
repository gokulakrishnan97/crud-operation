const express = require('express');
const Users = require('../Models/user-schema.js');
const bcrypt = require('bcrypt');
const route = express.Router();

// Registering User
route.post('/register', async(req, res)=> {

    // Check the existing user
    let existingUser = await Users.findOne({email: req.body.email});
    if(existingUser){
        return res.status(400).send('Users already registered.. ');
    }

    let user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    // Hashing the password
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let savedData = await user.save();
    res.status(200).send({
        name: savedData.name,
        email: savedData.email
    });
})

module.exports = route;