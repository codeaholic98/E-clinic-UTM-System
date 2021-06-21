const router = require('express').Router();
const session = require('express-session');

router.get('/admindashboard', (req, res) => {
    res.render('adminDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/managedoctor', (req, res) => {
    res.render('manageDoctor', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/managepharmacy', (req, res) => {
    res.render('managePharmacy', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/managebookings', (req, res) => {
    res.render('manageBookings', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/adddoctor', (req, res) => {
    res.render('addDoctor', {title: "E-clinic UTM"});
});

router.get('/addpharmacist', (req, res) => {
    res.render('addPharmacists', {title: "E-clinic UTM"});
});

module.exports = router;