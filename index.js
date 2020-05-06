const express = require('express');
const app = express();

app.use(express.json())

let portNumber = process.env.PORT || 3000;

// Sample Data
let movies = [
    {
        name: 'Old School',
        category: 'Comedy'
    },
    {
        name: 'Trainwreck',
        category: 'Comedy'
    },
    {
        name: 'Best in Show',
        category: 'Comedy'
    },
    {
        name: 'The invisble man',
        category: 'Thriller'
    }
];

// Get all the data
app.get('/', (req, res)=>{
    res.send(movies);
})

// Get the matched data
app.get('/category/:name', (req, res)=> {
    let movie = movies.find(m => m.category === req.params.name)
    return res.status(200).send(movie);
})

// Create data
app.post('/', (req, res)=>{
    let movie = req.body;
    movies.push(movie);
    res.send(movie);
})

// Update data
app.put('/', (req, res)=>{
    let movie = movies.find(m=> m.name === req.body.name);
    if(!movie){
        return res.status(400).send("Invalid body");
    }
    movie.category = req.body.category
    res.status(200).send(movie);
})

// Delete data
app.delete('/:name', (req, res)=>{
    let index = movies.findIndex(m=> m.name === req.params.name);
    movies.splice(index, 1);
    res.status(200).send("Deleted Successfully");
})


app.listen(portNumber, ()=>{
    console.log(`Server Started in ${portNumber}....`);
})