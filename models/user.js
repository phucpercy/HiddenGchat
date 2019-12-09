const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;
const bcrypt = require('bcrypt-nodejs');

var user = new Schema({
    userID: {type: ObjectID},
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    username: {type: String, unique: true, required:true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dateOfBirth: {type: Date, required: true}
});

user.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

user.virtual('fullName').get(function () {
    return this.lastName + ' ' + this.firstName;
});

user.virtual('url').get(function () {
    return 'profile/user/' + this._id;
});

module.exports = mongoose.model('User', user);