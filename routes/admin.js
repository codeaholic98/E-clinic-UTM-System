const router = require('express').Router();
const session = require('express-session');
const AdminController = require('../controllers/AdminController');
const bookingController = require('../controllers/BookingController');

router.get('/admindashboard', (req, res) => {

    res.render('adminDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

router.get('/managebookings', bookingController.findBookings);

router.get('/approvebookings/:id', bookingController.approveBooking);

router.get('/adddoctor', (req, res) => {
    res.render('addDoctor', {title: "E-clinic UTM"});
});

router.get('/addpharmacist', (req, res) => {
    res.render('addPharmacists', {title: "E-clinic UTM"});
});

// API for managing doctor

router.post('/addDoctor', AdminController.createDoctor)
router.get('/managedoctor', AdminController.findDoctor)
router.put('/updateDoctor/:id', AdminController.updateDoctor)
router.get('/deleteDoctor/:id', AdminController.deleteDoctor)

// API for  managing pharmacist

router.post('/addPharmacist', AdminController.createPharmacist)
router.get('/managepharmacy', AdminController.findPharmacist)
router.put('/updatePharmacist/:id', AdminController.updatePharmacist)
router.get('/deletePharmacist/:id', AdminController.deletePharmacist)


module.exports = router;