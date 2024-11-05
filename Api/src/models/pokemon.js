const mongoose = require('mongoose');

const Pokemon = mongoose.model('Pokemon', {
    name: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },   
    cp: {
        type: Number,
        required: true
    },
    picture: {
        type: String,  
        required: true
    },
    types: [{
        type: String, 
        required: true
    }],
});

module.exports = Pokemon;
