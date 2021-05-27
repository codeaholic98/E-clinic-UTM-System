const router = require('express').Router();
const session = require('express-session');

router.get('/admindashboard', (req, res) => {
    res.render('adminDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

module.exports = router;