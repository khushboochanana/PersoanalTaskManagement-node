'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('TodoService', ['$resource', function ($resource) {
      return $resource('http://localhost:3000/todo/:id', null, {
        add: {method: 'post',cache : false},
        get: {method: 'get',cache : false},
        edit: {
          method: 'put', cache: false
        },
        remove: {
          method: 'delete', cache: false, params: {
            id: 0
          }
        }
      });
    }]);
})(window, angular);
