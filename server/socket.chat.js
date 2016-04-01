module.exports = function (server) {
    var io = require('socket.io')(server);
    var chatService = require("./services/chat.service.js");
    var users = {};
    var sockets = {};
    io.on('connection', function (socket) {
        socket.on('disconnect', function () {

        });
        socket.on('new user', function (user, cb) {
            users[user.email] = socket.id;
            socket.userName = user.name;
            sockets[socket.id] = {username: user._id, socket: socket};
            cb(true)
        });
        socket.on('new message', function (to, msg) {
            chatService.saveChat({
                userId: sockets[socket.id].username,
                senderName: socket.userName,
                friendId: to._id,
                message: msg
            }, function (err, data) {
                if (err) {
                    console.log("some error during chat save")
                }
            });
            sockets[users[to.email]].socket.emit(
                'push message',
                {
                    message: msg,
                    id: to._id,
                    from: sockets[socket.id].username
                }
            );
        });
    });
};
