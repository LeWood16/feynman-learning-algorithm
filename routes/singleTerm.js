// routes/singleTerm.js
/*global db*/
var express  = require('express');
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/:term', function(req, res, next) {

  db.collection('vocab').find({term: req.params.term}).toArray(function(err, terms) {
        
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

module.exports = router;