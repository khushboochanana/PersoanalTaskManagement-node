var express = require('express');
var router = express.Router();

console.log("USE");
var userService=require("../services/user.service.js");

/* GET users listing. */
router.get('/', function (req,res) {
    userService.find(req.query,function(err,data){
        if(err){
            return
        }
        res.render('list',{users:data,title:"USERS DATA",message:""})
    })
});
router.post('/',function(req,res){
    userService.addUser(req.body,function(err,data){
        if(err){
           res.json({status:false,message:"Some error occurred"});
            return
        }
        res.json({status:true,message:"User Added Successfully"})

    })
});

router.put('/:id',function(req,res) {

    userService.updateUser(req.params.id, req.body, function (err, data) {
        if (err) {
            return
        }
        res.send(data)
    })

});

router.delete('/:id',function(req,res) {
    userService.deleteUser(req.params.id, function(err,data){
        if(err){
            console.log("ERROR",err)
        }else {
            if(!data){
                res.send(false)
                return
            }
            console.log("Deleted")
            res.send(true)

        }
    })
});

module.exports = router;
