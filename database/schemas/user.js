var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;
var bcrypt = require('bcrypt-nodejs');

var user = new  Schema({
    username: {type: String, required: true},
    password: {type: String, default: null},
    userId: {type: String, default: null}
});

user.save('save', function (next) {
    var user = this;

    if(!user.isModified('password'))
        return next();

    bcrypt.genSalt(10, function (err, salt) {
        if(err)
            return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

user.methods.validPassword = function(password, callback){
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if(err)
            return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.models('user', user);