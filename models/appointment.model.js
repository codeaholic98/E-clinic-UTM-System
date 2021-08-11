const mongoose = require('mongoose');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

const Schema = mongoose.Schema;


const appointmentSchema = new Schema({
    booking_date: {
        type: String,
        required: true
    },
    booking_time: {
        type: String,
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: Doctor
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: Patient
    },
    status:{
        type:String,
        enum:['pending', 'approved','called', 'rejected', 'discarded'],
        default : 'pending'
    }
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;