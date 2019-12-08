const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObbjectID = Schema.ObjectID;

var conversation = new Schema({
    user: {type: Schema.Types.ObjectID, ref: 'user', required: true},
    messages: [{type: Schema.Types.ObjectID, ref: 'messages'}]
});

module.exports = mongoose.model('Conversation', conversation);