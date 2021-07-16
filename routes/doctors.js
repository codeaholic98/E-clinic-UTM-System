const router = require('express').Router();
const session = require('express-session');
const bookingController = require('../controllers/BookingController');

router.get('/doctordashboard', bookingController.findApprovedAppointments);

router.get('/viewpatientreport', (req, res) => {
    res.render('viewPatientReport', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/issueprescription', (req, res) => {
    res.render('issuePrescription', {title: "E-clinic UTM"});
});

module.exports = router;