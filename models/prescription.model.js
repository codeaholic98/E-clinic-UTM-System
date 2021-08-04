const mongoose = require('mongoose');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    issue_date: {
        type: String,
        required: true
    },
    prescription_type: {
        type: String,
        required: true
    },
    prescription_details: {
        type: String,
        required: true
    },
    doctor: {
        type : Schema.Types.ObjectId,
        ref : Doctor
    },
    // this is patient ID, but with reference
    patient: {
        type : Schema.Types.ObjectId,
        ref : Patient
    },
    status: {
        type: String,
        enum : ['pending', 'viewed'],
        default: 'pending'
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;