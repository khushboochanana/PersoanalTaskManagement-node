'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('MainService', ['$resource', function ($resource) {
      return $resource('http://localhost:3000/login', null, {
        login: {method: 'get',cache : false}
      });
    }]);
})(window, angular);
