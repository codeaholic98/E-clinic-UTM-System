const router = require('express').Router();
const session = require('express-session');
const AdminController = require('../controllers/AdminController');
const bookingController = require('../controllers/BookingController');
const Admin = require('../models/admin.model');

router.get('/adminlogin', (req, res) => {
    res.render('adminLogin', {title: "E-clinic UTM", message: req.flash('message')});
});

router.post('/adminlogin', AdminController.adminlogin);

router.get('/admindashboard', (req, res) => {

    if (req.session.user && req.cookies.user_sid) {
        res.render('adminDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
    }else{
        res.redirect('/adminlogin');
    }
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

// logout

router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/adminlogin");
    }
  })


  /* To Create Admin into the database */

  router.post('/createAdmin', (req, res) => {
      // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    // New Admin
    const admin = new Admin({
        username: req.body.username, 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    // save
    admin.save(admin)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message : err.message})
    })
  })

module.exports = router;