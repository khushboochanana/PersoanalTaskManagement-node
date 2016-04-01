'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('ChatService', ['$resource', function ($resource) {
      return $resource('http://localhost:3000/chatFriend/:id/:friendId', null, {
        getChat: {method: 'get',cache : false}
      });
    }]);
})(window, angular);
