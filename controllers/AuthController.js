const Patient = require('../models/patient.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }

        const patient = new Patient({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            matric_no: req.body.matric_no,
            ic_no: req.body.ic_no,
            age: req.body.age,
            gender: req.body.gender,
            phone_no: req.body.phone_no
        })

        try {
            const p1 = await patient.save();
            res.json(p1);
        } catch (error) {
            res.send('Error' + error);
        }
})
}

const login = (req, res, next) => {
    //var username = req.body.username
    //var password = req.body.password

    Patient.findOne({$or: [{email: req.body.email}, {username: req.body.username}]})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                else if(result) {
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: "1h"})
                    res.json({
                        message: 'Login Succesful!',
                        token: token
                    })
                }else {
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }else {
            res.json({
                message: 'No User Found!'
            })
        }
    })    
}



module.exports = {register, login};