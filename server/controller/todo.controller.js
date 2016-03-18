var express = require('express');
var router = express.Router();
var todoService=require("../services/todo.service.js");

router.post('/',function(req,res) {
    todoService.addTodo(req.body, function (err, data) {
        if (err) {
            res.json({status: false});
            return
        }
        res.json({status: true ,data:data});

    });
});

router.delete('/:id',function(req,res) {
    todoService.deleteTodo(req.params.id, function(err,data){
        if(err){
            console.log("ERROR",err);
            return
        }else {
            if(!data){
                res.json({status:false,message:"Some error"});
                return
            }
            res.json({status:true,message:"Deleted"})
        }
    })
});
router.put('/',function(req,res) {
    todoService.update(req.body, function(err,data){
        if(err){
            console.log("ERROR",err);
            return
        }else {
            if(!data){
                res.json({status:false,message:"Some error"});
                return
            }
            res.json({status:true,message:"Updated"})
        }
    })
});

module.exports = router;
