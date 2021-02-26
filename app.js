var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
require('dotenv').config();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const authCheck = (req, res, next) => {
  if (!req.user) { //if user is not logged in
    res.redirect('/auth/login');
  } else { //if logged in
    next();
  }
};
// Routers
const notFound404Router = require('./routes/404');
const aboutRouter = require('./routes/about');
const attachAccessoryRouter = require('./routes/attachAccessory');
const authRouter = require('./routes/auth');
const createRouter = require('./routes/create');
const createAccessoryRouter = require('./routes/createAccessory');
const deleteCubeRouter = require('./routes/deleteCube');
const detailsRouter = require('./routes/details');
const editCubeRouter = require('./routes/editCube');
var indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const registerRouter = require('./routes/register');
const searchRouter = require('./routes/search');


var app = express();

//MongoDB connection (protected)
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res) => console.log("Database connected!"))
.catch(err => console.error(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");
hbs.registerHelper("isEqual", (a, b) => { return a === b;});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//set cookie session maxAge to be 1 day in milliseconds and encrypt keys with a cookie key (put in keys.js in session key)
app.use(cookieSession({//time needs to be in milliseconds
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));


// Initialize Passport  
app.use(passport.initialize());
app.use(passport.session());




app.use('/404', notFound404Router);
app.use('/about', aboutRouter);
app.use('/auth', authRouter);
app.use('/details', detailsRouter);
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use(authCheck);
app.use('/attach-accessory', attachAccessoryRouter);
app.use('/create', createRouter);
app.use('/create-accessory', createAccessoryRouter);
app.use('/delete-cube', deleteCubeRouter);
app.use('/edit-cube', editCubeRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};



  // render the error page
  res.status(err.status || 500);
  res.render('404Page');
});

module.exports = app;
