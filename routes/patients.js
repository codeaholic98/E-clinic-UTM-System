const router = require('express').Router();
const session = require('express-session');
const AuthController = require('../controllers/AuthController');
const BookingController = require('../controllers/BookingController');
const prescriptionController = require('../controllers/PrescriptionController');
const Activity = require('../models/activity.model');

// session custom middleware

const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/patientdashboard');
    }else{
        next();
    }
}

router.get('/login', (req, res) => {
    res.render('login', {title: "E-clinic UTM", message: req.flash('message')});
})

router.get('/register', (req, res) => {
    res.render('register', {title: "E-clinic UTM", success: req.session.success, errors: req.session.errors});
    req.session.errors = null;
    req.session.success = null;
})

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.get('/patientdashboard', (req, res) => {

    if (req.session.user && req.cookies.user_sid) {
        res.render('patientDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
    }else{
        res.redirect('/login');
    }

})

router.get('/bookappointments', (req, res) => {
    res.render('bookAppointmentPage', {title: "E-clinic UTM", message: req.flash('message')});
})

router.post('/bookappointments', BookingController.createBookings);

router.get('/viewdiagnosticreport', prescriptionController.findpatientprescriptions);

router.get('/viewpatientprescription/:id', prescriptionController.viewpatientprescription);

router.get('/viewactivities', (req, res) => {
    Activity.find({}).lean()
    .then(data => {
        if(!data){
            req.flash('message', 'No Activities available!')
            res.redirect('/viewactivities')
        }
        res.render('viewActivity', {title: "E-clinic UTM", data: data, message: req.flash('message')});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
    
})

router.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
})


module.exports = router;