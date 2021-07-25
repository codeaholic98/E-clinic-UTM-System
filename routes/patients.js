const router = require('express').Router();
const session = require('express-session');
const AuthController = require('../controllers/AuthController');
const BookingController = require('../controllers/BookingController');


// session custom middleware

const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/patientdashboard');
    }else{
        next();
    }
}

router.get('/login', (req, res) => {
    res.render('login', {title: "E-clinic UTM"});
})

router.get('/register', (req, res) => {
    res.render('register', {title: "E-clinic UTM"});

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
    res.render('bookAppointmentPage', {title: "E-clinic UTM"});
})

router.post('/bookappointments', BookingController.createBookings);

router.get('/viewdiagnosticreport', (req, res) => {
    res.render('viewDiagnosticReport', {title: "E-clinic UTM", layout: "dashboardlayout"});
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