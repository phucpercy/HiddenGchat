var expres = require('express');
var router = expres.Router();

module.exports = function (app, passport) {
    //Sign in //
    app.get('/', function (req, res) {
        res.render('homepage.ejs');
    })

    app.get('/signin', function(req, res){
        res.render('signin.ejs', {message: req.flash('signinMessage')});
    });

    app.post('/signin', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //Sign up//
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile/',
        failureRedirect: 'signup',
        failureFlash: true
    }));
};