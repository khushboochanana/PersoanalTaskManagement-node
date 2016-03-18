var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var connection = mongoose.connection;
connection.on("error", function () {
    console.log("Error in connection")
});
connection.on("close", function () {
    console.log("connection closed")
});

var schema = mongoose.Schema;
var tokenObject = {
    tokenValue: String,
    tokenType: String,
    dateCreated: {type: Number, default: Date.now}
};
var AuthenticationTokenSchema = new schema(tokenObject);
var AuthenticationToken = mongoose.model('AuthenticationToken', AuthenticationTokenSchema);


module.exports = AuthenticationToken;
