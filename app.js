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
    clientID: '135547947002897',
    clientSecret: '34c0ffb0514f2a7f3479f7cc2663d9bc',
    callbackURL: 'https://feynman-web-app-lift-it-luke.c9users.io' + '/login/facebook/return'
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
  MongoClient.connect("mongodb://username:password@ds133281.mlab.com:33281/feynweb", function(err, database) {
  if (err) throw err;
  db = database;
});



app.get('/', function(req, res, next) {
  
  // create terms collection as soon as first document is inserted
  db.collection('vocab', function(err, collection) {if (err) throw err});
  
  db.collection('vocab').find({}).toArray(function(err, terms) {
        
    if (err) throw err;

    res.render('home', 
      {
       user: req.user,
       terms: terms,
       partials: 
       {
          head: 'head',
          navbar: 'navbar',
       }
      }
    );
        
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

app.get('/all_terms', function(req, res, next) {
  
      // create terms collection as soon as first document is inserted
      db.collection('vocab', function(err, collection) {if (err) throw err});

      db.collection('vocab').find({}).toArray(function(err, terms) {
        
        if (err) throw err;

        res.render('all_terms', 
        {
             user: req.user,
             terms: terms,
             partials: 
             {
               head: 'head',
               navbar: 'navbar',
             }
        }
        );
        
      });
});
  
  
app.get('/my_terms', function(req, res, next) {
  
      // create terms collection as soon as first document is inserted
      db.collection('vocab', function(err, collection) {if (err) throw err});
      
      // store current user's id, then convert it to a number to use for db querying
      var id = req.user.id;
      id = +id;

      db.collection('vocab').find({creator: id}).toArray(function(err, terms) {
        
        if (err) throw err;

        res.render('my_terms', 
        {
             user: req.user,
             terms: terms,
             partials: 
             {
               head: 'head',
               navbar: 'navbar',
             }
        }
        );
        
      });
});

app.get('/new_term', function(req, res, next){
    res.render('new_term', 
    {
      user: req.user,
      partials: 
    {
        header: 'header',
        navbar: 'navbar'  
    }
  });
});

app.post('/new_term', function(req, res, next) {
  var term = req.body.term;
  var definition = req.body.definition;
  var examples = req.body.examples;
  var creator = req.user.id;
  createTerm(creator, term, definition, examples);

  db.collection('vocab').find({}).toArray(function(err, terms) {

    if (err) throw err;

    res.render('home', {
      user: req.user,
      terms: terms,
      message: 'New term created.',
      partials: {
        head: 'head',
        navbar: 'navbar'
      }
    });
  });
});

app.get('/single_term', function(req, res, next){
  
      // create terms collection as soon as first document is inserted
      db.collection('vocab', function(err, collection) {if (err) throw err});
      
      // store current user's id, then convert it to a number to use for db querying
      var id = req.user.id;
      id = +id;

      db.collection('vocab').find({term: "meme"}).toArray(function(err, terms) {
        
        if (err) throw err;

        res.render('single_term', 
        {
             user: req.user,
             terms: terms,
             examplesArr: terms.examples,
             partials: 
             {
               head: 'head',
               navbar: 'navbar',
             }
        }
        );
        
      });
});

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

function createTerm(creator, term, definition, examples){
  
  var mongoose = require('mongoose');
  var schema = require('./schema');
  
  // instantiate mongoose model inside function
  var Term = mongoose.model('Term', schema, 'terms');
  
  // turn examples argument into an array, separated by newlines (non-inclusive)
  var lnRegExp = /\r?\n|\r/;
  examples = examples.split(lnRegExp);
  

  // now we rebuild options into the proper schema format, like so:
  // {
  //   "option": option[i],
  //   "votes": 0
  // }
  var examplesArr = [];
  for (let i = 0; i < examples.length; i++){
    let obj = {};
    obj.example = examples[i];
    examplesArr.push(obj);
  }

  // create term instance to be inserted into collection
  var term = new Term({
    creator: creator,
    term: term,
    definition: definition,
    examples: examplesArr
  });
  
    // create terms collection as soon as first document is inserted
    db.collection('vocab', function(err, collection) {if (err) throw err});

    // insert term instance into database, then close database
    db.collection('vocab').insertOne(term);
}

module.exports = app;
