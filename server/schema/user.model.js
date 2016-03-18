var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

var connection=mongoose.connection;
connection.on("error",function(){
    console.log("Error in connection")
});
connection.on("close",function(){
    console.log("connection closed")
});

var schema=mongoose.Schema;
var userObject ={
    name: String,
    phone:String,
    password: {type:String,required: true,default:"igdefault"},
    email:{type:String,unique:true,required: true},
    dateCreated: {type: Number, default: Date.now}
};
var UsersSchema   = new schema(userObject);
var Users = mongoose.model('User', UsersSchema);



module.exports = Users;
