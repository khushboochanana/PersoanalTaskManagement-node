var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var connection=mongoose.connection;

var schema=mongoose.Schema;
var todo ={
    task:String,
    completed:Boolean,
    todoGroupId:String,
    dateCreated: {type: Number, default: Date.now}
};
var TodoSchema   = new schema(todo);
var Todos = mongoose.model('Todo', TodoSchema);



module.exports = Todos;
