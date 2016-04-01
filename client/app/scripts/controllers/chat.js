'use strict';


angular.module('clientApp')
  .controller('ChatCtrl', ['$state', '$scope', 'UserService', '$cookieStore', 'ChatService', function ($state, $scope, UserService, $cookieStore, ChatService) {
    var _this = this;
    var senders = [];
    var socketio = io.connect("http://localhost:3000");
    _this.messages = [];
    _this.messageText = '';
    var username;

    _this.friend= {};

    UserService.get({}, function (data) {
      _this.users = data.users;
      socketio.emit('new user', _this.user, function (response) {
        console.log(response)
      });
    });
    _this.userName = $cookieStore.get("user").name;
    _this.user = $cookieStore.get("user");

    _this.sendChatUserDetails = function (friend) {
      ChatService.getChat({id:_this.user._id,friendId:friend._id},function(data){
        console.log(data)
        _this.messages = [];
        data.data.forEach(function (chat) {
          //if(chat.userId==friend._id){
            _this.messages.push({
              text: chat.message.text,
              name: chat.senderName,
              id: chat.userId,
              timestamp:chat.timestampUpdated
            })
          //}

        });
        _this.messages=_this.messages.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        })
        console.log(_this.messages)

      })

      _this.friend= friend;
    };


    socketio.on('users', function (data) {
      $('.names-list').text('');
      $.each(data, function (i, v) {
        $('.names-list').append('<li>' + v + '</li>');
      });
    });
    $(document).on('keyup', '.message-box', function (e) {
      var $this = $(this);
      if (e.which === 13) {
        var message = $this.val();
        socketio.emit('new message', message);
        $this.val('');
      }
    });
    socketio.on('push message', function (response) {
        console.log(response)
        console.log(_this.friend)
      _this.messages.push({
        text: response.message,
        name: _this.friend.name,
        id: response.id
      });
      $scope.$apply();
      //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      //  $("#"+response.id).append(' <li> <span class="msg">' + response.message + '</span></li>')
    });


    _this.sendMessage = function () {
      //var message = document.getElementById("message_input").value;
      console.log(_this.messageText)
    _this.messages.push({
      text:_this.messageText,
      name: _this.user.name,
      id: _this.user._id
    });
      socketio.emit('new message',_this.friend, _this.messageText);
      //socketio.emit("message_to_server", {"room":room,message: message,friendId:_this.friendId,userId: _this.userId});
    };

  }]);
