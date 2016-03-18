var TodoGroupModel = require("../schema/todoGroup.model.js");
var Todo = require("../schema/todo.model.js");
var async = require("async");
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var Uttils = require("../utils/CommonUtils.js");


exports.addTodoGroup = (function (payload, callback) {
    var todoGroup = new TodoGroupModel(payload);
    todoGroup.save(function (err, user) {
        callback(err, user)
    })
});

exports.deleteGroup = (function (id, callback) {
    Todo.find({todoGroupId: id}, function (err, data) {
        if (err) {
            callback(err, false)
        }
        data.forEach(function (todo) {
            todo.remove(function (err, data) {
                if (err) {
                    return callback(err, false)
                }
            })
        });
        TodoGroupModel.remove({_id: id}, function (err) {
            if (err) {
                callback(err, false)
            }
        });
        callback(null, true)
    });
});
exports.addFile = (function (files, callback) {
    var location = Uttils.getUserHome();

    fs.createReadStream(files.file.path).pipe(fs.createWriteStream(location + "/todofiles/" + files.file.name));
    TodoGroupModel.update({_id: ""}, {$push: {'files': files}}, function (err, data) {

    })

});

exports.fetchAll = (function (id, callback) {
    TodoGroupModel.find({userId: id}, function (err, data) {
        if (err) {
            console.log("ERROR", err);
            callback(err, false)
        }
        var groups = data;
        var asyncTasks = [];
        if (groups) {
            groups.forEach(function (value) {
                asyncTasks.push(function (cb) {
                    Todo.find({todoGroupId: value._id}, function (err, data) {
                        var finalData = {
                            todos: data,
                            _id: value._id,
                            name: value.name
                        };
                        cb(null, finalData);
                    });
                });
            });
            async.parallel(asyncTasks, function (err, result) {
                callback(err, result)
            });
        }
        else {
            callback(err, false)
        }
    })
});
