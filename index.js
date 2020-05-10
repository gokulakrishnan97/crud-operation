const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())

let portNumber = process.env.PORT || 3000;

// Schema Initialization
let genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

let Genres = mongoose.model('genre', genreSchema)

// // Sample Data
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

// Get all the data
app.get('/', async(req, res)=>{
    let movies = await Genres.find();
    res.send(movies);
})

// Get the matched data
app.get('/category/:name', async(req, res)=> {
    let movie = await Genres.find({name: req.params.name}); 
    return res.status(200).send(movie);
})

// Create data
app.post('/', async(req, res)=>{
    let movie = new Genres ({
        name: req.body.name,
        category: req.body.category
    })
    let savedData = await movie.save();
    res.send(savedData);
})

// Update data
app.put('/', async(req, res)=>{
    let updatedData = await Genres.update( {name: req.body.name}, {
        $set: {
            category: req.body.category
        }
    })
    res.status(200).send(updatedData);
})

// Delete data
app.delete('/:name', async(req, res)=>{
    let deletedData = await Genres.deleteOne({name: req.params.name});
    res.status(200).send("Deleted Successfully");
})

// Server Connection
app.listen(portNumber, ()=>{
    console.log(`Server Started in ${portNumber}....`);
})

// Mongodb Connection
mongoose.connect('mongodb://localhost/genres')
    .then(console.log("mongodb connected successfully"))
    .catch((err)=> console.log("mongodb not connected ", err));