const mongoose = require('mongoose');
const Patient = require('./patient.model');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
 
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
