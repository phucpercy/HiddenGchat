var userModel = require('../models').models.user;

var create = function (data, callback) {
    var newUser = new userModel(data);
    newUser.save(callback);
};

var findOne = function (data, callback) {
    userModel.findOne(data, callback);
};

var findById = function (id, callback) {
    userModel.findById(id, callback);
};

var findOrCreate = function (data, callback) {
    findOne({'userId': data.userId}, function (err, user) {
        if(err)
            return callback(err);
        if(user) {
            return callback(err, user);
        } else {
            var userData = {
                username: data.displayName,
                userId: data.userId
            };

            create(userData, function (err, newUser) {
                callback(err, newUser);
            });
        }
    });
};

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    create,
    findOne,
    findById,
    findOrCreate,
    isAuthenticated
};