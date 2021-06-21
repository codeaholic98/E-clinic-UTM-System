const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    issue_date: {
        type: Date,
        required: true
    },
    prescription_type: {
        type: String,
        required: true
    },
    prescription_details: {
        type: String,
        required: true
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;