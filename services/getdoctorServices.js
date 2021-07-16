const Doctor = require('../models/doctor.model.js');

const getDoctor = () => {
    return Doctor.find({}).lean()
}

module.exports = {getDoctor};