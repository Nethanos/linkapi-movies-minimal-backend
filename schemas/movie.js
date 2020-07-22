const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    rated: String,
    runtime: String,
    genre: String,
    director: String,
    actors: String,
    plot: String,
    poster: String


})


var MovieModel = mongoose.model('movies', movieSchema );


module.exports = MovieModel;
