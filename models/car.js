const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    manufacture: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    serialNumber: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    licencePlate: {
        type: String,
        required: true
    }, 

    currentKilometers: {
        type: String,
        required: true
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client' 
    }
},
    { timestamps: true }
);

const Car = new mongoose.model('Car', carSchema);

exports.Car = Car;