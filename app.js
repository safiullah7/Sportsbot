const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

//username: safi
//password: MUwEfCql0IlX2uQv
//connectionString: mongodb+srv://safi:<password>@cluster0-oaal4.mongodb.net/test?retryWrites=true&w=majority
const app = express();

mongoose.connect('mongodb+srv://safi:MUwEfCql0IlX2uQv@cluster0-oaal4.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected.')
    })
    .catch((error) => console.log('connection failed with error: ' + error));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/user', (req, res, next) => {
    console.log(req.body);
    const user = new User({
        fbId: req.body.fbId,
        subscription: req.body.subscription,
        league: req.body.league,
        team: req.body.team
    });
    user.save().then(() => {
        res.status(201).json({message: 'User subscribed.'});
    }).catch((error) => {
        res.status(400).json({error: error});
    });
});

app.use('/api/users', (req, res, next) => {
    User.find().then((subscribedUsers) => {
        res.status(200).json(subscribedUsers);
    }).catch(error => {
        res.status(400).json(error);
    });
  });

module.exports = app;