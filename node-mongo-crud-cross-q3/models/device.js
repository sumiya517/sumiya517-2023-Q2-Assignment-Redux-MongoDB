const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true 
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Device',deviceSchema);