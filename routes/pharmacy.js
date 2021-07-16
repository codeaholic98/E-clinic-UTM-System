const router = require('express').Router();
const session = require('express-session');
const pharmacyController = require('../controllers/PharmacyController');

router.get('/pharmacylogin', (req, res) => {
    res.render('pharmacyLogin', {title: "E-clinic UTM"});
})

router.post('/pharmacylogin', pharmacyController.pharmacylogin);


router.get('/pharmacydashboard', (req, res) => {
    
    if (req.session.user && req.cookies.user_sid) {
        res.render('pharmacyDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
    }else{
        res.redirect('/pharmacylogin');
    }

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