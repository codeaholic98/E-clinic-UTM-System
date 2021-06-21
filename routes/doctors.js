const router = require('express').Router();
const session = require('express-session');

router.get('/doctordashboard', (req, res) => {
    res.render('doctorDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/viewpatientreport', (req, res) => {
    res.render('viewPatientReport', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/issueprescription', (req, res) => {
    res.render('issuePrescription', {title: "E-clinic UTM"});
});

module.exports = router;