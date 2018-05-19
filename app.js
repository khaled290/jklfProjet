const express = require('express');
const app = express();
var favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const multer = require('multer');
const upload = multer();
const color = require("colors");
const form = require('express-form');
const field = form.field;
const bcrypt = require("bcrypt");
const lodash = require('lodash');
const path = require('path');
const config = require('./config');
const port = 3000;

let frenchMovies = [];
const faker = require('faker');
faker.locale = "fr";

const mongoose = require('mongoose');
mongoose.Promise = Promise;


mongoose.connect(`mongodb://${config.user}:${config.password}@ds147469.mlab.com:47469/jklf`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: cannot connect to my DB'));
db.once('open', function() {
  console.log('connected to the DB :) ')
});

app.set('views', './views');
app.set('view engine', 'ejs');

// to service static files from the public folder
app.use('/public', express.static('public'));
app.use(expressSession({ secret: 'jklf', resave: false, saveUninitialized: true, }));

const movieController = require('./controllers/movieController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', movieController.getMovies);

//!\ In upload.fields([]), the empty array '[]' is required
app.post('/movies', upload.fields([]), movieController.postMovie);

// create application/x-www-form-urlencoded parser
// https://github.com/expressjs/body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/movies-old-browser', urlencodedParser, movieController.getMoviesOldBrowsers);

app.get('/movies/add', movieController.getMoviesAdd);

app.get('/movies/:id', movieController.getMovieById);

app.post('/movie-details/:id',  urlencodedParser, movieController.postMovieDetails);

app.get('/movie-details/:id', movieController.getMovieDetails);

app.delete('/movie-details/:id', movieController.deleteMovie)

app.get('/movie-search', movieController.movieSearch);

app.get('/login', authController.login);
app.post('/login/login',  urlencodedParser, userController.formsLogin, userController.postLoginAuth);
app.post('/login/inscription', urlencodedParser, userController.forms, userController.postUser);

app.get('/all-users', userController.getUsers);
app.get('/user-details/:id', userController.getUserDetails);
app.get('/user-delete/:id', userController.userDelete);

app.get('/member-only', authController.getMemberOnly);

app.listen(port, () => {
    console.log(`listening on port localhost:${port}` .blue);
});