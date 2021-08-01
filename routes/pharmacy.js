const router = require('express').Router();
const session = require('express-session');
const pharmacyController = require('../controllers/PharmacyController');
const prescriptionController = require('../controllers/PrescriptionController');

router.get('/pharmacylogin', (req, res) => {
    res.render('pharmacyLogin', {title: "E-clinic UTM", message: req.flash('message')});
})

router.post('/pharmacylogin', pharmacyController.pharmacylogin);


router.get('/pharmacydashboard', prescriptionController.findPrescriptions);

router.get('/viewprescription/:id', prescriptionController.viewprescription);

router.get('/pharmacylogout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      res.redirect("/");
    } else {
      res.redirect("/pharmacylogin");
    }
  })

module.exports = router;