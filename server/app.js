var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GOOGLE_CLIENT_ID = "1060972199668-u08mhanvsuk9hfq1ifa9n4h369al47dt.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "fsEqfusvX62POdxUDynsF4EP";
//var routes = require('./routes/index');
var login = require('./controller/login.controller.js');
var users = require('./controller/user.controller.js');
var todo = require('./controller/todo.controller.js');
var fileUpload = require('./controller/todogroupFileUpload.controller.js');
var googleRoute = require('./controller/googleLogin.controller.js');
var todoGroup = require('./controller/todoGroup.controller.js');
var mongoose = require("mongoose");
var con = mongoose.connect('mongodb://127.0.0.1:27017/Todo');
var viewEngine = require("ejs-locals");
var multiparty = require('multiparty');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var cors = require('cors');
var formidable = require('formidable');


// view engine setup
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        })
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.engine('ejs', viewEngine);
app.set('view engine', 'ejs');


app.use('/users', users);
app.use('/login', login);
app.use('/todo', todo);
app.use('/todoGroup', todoGroup);
app.use('/upload', function (req, res, done) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(fields)
        if (err) {
            return done(err);
        }
        if (files) {
            req.files = files;
        }
        return done();
    });
}, fileUpload);
app.use('/auth', googleRoute);
//app.get('/googleLogin',function(req,res){
//  res.redirect('http://localhost:3000/auth/google')
//});

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // Error Handling
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


module.exports = app;
