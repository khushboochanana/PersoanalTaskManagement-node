var express = require('express');
var router = express.Router();
var chatService=require("../services/chat.service.js");

router.get('/:id/:friendId', function (req,res) {
    chatService.getChat(req.params, function (err, data) {

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
