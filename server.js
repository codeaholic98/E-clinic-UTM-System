const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const morgan = require('morgan');
const url = 'mongodb://localhost:27017/EclinicDB';

require('dotenv').config({path : 'config.env'});

const app = express();
const PORT = process.env.PORT ||  8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(flash());
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


// event routes
const eventRoutes = require('./routes/event');
app.use('/events',eventRoutes)

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
app.listen(PORT , () => {
    console.log("successfully started the server")
});


// database mongoDB connect
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Database connected successfully');
});

    
