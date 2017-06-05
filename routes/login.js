var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/login',
  function(req, res){
    res.sendFile(path.join(__dirname+'/views/login.template.html'));
  });
  
app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
module.exports = router;
