var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var passport = require('passport');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signin', new localStrategy({
        emailField: 'email',
        passwordField: 'password',
        passReqToCallBack: true
    }, function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            //Return if any errors occurs
            if (err)
                return done(err);

            //messages if user with email no existed
            if (!user)
                return done(null, false, {message: 'Email not existed'});

            //email existed but wrong password
            if (!user.validPassword())
                return done(null, false, {message: 'Wrong password'});

            //return successfull
            return done(null, user);
        });
    }));


    passport.use('local-signup', new localStrategy({
        usernameField: 'username',
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            //Return if any errors occurs
            if (err)
                return done(err);

            //messages if user already existed
            if (user)
                return done(null, false, {message: 'Email already registered'})

            //create new user
            var newUser = new User();
            newUser.info.firstname = req.body.firstname;
            newUser.info.lastname = req.body.lastname;
            newUser.info.dateOfBirth = req.body.dateOfBirth;
            newUser.local.username = username;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            //save new user
            newUser.save(function (err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        });
    }));
};