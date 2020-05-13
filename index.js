const express = require('express');
const mongoose = require('mongoose');
const genre = require('./Routes/genre.js');
const user = require('./Routes/users.js');
const auth = require('./Routes/auth.js');
const app = express();

app.use(express.json())
app.use('/genres', genre);
app.use('/users', user);
app.use('/auth', auth);
let portNumber = process.env.PORT || 3000;


// Server Connection
app.listen(portNumber, ()=>{
    console.log(`Server Started in ${portNumber}....`);
})

// Mongodb Connection
mongoose.connect('mongodb://localhost/crud')
    .then(console.log("mongodb connected successfully"))
    .catch((err)=> console.log("mongodb not connected ", err));