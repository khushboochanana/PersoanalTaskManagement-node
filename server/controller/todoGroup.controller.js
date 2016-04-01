var express = require('express');
var router = express.Router();
var todoGroupService=require("../services/todoGroup.service.js");

router.post('/',function(req,res) {
    todoGroupService.addTodoGroup(req.body, function (err, data) {
        if (err) {
            res.json({status: false});
            return
        }
        res.json({status: true});

    });
});
//router.get('/', function (req,res) {
//    todoGroupService.fetchAll(function (err, data) {
//        if (err) {
//            res.json({ status: true});
//        }
//        res.json({ status: true ,data:data});
//    })
//});
router.get('/:id', function (req,res) {
    todoGroupService.fetchAll(req.params.id,function (err, data) {
        if (err) {
            res.json({ status: true});
        }
        res.json({ status: true ,data:data});
    })
});
router.delete('/:id',function(req,res) {
    todoGroupService.deleteGroup(req.params.id, function(err,data){
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


module.exports = router;
