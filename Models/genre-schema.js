const mongoose = require('mongoose');

// Schema Initialization
const genreSchema = mongoose.Schema({
     name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Genre = mongoose.model('genre', genreSchema);
module.exports = Genre;