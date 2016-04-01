'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('UserService', ['$resource', function ($resource) {
      return $resource('http://localhost:3000/users', null, {
        signup: {method: 'post',cache : false},
        reset: {method: 'put',cache : false},
        get: {method: 'get',cache : false}
      });
    }]);
})(window, angular);
