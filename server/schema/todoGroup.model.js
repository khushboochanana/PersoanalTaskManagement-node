var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var connection=mongoose.connection;

var schema=mongoose.Schema;
var todogroup ={
    name:String,
    userId:String,
    file:[],
    dateCreated: {type: Number, default: Date.now}
};
var TodoGroupSchema   = new schema(todogroup);
var TodoGroups = mongoose.model('TodoGroup', TodoGroupSchema);

module.exports = TodoGroups;
