'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('TodoGroupService', ['$resource', function ($resource) {
      return $resource('http://localhost:3000/todoGroup/:id', null, {
        add: {method: 'post',cache : false},
        get: {method: 'get',cache : false,params:{
          id:0
        }},
        remove: {method: 'delete',cache : false, params: {
          id: 0
        }}
      });
    }]);
})(window, angular);
