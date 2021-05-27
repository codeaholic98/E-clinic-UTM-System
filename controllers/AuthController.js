const Patient = require('../models/patient.model');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {

    console.log("req body: ", req.body);

        const {
            username,
            name,
            email,
            password,
            matric_no,
            ic_no,
            age,
            gender,
            phone_no
        } = req.body;

        //const password = await bcrypt.hash(simplePassword, 10);

        try{

            let patient_data = {
                    username,
                    name,
                    email,
                    password,
                    matric_no,
                    ic_no,
                    age,
                    gender,
                    phone_no
                
            };

            patient_data = await Patient.create(patient_data);
            req.session.user = patient_data;
            res.redirect('/patientdashboard');
        
        }catch (error) {
            if (error.code === 11000) {
                error.status = 422;
            }
            next(error);
            console.log(error);
        }

        // await patient.save((err, data) => {
        //     if(err){
        //         res.redirect('/register');
        //     }else {
        //         console.log(data);
        //         req.session.user = data;
        //         res.redirect('/patientdashboard');
        //     }
        // });
};

const login = async (req, res) => {

    const {username, password} = req.body;
    
     try {
        const patient = await Patient.findOne({ username: username, password: password }).lean();
        if(!patient) {
            res.redirect("/login");
        }
        // patient.comparePassword(password, (error, match) => {
        //     if(!match) {
        //       res.redirect("/login");
        //     }
        // });
        req.session.user = patient;
        res.redirect("/patientdashboard");
    } catch (error) {
      console.log(error)
    }
  };



module.exports = {register, login};