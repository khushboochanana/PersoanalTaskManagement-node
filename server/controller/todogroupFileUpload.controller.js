var express = require('express');
var router = express.Router();
var todoGroupService=require("../services/todoGroup.service.js");
router.post('/', function (req,res) {
console.log("..........................");
console.log(req.files);
    todoGroupService.addFile(req.files, function(err,data){
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
