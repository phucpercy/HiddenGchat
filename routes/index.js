var express = require('express');
var router = express.Router();
var passport = require('passport');

var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/rooms');
  } else {
    res.render('login', {
      success: req.flash('success')[0],
      errors: req.flash('error'),
      showRegisterForm: req.flash('showRegisterForm')[0]
    });
  };
});

//Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/',
  failureFlash: true
}));



module.exports = router;
