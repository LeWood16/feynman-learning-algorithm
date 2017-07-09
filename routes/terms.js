'use strict';
var express = require('express');
var router = express.Router();

// all terms page
router.get('/all_terms', function(req, res, next) {
  
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


module.exports = router;