const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;




