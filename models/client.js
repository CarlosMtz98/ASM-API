const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    surenames: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }, 

    adress: {
        type: String,
        required: true
    },

    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car' 
    }]

    },  { timestamps: true } 

);

const Client = new mongoose.model('Client', clientSchema);

exports.Client = Client;
