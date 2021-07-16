const router = require('express').Router();
const session = require('express-session');
const bookingController = require('../controllers/BookingController');
const doctorController = require('../controllers/DoctorController');

router.get('/doctorlogin', (req, res) => {
    res.render('doctorLogin', {title: "E-clinic UTM"});
})
router.post('/doctorlogin', doctorController.doctorlogin);

router.get('/doctordashboard', bookingController.findApprovedAppointments);

router.get('/viewpatientreport', (req, res) => {
    res.render('viewPatientReport', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/issueprescription', (req, res) => {
    res.render('issuePrescription', {title: "E-clinic UTM"});
});

router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  })

module.exports = router;