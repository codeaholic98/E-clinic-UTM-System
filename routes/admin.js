const router = require('express').Router();
const session = require('express-session');
const AdminController = require('../controllers/AdminController');
const bookingController = require('../controllers/BookingController');
const Admin = require('../models/admin.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');
const Pharmacy = require('../models/pharmacy.model');
const Appointment = require('../models/appointment.model');

router.get('/adminlogin', (req, res) => {
    res.render('adminLogin', {title: "E-clinic UTM", message: req.flash('message')});
});

router.post('/adminlogin', AdminController.adminlogin);

router.get('/admindashboard', async (req, res) => {

    if (req.session.user && req.cookies.user_sid) {
        const patients = await Patient.find().countDocuments();
        const doctors = await Doctor.find().countDocuments();
        const pharmacists = await Pharmacy.find().countDocuments();
        const appointments = await Appointment.find().countDocuments();

        res.render('adminDashboard', {title: "E-clinic UTM", layout: "dashboardlayout", doctors: doctors, patients: patients, pharmacists: pharmacists, appointments: appointments});
    }else{
        res.redirect('/adminlogin');
    }
});

// manage bookings

router.get('/managebookings', bookingController.findBookings);

router.get('/approvebookings/:id', bookingController.approveBooking);

router.get('/rejectbookings/:id', bookingController.rejectBooking);

router.get('/adminviewapprovedbookings', bookingController.adminviewapprovedappointments);

// manage activity

router.get('/manageactivity', AdminController.findactivities);

router.get('/addactivity', (req, res) => {
    res.render('addActivity', {title: "E-clinic UTM", message: req.flash('message')});
})

router.post('/addactivity', AdminController.upload, AdminController.addactivity);

router.get('/deleteActivity/:id', AdminController.deleteActivity);

// add doctor

router.get('/adddoctor', (req, res) => {
    res.render('addDoctor', {title: "E-clinic UTM", success: req.session.success, errors: req.session.errors});
    req.session.errors = null;
    req.session.success = null;
});

// add pharmacist

router.get('/addpharmacist', (req, res) => {
    res.render('addPharmacists', {title: "E-clinic UTM", success: req.session.success, errors: req.session.errors});
    req.session.errors = null;
    req.session.success = null;
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

router.get('/adminlogout', (req, res) => {
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