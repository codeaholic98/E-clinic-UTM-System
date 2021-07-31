const Doctor = require('../models/doctor.model');

const doctorlogin = async (req, res) => {

    const {username, password} = req.body;
    
     try {
        const doctor = await Doctor.findOne({ username: username, password: password }).lean();
        if(!doctor) {
            req.flash('message', 'Empty fields or wrong credentials!');
            res.redirect('/doctorlogin');
        }
        
        req.session.user = doctor;
        res.redirect("/doctordashboard");
    } catch (error) {
      console.log(error)
    }
};

module.exports = {doctorlogin};