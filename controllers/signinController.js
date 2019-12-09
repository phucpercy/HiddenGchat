const user = require('../models/user');

exports.signin = function (req, res, next) {
    res.render('signin');
}
