const router = require('express').Router();
const session = require('express-session');
const AuthController = require('../controllers/AuthController');

const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/patientdashboard');
    }else{
        next();
    }
}


router.get('/login', sessionChecker, (req, res) => {
    res.render('login', {title: "E-clinic UTM"});
})

router.get('/register', sessionChecker, (req, res) => {
    res.render('register', {title: "E-clinic UTM"});
})

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

router.get('/patientdashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
    res.render('patientDashboard', {title: "E-clinic UTM"});
    }else{
        res.redirect('/login');
    }
})

module.exports = router;