const express = require('express');
const mongoose = require('mongoose');
const genre = require('./Routes/genre.js');
const app = express();

app.use(express.json())
app.use('/genres', genre);
let portNumber = process.env.PORT || 3000;

// Sample Data
// let movies = [
//     {
//         name: 'Old School',
//         category: 'Comedy'
//     },
//     {
//         name: 'Trainwreck',
//         category: 'Comedy'
//     },
//     {
//         name: 'Best in Show',
//         category: 'Comedy'
//     },
//     {
//         name: 'The invisble man',
//         category: 'Thriller'
//     }
// ];


// Server Connection
app.listen(portNumber, ()=>{
    console.log(`Server Started in ${portNumber}....`);
})

// Mongodb Connection
mongoose.connect('mongodb://localhost/genres')
    .then(console.log("mongodb connected successfully"))
    .catch((err)=> console.log("mongodb not connected ", err));