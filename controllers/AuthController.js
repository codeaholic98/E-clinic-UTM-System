const Patient = require('../models/patient.model');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');


const register = (req, res) => {
    

        const patient = new Patient({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            matric_no: req.body.matric_no,
            ic_no: req.body.ic_no,
            age: req.body.age,
            gender: req.body.gender,
            phone_no: req.body.phone_no
        });
        patient.save((err, data) => {
            if(err){
                res.redirect('/register');
            }else {
                console.log(data);
                req.session.user = data;
                res.redirect('/patientdashboard');
            }
        });
};

const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    
     try {
        const user = await Patient.findOne({ username: username }).exec();
        if(!user) {
            res.redirect("/login");
        }
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect("/login");
            }
        });
        req.session.user = user;
        res.redirect("/patientdashboard");
    } catch (error) {
      console.log(error)
    }
  };



module.exports = {register, login};