const Patient = require('../models/patient.model');
const bcrypt = require('bcrypt');

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

        req.check('username', 'Field can not be empty, It is required').not().isEmpty();
        req.check('name', 'Field can not be empty, It is required').not().isEmpty();
        req.check('email', 'Field can not be empty, It is required').not().isEmpty();
        req.check('password', 'Field can not be empty, It is required').not().isEmpty();
        req.check('matric_no', 'Field can not be empty, It is required').not().isEmpty();
        req.check('ic_no', 'Field can not be empty, It is required').not().isEmpty();
        req.check('age', 'Field can not be empty, It is required').not().isEmpty();
        req.check('gender', 'Field can not be empty, It is required').not().isEmpty();
        req.check('phone_no', 'Field can not be empty, It is required').not().isEmpty();

        req.check('email', 'Invalid Email').isEmail();
        req.check('password', 'Password should not be longer than 8 characters').isLength({max: 8});

        var errors = req.validationErrors();
        if(errors){
            console.log(errors);
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/register');
        }else{
            req.session.success = true;
        
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
        }

};

const login = async (req, res) => {

    const {username, password} = req.body;
    
     try {
        const patient = await Patient.findOne({ username: username, password: password }).lean();
        
        if(req.body.username == null || req.body.password == null){
            req.flash('message', 'Fields cannot be empty');
            res.redirect('/login');
        }
        
        if(!patient) {
            req.flash('message', 'Empty fields or wrong credentials!');
            res.redirect('/login');
        }
        
        req.session.user = patient;
        res.redirect("/patientdashboard");
    } catch (error) {
      console.log(error)
    }
  };


module.exports = {register, login};