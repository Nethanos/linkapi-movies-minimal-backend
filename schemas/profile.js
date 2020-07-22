const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    name: String,
    age: String,
    favoriteMovie: String,
    favoriteGenre: String
})


const ProfileModel = mongoose.model('profiles', profileSchema );


module.exports = ProfileModel;
