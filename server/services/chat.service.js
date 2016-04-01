var ChatModel = require("../schema/chatFriend.model.js");
var async = require("async");

exports.saveChat = (function (payload, callback) {
    var chatFriend = new ChatModel(payload);
    var tasks = [];

    tasks.push(function (cb) {
        chatFriend.friendId = payload.friendId;
        chatFriend.userId = payload.userId;
        chatFriend.senderName = payload.senderName;
        chatFriend.message={
            text:payload.message
        };
        chatFriend.save(function (err, user) {
           return cb(err, user)
        })
    });

    async.series(tasks, function (err, results) {
        if (err)
            return (err);
        callback(err, results[0])
    })

});

exports.getChat= function (payload,callback) {
    ChatModel.find({friendId:{$in:[payload.id,payload.friendId]},userId:{$in:[payload.id,payload.friendId]}},function(err,data){
        if(err) {
            callback(err)
        }
        if(data ){
            callback(err,data)
        }
        else{
            callback(err,false)
        }
    })
};