const router = require('express').Router();
const session = require('express-session');

router.get('/pharmacydashboard', (req, res) => {
    res.render('pharmacyDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

module.exports = router;