'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatFriendSchema = new Schema({
    userId: String,
    friendId: String,
    senderName: String,
    numberOfAttempts: Number,
    message:Object,
    timestampCreated: {type: Number, default: Date.now},
    timestampUpdated: {type: Number, default: Date.now}
});
var ChatFriends = mongoose.model('ChatFriend', ChatFriendSchema);

module.exports = ChatFriends;
