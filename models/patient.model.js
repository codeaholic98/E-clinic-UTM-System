const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
    matric_no: {
        type: String,
        required: true,
        unique: true
    },
    ic_no: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    phone_no: {
        type: String
    }

});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;


