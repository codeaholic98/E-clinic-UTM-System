const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    matric_no: {
        type: String,
        required: true
    },
    ic_no: {
        type: String,
        required: true
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