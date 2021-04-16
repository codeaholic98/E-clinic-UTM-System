const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    booking_date: {
        type: Date,
        required: true
    },
    booking_time: {
        type: String,
        requiredl: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;