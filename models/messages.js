const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

var messages = new Schema({
    messagesContent: {type: String, required: true}
});

module.exports = mongoose.model('Messages', messages);