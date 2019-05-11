const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    surnames: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },

    birthDate: {
        type: String,
        required: true
    },

    rfc: {
        type: String,
        unique: true,
        default: "",
        required: false
    },

    email: {
        type: String,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    adress: {
        street: String,
        city: String,
        state: String,
        zip: Number,
    },

    position: {
        type: String,
        required: true
    },
        
    specialties: [{
        type: String,
        required: true
    }],

    qualification: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    paysheet: {
        payMode: {
            type: String,
            enum: ['daily', 'weekly', 'biweekly', 'monthly'],
            required: true
        },

        socialSecurity: {
            type: Number,
            default: 0
        },

        salary: {
            required: true,
            type: Number,
            min: 0,
            default: 0
        }
    },

    active: {
        type:Boolean,
        default: false,
        required: true
    },

    workHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceOrder'
    }]

},
    { timestamps: true }
);

const Employee = new mongoose.model('Employee', employeeSchema);

exports.Employee = Employee;