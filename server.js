const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
//const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const url = 'mongodb://localhost:27017/EclinicDB';

require('dotenv').config();

const app = express();
//const port = 5000;

app.use(cors());
app.use(express.json());
//app.use(bodyParser());

// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views/layouts/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render('index', { title: "E-clinic UTM"});
})

app.get('/login', (req, res) => {
    res.render('login', {title: "E-clinic UTM"});
})

const patientsRouter = require('./routes/patients');
app.use('/', patientsRouter);


app.listen(5000 , () => {
    console.log("successfully started the server")
});

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Database connected successfully');
});

    
