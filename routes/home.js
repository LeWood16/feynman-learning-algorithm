var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//    res.sendFile(path.join(__dirname+'/views/home.html', { user: req.user })
    res.render('home', {
      user: req.user
    });
});

module.exports = router;
