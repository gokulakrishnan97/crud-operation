const express = require('express');
const Genres = require('../Models/genre-schema.js');
const auth = require('../Middleware/auth.js');
const admin = require('../Middleware/admin.js');
const route = express.Router();

// Get all the data
route.get('/', [auth, admin], async(req, res)=>{
    let movies = await Genres.find();
    res.send(movies);
})

// Create data
route.post('/', async(req, res)=>{
    let movie = new Genres ({
        name: req.body.name,
        category: req.body.category
    })
    let savedData = await movie.save();
    res.send(savedData);
})

// Update data
route.put('/', async(req, res)=>{
    let updatedData = await Genres.update( {name: req.body.name}, {
        $set: {
            category: req.body.category
        }
    })
    res.status(200).send(updatedData);
})

// Delete data
route.delete('/:name', async(req, res)=>{
    let deletedData = await Genres.deleteOne({name: req.params.name});
    res.status(200).send("Deleted Successfully");
})

// Get the matched data
route.get('/movie/:name', async(req, res)=> {
    let movie = await Genres.find({name: req.params.name}); 
    return res.status(200).send(movie);
})


module.exports = route;