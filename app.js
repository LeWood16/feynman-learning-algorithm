'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var hogan = require('hjs');

// Retrieve
var MongoClient = require('mongodb').MongoClient;


// Configure the Facebook strategy for use by Passport.
passport.use(new Strategy({
    clientID: '105670326652055',
    clientSecret: 'ca1fbf5443127b7187936d47dd0f2ee0',
    callbackURL: 'https://voting-app-lift-it-luke.c9users.io' + '/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs'); // use .html extension for templates 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
// app.enable('view cache');


/* GET home page. */

var MongoClient = require('mongodb').MongoClient;
var db;

// initialize connection once
  MongoClient.connect("mongodb://username:password@ds139801.mlab.com:39801/lewood-fcc-voting-app", function(err, database) {
  if (err) throw err;
  db = database;
});



app.get('/', function(req, res, next) {
  res.render('home', 
    {
      user: req.user,
      partials: 
    {
      all_polls: 'all_polls',
      navbar: 'navbar'
    }
  });
});



app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

/*
app.get('/my_polls',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('my_polls', 
    {user: req.user });
  });
*/
  
  
app.get('/all_polls', function(req, res, next) {
  MongoClient.connect("mongodb://lewood:bearringoMaybeBeez?@ds139801.mlab.com:39801/lewood-fcc-voting-app", function(err, db) {  // CREATE MLAB DB FOR THIS PROJECT
    if (!err) {
      
      // create polls collection as soon as first document is inserted
      db.collection('polls', function(err, collection) {if (err) throw err});

      db.collection('polls').find({}, { _id: 0 }).toArray(function(err, polls) {
        
        if (err) throw err;
        
        var template = hogan.compile('poll.hjs');
        // so now, we can return all polls to the screen.
        
        var output = template.render(polls);
        res.render(output);
        /*
        res.render('my_polls', 
           {
             user: req.user,
             polls: polls[0]
           }
        );
        */
      });
    }
  });
});

app.get('/new_poll', function(req, res, next){
    res.render('new_poll', 
    {
      user: req.user,
      partials: 
    {
        navbar: 'navbar'  
    }
  });
});

app.post('/new_poll', function(req, res, next){
    var title = req.body.title;
    var options = req.body.options;
    createPoll(title, req.user.id, options);
    res.render('home', 
    {
      user: req.user,
      message: 'New poll created.',
      partials: 
    {
      all_polls: 'all_polls',
      navbar: 'navbar',
    }
  });
});



/*
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', 
    {user: req.user });
  });
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function createPoll(title, creator, options){
  
  let mongoose = require('mongoose');
  let schema = require('./schema');
  
  // instantiate mongoose model inside function
  let Poll = mongoose.model('Poll', schema, 'polls');
  
  // turn options argument into an array, separated by newlines (non-inclusive)
  var lnRegExp = /\r?\n|\r/;
  options = options.split(lnRegExp);

  // now we rebuild options into the proper schema format, like so:
  // {
  //   "option": option[i],
  //   "votes": 0
  // }
  var optionsArr = [];
  for (let i = 0; i < options.length; i++){
    let obj = {};
    obj.option = options[i];
    obj.votes = 0;
    optionsArr.push(obj);
  }

  // create poll instance to be inserted into collection
  let poll = new Poll({
    title: title,
    creator: creator,
    options: optionsArr
  });
  
  // Connect to the db
  MongoClient.connect("mongodb://username:password@ds139801.mlab.com:39801/lewood-fcc-voting-app", function(err, db) {
  if (!err) {
       
    // create polls collection as soon as first document is inserted
    db.collection('polls', function(err, collection) {if (err) throw err});

    // insert poll instance into database, then close database
    db.collection('polls').insertOne(poll);
    
  }
  });
}



module.exports = app;
