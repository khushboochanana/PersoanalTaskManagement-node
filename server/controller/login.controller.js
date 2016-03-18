var express = require('express');
var router = express.Router();
var loginService=require("../services/login.service.js");

router.get('/', function (req,res) {
    loginService.login(req.query, function (err, data) {
        if (err) {
            res.json({ status: false });
        }
        if(data){
        res.json({ status: true,data:data,message:"Login successfully" });
        }else{
            res.json({ status: false});
        }

    })
});

module.exports = router;
