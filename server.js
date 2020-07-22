const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require("body-parser");

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MovieModel = require('./schemas/movie');

const ProfileModel = require('./schemas/profile');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));

const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI, {useNewUrlParser: true,  useUnifiedTopology: true}).then(_ => console.log("database connected"));


app.get('/', (req,res) => {
    res.send('welcome to linkapi movies humble server');
})

app.get('/movies/', async (req, res) => {
    let movies = []
    if(req.query.searchQuery){
        
         movies = await MovieModel.find({
             $or: [
                
                {title:{ $regex: '.*' + req.query.searchQuery + '.*', $options: 'i' }}, 
                {actors:{ $regex: '.*' + req.query.searchQuery + '.*', $options: 'i' }},
                {genre:{ $regex: '.*' + req.query.searchQuery + '.*', $options: 'i' }}
            
             ]});
    }else {
        movies = await MovieModel.find({});
}

    return res.json(movies);
})


app.get('/movies/:id', async (req, res) => {
    const id = req.params.id;

    const movie = await MovieModel.findById(id);


    res.json(movie);
})


app.post('/profiles', async (req, res) => {

    const profile = {...req.body};

    const profileData = new ProfileModel(profile);

    const response = await profileData.save();

    if(response.id){
        res.status(200).send(response);
    }
   
   
})

