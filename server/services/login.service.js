var UserModel=require("../schema/user.model.js");

exports.login=(function(payload,callback){

    var obj={email:payload.email};
    UserModel.findOne(obj,function(err,data){
        if(err) {
            console.log("ERROR", err)
        }
        if(data && (data.password==payload.password)){
            callback(err,data)
        }
        else{
            callback(err,false)
        }
    })
});