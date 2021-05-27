const router = require('express').Router();
const session = require('express-session');

router.get('/doctordashboard', (req, res) => {
    res.render('doctorDashboard', {title: "E-clinic UTM", layout: "dashboardlayout"});
});

module.exports = router;