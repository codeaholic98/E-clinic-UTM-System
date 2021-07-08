const router = require('express').Router();
const session = require('express-session');
const AdminController = require('../controllers/AdminController');


router.get('/admindashboard', (req, res) => {

    res.render('adminDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

//router.get('/managedoctor', async (req, res) => {
//     const doctors = await AdminService.findDoctor()
//    res.render('manageDoctor', {title: "E-clinic UTM", layout: "dashboardlayout"});
//});

// router.get('/managepharmacy', (req, res) => {
//     res.render('managePharmacy', {title: "E-clinic UTM", layout: "dashboardlayout"});
// });

router.get('/managebookings', (req, res) => {
    res.render('manageBookings', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

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
router.delete('/deleteDoctor/:id', AdminController.deleteDoctor)

// API for  managing pharmacist

router.post('/addPharmacist', AdminController.createPharmacist)
router.get('/managepharmacy', AdminController.findPharmacist)
router.put('/updatePharmacist/:id', AdminController.updatePharmacist)
router.delete('/deletePharmacist/:id', AdminController.deletePharmacist)


module.exports = router;