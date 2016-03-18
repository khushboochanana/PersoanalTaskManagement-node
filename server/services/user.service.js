var UserModel = require("../schema/user.model.js");
console.log("Hiiiiiiii");

exports.find = (function (query, callback) {
    UserModel.find(query, callback);

});
exports.findByEmail = (function (emaild, callback) {
    UserModel.findOne({email: emaild}, callback);
});

exports.addUser = (function (payload, callback) {
    var user = new UserModel(payload);
    user.save(function (err, user) {
        callback(err, user)
    })
});

exports.deleteUser = (function (id, callback) {
    UserModel.findById(id, function (err, data) {
        if (err) {
            console.log(err);
            return
        }
        data.remove(function (err, user) {
            callback(err, data)
        })
    });
});

exports.updateUser = (function (id, payload, callback) {
    UserModel.findById(id, function (err, data) {
        if (err) {
            console.log("ERROR", err)
        }
        if (payload.name)
            data.name = payload.name;
        if (payload.phone)
            data.phone = payload.phone;
        if (payload.password)
            data.password = payload.password;

        data.save(function (err, data) {
            callback(err, data)
        })
    })
});
