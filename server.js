const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const url = 'mongodb://localhost:27017/EclinicDB';

require('dotenv').config();

const app = express();
//const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
      key: 'user_sid',
      secret: 'randomstuff',
      resave: false,
      saveUninitialized: false,
      cookie:{
          expires: 600000
      }
    })
);

// session middleware

// app.use((req, res, next) => {
//     if(req.session.user && req.cookies.user_sid){
//         res.redirect('/patientdashboard');
//     }
//     next();
// });

// session custom middleware

// const sessionChecker = (req, res, next) => {
//     if(req.session.user && req.cookies.user_sid){
//         res.redirect('/patientdashboard');
//     }else{
//         next();
//     }
// }

// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views/layouts/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', express.static(path.join(__dirname, 'static')));

// Home route (index)
app.get('/', (req, res) => {
    res.render('index', { title: "E-clinic UTM"});
})


// patient routes
const patientsRouter = require('./routes/patients');
app.use('/', patientsRouter);

// admin routes
const adminRouter = require('./routes/admin');
app.use('/', adminRouter);

// doctor routes
const doctorRouter = require('./routes/doctors');
app.use('/', doctorRouter);

// pharmacy routes
const pharmacyRouter = require('./routes/pharmacy');
app.use('/', pharmacyRouter);

// listening to the server on port 5000
app.listen(5000 , () => {
    console.log("successfully started the server")
});


// database mongoDB connect
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Database connected successfully');
});

    
