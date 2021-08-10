const router = require('express').Router();
const session = require('express-session');
const bookingController = require('../controllers/BookingController');
const doctorController = require('../controllers/DoctorController');
const prescriptionController = require('../controllers/PrescriptionController');

router.get('/doctorlogin', (req, res) => {
    res.render('doctorLogin', {title: "E-clinic UTM", message: req.flash('message')});
})
router.post('/doctorlogin', doctorController.doctorlogin);

router.get('/doctordashboard', bookingController.findApprovedAppointments);

router.get('/viewpatientreport', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.render('viewPatientReport', {title: "E-clinic UTM", layout: "dashboardlayout", doctorname: req.session.user.name, message: req.flash('message')});
  }else{
      res.redirect('/doctorlogin');
  }
});

router.post('/viewpatientprescription', prescriptionController.findPrescriptionsWithMatric);

router.get('/callpatient/:id', bookingController.callBooking);
// router.get('/alertpatient/:id', bookingController.alertPatient);

router.post('/issueprescription', prescriptionController.createPrescription);

router.get('/prescriptionpage', (req,res) => {
  res.render('prescriptionPage', {title: "E-clinic UTM"});
})

router.get('/doctorlogout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/doctorlogin");
    }
  })

module.exports = router;