var TodoModel=require("../schema/todo.model.js");

exports.addTodo=(function(payload,callback){
    var todo=new TodoModel(payload);
    todo.save(function(err,todo){
        callback(err,todo)
    })
});

exports.deleteTodo=(function(id,callback){
    TodoModel.findById(id,function(err,data){
        if(err){
            console.log(err);
            return
        }
        data.remove(function(err,user){
            callback(err,data)
        })
    });
});
exports.update=(function(payload,callback){
    TodoModel.update({_id:payload.id},{completed: payload.completed},function(err,data){
        if(err){
            console.log(err);
            return
        }
            callback(err,data)
    });
});